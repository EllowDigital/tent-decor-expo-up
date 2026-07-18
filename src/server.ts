// Minimal SSR entry used only during static prerender at build time.
// The final Netlify deploy is pure static (dist/client/), so this file is not
// executed at runtime — TanStack Start's prerender step imports it in-process
// to render each route to HTML.
export { default } from "@tanstack/react-start/server-entry";
