import { Body } from "./Body";
import { Config } from "./Config";
import { DynamicVector } from "./Math/DynamicVector";
import { VectorFunction } from "./Math/VectorFunction";

export class Universe {
	private bodies: Body[];
	private forces: DynamicVector[];
	private referenceFrame: Body;
	private inertialContext: CanvasRenderingContext2D;
	private nonInertialContext: CanvasRenderingContext2D

	constructor(referenceFrame: Body, inertialContext: CanvasRenderingContext2D, nonInertialContext: CanvasRenderingContext2D) {
		this.bodies = [];
		this.forces = [];
		this.referenceFrame = referenceFrame;
		this.inertialContext = inertialContext;
		this.nonInertialContext = nonInertialContext;

	}
}