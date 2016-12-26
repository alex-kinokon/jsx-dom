declare module "jsx-dom" {
  type Child = Node | string | number;

  export function createElement<K extends keyof HTMLElementTagNameMap>(
    tagName: K,
    props?: any,
    ...children: Child[]
  ): HTMLElementTagNameMap[K];

  export function createElement(
    tagName: string,
    props?: any,
    ...children: Child[]
  ): HTMLElement;

  export function createElement<K extends Element>(
    factory: (props) => K,
    props?: any,
    ...children: Child[]
  ): K;

  type ElementFactory<T> = (props?: any, ...children: Child[]) => T;

  namespace DOM {
    export const a: ElementFactory<HTMLAnchorElement>;
    export const blockquote: ElementFactory<HTMLQuoteElement>;
    export const button: ElementFactory<HTMLButtonElement>;
    export const div: ElementFactory<HTMLDivElement>;
    export const em: ElementFactory<HTMLElement>;
    export const h1: ElementFactory<HTMLHeadingElement>;
    export const h2: ElementFactory<HTMLHeadingElement>;
    export const h3: ElementFactory<HTMLHeadingElement>;
    export const h4: ElementFactory<HTMLHeadingElement>;
    export const h5: ElementFactory<HTMLHeadingElement>;
    export const h6: ElementFactory<HTMLHeadingElement>;
    export const hr: ElementFactory<HTMLHRElement>;
    export const img: ElementFactory<HTMLImageElement>;
    export const input: ElementFactory<HTMLInputElement>;
    export const li: ElementFactory<HTMLLIElement>;
    export const link: ElementFactory<HTMLLinkElement>;
    export const ol: ElementFactory<HTMLOListElement>;
    export const p: ElementFactory<HTMLParagraphElement>;
    export const script: ElementFactory<HTMLScriptElement>;
    export const span: ElementFactory<HTMLSpanElement>;
    export const strong: ElementFactory<HTMLElement>;
    export const table: ElementFactory<HTMLTableElement>;
    export const td: ElementFactory<HTMLTableDataCellElement>;
    export const th: ElementFactory<HTMLTableHeaderCellElement>;
    export const tr: ElementFactory<HTMLTableRowElement>;
    export const ul: ElementFactory<HTMLUListElement>;
  }

  // Utility functions
  export function stopPropagation(event: Event): Event;
  export function preventDefault(event: Event): Event;
}
