import { PhysicsBody } from "./PhysicsObjects/PhysicsBody";
import { Config } from "./Config";
import { HTMLBody } from "./PhysicsObjects/HTMLBody";
import { DynamicVector } from "./Math/DynamicVector";
import { HTMLVector } from "./Math/HTMLVector";
import { Vector } from "./Math/Vector";
import { Universe } from "./Universe";

export let bodyTable: HTMLTableElement = <HTMLTableElement>document.getElementById("body-table")!;

export function newBody(universe: Universe, name?: string | undefined): void {
	let bodyId: number = bodyTable.rows.length; // serves as the zero-based index of the body in the array
	let newRow: HTMLTableRowElement = bodyTable.insertRow();
	let propertyTable: HTMLTableElement = document.createElement("table");
	propertyTable.id = `body-${bodyId}`;

	// main header of body table with name, body settings, and option to hide
	let bodyHeader: HTMLTableSectionElement = propertyTable.createTHead();
	bodyHeader.className = "collapsable";
	let color: string = Config.colorNames[(bodyId) % Config.colorNames.length];
	bodyHeader.style.backgroundColor = Config.colors.get(color)[300];
	// main header - name input
	let nameCell: HTMLTableDataCellElement = document.createElement("td");
	let nameInput: HTMLInputElement = createTextInputField();
	if (name === undefined) {
		nameInput.value = `Unnamed Body ${bodyId}`;
	} else {
		nameInput.value = name;
	}
	nameCell.appendChild(nameInput);
	bodyHeader.appendChild(nameCell);
	// // main header - color selection
	// let colorCell: HTMLTableDataCellElement = document.createElement("td");
	// let colorButton: HTMLButtonElement = document.createElement("button");
	// colorButton.className = "light";
	// colorButton.textContent = "Change Color";
	// colorCell.appendChild(colorButton);
	// bodyHeader.appendChild(colorCell);
	// main header - force adder
	let forceCell: HTMLTableDataCellElement = document.createElement("td");
	let forceButton: HTMLButtonElement = document.createElement("button");
	forceButton.className = "light";
	forceButton.textContent = "Add Force";

	forceButton.onclick = () => {
		addForceToBody(bodyId, propertyTable, universe);
	}

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


	// <tr>
	// 	<th><select class="input force-dropdown" type = "dropdown" >
	// 		<option value="" > </option>
	// 			< /th>
	// 			< /tr>

	// let angularPosRow: HTMLTableRowElement = propertyTable.insertRow();
	// let angularPosLabel: HTMLTableHeaderCellElement = document.createElement("th");
	// angularPosLabel.innerHTML = "θ<sub>i</sub>";

	// let angularVelRow: HTMLTableRowElement = propertyTable.insertRow();
	// let angularVelLabel: HTMLTableHeaderCellElement = document.createElement("th");
	// angularVelLabel.innerHTML = "ω<sub>i</sub>";


	newRow.appendChild(propertyTable);

	let ri: DynamicVector = new HTMLVector(transPosXInputField, transPosYInputField);
	let vi: DynamicVector = new HTMLVector(transVelXInputField, transVelYInputField);
	let body: PhysicsBody = new HTMLBody(nameInput, ri, vi);
	body.setColor(bodyHeader.style.backgroundColor); // sets color to match body header

	universe.addBody(body);
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
	universe.addForce(new HTMLVector(xInput, yInput, nameInput));

	// // add the force to dropdowns
	// let forceDropdowns: HTMLCollectionOf<Element> = document.getElementsByClassName("force-dropdown");
	// for (let i = 0; i < forceDropdowns.length; i++) {
	// 	let forceDropdown: HTMLSelectElement = <HTMLSelectElement>forceDropdowns[i];
	// 	forceDropdown.appendChild(new Option(`Unnamed Force ${forceId}`, String(forceId))) // there are two rows already in the table, so minus 2 gives one-based human-readable index
	// }
}

export function bindButtons(universe: Universe): void {
	let addForceButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById('add-force')!;
	addForceButton.onclick = () => { newForce(universe); };

	let addBodyButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById('add-body')!;
	addBodyButton.onclick = () => { newBody(universe); };

	let startSimButtom: HTMLButtonElement = <HTMLButtonElement>document.getElementById('start-sim')!;
	startSimButtom.onclick = () => { universe.run(); };
}

function createTextInputField(): HTMLInputElement {
	let input: HTMLInputElement = document.createElement("input");
	input.className = "input";
	input.type = "text";
	input.autocomplete = "off";
	return input;
}

export function addForceToBody(bodyId: number, insertionPoint: HTMLTableElement, universe: Universe) {
	let newRow: HTMLTableRowElement = insertionPoint.insertRow();
	let forceSelect: HTMLSelectElement = document.createElement("select");
	reloadForceSelection(forceSelect, universe);
	// forceSelect.onclick = () => { reloadForceSelection(forceSelect, universe); };
	let previouslySelected: number | undefined = undefined;
	forceSelect.onchange = () => {
		if (previouslySelected !== undefined) {
			if (bodyId == 0) {
				universe.removeForceFromReferenceFrame(previouslySelected);
			} else {
				universe.removeForceFromBody(previouslySelected, bodyId - 1);
			}
		}

		previouslySelected = Number(forceSelect.value);

		if (bodyId == 0) {
			universe.addForceToReferenceFrame(previouslySelected)
		} else {
			universe.addForceToBody(previouslySelected, bodyId - 1);
		}

	}
	newRow.appendChild(forceSelect);
}

export function reloadForceSelection(dropdown: HTMLSelectElement, universe: Universe): void {
	// clear dropdown of all options
	dropdown.innerHTML = ""
	dropdown.innerHTML += '<option hidden disabled selected value> -- select a force -- </option>'

	// populate dropdown with forces in universe
	for (var i = 0; i < universe.getForcesLen(); i++) {
		dropdown.appendChild(new Option(universe.getForce(i).getName(), String(i)));
	}
}