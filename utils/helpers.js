const { hasOwnProperty, toString } = Object.prototype;

export const isNonNullObject = (value) => {
	return typeof value === 'object' && value !== null;
};

export const isNonEmptyString = (value) => {
	return typeof value === 'string' && value.trim().length > 0;
};

export const isPlainObject = (value) => {
	if (!isNonNullObject(value)) {
		return false;
	}

	try {
		const { constructor } = value;
		const { prototype } = constructor;

		return constructor && prototype && hasOwnProperty.call(prototype, 'isPrototypeOf');
	} catch (e) {
		return false;
	}
};

export const isFunction = (value) => {
	return typeof value === 'function';
};

export const isNonEmptyArray = (value) => {
	return Array.isArray(value) && value.length > 0;
};

export const isElement = (value) => {
	return isNonNullObject(value) && value.nodeType === 1 && toString.call(value).indexOf('Element') > -1;
};

export default function isVueComponent(value) {
	return isPlainObject(value) && (
		isNonEmptyString(value.template)
		|| isFunction(value.render)
		|| isNonEmptyString(value.el)
		|| isElement(value.el)
		|| isVueComponent(value.extends)
		|| (isNonEmptyArray(value.mixins) && value.mixins.some(val => isVueComponent(val)))
	);
}