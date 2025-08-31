import config from "../eslint.config.mjs"

export default [
  ...config,
  {
    rules: {
      "react/no-unknown-property": "off",
      "react/jsx-key": "off",
    },
  },
]
