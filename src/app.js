
class calculator {
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    } 
    //clears calculator
    clear(){
        this.currentOperand ='';
        this.previousOperand ='';
        this.operation = undefined;
        this.sciFunction = undefined;
    };
    //deletes current && previous operand
    delete(){
        if(this.currentOperand !== ''){
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        }else if (this.previousOperand !=='' && this.operation !== ''){
        this.previousOperand = ''
        this.operation = ''
        }
    }
    //allows for one comma to be appended, then converts the number typed in to a string
    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    //sets an operator to the end of string
    chooseOperation(operation){
        //if current operand is = null then doesnt allow for an operator to be placed
        if(this.currentOperand === '') return
        //when both fields are complete with a string allows the computation function to be ran
        if(this.previousOperand !== ''){
            this.compute();
        };
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }
    //allows for choice of a sci operator 
     chooseSciOperator(sciFunction){
        if(this.currentOperand === ''){
            this.compute();
        }
        if(this.previousOperand !== ''){
            this.sciFuncComputation();
        }
        this.sciFunction = sciFunction;
    }

    
    //computes the current strings by turning current strings back into numbers with parse float
    compute() {
        //defines completed variable
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
        //once completed turns completed variable back to the currennt opperand
        this.currentOperand = computation;
        this.operation = undefined;    
        this.previousOperand = '';

    }

    
    getDisplayNumber(number){
        //turns number to string
        const stringNumber = number.toString();
        //if no decimal is found before number it is saved to integer digit and returned as a number
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        //if decimal point is present saves numbers after to decimal digit
        const decimalDigits = stringNumber.split('.')[1]

        let integerDisplay = '';

         if(integerDigits){ 
            //turns the current display to a localestring in this case En so it seperates the current integer with commas when exceding a certain length 
            //(i.e 100000 V.S. 100,000) for legibility
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        //if decimal digits are present; appends the decimal digits without formation to the now formmated integer digits.
        if (decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`;
        } else{
            return integerDisplay;
        }
    }  
    //this method allows for computation of the scientifc functions
    sciFuncComputation(){
        let sciComp
        //turns the current opperand to a string
        const current = parseFloat(this.currentOperand);
        //uses built-in statements in the switch case
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
    /*
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
    */

    updateDisplay(){
        //allows display of the current opperand text element by calling get display number
        this.currentOperandTextElement.innerText = 
            this.getDisplayNumber(this.currentOperand);
            //if the operation button is clicked and new numbers are added, pushes the current working space to previous working space; and allows for 
            //new numbers to be added. 
        if(this.operation != null){
            this.previousOperandTextElement.innerText = 
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}` 
        } else{
            this.previousOperandTextElement.innerText = '';
        }
        
        
        //for the scientific computation method 
        //keeps scientific function in current working space until equals event listener is executed and returns the result of the operation. 
        if (this.sciFunction != null){
            this.currentOperandTextElement.innerText = 
            //allows appendage of the scientific element
           `${this.sciFunction}(${this.getDisplayNumber(this.currentOperand)})`
        } 
        
    }
};

    const functionButtons = document.querySelectorAll('[data-sciFunc]')
    const numberButtons = document.querySelectorAll('[data-number]');
    const equalsButton = document.querySelector('[data-equals]');
    const deleteButton = document.querySelector('[data-delete]');
    const allClearButton = document.querySelector('[data-all-clear]');
    const operationButton = document.querySelectorAll('[data-operation]');
    const currentOperandTextElement = document.querySelector('[data-current-operand]');
    const previousOperandTextElement = document.querySelector('[data-previous-operand]');
    //query selectors to grab data from DOM
    //const radMode = document.querySelector('[scirdsettingr]');
    //const degMode = document.querySelector('[scirdsettinfd]');
    //const exponentButton = document.querySelectorAll(['data-sciExponent']);
    //const squareButton = document.querySelectorAll(['data-sciRoot']);


const Calculator = new calculator(previousOperandTextElement, currentOperandTextElement);

function init(){
    
    var num = numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            Calculator.appendNumber(button.innerText);
            Calculator.updateDisplay();
        })
    })

    var op = operationButton.forEach(button => {
        button.addEventListener('click', () => {
            Calculator.chooseOperation(button.innerText);
            Calculator.updateDisplay();
        })
    })

    var eq = equalsButton.addEventListener('click', button => {
        if (Calculator.compute() || Calculator.sciFuncComputation()) return;
        Calculator.updateDisplay();
    })

    var ac = allClearButton.addEventListener('click', button => {
        Calculator.clear();
        Calculator.updateDisplay();
    })

    var de = deleteButton.addEventListener('click', button => {
        Calculator.delete();
        Calculator.updateDisplay();
    })

    var fc = functionButtons.forEach(button => {
        button.addEventListener('click', () => {
            Calculator.chooseSciOperator(button.innerText);
            Calculator.updateDisplay();
        })
    })

    /*(exponentButton.forEach(button => {
        button.addEventListener('click', () => {
            Calculator.chooseExpoOperator(button.innerText);
            Calculator.updateDisplay();
        })
    })*/
};

init();
//test exports
//