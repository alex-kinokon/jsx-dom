import { __assign } from "tslib";
var keys = Object.keys;

function isBoolean(val) {
  return typeof val === "boolean";
}

function isElement(val) {
  return val && typeof val.nodeType === "number";
}

function isString(val) {
  return typeof val === "string";
}

function isNumber(val) {
  return typeof val === "number";
}

function isObject(val) {
  return typeof val === "object" ? val !== null : isFunction(val);
} // tslint:disable-next-line:ban-types

function isFunction(val) {
  return typeof val === "function";
}

function isArrayLike(obj) {
  return (
    isObject(obj) &&
    typeof obj.length === "number" &&
    typeof obj.nodeType !== "number"
  );
}

function createRef() {
  return Object.seal({
    current: null
  });
}

function isRef(maybeRef) {
  return isObject(maybeRef) && "current" in maybeRef;
}

var SVGNamespace = "http://www.w3.org/2000/svg";
var XLinkNamespace = "http://www.w3.org/1999/xlink";
var XMLNamespace = "http://www.w3.org/XML/1998/namespace";

function preventDefault(event) {
  event.preventDefault();
  return event;
}

function stopPropagation(event) {
  event.stopPropagation();
  return event;
} // https://facebook.github.io/react/docs/jsx-in-depth.html#booleans-null-and-undefined-are-ignored
// Emulate JSX Expression logic to ignore certain type of children or className.

function isVisibleChild(value) {
  return !isBoolean(value) && value != null;
}
/**
 * Convert a `value` to a className string.
 * `value` can be a string, an array or a `Dictionary<boolean>`.
 */

function className(value) {
  if (Array.isArray(value)) {
    return value
      .map(className)
      .filter(Boolean)
      .join(" ");
  } else if (isObject(value)) {
    return keys(value)
      .filter(function(k) {
        return value[k];
      })
      .join(" ");
  } else if (isVisibleChild(value)) {
    return "" + value;
  } else {
    return "";
  }
}

var svg = {
  animate: 0,
  circle: 0,
  clipPath: 0,
  defs: 0,
  desc: 0,
  ellipse: 0,
  feBlend: 0,
  feColorMatrix: 0,
  feComponentTransfer: 0,
  feComposite: 0,
  feConvolveMatrix: 0,
  feDiffuseLighting: 0,
  feDisplacementMap: 0,
  feDistantLight: 0,
  feFlood: 0,
  feFuncA: 0,
  feFuncB: 0,
  feFuncG: 0,
  feFuncR: 0,
  feGaussianBlur: 0,
  feImage: 0,
  feMerge: 0,
  feMergeNode: 0,
  feMorphology: 0,
  feOffset: 0,
  fePointLight: 0,
  feSpecularLighting: 0,
  feSpotLight: 0,
  feTile: 0,
  feTurbulence: 0,
  filter: 0,
  foreignObject: 0,
  g: 0,
  image: 0,
  line: 0,
  linearGradient: 0,
  marker: 0,
  mask: 0,
  metadata: 0,
  path: 0,
  pattern: 0,
  polygon: 0,
  polyline: 0,
  radialGradient: 0,
  rect: 0,
  stop: 0,
  svg: 0,
  switch: 0,
  symbol: 0,
  text: 0,
  textPath: 0,
  tspan: 0,
  use: 0,
  view: 0
};

function Fragment(attr) {
  var fragment = document.createDocumentFragment();
  appendChildren(attr.children, fragment);
  return fragment;
}

function createElement(tag, attr) {
  var children = [];

  for (var _i = 2; _i < arguments.length; _i++) {
    children[_i - 2] = arguments[_i];
  }

  attr = attr || {};

  if (!attr.namespaceURI && svg[tag] === 0) {
    attr = __assign({}, attr, {
      namespaceURI: SVGNamespace
    });
  }

  var node;

  if (isString(tag)) {
    node = attr.namespaceURI
      ? document.createElementNS(attr.namespaceURI, tag)
      : document.createElement(tag);
    attributes(attr, node);
    appendChildren(children, node);
  } else if (isFunction(tag)) {
    // Custom elements.
    if (isObject(tag.defaultProps)) {
      attr = __assign({}, tag.defaultProps, attr);
    }

    node = tag(
      __assign({}, attr, {
        children: children
      })
    );
  }

  if (isRef(attr.ref)) {
    attr.ref.current = node;
  } else if (isFunction(attr.ref)) {
    attr.ref(node);
  }

  return node;
}

function appendChild(child, node) {
  if (isArrayLike(child)) {
    appendChildren(child, node);
  } else if (isString(child) || isNumber(child)) {
    node.appendChild(document.createTextNode(child));
  } else if (child === null) {
    node.appendChild(document.createComment(""));
  } else if (isElement(child)) {
    node.appendChild(child);
  }
}

function appendChildren(children, node) {
  for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
    var child = children_1[_i];
    appendChild(child, node);
  }

  return node;
}

function normalizeAttribute(s) {
  return s.replace(/[A-Z\d]/g, function(match) {
    return ":" + match.toLowerCase();
  });
}

function attribute(key, value, node) {
  {
    switch (key) {
      case "xlinkActuate":
      case "xlinkArcrole":
      case "xlinkHref":
      case "xlinkRole":
      case "xlinkShow":
      case "xlinkTitle":
      case "xlinkType":
        node.setAttributeNS(XLinkNamespace, normalizeAttribute(key), value);
        return;

      case "xmlnsXlink":
        node.setAttribute(normalizeAttribute(key), value);
        return;

      case "xmlBase":
      case "xmlLang":
      case "xmlSpace":
        node.setAttributeNS(XMLNamespace, normalizeAttribute(key), value);
        return;
    }
  }

  switch (key) {
    case "htmlFor":
      node.setAttribute("for", value);
      return;

    case "dataset":
      for (var _i = 0, _a = keys(value || {}); _i < _a.length; _i++) {
        var dataKey = _a[_i];
        var dataValue = value[dataKey];

        if (dataValue != null) {
          node.dataset[dataKey] = dataValue;
        }
      }

      return;

    case "innerHTML":
    case "innerText":
    case "textContent":
      node[key] = value;
      return;

    case "spellCheck":
      node.spellcheck = value;
      return;

    case "class":
    case "className":
      node.setAttribute("class", className(value));
      return;

    case "ref":
    case "namespaceURI":
      return;

    case "style":
      if (isObject(value)) {
        __assign(node.style, value);

        return;
      }

    // fallthrough
  }

  if (isFunction(value)) {
    if (key[0] === "o" && key[1] === "n") {
      var name = key.slice(2).toLowerCase();
      listen(node, name, value);
    }
  } else if (value === true) {
    node.setAttribute(key, "");
  } else if (value !== false && value != null) {
    node.setAttribute(key, value);
  }
}

function attributes(attr, node) {
  for (var _i = 0, _a = keys(attr); _i < _a.length; _i++) {
    var key = _a[_i];
    attribute(key, attr[key], node);
  }

  return node;
}

function listen(node, eventName, callback) {
  node.addEventListener(eventName, callback);
  return node;
}

export {
  SVGNamespace,
  preventDefault,
  stopPropagation,
  Fragment,
  createElement as h,
  createElement,
  createRef
};
