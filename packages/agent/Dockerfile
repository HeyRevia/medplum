# Chainguard wolfi-base from the entitled OpenLoop catalog. wolfi-base is
# glibc-native (required by the Node SEA binary) and ships apk, so we can add
# iputils for the `ping` the agent shells out to — which fully distroless
# images lack. wolfi-base builds as root; we drop to the nonroot uid 65532 for
# runtime.
FROM cgr.dev/openloophealth.com/wolfi-base

ARG GIT_SHA
ARG MEDPLUM_VERSION

ENV GIT_SHA ${GIT_SHA}
ENV MEDPLUM_VERSION ${MEDPLUM_VERSION}
ENV MEDPLUM_LOG_LEVEL=${MEDPLUM_LOG_LEVEL:-"INFO"}

COPY medplum-agent-${MEDPLUM_VERSION}-linux /srv/medplum-agent

RUN apk add --no-cache iputils && \
    chmod +x /srv/medplum-agent

WORKDIR /srv

# Built-in Chainguard nonroot user
USER 65532

CMD ./medplum-agent "$MEDPLUM_BASE_URL" "$MEDPLUM_CLIENT_ID" "$MEDPLUM_CLIENT_SECRET" "$MEDPLUM_AGENT_ID" "$MEDPLUM_LOG_LEVEL"
