/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Public URL of the RSVP API (no trailing slash). Required for production builds on static hosting. */
  readonly VITE_RSVP_API_URL?: string;
  /** Optional shared secret; must match server RSVP_SECRET. */
  readonly VITE_RSVP_SECRET?: string;
  /** Dropbox File Request, Google Form upload, etc. Env var `PhotoUpload` — wired in vite.config. */
  readonly PhotoUpload?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
