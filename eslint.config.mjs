// eslint.config.js
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "style-prop-object": "off",
      "@next/next/no-img-element": "off",
      "react/no-unknown-property": ["error", { ignore: ["jsx", "global"] }]
    },
    ignorePatterns: [
      "node_modules/",
      ".next/",
      "dist/",
      "build/",
      "public/"
    ],
  }
];

export default eslintConfig;