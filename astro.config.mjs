import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  integrations: [react(), tailwind({
    applyBaseStyles: false
  }), icon()]
});