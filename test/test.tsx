import { ok as assert } from 'assert';
import { expect } from 'chai';
import * as jsdom from 'jsdom';
import 'mocha';

// Set up jsdom
const document = global['document'] = jsdom.jsdom();
const window = global['window'] = document.defaultView;

const jsx = require('../dist/index.cjs.js');

describe('jsx-dom', function () {

	it('creates a <div> element', function () {
		expect((<div id="hello">world</div>).outerHTML).to.equal(`<div id="hello">world</div>`);
	});

	describe('className', function () {

		it('accepts both `class`, `className` as valid input for classes.', function () {
			expect((<div className="me irl" />).className).to.equal("me irl");
			expect((<div class="me too thanks" />).className).to.equal("me too thanks");
		});

		it('accepts an array as valid input for class', function () {
			expect((<div class={["le", "devoir"]} />).className).to.equal("le devoir");
		});

		it('filters out falsy values, but not 0, from the class array', function () {
			const node: HTMLDivElement = <div class={[
				(Math.PI < 3) && "Hell is freezing over",
				([].length && "should be 0"),
				"rest"
			]} />;

			expect(node.className).to.equal("0 rest");
		});

	});

  it('supports boolean attributes', function () {
		expect((<input disabled={true} />).getAttribute("disabled")).to.equal("");
		expect((<input disabled={false} />).getAttribute("disabled")).to.equal(null);
	});
});
