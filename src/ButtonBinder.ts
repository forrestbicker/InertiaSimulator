import { HTMLVector } from "./Math/HTMLVector";
import { Universe } from "./Universe";

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
	universe.addForce(new HTMLVector(nameInput, xInput, yInput)); 

	// add the force to dropdowns
	let forceDropdowns: HTMLCollectionOf<Element> = document.getElementsByClassName("force-dropdown");
	for (let i = 0; i < forceDropdowns.length; i++) {
		let forceDropdown: HTMLSelectElement = <HTMLSelectElement>forceDropdowns[i];
		forceDropdown.appendChild(new Option(`Unnamed Force ${forceId}`, String(forceId))) // there are two rows already in the table, so minus 2 gives one-based human-readable index
	}
}

export function bindButtons(universe: Universe): void {
	let addForceButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById('add-force')!;
	addForceButton.onclick = () => { newForce(universe); };
function createTextInputField(): HTMLInputElement {
	let input: HTMLInputElement = document.createElement("input");
	input.className = "input";
	input.type = "text";
	input.autocomplete = "off";
	return input;
}