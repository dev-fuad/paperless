module.exports = {
  root: true,
  extends: ["universe/native"],
  plugins: ["react", "react-native"],
  rules: {
    "import/order": [
      "warn",
      {
        groups: ["builtin", "external", "internal"],
        pathGroups: [
          {
            pattern: "react?(-native)",
            group: "builtin",
            position: "before",
          },
          {
            pattern: "@{store/*,components,models,utils/*}",
            group: "internal",
            position: "before",
          },
        ],
        pathGroupsExcludedImportTypes: ["react"],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
    "react-native/no-unused-styles": "error",
    "react-native/no-inline-styles": "warn",
    "react-native/sort-styles": ["warn", "asc", { ignoreClassNames: true }],
    "react-native/no-color-literals": "warn",
  },
};
