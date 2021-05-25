import { Body } from "../Body";
import { Vector } from "./Vector";
import { parse } from "mathjs";

/**
 * A vector defined as a function that varies
 */
export class VectorFunction {
	public x: math.MathNode;
	public y: math.MathNode;

	constructor(xEquation: string, yEquation: string) {
		// parses user input function thru mathjs
		this.x = parse(xEquation);
		this.y = parse(yEquation);
	}
}