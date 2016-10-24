'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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

function isArrayLike( obj ) {
	return isObject( obj )
		&& typeof obj.length === 'number'
		&& typeof obj.nodeType !== 'number';
}

function className( value ) {
	if (Array.isArray( value )) {
		return value.filter( Boolean ).join(' ');
	} else if (isObject( value )) {
		return Object.keys( value ).filter( function (k) { return value[k]; } ).join(' ');
	} else {
		return '' + value;
	}
}

function createElement( tag, attr ) {
	var children = [], len = arguments.length - 2;
	while ( len-- > 0 ) children[ len ] = arguments[ len + 2 ];

	if (isString( tag )) {
		var node = document.createElement( tag );
		attributes( attr || {}, node );
		append( children, node );
		return node;
	} else if (isFunction( tag )) {
		var props = Object.assign({}, attr, { children: children });
		return tag( props );
	}
}

function append( children, node ) {
	if ( node === void 0 ) node = this;

	if (isElement( children ) || isString( children )) {
		children = [ children ];
	}
	for (var i = 0, list = children; i < list.length; i += 1) {
		var child = list[i];

		if (isArrayLike( child )) {
			append( child, node );
		} else if (isString( child ) || isNumber( child )) {
			node.appendChild( document.createTextNode( child ) );
		} else if (child === null) {
			node.appendChild( document.createComment('') );
		} else if (isElement( child )) {
			node.appendChild( child );
		}
	}
	return node;
}

function attributes( attr, node ) {
	for (var i = 0, list = Object.keys(attr); i < list.length; i += 1) {
		var key = list[i];

		var value = attr[key];

		switch (key) {
			case 'style':
				typeof value === 'object'
				? Object.assign( node[key], value )
				: node.style = value;
				continue;
			case 'dataset':
				Object.assign( node[key], value );
				continue;
			case 'innerHTML':
			case 'innerText':
			case 'textContent':
				node[key] = value;
				continue;
			case 'class':
			case 'className':
				node.className = className( value );
				continue;
		}

		if (isFunction( value )) {
			if (key.startsWith('on')) {
				var name = key.slice(2).toLowerCase();
				listen( node, name, value );
			} else {
				value = value.call( node, node.getAttribute( key ));
				node.setAttribute( key, value );
			}
		} else if ( node ) {
			node.setAttribute( key, value );
		}
	}
	return node;
}


function listen( node, eventName, callback ) {
	node.addEventListener( eventName, callback );
	return node;
}

exports.createElement = createElement;
