import { Vector } from "./Math/Vector";
export class Body {
	public name: string;
	public r: Vector;
	public ri: Vector;
	public v: Vector;
	public color: string;

	constructor(name: string, ri: Vector, vi: Vector) {
		this.name = name;
		this.color = "#000000";

		this.ri = new Vector(ri.x, ri.y); // copy object so changing r does not impact stored version of r initial

		this.r = ri;
		this.v = vi;
	}
}