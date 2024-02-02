module.exports = {
  env: {
    brower: true,
    node: true,
    es2021: true,
  },
  extends: [
        "eslint:recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
    ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint',"prettier", "import"],
  rules: {
    semi: ["error", "always"],
        "@typescript-eslint/no-unused-vars": "error",
        "prettier/prettier": [
            "error",
            {
                printWidth: 80,
                endOfLine: "auto",
                tabWidth: 4,
                trailingComma: "es5",
            },
        ],
  },
};