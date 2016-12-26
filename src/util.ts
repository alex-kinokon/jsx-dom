export function isElement(val) {
	return val && typeof val.nodeType === 'number';
}

export function isString(val) {
	return typeof val === 'string';
}

export function isNumber(val) {
	return typeof val === 'number';
}

export function isObject(val) {
	return val && (typeof val === 'object' || isFunction(val));
}

export function isFunction(val) {
	return typeof val === 'function';
}

export function isArrayLike( obj ) {
	return isObject( obj )
		&& typeof obj.length === 'number'
		&& typeof obj.nodeType !== 'number';
}