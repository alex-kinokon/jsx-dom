import {
	isArrayLike,
	isElement,
	isNumber,
	isString,
	isObject,
	isFunction
} from './util';


function className( value ) {
	if (Array.isArray( value )) {
		return value.filter( Boolean ).join(' ');
	} else if (isObject( value )) {
		return Object.keys( value ).filter( k => value[k] ).join(' ');
	} else {
		return '' + value;
	}
}

export function createElement( tag, attr, ...children ) {
	if (isString( tag )) {
		const node = document.createElement( tag );
		attributes( attr || {}, node );
		append( children, node );
		return node;
	} else if (isFunction( tag )) {
		const props = Object.assign({}, attr, { children });
		return tag( props );
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
	for (let key of Object.keys(attr)) {
		let value = attr[key];

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
				let name = key.slice(2).toLowerCase();
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
