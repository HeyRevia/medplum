# Chainguard Image Migration Plan

Reference for reducing CVEs in Medplum's container images by moving to Chainguard.
Originally written 2026-07-08; updated 2026-07-21 to fold in the completed
org-wide migrations and the Medplum-specific guidance from Chainguard.

## What changed since the first draft

The earlier draft treated a **Chainguard subscription as the open gate** and assumed
the free `:latest`-only public catalog. That gate is now closed:

- **OpenLoop has an entitled Chainguard subscription.** Images are pulled from the
  private org registry `cgr.dev/openloophealth.com/<image>:<tag>` with pinned tags
  (e.g. `python:3.12-dev`, `node:20-dev`), including **Custom Assembly (CA)** images
  built via `chainctl`. Version pinning and older-version support are covered by the
  paid plan — no `:latest`-only constraint.
- **Eight images across the org have already been migrated** (see below), establishing
  a proven, repeatable pattern with ~90%+ Critical+High CVE reductions. Medplum should
  follow that same pattern rather than re-deriving it.
- Because the whole org is standardizing on Chainguard, the "one or two hardened-image
  vendors" question is effectively answered: **consolidate on Chainguard.** The Medplum
  server is currently on Docker Hardened Images (DHI); migrating it is now a
  standardization win even though the CVE delta vs. DHI is small.

## Proven org pattern (from the completed migrations)

These migrations shipped the pattern Medplum should copy:

