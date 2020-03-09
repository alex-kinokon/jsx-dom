export function useText(initialValue?: string) {
  const text = new Text()
  Object.defineProperty(text, "toString", {
    value() { return this.textContent }
  })
  function setText(value: string) {
    text.textContent = value
  }
  if (initialValue != null) {
    setText(initialValue)
  }
  return [text, setText] as const
}
