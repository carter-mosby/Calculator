const chai = require('chai');
import * as calc from './app.js';
//import * as int from './app.js';
const expect = chai.expect;

describe('testing calculator', function(){
    it('exponent', function(){
        const Calculator = new calc.calculator(null, null);
        if (Calculator )
        expect(Calculator.currentOperand).to.equal(5);
        
    })
});