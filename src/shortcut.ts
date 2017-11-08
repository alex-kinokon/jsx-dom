import { createElement } from './index';
import { isElement, isString, keys } from './util';

/**
 * Create factory function.
 */
type TagMap = HTMLElementTagNameMap;

function f<K extends keyof TagMap>(tag: K): (attr, ...children) => TagMap[K];
function f(tag: string): (attr, ...children) => HTMLElement;

function f(tag: keyof TagMap | string) {
  return function create(attr, ...children): Element {
    if (isElement(attr) || isString(attr)) {
      children.unshift(attr);
      attr = {};
    }
    return createElement(tag, attr, children);
  };
}

/** @type {any} */
export const DOM = ((obj: any) => {
  for (const key of keys(obj)) {
    obj[key] = f(key);
  }
  return obj;
})({
  a: 0,
  blockquote: 0,
  button: 0,
  div: 0,
  em: 0,
  form: 0,
  h1: 0,
  h2: 0,
  h3: 0,
  h4: 0,
  h5: 0,
  h6: 0,
  hr: 0,
  img: 0,
  input: 0,
  li: 0,
  link: 0,
  ol: 0,
  p: 0,
  script: 0,
  span: 0,
  strong: 0,
  table: 0,
  td: 0,
  th: 0,
  thead: 0,
  tr: 0,
  ul: 0,
});
