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
	/** advance the universe foward in time by interval dt using instantaneous v and a to compute dx and dv*/
	private step(dt: number): void {
		for (var i = 0; i < this.bodies.length; i++) {
			this.bodies[i].step(dt);
		}
		this.referenceFrame.step(dt);
	}

	private draw(): void {
		this.inertialContext.clearRect(0, 0, Config.canvasWidth, Config.canvasHeight);
		this.nonInertialContext.clearRect(0, 0, Config.canvasWidth, Config.canvasHeight);

		this.referenceFrame.drawInertial(this.inertialContext);
		this.referenceFrame.drawNonInertial(this.nonInertialContext, this.referenceFrame);
		for (var i = 0; i < this.bodies.length; i++) {
			this.bodies[i].drawInertial(this.inertialContext);
			this.bodies[i].drawNonInertial(this.nonInertialContext, this.referenceFrame);
		}
	}

	public run(): void {
		setInterval(() => {
			this.step(1 / Math.pow(2, 5));
			this.draw();
		}, Math.pow(2, 5))
	}
}