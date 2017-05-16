'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
};

function isBoolean(val) {
    return typeof val === 'boolean';
}
function isElement(val) {
    return val && typeof val.nodeType === 'number';
}
function isString(val) {
    return typeof val === 'string';
}
function isNumber(val) {
    return typeof val === 'number';
}
function isObject(val) {
    return val && (typeof val === 'object' || isFunction(val));
}
function isFunction(val) {
    return typeof val === 'function';
}
function isArrayLike(obj) {
    return isObject(obj) && typeof obj.length === 'number' && typeof obj.nodeType !== 'number';
}

function f(tag) {
    return function create(attr) {
        var children = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            children[_i - 1] = arguments[_i];
        }
        return createElement(tag, attr, children);
    };
}
var DOM$$1 = {
    a: f('a'),
    blockquote: f('blockquote'),
    button: f('button'),
    div: f('div'),
    em: f('em'),
    h1: f('h1'),
    h2: f('h2'),
    h3: f('h3'),
    h4: f('h4'),
    h5: f('h5'),
    h6: f('h6'),
    hr: f('hr'),
    img: f('img'),
    input: f('input'),
    li: f('li'),
    link: f('link'),
    ol: f('ol'),
    p: f('p'),
    script: f('script'),
    span: f('span'),
    strong: f('strong'),
    table: f('table'),
    td: f('td'),
    th: f('th'),
    tr: f('tr'),
    ul: f('ul')
};

var SVGNamespace = 'http://www.w3.org/2000/svg';
function preventDefault(event) {
    event.preventDefault();
    return event;
}
function stopPropagation(event) {
    event.stopPropagation();
    return event;
}

function isVisibleChild(value) {
    return !isBoolean(value) && value != null;
}

function className(value) {
    if (Array.isArray(value)) {
        return value.filter(isVisibleChild).join(' ');
    } else if (isObject(value)) {
        return Object.keys(value).filter(function (k) {
            return value[k];
        }).join(' ');
    } else {
        return '' + value;
    }
}
var svg = __assign(Object.create(null), {
    svg: 0,
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
    switch: 0,
    symbol: 0,
    text: 0,
    textPath: 0,
    tspan: 0,
    use: 0,
    view: 0
});
function createElement(tag, attr) {
    var children = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        children[_i - 2] = arguments[_i];
    }
    attr = attr || {};
    var node;
    if (isString(tag)) {
        node = 'namespaceURI' in attr ? document.createElementNS(attr.namespaceURI, tag) : tag in svg ? document.createElementNS(SVGNamespace, tag) : document.createElement(tag);
        attributes(attr, node);
        append(children, node);
    } else if (isFunction(tag)) {
        node = tag(__assign({}, attr, { children: children }));
    }
    if ('ref' in attr && isFunction(attr.ref)) {
        attr.ref(node);
    }
    return node;
}
function append(children, node) {
    if (node === void 0) {
        node = this;
    }
    if (isElement(children) || isString(children)) {
        children = [children];
    }
    for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
        var child = children_1[_i];
        if (isArrayLike(child)) {
            append(child, node);
        } else if (isString(child) || isNumber(child)) {
            node.appendChild(document.createTextNode(child));
        } else if (child === null) {
            node.appendChild(document.createComment(''));
        } else if (isElement(child)) {
            node.appendChild(child);
        }
    }
    return node;
}
function attributes(attr, node) {
    for (var _i = 0, _a = Object.keys(attr); _i < _a.length; _i++) {
        var key = _a[_i];
        var value = attr[key];
        switch (key) {
            case 'style':
                typeof value === 'object' ? __assign(node[key], value) : node.style = value;
                continue;
            case 'dataset':
                __assign(node[key], value);
                continue;
            case 'innerHTML':
            case 'innerText':
            case 'textContent':
                node[key] = value;
                continue;
            case 'class':
            case 'className':
                node.setAttribute('class', className(value));
                continue;
            case 'ref':
            case 'namespaceURI':
                continue;
        }
        if (isFunction(value)) {
            if (key.startsWith('on')) {
                var name = key.slice(2).toLowerCase();
                listen(node, name, value);
            } else {
                value = value.call(node, node.getAttribute(key));
                node.setAttribute(key, value);
            }
        } else if (node) {
            if (value === true) {
                node.setAttribute(key, '');
            } else if (value !== false && value != null) {
                node.setAttribute(key, value);
            }
        }
    }
    return node;
}
function listen(node, eventName, callback) {
    node.addEventListener(eventName, callback);
    return node;
}

exports.SVGNamespace = SVGNamespace;
exports.preventDefault = preventDefault;
exports.stopPropagation = stopPropagation;
exports.createElement = createElement;
exports.DOM = DOM$$1;
