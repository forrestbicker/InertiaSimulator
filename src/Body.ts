import { Vector } from "./Math/Vector";
export class Body {
	public name: string;
	public r: Vector;
	public ri: Vector;
	public v: Vector;
	public forceArr: VectorFunction[];
	public color: string;

	constructor(name: string, ri: Vector, vi: Vector) {
		this.name = name;
		this.color = "#000000";

		this.ri = new Vector(ri.x, ri.y); // copy object so changing r does not impact stored version of r initial
		this.forceArr = [];

		this.r = ri;
		this.v = vi;
		this.time = 0;
	}

	public addForce(force: VectorFunction): void {
		this.forceArr.push(force);
	}

	public removeForce(force: VectorFunction): void {
		let ix: number = this.forceArr.findIndex((element) => element == force);
		this.forceArr.splice(ix);
	}
	}
}