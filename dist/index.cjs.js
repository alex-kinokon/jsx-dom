'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
};

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

function createFactory(tag) {
    return function create(attr) {
        var children = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            children[_i - 1] = arguments[_i];
        }
        return createElement.apply(void 0, [tag, attr].concat(children));
    };
}
var shortcut = {
    a: createFactory('a'),
    blockquote: createFactory('blockquote'),
    button: createFactory('button'),
    div: createFactory('div'),
    em: createFactory('em'),
    h1: createFactory('h1'),
    h2: createFactory('h2'),
    h3: createFactory('h3'),
    h4: createFactory('h4'),
    h5: createFactory('h5'),
    h6: createFactory('h6'),
    hr: createFactory('hr'),
    img: createFactory('img'),
    input: createFactory('input'),
    li: createFactory('li'),
    link: createFactory('link'),
    ol: createFactory('ol'),
    p: createFactory('p'),
    script: createFactory('script'),
    span: createFactory('span'),
    strong: createFactory('strong'),
    table: createFactory('table'),
    td: createElement('td'),
    th: createElement('th'),
    tr: createFactory('tr'),
    ul: createFactory('ul')
};

function preventDefault(event) {
    event.preventDefault();
    return event;
}
function stopPropagation(event) {
    event.stopPropagation();
    return event;
}
function className(value) {
    if (Array.isArray(value)) {
        return value.filter(Boolean).join(' ');
    } else if (isObject(value)) {
        return Object.keys(value).filter(function (k) {
            return value[k];
        }).join(' ');
    } else {
        return '' + value;
    }
}
function createElement(tag, attr) {
    var children = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        children[_i - 2] = arguments[_i];
    }
    if (isString(tag)) {
        var node = document.createElement(tag);
        attributes(attr || {}, node);
        append(children, node);
        return node;
    } else if (isFunction(tag)) {
        return tag(__assign({}, attr, { children: children }));
    }
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
            node.setAttribute(key, value);
        }
    }
    return node;
}
function listen(node, eventName, callback) {
    node.addEventListener(eventName, callback);
    return node;
}

exports.preventDefault = preventDefault;
exports.stopPropagation = stopPropagation;
exports.createElement = createElement;
exports.DOM = shortcut;
