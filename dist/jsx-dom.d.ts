declare module "jsx-dom" {
  function createElement(
    type: string | Function,
    props?: any,
    ...children: (Node|string)[]
  ): Element;
}