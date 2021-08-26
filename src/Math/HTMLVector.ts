import { PhysicsBody } from "../PhysicsObjects/PhysicsBody";
import { Vector } from "./Vector";
import { parse } from "mathjs";
import { DynamicVector } from "./DynamicVector";

/**
 * A vector defined as a function that varies where the function is given by a html input field
 */
export class HTMLVector implements DynamicVector {
	private nameField: HTMLInputElement | undefined;
	private xField: HTMLInputElement;
	private yField: HTMLInputElement;

	constructor(xField: HTMLInputElement, yField: HTMLInputElement, nameField?: HTMLInputElement | undefined) {
		// stores location of user input field
		this.nameField = nameField;
		this.xField = xField;
		this.yField = yField;
	}

	/** evaluates the function for a given body's position and velocity at a given time
	 */
	public at(body: PhysicsBody, time: number): Vector {
		// parses out the equation in the input field
		let xEquation = parse(this.xField.value);
		let yEquation = parse(this.yField.value);

		let mapping: Record<string, number> = { // mapping dict defines variables
			x: body.r.x,
			y: body.r.y,
			vx: body.v.x,
			yx: body.v.y,
			t: time
		}
		let xVal: number = xEquation.evaluate(mapping);
		let yVal: number = yEquation.evaluate(mapping);

		// failsafe: if unable to evaluate expression then set vector component to 0
		if (xVal === undefined) {
			xVal = 0;
		}
		if (yVal === undefined) {
			yVal = 0;
		}
		return new Vector(xVal, yVal);
	}

	public getName(): string {
		if (this.nameField === undefined) {
			return "";
		} else {
			return this.nameField.value;
		}
	}
}