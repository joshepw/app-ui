const Ripple = {
	zIndex: '9999',
	bind(el, binding) {

		const props = {
			event: 'mousedown',
			transition: 600,
		};

		setProps(Object.keys(binding.modifiers), props);

		el.addEventListener(props.event, (event) => {
			rippler(event, el);
		});

		const bg = binding.value || null;
		const zIndex = Ripple.zIndex;

		const rippler = (event, rippleEl) => {
			const target = rippleEl;

			const targetBorderWidth = getComputedStyle(target).borderWidth || '0px';
			const targetBorder = parseInt((targetBorderWidth).replace('px', ''), 10);

			const rect = target.getBoundingClientRect();
			const left = rect.left;
			const top = rect.top;
			const width = target.offsetWidth;
			const height = target.offsetHeight;
			const dx = event.clientX - left;
			const dy = event.clientY - top;
			const maxX = Math.max(dx, width - dx);
			const maxY = Math.max(dy, height - dy);
			const style = window.getComputedStyle(target);
			const radius = Math.sqrt((maxX * maxX) + (maxY * maxY));
			const border = (targetBorder > 0) ? targetBorder : 0;

			const ripple = document.createElement('div');
			const rippleContainer = document.createElement('div');

			rippleContainer.className = 'ripple-container';
			ripple.className = 'ripple';

			ripple.style.marginTop = '0px';
			ripple.style.marginLeft = '0px';
			ripple.style.width = '1px';
			ripple.style.height = '1px';
			ripple.style.transition = 'all ' + props.transition + 'ms cubic-bezier(0.4, 0, 0.2, 1)';
			ripple.style.borderRadius = '50%';
			ripple.style.pointerEvents = 'none';
			ripple.style.position = 'relative';
			ripple.style.zIndex = zIndex;

			if(bg != null) {
				ripple.style.backgroundColor = bg;
			}

			rippleContainer.style.position = 'absolute';
			rippleContainer.style.left = 0 - border + 'px';
			rippleContainer.style.top = 0 - border + 'px';
			rippleContainer.style.height = '0';
			rippleContainer.style.width = '0';
			rippleContainer.style.pointerEvents = 'none';
			rippleContainer.style.overflow = 'hidden';

			const computedStylePosition = getComputedStyle(target).position;
			const storedTargetPosition = ((target.style.position).length > 0) ? target.style.position : computedStylePosition;

			if (storedTargetPosition !== 'relative') {
				target.style.position = 'relative';
			}

			rippleContainer.appendChild(ripple);
			target.appendChild(rippleContainer);

			ripple.style.marginLeft = dx + 'px';
			ripple.style.marginTop = dy + 'px';

			rippleContainer.style.width = width + 'px';
			rippleContainer.style.height = height + 'px';
			rippleContainer.style.borderTopLeftRadius = style.borderTopLeftRadius;
			rippleContainer.style.borderTopRightRadius = style.borderTopRightRadius;
			rippleContainer.style.borderBottomLeftRadius = style.borderBottomLeftRadius;
			rippleContainer.style.borderBottomRightRadius = style.borderBottomRightRadius;

			rippleContainer.style.direction = 'ltr';

			setTimeout(() => {
				ripple.style.width = radius * 2 + 'px';
				ripple.style.height = radius * 2 + 'px';
				ripple.style.marginLeft = dx - radius + 'px';
				ripple.style.marginTop = dy - radius + 'px';
			}, 0);

			const clearRipple = () => {
				setTimeout(() => {
					ripple.style.backgroundColor = 'rgba(0, 0, 0, 0)';
				}, 250);

				setTimeout(() => {
					if (rippleContainer.parentNode) {
						rippleContainer.parentNode.removeChild(rippleContainer);
					}
				}, 850);

				rippleEl.removeEventListener('mouseup', clearRipple, false);

				setTimeout(() => {

					let clearPosition = true;
					for (const node of target.childNodes) {
						if (node.className === 'ripple-container') {
							clearPosition = false;
						}
					}

					if (clearPosition) {
						if (storedTargetPosition !== 'static') {
							target.style.position = storedTargetPosition;
						} else {
							target.style.position = '';
						}
					}

				}, props.transition + 250);
			};

			if (event.type === 'mousedown') {
				rippleEl.addEventListener('mouseup', clearRipple, false);
			} else {
				clearRipple();
			}
		};
	},
};

const setProps = (modifiers, props) => {
	modifiers.forEach((item) => {
		if (isNaN(Number(item))) {
			props.event = item;
		} else {
			props.transition = item;
		}
	});
};

export default Ripple;
