const { JSDOM } = require('jsdom');
import jsx = require('../dist/index.cjs');
import { expect } from 'chai';
import 'mocha';

// Set up jsdom
const dom = new JSDOM('');
(global as any).window = dom.window;
(global as any).document = dom.window.document;

// Monkey patch jsdom to support dataset.
function toPropKey(prop: PropertyKey) {
	return 'data-' + `${prop}`.toLowerCase();
}
Object.defineProperty((window as any).Element.prototype, 'dataset', {
	get() {
		return new Proxy(this, {
			get(target, prop) {
				return target.getAttribute(toPropKey(prop));
			},
			set(target, prop, value) {
				target.setAttribute(toPropKey(prop), value);
				return true;
			}
		});
	}
});

describe('jsx-dom', function () {

	it('creates a <div> element', function () {
		expect((<div id="hello">world</div>).outerHTML).to.equal('<div id="hello">world</div>');
	});

	it('supports functional components', function () {
		function Component(props: { a: 1, b: 2, c: 3 }) {
			expect(props.a).to.equal(1);
			expect(props.b).to.equal(2);
			expect(props.c).to.equal(3);
			expect((props as any).children).to.be.empty;
			return <div>{props.a + props.b + props.c}</div>;
		}

		expect((<Component a={1} b={2} c={3} />).innerHTML).to.equal('6');
	});

	describe('className', function () {

		it('accepts both `class`, `className` as valid input for classes.', function () {
			expect((<div className="me irl" />).className).to.equal('me irl');
			expect((<div class="me too thanks" />).className).to.equal('me too thanks');
		});

		it('accepts an array as valid input for class', function () {
			expect((<div class={["le", "devoir"]} />).className).to.equal('le devoir');
		});

		it('accepts an object literal as a valid input', function () {
			const node = <div class={{
				included: true,
				excluded: false
			}} />;

			expect(node.className).to.equal('included');
		});

		it('filters out falsy values, but not 0, from the class array', function () {
			const node = <div class={[
				(Math.PI < 3) && 'Hell is freezing over',
				([].length && 'should be 0'),
				'rest'
			]} />;

			expect(node.className).to.equal('0 rest');
		});

	});

	describe('attributes', function () {
		it('supports boolean attributes', function () {
			expect((<input disabled={true} />).getAttribute('disabled')).to.equal('');
			expect((<input disabled={false} />).getAttribute('disabled')).to.equal(null);
		});

		it('supports dataset', function () {
			expect((<div data-key="value" />).dataset.key).to.equal('value');
			expect((<div dataset={{ key: 0 }} />).getAttribute('data-key')).to.equal('0');
		});
	});

	it('supports event listeners', function (done) {
		const button = <button onClick={() => done()} /> as HTMLButtonElement;
		button.click();
	});

	it('supports ref store function', function () {
		let button = null;
		const div = <div><button ref={ e => button=e }/></div>;
		expect(button).not.to.equal(null);
		expect(div.children[0]).to.equal(button);
	});
	
	it('supports ref in functional components', function () {
		let button = null;
		const Button = () => <button/>;
		const div = <div><Button ref={ e => button=e }/></div>;
		expect(button).not.to.equal(null);
		expect(div.children[0]).to.equal(button);
	});

	describe('SVG', function () {
		const namespace = jsx.SVGNamespace;

		it('exports the correct SVG namespace URI', function () {
			expect(namespace).to.equal('http://www.w3.org/2000/svg');
		});

		it('supports SVG elements', function () {
			const supportedElements = [
				<svg />, <animate />, <circle />, <clipPath />, <defs />, <desc />, <ellipse />,
				<feBlend />, <feColorMatrix />, <feComponentTransfer />, <feComposite />,
				<feConvolveMatrix />, <feDiffuseLighting />, <feDisplacementMap />, <feDistantLight />,
				<feFlood />, <feFuncA />, <feFuncB />, <feFuncG />, <feFuncR />, <feGaussianBlur />,
				<feImage />, <feMerge />, <feMergeNode />, <feMorphology />, <feOffset />, <fePointLight />,
				<feSpecularLighting />, <feSpotLight />, <feTile />, <feTurbulence />, <filter />,
				<foreignObject />, <g />, <image />, <line />, <linearGradient />, <marker />, <mask />,
				<metadata />, <path />, <pattern />, <polygon />, <polyline />, <radialGradient />,
				<rect />, <stop />, <switch />, <symbol />, <text />, <textPath />, <tspan />, <use />,
				<view />
			];

			supportedElements.forEach(one => expect(one.namespaceURI).to.equal(namespace));
		});

		it('supports SVG namespace', function () {
			expect((<a namespaceURI={namespace} />).namespaceURI).to.equal(namespace);
		});
	});
});
