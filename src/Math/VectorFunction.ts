import { PhysicsBody } from "../PhysicsObjects/PhysicsBody";
import { Vector } from "./Vector";
import { parse } from "mathjs";
import { DynamicVector } from "./DynamicVector";

/**
 * A vector defined as a function that varies
 */
export class VectorFunction implements DynamicVector {
	public name: string;
	public x: math.MathNode;
	public y: math.MathNode;

	constructor(xEquation: string, yEquation: string, name?: string | undefined) {
		if (name === undefined) {
			this.name = "";
		} else {
			this.name = name;
		}		// parses user input function thru mathjs
		this.x = parse(xEquation);
		this.y = parse(yEquation);
	}

	/** evaluates the function for a given body's position and velocity at a given time
	 */
	public at(body: PhysicsBody, time: number): Vector {
		let mapping: Record<string, number> = { // mapping dict defines variables
			x: body.r.x,
			y: body.r.y,
			vx: body.v.x,
			yx: -body.v.y,
			t: time
		}
		return new Vector(this.x.evaluate(mapping), this.y.evaluate(mapping));
	}

	public getName(): string {
		return this.name;
	}
}