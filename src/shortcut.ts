import { createElement } from './index';

/**
 * Create factory function.
 */
function f(tag: keyof HTMLElementTagNameMap | string) {
	return function create(attr, ...children): Element {
		return createElement(tag, attr, children);
	};
}

export const DOM = {
	a: f('a'),
	blockquote: f('blockquote'),
	button: f('button'),
	div: f('div'),
	em: f('em'),
	h1: f('h1'),
	h2: f('h2'),
	h3: f('h3'),
	h4: f('h4'),
	h5: f('h5'),
	h6: f('h6'),
	hr: f('hr'),
	img: f('img'),
	input: f('input'),
	li: f('li'),
	link: f('link'),
	ol: f('ol'),
	p: f('p'),
	script: f('script'),
	span: f('span'),
	strong: f('strong'),
	table: f('table'),
	td: f('td'),
	th: f('th'),
	tr: f('tr'),
	ul: f('ul'),
};