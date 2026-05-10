/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Public URL of the RSVP API on Render (no trailing slash). Wired via vite.config `define`. */
  readonly RenderURL?: string;
  /** Optional shared secret; must match server RSVP_SECRET. */
  readonly VITE_RSVP_SECRET?: string;
  /** Dropbox File Request, Google Form upload, etc. Env var `PhotoUpload` — wired in vite.config. */
  readonly PhotoUpload?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
