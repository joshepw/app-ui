import conformToMask from 'text-mask-core/src/conformToMask';

const NEXT_CHAR_OPTIONAL = {
	__nextCharOptional__: true,
};

const defaultMaskReplacers = {
	'#': /\d/,
	A: /[a-z]/i,
	N: /[a-z0-9]/i,
	'?': NEXT_CHAR_OPTIONAL,
	X: /./
};

const inBrowser = typeof window !== 'undefined';
const UA = inBrowser && window.navigator.userAgent.toLowerCase();
const isEdge = UA && UA.indexOf('edge/') > 0;
const isAndroid = (UA && UA.indexOf('android') > 0);
const isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

const options = createOptions();

export default {
	bind(el, { value }) {
		if(value === false)
			return;

		el = queryInputElementInside(el);

		updateMask(el, value);
		updateValue(el);
	},

	componentUpdated(el, { value, oldValue }) {
		el = queryInputElementInside(el);

		if(value === false) {
			options.remove(el);
			return;
		}

		const isMaskChanged = value !== oldValue;

		if (isMaskChanged) {
			updateMask(el, value);
		}

		updateValue(el, isMaskChanged);
	},

	unbind(el) {
		el = queryInputElementInside(el);
		options.remove(el);
	},
};

const triggerInputUpdate = (el) => {
	const fn = trigger.bind(null, el, 'input');
	if (isAndroid && isChrome) {
		setTimeout(fn, 0);
	} else {
		fn();
	}
}

const updateValue = (el, force = false) => {
	const { value } = el;
	const { previousValue, mask } = options.get(el);

	const isValueChanged = value !== previousValue;
	const isLengthIncreased = value.length > previousValue.length;
	const isUpdateNeeded = value && isValueChanged && isLengthIncreased;

	if (force || isUpdateNeeded) {
		const { conformedValue } = conformToMask(value, mask, { guide: false });
		el.value = conformedValue;
		triggerInputUpdate(el);
	}

	options.partiallyUpdate(el, { previousValue: value });
}

function updateMask(el, mask) {
	options.partiallyUpdate(el, { mask: stringMaskToRegExpMask(mask) });
}

const trigger = (el, type) => {
	const e = document.createEvent('HTMLEvents');
	e.initEvent(type, true, true);
	el.dispatchEvent(e);
};

const queryInputElementInside = el => (
	el instanceof HTMLInputElement
		? el
		: el.querySelector('input') || el
);

const stringMaskToRegExpMask = (stringMask) => {
	return stringMask
		.split('')
		.map((char, index, array) => {
			const maskChar = defaultMaskReplacers[char] || char;
			const previousChar = array[index - 1];
			const previousMaskChar = defaultMaskReplacers[previousChar] || previousChar;

			if (maskChar === NEXT_CHAR_OPTIONAL) {
				return null;
			}

			if (previousMaskChar === NEXT_CHAR_OPTIONAL) {
				return makeRegexpOptional(castToRegexp(maskChar));
			}

			return maskChar;
		})
		.filter(Boolean);
};

const stringToRegexp = (str) => {
	const lastSlash = str.lastIndexOf('/');
	return new RegExp(
		str.slice(1, lastSlash),
		str.slice(lastSlash + 1),
	);
};

const makeRegexpOptional = charRegexp => (
	stringToRegexp(
		charRegexp.toString()
			.replace(
				/.(\/)[gmiyus]{0,6}$/,
				match => match.replace('/', '?/'),
			),
	)
);

const escapeIfNeeded = char => (
	'[\\^$.|?*+()'.indexOf(char) > -1
		? `\\${char}`
		: char
);

const charRegexp = char => new RegExp(`/[${escapeIfNeeded(char)}]/`);

const isRegexp = entity => entity instanceof RegExp;

const castToRegexp = char => (isRegexp(char) ? char : charRegexp(char));

function createOptions () {
	const elementOptions = new Map();
	const defaultOptions = { previousValue: '', mask: [] };

	function get(el) {
		return elementOptions.get(el) || { ...defaultOptions };
	}

	function partiallyUpdate(el, newOptions) {
		elementOptions.set(el, { ...get(el), ...newOptions });
	}

	function remove(el) {
		elementOptions.delete(el);
	}

	return {
		partiallyUpdate,
		remove,
		get,
	};
}
