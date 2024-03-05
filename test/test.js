import calculator from '../src/app';
const chai = import('chai')
const expect = chai.expect;
//const app = import('../src/app.js')


describe('testing calculator', function (){
        it( "addition", function(){
            const calc = new calculator();
            calc.appendNumber(2)
            calc.chooseOperation('+')
            calc.appendNumber(4)
            calc.compute()

        expect(calc.currentOperand).to.equal(4)
    
    });
});
