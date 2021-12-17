const toString = Object.prototype.toString

export function is(val, type) {
    return toString.call(val) === `[object ${type}]`
}

export function isObject(val) {
    return val !== null && is(val, 'Object')
}

export function isFunction(val) {
    return typeof val === 'function'
}
