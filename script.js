const display = document.getElementById("display");
const buttons = document.querySelector(".buttons");

let currentInput = "";
const operators = ["/","*","+","-"]

//function for invalid operators
function isInvalidOperatorInput(input,current){
    if(current.length === 0 )return;

    const lastChar = current.slice(-1);
    return operators.includes(lastChar) && operators.includes(input);
}

function canAddDot(current){
    let i = current.length -1;

    while(i>=0 && !operators.includes(current[i])){
        if(current[i] === ".") return false;
        i--;
    }
    return true;
}

//function for Handling Input
function handleInput(){
    const value = e.target.dataset.value;
    //clear
    if(value === "AC"){
        currentInput = "";
        display.textContent = "0";
        return;
    }

    //delete
    if(value ==="DE"){
        currentInput = currentInput.slice(0,-1);
        display.textContent = currentInput || 0;
        return;
    }

    if(isInvalidOperatorInput(value,currentInput)){
        return;
    }

    if(value === "."){
       if(!canAddDot(currentInput)) return;
    }

    //ignoring equal for now
    if(value === "="){
        try {
            const result = eval(currentInput);
            currentInput = result.toString();
            display.textContent = currentInput;
        } catch (error) {
            display.textContent = "ERROR"
            currentInput = "";
        }
        return;
    }
    //appending operators and numbers

    if (currentInput === "" && operators.includes(value)) return;

    currentInput += value;
    display.textContent = currentInput;
}
//Event delegation 
buttons.addEventListener("click", function(e){
    if(!e.target.dataset.value) return;
    handleInput(e.target.dataset.value);  
});
window.addEventListener("keydown", function(e){
    const key = e.key;

    //for normal keys(A-Z a-z)
    if(!isNaN){
        handleInput(key);
        return;
    }
    //for operators
    if(operators.includes(key)){
        handleInput(key);
        return;
    }
    //for dot operator
    if(key === "."){
        handleInput(".");
        return;
    }
    //for backspace
    if(key === "BACKSPACE"){
        handleInput("DE");
        return;
    }
    //for clearing
    if(key === "ESCAPE" || key ==="DELETE"){
        handleInput("AC");
        return;
    }
    //for equal
    if(key === "="){
        e.preventDefault();
        handleInput("=");
        return;
    }
});