const path = require("path")

require("ts-node").register({
  transpileOnly: true,
  compilerOptions: { jsx: "react-jsx", jsxImportSource: path.resolve(__dirname, "../src") },
})

require("./register")
