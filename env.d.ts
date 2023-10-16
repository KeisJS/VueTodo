/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_USE_DEV_HTTP_MOCK: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
