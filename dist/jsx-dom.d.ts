declare module "jsx-dom" {
  type Child = Node | string | number;

  function createElement<K extends keyof HTMLElementTagNameMap>(
    tagName: K,
    props?: any,
    ...children: Child[]
  ): HTMLElementTagNameMap[K];

  function createElement(
  	tagName: string,
  	props?: any,
  	...children: Child[]
  ): HTMLElement;

  function createElement<K extends Element>(
    factory: (props) => K,
    props?: any,
    ...children: Child[]
  ): K;


  // Utility functions
  function stopPropagation(event: Event): Event;
  function preventDefault(event: Event): Event;
}
