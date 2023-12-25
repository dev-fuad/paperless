module.exports = {
  root: true,
  extends: ["universe/native"],
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
  },
};
