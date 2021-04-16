//VARIABLES
const result = document.getElementById("result");
const calculator = document.getElementById("calc-table");
const miniScreen = document.getElementById("mini-screen");

let num1 = "";
let math = "";
let operationStatus = false;
let num2 = "";
//FUNCTIONS

const add = (n1, n2) => n1 + n2;
const subtract = (n1, n2) => n1 - n2;
const multiply = (n1, n2) => n1 * n2;
const divide = (n1, n2) => n1 / n2;
const expo = (n) => Math.pow(n,2);
const sqrt = (n) => Math.sqrt(n);
const module = (n1, n2) => n1 % n2;
//clear the calculator
const clear = () => {
    result.textContent = "0";
    num1 = "";
    math = "";
    miniScreen.textContent = "";
    num2 = "";
}
//clear screen 
const clearScreen = () => {
    result.textContent = "0";
}
//delete a digit
const eraser = () => {
    num1 = result.textContent;
    if(!operationStatus) result.textContent = num1.replace(/[\d\.-]{1}$/g, "");
    if(result.textContent === "") result.textContent = "0";
    if(result.textContent === "0") miniScreen.textContent = "";
    if(operationStatus) miniScreen.textContent = "";
}
//negative or positive number
const integer = () => {
    if(Number(result.textContent) > 0) {
        result.textContent = "-" + result.textContent
    } else if(result.textContent.includes("-")) {
        result.textContent = result.textContent.replace("-", "")
    }
}
//get the numbers
const writeResult = number => {
    result.textContent === "0" || operationStatus === true
    ? result.textContent = number
    : number === '.' && !result.textContent.includes('.')
        ? result.textContent += number
        : number !== '.' && result.textContent.length < 13
            ? result.textContent += number
            : null

    operationStatus = false;
}

//get the operation
let temp = "";
const getOperation = (data, key) => {
    operationStatus = true;
    if(num1 !== "") {
        // temp = num1.slice('')
        // miniScreen.textContent =  temp
        operate()
    }
    
    num1 = result.textContent;
    math = data;
    //temp = num1.slice('')
    //if(num2) miniScreen.textContent =  temp + key + num2 + "="
    //if(!num2) miniScreen.textContent = num1 + key
    miniScreen.textContent = num1 + key
    if(data === "expo") operate();
    if(data === "sqrt") operate();

}
//show the result
const operate = () => {
    let res;
    if(!math || num1 === "") return result.textContent = "ERROR"
    
    num2 = Number(result.textContent);

    if(math === "add") {
        res = add(Number(num1),num2)
    } 
    if(math==="subtract") {
        res = subtract(Number(num1),num2)
    }
    if(math==="multiply") {
        res = multiply(Number(num1),num2)
    }
    if(math==="divide") {
        if(result.textContent === "0") return result.textContent = "ERROR"
        res = divide(Number(num1),num2)
    }

    if(math === "module") {
        res = module(Number(num1),num2)
    }

    if(math === "expo") {
        num2 = ""
        res = expo(Number(result.textContent))
    }

    if(math === "sqrt") {
        num2 = ""
        res = sqrt(Number(result.textContent))
    }

    if(res.toString().includes('.') && res.toString().length > 12) result.textContent = res.toFixed(12);
    if(res.toString().length > 12 && !res.toString().includes('.')) {
        result.textContent = Math.round(res);
        }
        
    result.textContent = res;
    if(result.textContent === "Infinity" || result.textContent === "NaN") {
        miniScreen.textContent = "sorry! result is too big";
        result.textContent = "error";
    }
    num1 = "";
    // num1 !== "" ? miniScreen.textContent += math + num2 + "="
    // : miniScreen.textContent = temp + math + num2 + "="
    miniScreen.textContent += num2 + "=";
    operationStatus = true;
}

//Click events
calculator.addEventListener("click", (e) => {
    let data = e.target.dataset;
    let key = e.target.textContent;
    if(data.number) writeResult(data.number)

    if(data.math) getOperation(data.math, key)

    if(data.op === "erase") eraser();

    if(data.op === "delete") clear();

    if(data.op === "equal") operate();

    if(data.op === "clear") clearScreen()

    if(data.op === "integer") integer();

})

//KEYS event
let operations = [{
    "+": "add",
    "-": "subtract",
    "*": "multiply",
    "/": "divide",
    "^": "expo"
}]

document.addEventListener("keyup", (e) => {
    if(e.key.search(/[0-9]/) !== -1 || e.key === ".") writeResult(e.key)
    operations.forEach(op => {
        if(!op[e.key]) return 
        if(op[e.key]) getOperation(op[e.key], e.key)
        })

    if(e.key === "=" || e.key === "Enter") operate();
    if(e.key === "Backspace") eraser();
    if(e.key === "-") integer();
    if(e.key === "Delete") clear();
})