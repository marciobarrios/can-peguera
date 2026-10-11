import js from "@eslint/js";
import tseslint from "typescript-eslint";
export default tseslint.config(
  { ignores: ["dist/**", "research/**", "node_modules/**"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["src/**/*.ts"],
    languageOptions: {
      globals: {
        document: "readonly",
        window: "readonly",
        history: "readonly",
        location: "readonly",
        requestAnimationFrame: "readonly",
        HTMLElement: "readonly",
        HTMLDialogElement: "readonly",
        HTMLInputElement: "readonly",
        HTMLSelectElement: "readonly",
        URL: "readonly",
        CSS: "readonly",
      },
    },
  },
);
