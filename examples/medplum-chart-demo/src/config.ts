export interface MedplumAppConfig {
  baseUrl?: string;
  googleClientId?: string;
  clientId?: string;
}

const config: MedplumAppConfig = {
  baseUrl: "https://api.med-dev.revia.tech",
  googleClientId: import.meta.env?.GOOGLE_CLIENT_ID,
  clientId: "01965b84-b3f6-710f-99b2-2e1017396207",
};

export function getConfig(): MedplumAppConfig {
  return config;
}
