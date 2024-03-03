

class calculator {
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    } 

    clear(){
        this.currentOperand ='';
        this.previousOperand ='';
        this.operation = undefined;
        this.sciFunction = undefined;
    };

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        this.previousOperand = this.previousOperand.toString().slice(0, -1);
    }

    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }


    chooseOperation(operation){
        if(this.currentOperand === '') return
        if(this.previousOperand !== ''){
            this.compute();
        };
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

     chooseSciOperator(sciFunction){
        if(this.currentOperand === ''){
            this.compute();
        }
        if(this.previousOperand !== ''){
            this.sciFuncComputation();
        }
        this.sciFunction = sciFunction;
    }

    

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(current)) return
        switch(this.operation){
            case"+": 
                computation = prev + current;
                break 
            case"×": 
                computation = prev * current;
                break
            case"-": 
                computation = prev - current;
                break
            case"÷": 
                computation = prev / current;
                break
            default:
                return 
        }
        this.currentOperand = computation;
        this.operation = undefined;    
        this.previousOperand = '';

    }

    
    getDisplayNumber(number){
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay = '';
         if(integerDigits){ 
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }

        if (decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`;
        } else{
            return integerDisplay;
           }
    }  

    sciFuncComputation(){
        let sciComp
        const current = parseInt(this.currentOperand);
            switch(this.sciFunction){
                case"tan":
                    sciComp = Math.tan(current);
                    break;

                case"sin":
                    sciComp = Math.sin(current);
                    break;

                case"cos":
                    sciComp = Math.cos(current);
                    break;

                case"tanH":
                    sciComp = Math.tanh(current);
                    break;

                case"sinH":
                    sciComp = Math.sinh(current);
                    break;

                case"cosH":
                    sciComp = Math.cosh(current);
                    break;
                case"Π":
                    sciComp = Math.PI(current);
                    break;
                default:
                    return; 
            }
            this.currentOperand = sciComp;
            this.sciFunction = undefined;
            this.previousOperand = '';

        }




    //exponents
    exponents(exponent){
        this.exponent = this.exponent 
    };


    exponentsComp(){
        let powComp;
        switch(this.exponent){
            case "":
                powComp = Math.pow();
        }    
    } 

    updateDisplay(){
        this.currentOperandTextElement.innerText = 
            this.getDisplayNumber(this.currentOperand);
        if(this.operation != null){
            this.previousOperandTextElement.innerText = 
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}` 
        } else{
            this.previousOperandTextElement.innerText = '';
        }
        
        
        
        if (this.sciFunction != null){
            this.currentOperandTextElement.innerText = 
           `${this.sciFunction}(${this.getDisplayNumber(this.currentOperand)})`
        } 
        
    }
}


//I used data operators for legibility and organization 
const radMode = document.querySelector('[scirdsettingr]')
const degMode = document.querySelector('[scirdsettinfd]')
const functionButtons = document.querySelectorAll('[data-sciFunc]')
const currentOperandTextElement = document.querySelector('[data-current-operand]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const numberButtons = document.querySelectorAll('[data-number]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const operationButton = document.querySelectorAll('[data-operation]');
const exponentButton = document.querySelectorAll(['data-sciExponent']);
const squareButton = document.querySelectorAll(['data-sciRoot']) 

const Calculator = new calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button=> {
    button.addEventListener('click', () => {
       Calculator.appendNumber(button.innerText);
       Calculator.updateDisplay(); 
    })   
})

operationButton.forEach(button=> {
    button.addEventListener('click', () => {
       Calculator.chooseOperation(button.innerText);
       Calculator.updateDisplay(); 
    })   
})

equalsButton.addEventListener('click', button => {
    if(Calculator.compute() || Calculator.sciFuncComputation()) return;
    Calculator.updateDisplay();
}) 

allClearButton.addEventListener('click', button => {
    Calculator.clear();
    Calculator.updateDisplay();
})

deleteButton.addEventListener('click', button => {
    Calculator.delete();
    Calculator.updateDisplay();
})

functionButtons.forEach(button=> {
    button.addEventListener('click', ()=> {
        Calculator.chooseSciOperator(button.innerText);
        Calculator.updateDisplay();
    })
})

exponentButton.forEach(button => {
    button.addEventListener('click', () => {
        Calculator.chooseExpoOperator(button.innerText);
        Calculator.updateDisplay();
    })
})
