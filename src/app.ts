import { PhysicsBody } from "./PhysicsObjects/PhysicsBody";
import { bindButtons, forceTable, newForce } from "./ButtonBinder";
import { Config } from "./Config";
import { vect } from "./Math/Util";
import { Vector } from "./Math/Vector";
import { VectorFunction } from "./Math/VectorFunction";
import { Universe } from "./Universe";
import { StaticBody } from "./PhysicsObjects/StaticBody";


let inertialCanvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('inertial-frame');
let nonInertialCanvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('non-inertial-frame');

inertialCanvas.width = Config.canvasWidth;
inertialCanvas.height = Config.canvasHeight;
nonInertialCanvas.width = Config.canvasWidth;
nonInertialCanvas.height = Config.canvasHeight;

let nonInertialContext: CanvasRenderingContext2D = nonInertialCanvas.getContext("2d")!;
let inertialContext: CanvasRenderingContext2D = inertialCanvas.getContext("2d")!;

let b1: PhysicsBody = new StaticBody(vect(100, 150), vect(15, 80), "ball");
let rf: PhysicsBody = new StaticBody(vect(50, 150), vect(10, 120), "reference");
rf.setColor("#FF0000");

let f: VectorFunction = new VectorFunction("0", "-20", "gravity");

b1.addForce(f);
rf.addForce(f);

let u: Universe = new Universe(rf, inertialContext, nonInertialContext);
u.addBody(b1);

u.run();
bindButtons(u);
createForce(u, "Gravity", "0", "-9.81");

// u.run();

function createForce(universe: Universe, name: string, xComponent: string, yComponent: string) {
	newForce(universe);

	// add gravity as a default forcce
	let forceParameters: HTMLCollectionOf<HTMLTableDataCellElement | HTMLTableHeaderCellElement> = forceTable.rows[2].cells;
	let forceNameInput: HTMLInputElement = <HTMLInputElement>forceParameters[0].children[0]; // 0th entry is name, 0th child of entry is the input field
	forceNameInput.value = name; // sets name of first force to gravity
	let forceXComponentInput: HTMLInputElement = <HTMLInputElement>forceParameters[1].children[0];
	forceXComponentInput.value =  xComponent;
	let forceYComponentInput: HTMLInputElement = <HTMLInputElement>forceParameters[2].children[0];
	forceYComponentInput.value = yComponent;
}


