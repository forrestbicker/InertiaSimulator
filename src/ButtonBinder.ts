import { PhysicsBody } from "./PhysicsObjects/PhysicsBody";
import { Config } from "./Config";
import { HTMLBody } from "./PhysicsObjects/HTMLBody";
import { HTMLVector } from "./Math/HTMLVector";
import { Universe } from "./Universe";

export let bodyTable: HTMLTableElement = <HTMLTableElement>document.getElementById("body-table")!;
export function newBody(universe: Universe): void {
	let newRow: HTMLTableRowElement = bodyTable.insertRow();
	let propertyTable: HTMLTableElement = document.createElement("table");
	propertyTable.id = `body-${bodyTable.rows.length}`;

	// main header of body table with name, body settings, and option to hide
	let bodyHeader: HTMLTableSectionElement = propertyTable.createTHead();
	bodyHeader.className = "collapsable";
	let color: string = Config.colorNames[(bodyTable.rows.length - 1) % Config.colorNames.length];
	bodyHeader.style.backgroundColor = Config.colors.get(color)[300];
	// main header - name input
	let nameCell: HTMLTableDataCellElement = document.createElement("td");
	let nameInput: HTMLInputElement = createTextInputField();
	nameInput.value = `Unnamed Body ${bodyTable.rows.length}`;
	nameCell.appendChild(nameInput);
	bodyHeader.appendChild(nameCell);
	// main header - color selection
	let colorCell: HTMLTableDataCellElement = document.createElement("td");
	let colorButton: HTMLButtonElement = document.createElement("button");
	colorButton.className = "light";
	colorButton.textContent = "Change Color";
	colorCell.appendChild(colorButton);
	bodyHeader.appendChild(colorCell);
	// main header - force adder
	let forceCell: HTMLTableDataCellElement = document.createElement("td");
	let forceButton: HTMLButtonElement = document.createElement("button");
	forceButton.className = "light";
	forceButton.textContent = "Add Force";
	forceCell.appendChild(forceButton);
	bodyHeader.append(forceCell);
	// main header - force selector
	let shapeCell: HTMLTableDataCellElement = document.createElement("td");
	let shapeButton: HTMLButtonElement = document.createElement("button");
	shapeButton.className = "light";
	shapeButton.textContent = "Change Shape";
	shapeCell.appendChild(shapeButton);
	bodyHeader.append(shapeCell);
	// main header - show/hide button
	let dropdownCell: HTMLTableDataCellElement = document.createElement("td");
	let dropdownButton: HTMLButtonElement = document.createElement("button");
	dropdownButton.className = "light";
	dropdownButton.textContent = "\\/";
	dropdownCell.appendChild(dropdownButton);
	bodyHeader.append(dropdownCell);

	// initial conditions table taking input for the starting values for position and velocity
	let initialConditionsHeader: HTMLTableRowElement = propertyTable.insertRow();
	// add column lables
	initialConditionsHeader.appendChild(document.createElement("th"));
	let xHead: HTMLTableHeaderCellElement = document.createElement("th");
	xHead.innerText = "x";
	let yHead: HTMLTableHeaderCellElement = document.createElement("th");
	yHead.innerText = "y";
	initialConditionsHeader.appendChild(xHead);
	initialConditionsHeader.appendChild(yHead);

	// naming abbreviatinos
	// trans -> translational
	// pos -> position
	// vel -> velocity

	// create translational position input elements
	let transPosRow: HTMLTableRowElement = propertyTable.insertRow();
	let transPosLabel: HTMLTableHeaderCellElement = document.createElement("th");
	transPosLabel.innerHTML = "r<sub>i</sub>";
	transPosRow.appendChild(transPosLabel);

	let transPosXInputCell: HTMLTableHeaderCellElement = document.createElement("td");
	let transPosXInputField: HTMLInputElement = createTextInputField();
	transPosXInputField.placeholder = "equation";
	transPosXInputCell.appendChild(transPosXInputField);
	transPosRow.appendChild(transPosXInputCell);

	let transPosYInputCell: HTMLTableHeaderCellElement = document.createElement("td");
	let transPosYInputField: HTMLInputElement = createTextInputField();
	transPosYInputField.placeholder = "equation";
	transPosYInputCell.appendChild(transPosYInputField);
	transPosRow.appendChild(transPosYInputCell);

	// create translational velocity input elements
	let transVelRow: HTMLTableRowElement = propertyTable.insertRow();
	let transVelLabel: HTMLTableHeaderCellElement = document.createElement("th");
	transVelLabel.innerHTML = "v<sub>i</sub>";
	transVelRow.appendChild(transVelLabel);

	let transVelXInputCell: HTMLTableHeaderCellElement = document.createElement("td");
	let transVelXInputField: HTMLInputElement = createTextInputField();
	transVelXInputField.placeholder = "equation";
	transVelXInputCell.appendChild(transVelXInputField);
	transVelRow.appendChild(transVelXInputCell);

	let transVelYInputCell: HTMLTableHeaderCellElement = document.createElement("td");
	let transVelYInputField: HTMLInputElement = createTextInputField();
	transVelYInputField.placeholder = "equation";
	transVelYInputCell.appendChild(transVelYInputField);
	transVelRow.appendChild(transVelYInputCell);



	newRow.appendChild(propertyTable);

}
export let forceTable: HTMLTableElement = <HTMLTableElement>document.getElementById("force-table")!;
export function newForce(universe: Universe): void {
	let newRow: HTMLTableRowElement = forceTable.insertRow();
	let forceId: number = forceTable.rows.length - 2;

	// add input options to force table
	// add name input
	let nameCell: HTMLTableDataCellElement = document.createElement("td");
	let nameInput: HTMLInputElement = document.createElement("input");
	nameInput.className = "input";
	nameInput.type = "text";
	nameInput.autocomplete = "off";
	nameInput.value = `Unnamed Force ${forceId}`;
	nameCell.appendChild(nameInput);
	newRow.appendChild(nameCell);

	// add x component input
	let xCell: HTMLTableDataCellElement = document.createElement("td");
	let xInput: HTMLInputElement = document.createElement("input");
	xInput.className = "input";
	xInput.type = "text";
	xInput.autocomplete = "off";
	xInput.placeholder = `Insert Equation`;
	xCell.appendChild(xInput);
	newRow.appendChild(xCell);

	// add y component input
	let yCell: HTMLTableDataCellElement = document.createElement("td");
	let yInput: HTMLInputElement = document.createElement("input");
	yInput.className = "input";
	yInput.type = "text";
	yInput.autocomplete = "off";
	yInput.placeholder = `Insert Equation`;
	yCell.appendChild(yInput);
	newRow.appendChild(yCell);

	// add the force to universe

	// add the force to dropdowns
	let forceDropdowns: HTMLCollectionOf<Element> = document.getElementsByClassName("force-dropdown");
	for (let i = 0; i < forceDropdowns.length; i++) {
		let forceDropdown: HTMLSelectElement = <HTMLSelectElement>forceDropdowns[i];
		forceDropdown.appendChild(new Option(`Unnamed Force ${forceId}`, String(forceId))) // there are two rows already in the table, so minus 2 gives one-based human-readable index
	}
	universe.addForce(new HTMLVector(xInput, yInput, nameInput));
}

export function bindButtons(universe: Universe): void {
	let addForceButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById('add-force')!;
	addForceButton.onclick = () => { newForce(universe); };

	let addBodyButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById('add-body')!;
	addBodyButton.onclick = () => { newBody(universe); };
}

function createTextInputField(): HTMLInputElement {
	let input: HTMLInputElement = document.createElement("input");
	input.className = "input";
	input.type = "text";
	input.autocomplete = "off";
	return input;
}