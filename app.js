class calculator {
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear()
    } 

    clear(){
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;
        this.sciFunction = undefined;
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }


    // bugged; with this method im trying to allow appendage to the current function which is clicked. 
    appendSciFunc(funct) {
        if (isNaN(parseFloat(this.currentOperand)) && funct !== '') {
            this.currentOperand += funct;
        }
        this.updateDisplay();
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

    // bugged; when a function is clicked i want it to appear in the current text field, once clicked it should allow for the SciFunccomputation method;
    // see sciFuncComputation method for more info
    chooseSciFunc(sciFunction){
        if(this.previousOperand === '') return;
        if (this.currentOperand === ''){
            this.sciFuncComputation();
        };
        this.sciFunction = sciFunction;
        this.previousOperand = this.currentOperand;
        this.currentOperand ='';
    }

//computation method which parses the current and previous opperand and turns out a calculatrion based on if its in string format or not
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
        this.previousOperand = ''

    }

    // this should allow the appending of a number to the current operand. once appended it should push the result to the previousOperandTextElement
    sciFuncComputation(){
        const current = parseFloat(this.currentOperand); //parses the current operand and saves it to a variable so the built in Math function accepts
        //numbers appended to the current science function, although im doubtful this is useful and could just pass in the currentOperand. 
        if(isNaN(current)) return; 

            switch(this.sciFunction){
                case"tan":
                    Math.tan(current)
                    break;

                case"sin":
                    Math.sin(current)
                    break;

                case"cos":
                    Math.cos(current)
                    break;

                case"tanH":
                    Math.tanh(current)
                    break;

                case"sinH":
                    Math.sinh(current)
                    break;

                case"cosH":
                    Math.cosh(current)
                    break;

                default:
                    return; 
            }
            this.currentOperand = '';
            this.sciFunction = undefined;
            this.previousOperand = this.currentOperand;
    }

//this method allows for a single digit point and then numbers to be added at the end of it without allowing for repition of a decimal point
    getDisplayNumber(number){
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay 
        if(isNaN(integerDigits)){
            integerDisplay =''
        } else { 
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }

        if (decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay;
        }
    } 
//display method : bugged; it displays numbers but doesnt push to the previous text element, when an operation is clicked.
//when operation is pressed it clears Both text fields and then reappears when new numbers are pressed; the compute function still works.  

    updateDisplay(){
        this.currentOperandTextElement.innerText = 
            this.getDisplayNumber(this.currentOperand);
        if(this.operation != null){
            this.previousOperandTextElement.innerText = 
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}` 
        } else{
            this.previousOperandTextElement.innerText = '';
        }

        this.currentOperandTextElement.innerText =
            this.currentOperand;
        if (this.sciFunction != null){
            this.currentOperandTextElement.innerText =
                `${this.sciFunction} ${this.getDisplayNumber(this.currentOperand)}`
        } else {
            this.previousOperandTextElement.innerText = '';
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
    Calculator.sciFuncComputation();
    Calculator.compute();
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
        Calculator.chooseSciFunc(button.innerText);
        Calculator.appendSciFunc(); //should this be here? im thinking i should place it in the  number event Listener so it can append to the science function.
        Calculator.updateDisplay();
    })
})

