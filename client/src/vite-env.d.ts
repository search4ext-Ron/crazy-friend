/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
  readonly VITE_CRISIS_HOTLINE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

