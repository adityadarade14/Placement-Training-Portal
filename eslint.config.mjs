
import js from "@eslint/js";
import globals from "globals";

export default [
    {
        ignores: ["node_modules/**", "Data/**"],
    },

    {
        files: ["Backend/**/*.js"],
        ...js.configs.recommended,
        languageOptions: {
            ...js.configs.recommended.languageOptions,
            globals: globals.node,
        },
    },

    {
        files: ["Frontend/**/*.js"],
        ...js.configs.recommended,
        languageOptions: {
            ...js.configs.recommended.languageOptions,
            globals: globals.browser,
        },
    },
];
