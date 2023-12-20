# 8.1.3
- Merged #101.

# 8.1.1
- Undo: Removes all `*Capture` event listener types. They were never supported.

# 8.1.0
- Fixes #97: support `disabled` on `<link>` element.
- Fixes #94: supports `forwardRef` and `useImperativeHandle`.
- Fixes #68: exports more types.
- Bumped TypeScript definition sync with `@types/react` at #e05c7e9.
- Removes all `*Capture` event listener types. They were never supported.

# 8.0.5
- Added support for using `DOMTokenList` (e.g. `element.classList`) for `className`.
- Renamed `ClassList` type declaration to `BasicClassList` to not confuse with the browser’s class list type.

# 8.0.3
- Added: [RFC Support capture events, fix custom events, support on/onCapture](https://github.com/alex-kinokon/jsx-dom/pull/70)

# 8.0.2
- Bug fix: `import("jsx-dom").ShadowRoot` was not properly exported.

# 8.0.0
- Breaking change:
  - [https://github.com/proteriax/jsx-dom/issues/65](Disabled rendering `false` as attribute to custom components).

# 7.0.2
- #61 Support rich data properties

# 7.0.0
- Breaking change:
  - TypeScript 4 is required. This particular release only requires TypeScript 3, but further updates may require TypeScript 4 specific features without a major version bump.
  - Remove `jsx-dom/svg` alias.
  - CommonJS builds are removed. `jsx-dom` are meant to be consumed in the browser and its nature already requires a compiler tool.
- Merges #39 - “Fix solution for #33”.
- Merges #38 - “Added support for Class Components”.
- Updates type definition with upstream (#d498b7c).

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