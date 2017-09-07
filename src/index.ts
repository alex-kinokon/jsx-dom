import { __assign } from 'tslib';

import {
  keys,
  isArrayLike,
  isBoolean,
  isElement,
  isNumber,
  isString,
  isObject,
  isFunction
} from './util';

export { DOM } from './shortcut';

export const SVGNamespace = 'http://www.w3.org/2000/svg';

export function preventDefault(event: Event) {
  event.preventDefault();
  return event;
}
export function stopPropagation(event: Event) {
  event.stopPropagation();
  return event;
}

// https://facebook.github.io/react/docs/jsx-in-depth.html#booleans-null-and-undefined-are-ignored
// Emulate JSX Expression logic to ignore certain type of children or className.
function isVisibleChild(value: any) {
  return !isBoolean(value) && value != null;
}

/**
 * Convert a `value` to a className string.
 * `value` can be a string, an array or a `Dictionary<boolean>`.
 */
function className(value: any): string {
  if (Array.isArray( value )) {
    return value.map( className ).filter( Boolean ).join(' ');
  } else if (isObject( value )) {
    return keys( value ).filter( k => value[k] ).join(' ');
  } else if (isVisibleChild(value)) {
    return '' + value;
  } else {
    return '';
  }
}

export { createElement as h };
export function createElement(tag, attr, ...children) {
  attr = attr || {};
  let node: HTMLElement | SVGElement;
  if (isString( tag )) {
    node = attr.namespaceURI ? document.createElementNS( attr.namespaceURI, tag )
      // : isProbablySVG(tag) ? document.createElementNS( SVGNamespace, tag )
      : document.createElement( tag );
    attributes( attr, node );
    appendChildren( children, node );
  } else if (isFunction( tag )) {
    // Custom elements.
    node = tag({ ...attr, children });
  }
  if (isFunction(attr.ref)) {
    attr.ref(node);
  }
  return node;
}

function appendChild(child, node: Node) {
  if (isArrayLike(child)) {
    appendChildren( child, node );
  } else if (isString(child) || isNumber(child)) {
    node.appendChild( document.createTextNode( child as any ) );
  } else if (child === null) {
    node.appendChild( document.createComment('') );
  } else if (isElement(child)) {
    node.appendChild( child );
  }
}

function appendChildren(children, node: Node) {
  if (isElement(children) || isString(children)) {
    appendChild(children, node);
  } else {
    for (const child of children) {
      appendChild(child, node);
    }
  }
  return node;
}

function attributes(attr, node: HTMLElement | SVGElement) {
  for (const key of keys(attr)) {
    const value = attr[key];

    switch (key) {
      case 'style':
        if (isObject(value)) {
          __assign( node[key], value );
          continue;
        }
        break;
      case 'dataset':
        __assign( node[key], value );
        continue;
      case 'innerHTML':
      case 'innerText':
      case 'textContent':
        node[key] = value;
        continue;
      case 'spellCheck': 
        (node as HTMLInputElement).spellcheck = value;
        continue;
      case 'class':
      case 'className':
        node.setAttribute('class', className( value ));
        continue;
      case 'ref':
      case 'namespaceURI':
        continue;
    }

    if (isFunction(value)) {
      if (key.substr(0, 2) === 'on') {
        const name = key.slice(2).toLowerCase();
        listen( node, name, value );
      }
    } else if (node) {
      if (value === true) {
        node.setAttribute( key, '' );
      } else if ( value !== false && value != null ) {
        node.setAttribute( key, value );
      }
    }
  }
  return node;
}

function listen(node: Node, eventName: string, callback) {
  node.addEventListener(eventName, callback);
  return node;
}
