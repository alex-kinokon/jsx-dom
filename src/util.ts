export const keys: <T>(obj: T) => Array<keyof T> = Object.keys as any

export function identity<T>(value: T) {
  return value
}

export function isBoolean(val: any): val is boolean {
  return typeof val === "boolean"
}

export function isElement(val: any): val is Element {
  return val && typeof val.nodeType === "number"
}

export function isString(val: any): val is string {
  return typeof val === "string"
}

export function isNumber(val: any): val is number {
  return typeof val === "number"
}

export function isObject(val: any) {
  return typeof val === "object" ? val !== null : isFunction(val)
}

// tslint:disable-next-line:ban-types
export function isFunction(val: any): val is Function {
  return typeof val === "function"
}

export function isArrayLike(obj: any): obj is ArrayLike<any> {
  return isObject(obj) && typeof obj.length === "number" && typeof obj.nodeType !== "number"
}
