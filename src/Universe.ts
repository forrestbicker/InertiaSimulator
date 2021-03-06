import { PhysicsBody } from "./PhysicsObjects/PhysicsBody";
import { Config } from "./Config";
import { DynamicVector } from "./Math/DynamicVector";
import { VectorFunction } from "./Math/VectorFunction";
import { Vector } from "./Math/Vector";

export class Universe {
	private bodies: PhysicsBody[];
	private forces: DynamicVector[];
	private referenceFrame: PhysicsBody;
	private inertialContext: CanvasRenderingContext2D;
	private nonInertialContext: CanvasRenderingContext2D;

	private refreshIntervalId: NodeJS.Timeout | null;

	constructor(referenceFrame: PhysicsBody, inertialContext: CanvasRenderingContext2D, nonInertialContext: CanvasRenderingContext2D) {
		this.bodies = [];
		this.forces = [];
		this.referenceFrame = referenceFrame;
		this.inertialContext = inertialContext;
		this.nonInertialContext = nonInertialContext;

		this.refreshIntervalId = null; // ID to cancel a setInterval
	}

	/** add an object to the universe */
	public addBody(body: PhysicsBody): void {
		this.bodies.push(body);
	}

	/** add a force to the universe */
	public addForce(force: DynamicVector): void {
		this.forces.push(force);
	}

	/** add a force to the universe */
	public applyForce(force: DynamicVector, body: PhysicsBody): void {
		body.addForce(force);
	}

	/** advance the universe foward in time by interval dt using instantaneous v and a to compute dx and dv*/
	private step(dt: number): void {
		for (var i = 0; i < this.bodies.length; i++) {
			this.bodies[i].step(dt);
		}
		this.referenceFrame.step(dt);
	}

	public addForceToBody(forceId: number, bodyId: number): void {
		this.bodies[bodyId].addForce(this.forces[forceId]);
	}

	public removeForceFromBody(forceId: number, bodyId: number): void {
		this.bodies[bodyId].removeForce(this.forces[forceId]);
	}

	public removeForceFromReferenceFrame(forceId: number): void {
		this.referenceFrame.removeForce(this.forces[forceId]);
	}

	public addForceToReferenceFrame(forceId: number): void {
		this.referenceFrame.addForce(this.forces[forceId]);
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

	private updateInitialConditions(): void {
		for (var i = 0; i < this.bodies.length; i++) {
			this.bodies[i].updateRi();
			this.bodies[i].updateVi();
		}
		this.referenceFrame.updateRi();
		this.referenceFrame.updateVi();
	}

	private setInitialState(): void {
		for (var i = 0; i < this.bodies.length; i++) {
			this.bodies[i].setInitialState();
		}
		this.referenceFrame.setInitialState();
	}

	public getForcesLen(): number {
		return this.forces.length;
	}

	public getForce(ix: number): DynamicVector {
		return this.forces[ix];
	}

	public run(): void {
		if (this.refreshIntervalId != null) {
			clearInterval(this.refreshIntervalId); // stop the simulation if one is currently going
		}

		this.updateInitialConditions();
		this.setInitialState();

		this.refreshIntervalId = setInterval(() => {
			this.step(1 / Math.pow(2, 5));
			this.draw();
		}, Math.pow(2, 5));
	}

	public popBody(): PhysicsBody | undefined {
		return this.bodies.pop();
	}

	public setNewFrameOfReference(frameOfReference: PhysicsBody): void {
		this.referenceFrame = frameOfReference;
	}
}