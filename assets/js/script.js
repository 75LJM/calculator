document.addEventListener('DOMContentLoaded', () => {

	const opButtons = document.querySelectorAll('.operationBtn');

	opButtons.forEach((button) => {
		button.addEventListener('click', (event) => {
			addParamToOperation(event.target.value);
		});
	});

	document.getElementById('equalBtn').addEventListener('click', equal);
	document.getElementById('correctBtn').addEventListener('click', correct);

	document.getElementById('saveOperationsBtn').addEventListener('click', saveToLocalStorage);
	document.getElementById('clearOperationsBtn').addEventListener('click', clearLocalStorage);

	getOperationsFromLocalStorage();
});

// --------------------

let operation = '';
let result = '';
let operationsArr = [];

function addParamToOperation(valueToAdd) {
	if (valueToAdd === '/' || valueToAdd === '+' || valueToAdd === '-' || valueToAdd === '*') {
		if (result && result !== '' && operation === '') {
			operation = result;
		}
	}
	operation = operation + valueToAdd;
	document.getElementById('operationDisplay').innerText = operation;
}

function equal() {
	result = eval(operation);

	if (result) {
		document.getElementById('operationDisplay').innerText = result;
	
		operationsArr.push({
			operation: operation,
			result: result
		});
	}

	operation = '';
	displayOperations();
}

function correct() {
	if (operation !== '') {
		operation = operation.substring(0, operation.length - 1);
		document.getElementById('operationDisplay').innerText = operation;
	}
	if (result !== '') {
		result = '';
		document.getElementById('operationDisplay').innerText = result;
	}
}

function displayOperations() {

	const operationsContainer = document.getElementById('operationsContainer');

	let children = '';

	/*operationsArr.forEach((operationObject) => {
		const child = '<div class="py-2"><p class="m-0 text-muted fs-20">' + operationObject.operation + '</p><h3 class="text-light m-0 font-weight-light fs-30">' + operationObject.result + '</h3></div>';
		children = child + children;
	});*/

	for (let i = 0; i < operationsArr.length; i++) {

		const child = '<div class="py-2"><p class="m-0 text-muted fs-20">' + operationsArr[i].operation + '</p><h3 class="text-light m-0 font-weight-light fs-30">' + operationsArr[i].result + '</h3></div>';
		children = child + children;

	}

	operationsContainer.innerHTML = children;

}

function saveToLocalStorage() {
	localStorage.setItem('operations', JSON.stringify(operationsArr));
}

function getOperationsFromLocalStorage() {
	const operationsFromStorage = JSON.parse(localStorage.getItem('operations'));
	operationsArr = operationsFromStorage ? operationsFromStorage : [];
	displayOperations();
}

function clearLocalStorage() {
	localStorage.removeItem('operations');
	operationsArr = [];
	displayOperations();
}