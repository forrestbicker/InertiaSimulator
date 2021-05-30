import { Body } from "../Body";
import { Vector } from "./Vector";
import { parse } from "mathjs";
import { DynamicVector } from "./DynamicVector";

/**
 * A vector defined as a function that varies
 */
export class VectorFunction implements DynamicVector {
	public x: math.MathNode;
	public y: math.MathNode;

	constructor(xEquation: string, yEquation: string) {
		// parses user input function thru mathjs
		this.x = parse(xEquation);
		this.y = parse(yEquation);
	}

	/** evaluates the function for a given body's position and velocity at a given time
	 */
	at(body: Body, time: number): Vector {
		let mapping: Record<string, number> = { // mapping dict defines variables
			x: body.r.x,
			y: body.r.y,
			vx: body.v.x,
			yx: body.v.y,
			t: time
		}
		return new Vector(this.x.evaluate(mapping), this.y.evaluate(mapping));
	}
}