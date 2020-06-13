# 6.4.16
- Fixes #27
- Makes `props` an optional parameter in `createElement`.

# 6.4.14
- Update type definitions with React upstream.
- Introduce `useText`, `useClassList` API.

# 6.4.12
- Fix: default import for `import React from "jsx-dom/svg"`.

# 6.4.11
- Expands `HTML` type alias namespace. No runtime code changed.

# 6.4.10
- Adds support for `import React from "jsx-dom"`.

# 6.4.9
- Assigns event listener directly instead of `addEventListener`.
- Exports `HTML` helper type alias namespace.

# 6.4.5
- Adds `React.createFactory` support.

# 6.4.0
- **Now requires `Object.assign` polyfill for old browsers.**

# 6.3.0
- Adds `defaultProps` support to functional components.

# 6.1.0
- Adds JSX.Fragment support.

# 6.0.0
- Deprecates undocumented `DOM` shortcut functions.

# 5.2.0
- Fixes a bug with xlink attributes for SVG elements.

# 5.1.6
- Fixes a bug where `null`y value gets passed to dataset.

# 5.1.4
- Exports `h` variable as an alias for `createElement` for hyperscript users.

# 5.1.3
- Fixes an issue with `spellCheck` attribute.

# 5.1.2
- Adds support for `spellCheck`.

# 5.1.0
- Nested arrays are now supported as a className input.

# 5.0.2
- ~~Attribute is now optional for `DOM` shortcut functions.~~
- Added more tests.

# 5.0.0
- **Breaking Change:** SVG support is now migrated to a dedicated file.