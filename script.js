class Calculator{
    constructor(previousText, currentText){
        this.previousText = previousText;
        this.currentText = currentText;
        this.clear();
    }

    clear(){
        this.currentOperand ='';
        this.previousOperand ='';
        this.operation = undefined;
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1);
    }

    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.'))return ;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation){
        if(this.currentOperand === '')return
        if(this.previousOperand !== ''){
            this.compute()
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute(){
        let computation;
        const prev = parseFloat(this.previousOperand);
        const curr = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(curr))return;
        switch(this.operation){
            case '+':
                computation = prev + curr;
                break;
            case '-':
                computation = prev - curr;
                break;
            case '*':
                computation = prev * curr;
                break;
            case '/':
                computation = prev / curr;
                break;
            default :
                return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
        
    }

    updateDisplay(){
        this.currentText.innerText = this.currentOperand;
        if(this.operation != null){
        this.previousText.innerText = this.previousOperand.toString() + this.operation.toString();
    }
    else{
        this.previousText.innerText = '';
    }
    }
}


const numberButton = document.querySelectorAll('[data-number]');
const operationButton = document.querySelectorAll('[data-operation]');
const equalTo = document.querySelector('[data-equalTo]');
const allClear = document.querySelector('[data-allClear]');
const deleteIt = document.querySelector('[data-delete]');
const previousText = document.querySelector('[data-previous-operand]');
const currentText = document.querySelector('[data-current-operand]');

const calculator1 = new Calculator(previousText, currentText);

numberButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator1.appendNumber(button.innerText)
        calculator1.updateDisplay()
    })

    })

operationButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator1.chooseOperation(button.innerText)
        calculator1.updateDisplay()
    })

    })

equalTo.addEventListener("click", () => {
        calculator1.compute();
        calculator1.updateDisplay();
    })

allClear.addEventListener("click", () => {
        calculator1.clear();
        calculator1.updateDisplay();
    })


deleteIt.addEventListener("click", () => {
        calculator1.delete();
        calculator1.updateDisplay();
    })

