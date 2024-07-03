let firstNum = "";
let secondNum = "";
let currentOperator = null;
let isResetScreen = false;

const numberbtn = document.querySelectorAll(".number");
const operatorbtn = document.querySelectorAll(".operator");
const equalsbtn = document.querySelector(".equals");
const clearbtn = document.querySelector(".clear");
const deletebtn = document.querySelector(".delete");
const lastscreen = document.getElementById('lastOperationScreen');
const currentscreen = document.getElementById('currentOperationScreen');

equalsbtn.addEventListener('click', calculate);
clearbtn.addEventListener('click', clear);
deletebtn.addEventListener('click', deleteNumber);

numberbtn.forEach(button => button.addEventListener("click", () => writeNumber(button.textContent)));
operatorbtn.forEach(button => button.addEventListener("click", () => writeOperator(button.textContent)));

function writeNumber(number) {
    if (currentscreen.textContent === "0" || isResetScreen) {
        resetScreen();  
    }
    currentscreen.textContent += number;
}

function resetScreen() {
    currentscreen.textContent = "";
    isResetScreen = false;
}

function clear() {
    currentscreen.textContent = "0";
    lastscreen.textContent = "";
    firstNum = "";
    secondNum = "";
    currentOperator = null;
}

function deleteNumber() {
    currentscreen.textContent = currentscreen.textContent.toString().slice(0, -1);
    if (currentscreen.textContent === "") {
        currentscreen.textContent = "0";
    }
}

function writeOperator(operator) {
    if (currentOperator !== null) {
        calculate();
    }
    firstNum = currentscreen.textContent;
    currentOperator = operator;
    lastscreen.textContent = `${firstNum} ${currentOperator}`;
    isResetScreen = true;
}

function mathResult(number) {
    return Math.round(number * 1000) / 1000;
}

function calculate() {
    if (currentOperator === null || isResetScreen) {
        return;
    }
    if (currentOperator === "/" && currentscreen.textContent === "0") {
        alert("Cannot divide by 0");
        return;
    }
    secondNum = currentscreen.textContent;
    currentscreen.textContent = mathResult(operate(currentOperator, firstNum, secondNum));
    lastscreen.textContent = `${firstNum} ${currentOperator} ${secondNum}`;
    currentOperator = null;
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return null;
    }
    return a / b;
}

function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);
    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
        default:
            return null;
    }
}
