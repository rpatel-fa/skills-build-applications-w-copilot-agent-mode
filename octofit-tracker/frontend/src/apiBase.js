/**
 * Returns the API base URL.
 *
 * In a GitHub Codespace, set VITE_CODESPACE_NAME in .env.local:
 *   VITE_CODESPACE_NAME=my-codespace-abc123
 *
 * The resolved URL will be:
 *   https://<VITE_CODESPACE_NAME>-8000.app.github.dev
 *
 * If VITE_CODESPACE_NAME is unset, falls back to http://localhost:8000
 * so local development still works without a broken "undefined" URL.
 */
export function getApiBase() {
  const name = import.meta.env.VITE_CODESPACE_NAME;
  if (name) {
    return `https://${name}-8000.app.github.dev`;
  }
  return 'http://localhost:8000';
}
