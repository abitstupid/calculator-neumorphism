class Calculator {
	constructor(currentInputDiv, previousInputDiv) {
		this.previousInputDiv = previousInputDiv;
		this.currentInputDiv = currentInputDiv;
		this.clear();
	}

	clear() {
		this.currentOperand = "";
		this.operation = "";
		this.previousOperand = "";
	}

	delete() {
		this.currentOperand = this.currentOperand.toString().slice(0, -1);
	}

	appendNum(num) {
		if (num === "." && this.currentOperand.includes(".")) return;
		// if(this.currentOperand.toString().length === 13) {
        //     this.errorLength();
        //     return;
        // } ;
		this.currentOperand = this.currentOperand.toString() + num.toString();
	}

	chooseOperation(operation) {
		if (this.currentOperand === "") return;
		if (this.currentOperand !== "") {
			this.evaluate();
		}

		this.operation = operation;
		this.previousOperand = this.currentOperand;
		this.currentOperand = "";
	}

	evaluate() {
		let computation;
		const prev = parseFloat(this.previousOperand);
		const current = parseFloat(this.currentOperand);

		if (isNaN(prev) || isNaN(current)) return;

		switch (this.operation) {
			case "+":
				computation = prev + current;
				break;

			case "-":
				computation = prev - current;
				break;

			case "x":
				computation = prev * current;
				break;

			case "/":
				computation = prev / current;
				break;

			case "%":
				computation = prev % current;
				break;

			default:
				return;
		}
		this.operation = "";
		this.previousOperand = "";
		this.currentOperand = computation.toString();
	}

	getDisplayNumber(num) {
		let stringNumber = num.toString();
		const integerPart = parseFloat(stringNumber.split(".")[0]);
		const decimalPart = stringNumber.split(".")[1];
		let integerDisplay;
		if (isNaN(integerPart)) {
			integerDisplay = "";
		} else {
			integerDisplay = integerPart.toLocaleString("en", {
				maximumFractionDigits: 0,
			});
		}

		if (decimalPart != null) {
			return `${integerDisplay}.${decimalPart}`;
		} else {
			return integerDisplay;
		}
	}

	updateDisplay() {
		this.currentInputDiv.innerText = this.getDisplayNumber(this.currentOperand);
		if(this.operation != null){
            this.previousInputDiv.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousInputDiv.innerText = "";
        }
    }
    // Show errors

    // errorLength(){
    //     const errorContainer = document.createElement("div");
    //     errorContainer.setAttribute("id", "error-container");
    //     errorContainer.setAttribute("class", "plain component");
    //     document.body.appendChild(errorContainer);
        
    //     const errorText = document.createElement("p");
    //     errorText.setAttribute("id", "error-text");
    //     errorText.textContent = "Calculator displays upto 13 digita max";
    //     errorContainer.appendChild(errorText);

    //     errorContainer.style.display = "block";
    //     errorContainer.style.visibility = "visible";

    //     setTimeout(()=>{
    //         errorContainer.remove()
    //     }, 4000);
    // }
}

const previousInputDiv = document.querySelector("[data-prev-input]");
const currentInputDiv = document.querySelector("[data-current-input]");
// selecting buttons
const numBtns = document.querySelectorAll("[data-num]");
const funBtns = document.querySelectorAll("[data-fun]");
const clearBtn = document.querySelector("[data-clear]");
const deleteBtn = document.querySelector("[data-delete]");
const evaluateBtn = document.querySelector("[data-evaluate]");

const calculator = new Calculator(currentInputDiv, previousInputDiv);

// Get Numbers and append them
numBtns.forEach((btn) => {
	btn.addEventListener("click", () => {
		calculator.appendNum(btn.innerText);
		calculator.updateDisplay();
	});
});

// Get the operation and appending it
funBtns.forEach((btn) => {
	btn.addEventListener("click", () => {
		calculator.chooseOperation(btn.innerText);
		calculator.updateDisplay();
	});
});

// Clear the display
clearBtn.addEventListener("click", () => {
	calculator.clear();
	calculator.updateDisplay();
});

// Delete One digit
deleteBtn.addEventListener("click", () => {
	calculator.delete();
	calculator.updateDisplay();
});

evaluateBtn.addEventListener("click", () => {
	calculator.evaluate();
	calculator.updateDisplay();
});
