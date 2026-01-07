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
function handleInput(value){
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

    // numbers
    if (key >= "0" && key <= "9") {
        handleInput(key);
        return;
    }

    // operators
    if (operators.includes(key)) {
        handleInput(key);
        return;
    }

    // dot
    if (key === ".") {
        handleInput(".");
        return;
    }

    // backspace
    if (key === "Backspace") {
        handleInput("DE");
        return;
    }

    // clear
    if (key === "Escape" || key === "Delete") {
        handleInput("AC");
        return;
    }

    // evaluate
    if (key === "Enter" || key === "=") {
        e.preventDefault();
        handleInput("=");
        return;
    }
});
