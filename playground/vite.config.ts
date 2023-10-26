import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import devcert from '@childrentime/devcert'

// https://vitejs.dev/config/
export default defineConfig(async () => {
  const httpsOptions = await devcert.certificateFor(["localhost"]);
  return {
    plugins: [react()],
    server: {
      https: httpsOptions,
    },
  };
});
