import { __assign } from 'tslib';

import {
  isArrayLike,
  isBoolean,
  isElement,
  isNumber,
  isString,
  isObject,
  isFunction
} from './util';

export { default as DOM } from './shortcut';

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
function isVisibleChild( value: any ) {
  return !isBoolean(value) && value != null;
}

function className( value: any ) {
  if (Array.isArray( value )) {
    return value.filter( isVisibleChild ).join(' ');
  } else if (isObject( value )) {
    return Object.keys( value ).filter( k => value[k] ).join(' ');
  } else {
    return '' + value;
  }
}

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

export function createElement( tag, attr, ...children ) {
  if (isString( tag )) {
    const node = document.createElement( tag );
    attributes( attr || {}, node );
    append( children, node );
    return node;
  } else if (isFunction( tag )) {
    // Custom elements.
    return tag({ ...attr, children });
  }
}

function append( children, node = this ) {
  if (isElement( children ) || isString( children )) {
    children = [ children ];
  }
  for (let child of children) {
    if (isArrayLike( child )) {
      append( child, node );
    } else if (isString( child ) || isNumber( child )) {
      node.appendChild( document.createTextNode( child as any ) );
    } else if (child === null) {
      node.appendChild( document.createComment('') );
    } else if (isElement( child )) {
      node.appendChild( child );
    }
  }
  return node;
}

function attributes( attr, node ) {
  for (let key of Object.keys(attr)) {
    let value = attr[key];

    switch (key) {
      case 'style':
        typeof value === 'object'
        ? __assign( node[key], value )
        : node.style = value;
        continue;
      case 'dataset':
        __assign( node[key], value );
        continue;
      case 'innerHTML':
      case 'innerText':
      case 'textContent':
        node[key] = value;
        continue;
      case 'class':
      case 'className':
        node.setAttribute('class', className( value ));
        continue;
    }

    if (isFunction( value )) {
      if (key.startsWith('on')) {
        let name = key.slice(2).toLowerCase();
        listen( node, name, value );
      } else {
        value = value.call( node, node.getAttribute( key ));
        node.setAttribute( key, value );
      }
    } else if ( node ) {
      if ( value === true ) {
        node.setAttribute( key, '' );
      } else if ( value !== false && value != null ) {
        node.setAttribute( key, value );
      }
    }
  }
  return node;
}


function listen( node, eventName, callback ) {
  node.addEventListener( eventName, callback );
  return node;
}
