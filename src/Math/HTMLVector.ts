import { PhysicsBody } from "../PhysicsObjects/PhysicsBody";
import { Vector } from "./Vector";
import { parse } from "mathjs";
import { DynamicVector } from "./DynamicVector";

/**
 * A vector defined as a function that varies where the function is given by a html input field
 */
export class HTMLVector implements DynamicVector {
	public xField: HTMLInputElement;
	public yField: HTMLInputElement;

	constructor(name: HTMLInputElement, xField: HTMLInputElement, yField: HTMLInputElement) {
		// stores location of user input field
		this.xField = xField;
		this.yField = yField;
	}

	/** evaluates the function for a given body's position and velocity at a given time
	 */
	at(body: PhysicsBody, time: number): Vector {
		// parses out the equation in the input field
		let xEquation = parse(this.xField.value);
		let yEquation = parse(this.xField.value);

		let mapping: Record<string, number> = { // mapping dict defines variables
			x: body.r.x,
			y: body.r.y,
			vx: body.v.x,
			yx: body.v.y,
			t: time
		}
		return new Vector(xEquation.evaluate(mapping), yEquation.evaluate(mapping));
	}
}