export const keys: <T>(obj: T) => Array<keyof T> = Object.keys;

export function isBoolean(val): val is boolean {
	return typeof val === 'boolean';
}

export function isElement(val): val is Element {
	return val && typeof val.nodeType === 'number';
}

export function isString(val): val is string {
	return typeof val === 'string';
}

export function isNumber(val): val is number {
	return typeof val === 'number';
}

export function isObject(val) {
	return val && (typeof val === 'object' || isFunction(val));
}

export function isFunction(val): val is Function {
	return typeof val === 'function';
}

export function isArrayLike( obj ) {
	return isObject( obj )
		&& typeof obj.length === 'number'
		&& typeof obj.nodeType !== 'number';
}