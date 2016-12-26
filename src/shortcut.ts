import { createElement } from './index';

function createFactory(tag: keyof HTMLElementTagNameMap | string) {
	return function create(attr?, ...children) {
		return createElement(tag, attr, ...children);
	};
}

export default {
	a: createFactory('a'),
	blockquote: createFactory('blockquote'),
	button: createFactory('button'),
	div: createFactory('div'),
	em: createFactory('em'),
	h1: createFactory('h1'),
	h2: createFactory('h2'),
	h3: createFactory('h3'),
	h4: createFactory('h4'),
	h5: createFactory('h5'),
	h6: createFactory('h6'),
	hr: createFactory('hr'),
	img: createFactory('img'),
	input: createFactory('input'),
	li: createFactory('li'),
	link: createFactory('link'),
	ol: createFactory('ol'),
	p: createFactory('p'),
	script: createFactory('script'),
	span: createFactory('span'),
	strong: createFactory('strong'),
	table: createFactory('table'),
	td: createElement('td'),
	th: createElement('th'),
	tr: createFactory('tr'),
	ul: createFactory('ul'),
};