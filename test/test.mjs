import { calculator } from "../public/app.js";



describe('testing calculator', function (){
        it( "addition", function(){
          calc = new calculator(null, null);
          calc.appendNumber(2)
          calc.chooseOperation('+')
          calc.appendNumber(3)
          calc.compute()

          expect(calc.currentOperand).to.equal(5);
    
    });
});
