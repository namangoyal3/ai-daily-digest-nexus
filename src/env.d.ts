
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DB_HOST?: string;
  readonly VITE_DB_PORT?: string;
  readonly VITE_DB_NAME?: string;
  readonly VITE_DB_USER?: string;
  readonly VITE_DB_PASSWORD?: string;
  readonly VITE_DB_USE_SSL?: string;
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_ANON_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