| Repo / image | PR | Base swap | grype Crit / High |
|--------------|----|-----------|-------------------|
| Atlas `codex-worker` (browser/VNC stack) | [Atlas#154](https://github.com/HeyRevia/Atlas/pull/154) (FD-2262) | `python:3.12-slim` → CA `codex-worker:3.12-dev` | 45→0 / 241→20 (~93%) |
| Atlas `frontend` | [Atlas#155](https://github.com/HeyRevia/Atlas/pull/155) (FD-2265) | `node:20-alpine` → `node:20-dev` build + distroless `node:20` runtime | — |
| Atlas `backend` | [Atlas#156](https://github.com/HeyRevia/Atlas/pull/156) (FD-2264) | `python:3.14-slim` → `python:3.14-dev` | — |
| Atlas `ui_test` | [Atlas#157](https://github.com/HeyRevia/Atlas/pull/157) (FD-2266) | Debian → CA `codex-worker:3.14-dev` | 44→2 / 253→22 (~92%) |
| Atlas `ui-test-nodejs` | [Atlas#158](https://github.com/HeyRevia/Atlas/pull/158) (FD-2267) | Debian → CA `codex-worker:3.14-dev` | 114→2 / 518→38 (~94%) |
| `consent-service` backend | [consent-service#49](https://github.com/HeyRevia/consent-service/pull/49) (FD-2438) | `python:3.12-slim` → `python:3.12-dev` | 7→0 / 30→14 |
| `pharmacy-service` backend | [pharmacy-service#46](https://github.com/HeyRevia/pharmacy-service/pull/46) (FD-2439) | `python:3.12-slim` → `python:3.12-dev` | 7→0 / 30→14 |
| `crm-patient-ops` backend | [crm-patient-ops#20](https://github.com/HeyRevia/crm-patient-ops/pull/20) (FD-2440) | `python:3.12-slim` → `python:3.12-dev` (both stages) | 7→0 / 32→16 |

The Atlas PRs (154–158) are **merged**; the three service PRs (consent, pharmacy, crm)
are **open** pending staging validation by a dev.

Conventions that repeated across every PR — apply these to Medplum:

1. **Registry + pinned tag.** Pull from `cgr.dev/openloophealth.com/<image>:<tag>`. Use
   the `-dev` variant (ships `busybox`/`sh`) for any stage that needs a shell —
   build stages, or runtimes whose entrypoint is a shell script; use the distroless
   variant for the runtime when the entrypoint is a bare binary.
2. **CI registry login.** Add a `cgr.dev` login step **before** the build in the image's
   workflow, using the `CGR_USERNAME` / `CGR_PASSWORD` repo secrets. GCP auth, push, and
   deploy steps stay unchanged. (Each migrated repo added exactly this 7-line step.)
3. **Built-in nonroot user.** Chainguard images ship a nonroot user at **uid 65532**.
   Drop the manual `adduser`/`addgroup` blocks and use it. Build as root where a global
   `npm install`, venv population, or secret mount needs it, then `chown` and drop to
   65532 for runtime. Use `USER root` at runtime **only** where the original image
   genuinely ran as root (the browser-stack images do; the plain backends do not).
4. **Drop apt build deps for glibc wheels.** Wolfi is glibc-native, so packages like
   `psycopg2-binary` and `asyncpg` install from pure wheels — the `build-essential` /
   `python3-dev` / `libpq-dev` / `libc6-compat` blocks can be deleted.
5. **Pin build tools from upstream images.** Copy `uv` from `ghcr.io/astral-sh/uv`
   rather than `pip install uv` as root; remove build-only tools (pnpm, dev deps) after
   the build so they don't ship in the runtime layer.
6. **Custom Assembly for heavy runtimes.** The browser/VNC stack (chromium, xvfb, x11vnc,
   novnc, websockify, openbox, ffmpeg, tini, node) lives in a single entitled CA image
   with SLA coverage, replacing large apt/apk dependency trees.

---

## Medplum-specific guidance (from Chainguard, per Slack 2026-07-21)

Chainguard's note on the Medplum conversion:

- **Server:** multistage build — `node-dev` for the build stage, `node`/node-slim
  (distroless) for runtime. This matches Medplum's existing two-stage Dockerfile.
- **App:** an `nginx-dev` tag **or** a custom-assembled nginx image.
- **Build the app/server from source *outside* the Dockerfile**, per the upstream
  Medplum Dockerfile instructions. Medplum already does this — the server Dockerfile
  consumes `medplum-server-metadata.tar.gz` + `medplum-server-runtime.tar.gz` produced
  by `scripts/build-docker-server.sh`, and the app consumes `medplum-app.tar.gz`.
- **Cache upstream Medplum source in CI** so each build doesn't re-download/re-compile
  it from scratch.

## 1. Server (`./Dockerfile`) — standardization swap

Currently `dhi.io/node:24-dev` (build) + `dhi.io/node:24` (runtime), a clean two-stage
build that `ADD`s the prebuilt tarballs. Straight base swap to the entitled catalog:

```dockerfile
FROM cgr.dev/openloophealth.com/node:24-dev AS build-stage
ENV NODE_ENV=production
WORKDIR /usr/src/medplum
ADD ./medplum-server-metadata.tar.gz ./
RUN npm ci --omit=dev && rm package-lock.json

FROM cgr.dev/openloophealth.com/node:24 AS runtime-stage   # distroless
ENV NODE_ENV=production
WORKDIR /usr/src/medplum
COPY --from=build-stage /usr/src/medplum/ ./
ADD ./medplum-server-runtime.tar.gz ./
ENTRYPOINT [ "node", "--require", "./packages/server/dist/otel/instrumentation.js", "packages/server/dist/index.js" ]
```

Notes:
- The entrypoint is a bare `node` invocation, so the **distroless** runtime works — no
  shell needed. Keep `-dev` only for the build stage.
- Chainguard node runs as nonroot `node` (uid 65532), `WORKDIR /home/node`. The build
  stage's `npm ci` and the `ADD tar.gz` extraction need the copied files world-readable
  (they are). Confirm `WORKDIR /usr/src/medplum` is writable in the build stage.
- CVE delta vs. DHI is small; the value here is **vendor consolidation**, not CVE count.

## 2. App (`packages/app/Dockerfile`) — needs a shell at runtime

The entrypoint (`packages/app/docker-entrypoint.sh`) does **runtime env substitution with
a shell + `sed` + `find`**, and the build does `chown`/`chmod`. Chainguard's fully
distroless nginx has no shell, so use the **`-dev`** tag (matches the Atlas-backend
pattern of keeping `-dev` where a shell entrypoint is required):

- **`cgr.dev/openloophealth.com/nginx:latest-dev`** (has a shell) — keeps the current
  entrypoint and the `sed`/`find` substitution. Lowest friction. **Recommended.**
- Alternatively, a **custom-assembled nginx** image (per the Chainguard note) or move the
  config templating to **build-time / an init container**, then run fully distroless
  nginx. More work; do this only if the residual `-dev` surface is a concern.
- Chainguard nginx uses uid **65532**, not the alpine image's 101 — update the `chown`
  targets and the final `USER` accordingly.

## 3. Agent (`packages/agent/Dockerfile`) — highest CVE payoff

Currently `debian:bullseye-slim` (old) + `apt-get install iputils-ping`. This is the
oldest, highest-CVE base of the three. The agent binary is a Node SEA
(`scripts/build-agent-sea-linux.sh`), dynamically linked against glibc, and it **shells
out to `ping`**, which distroless images lack — that's the only real blocker.

- **`cgr.dev/openloophealth.com/wolfi-base` + `apk add iputils`** — keeps `ping`, glibc
  native for the SEA binary, far fresher/smaller than bullseye. Lowest friction.
  **Recommended.**
- **`glibc-dynamic`** (distroless) — smallest surface, but loses `ping` unless the ping
  dependency is dropped or replaced with a TCP reachability check.
- Replace the manual `adduser -u 5678` with the built-in nonroot uid **65532**.
- Consider dropping the hardcoded `--platform=linux/amd64` if arm64 support is wanted
  (the entitled catalog is multiarch).

---

## Recommended path

1. **Consolidate on Chainguard** — the org standard; the subscription/entitlement gate
   is resolved.
2. **Agent** first — biggest CVE reduction, migrate to `wolfi-base` + `apk add iputils`.
3. **App** — `nginx:latest-dev` (or custom-assembled nginx), fixing the uid 101→65532 chown.
4. **Server** — swap DHI → entitled `node:24-dev`/`node:24` for standardization.
5. Add the `cgr.dev` login (`CGR_USERNAME`/`CGR_PASSWORD`) step to `publish.yml` before
   each build; cache upstream Medplum source in CI per the Chainguard note.
6. Validate each image with `grype` against the current baseline and record the delta,
   mirroring the org PRs.

## Files involved

- `./Dockerfile` — server image
- `packages/app/Dockerfile`, `packages/app/docker-entrypoint.sh` — app image + entrypoint
- `packages/agent/Dockerfile` — agent image
- `scripts/build-docker-server.sh`, `scripts/build-docker-app.sh` — build/push logic (tarball assembly)
- `scripts/build-agent-sea-linux.sh` — agent SEA binary build
- `.github/workflows/publish.yml` — CI build/push; add `cgr.dev` login, replace `dhi.io` login
