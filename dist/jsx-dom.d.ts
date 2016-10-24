declare module "jsx-dom" {
  function createElement(
    type: string,
    props?: any,
    ...children: (Node|string)[]
  ): Element;
}