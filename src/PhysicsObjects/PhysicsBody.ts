import { config } from "mathjs";
import { Config } from "../Config";
import { DynamicVector } from "../Math/DynamicVector";
import { vect } from "../Math/Util";
import { Vector } from "../Math/Vector";
import { VectorFunction } from "../Math/VectorFunction";

export abstract class PhysicsBody {
	private name: string;
	private time: number;

	abstract r: Vector;
	abstract v: Vector;
	abstract ri: Vector; // dummy inits
	abstract vi: Vector;

	public forceArr: DynamicVector[];
	public color: string;

	constructor(name: string) {
		this.name = name;
		this.color = "#000000";

		this.forceArr = [];

		this.time = 0;
	}

	abstract getRi(): Vector;
	abstract getVi(): Vector;

	/** reset body to its initial state in terms of pos, vel, and time */
	public setInitialState(): void {
		this.r = new Vector(this.getRi().x, -this.getRi().y);
		this.v = new Vector(this.getVi().x, -this.getVi().y);
		this.time = 0;
	}

	public addForce(force: DynamicVector): void {
		this.forceArr.push(force);
	}

	public getName(): string {
		return this.name;
	}

	public removeForce(force: VectorFunction): void {
		let ix: number = this.forceArr.findIndex((element) => element == force);
		this.forceArr.splice(ix);
	}

	public step(dt: number): void {
		// a number of strange calculations must be added in order to convert the axies from HTML5 canvas's axies to our desired axies. In HTML, the origin is located at the top left corner, right is the positive x direction, and down is the positive y direction. We want the origin located at the bottom left corcner, right to be the positive x direction, and up to be the positive y direction. To accomplish this, we offset all y positions by the height of the canvas, and flip the sign of all y vector by subtracting a*dt and v*dt instead of adding them as intuition would suggest

		// solve dx and dy
		this.r.x += this.v.x * dt;
		this.r.y += this.v.y * dt;

		// sums up forces to find net acceleration and solve for dv
		for (var i = 0; i < this.forceArr.length; i++) {
			let a = this.forceArr[i].at(this, dt); // f = ma where m = 1
			this.v.x -= a.x * dt;
			this.v.y -= a.y * dt;
		}

		this.time += dt;
	}

	private drawBody(context: CanvasRenderingContext2D, x: number, y: number) {
		// TODO: add different shape / custom shape drawings
		context.beginPath();
		context.arc(x, y + Config.canvasHeight, 10, 0, 2 * Math.PI); // offset to bottom left
		context.fill();
		console.log(`${x}, ${y + Config.canvasHeight}`);
	}

	public drawInertial(context: CanvasRenderingContext2D): void {
		context.fillStyle = this.color;
		context.strokeStyle = this.color;

		for (var i = 0; i < this.forceArr.length; i++) {
			let f: Vector = this.forceArr[i].at(this, this.time);
			this.drawForce(f, context);
		}

		this.drawBody(context, this.r.x, this.r.y);
	}

	public drawNonInertial(context: CanvasRenderingContext2D, withRespectTo: PhysicsBody): void {
		context.fillStyle = this.color;
		context.strokeStyle = this.color;

		// if the frame of reference is undergoing the same force, then don't draw it
		// if the frame of reference is undergoing a force that the body is not, draw an reverse fictional force
		// otherwise, draw forces as normal
		for (var i = 0; i < this.forceArr.length; i++) {
			let vectorFunc: DynamicVector = this.forceArr[i];
			if (!withRespectTo.forceArr.includes(vectorFunc)) { // if the force is applied to the body and not the frame
				let f: Vector = vectorFunc.at(this, this.time);
				this.drawForce(f, context);
			}
		}

		for (var i = 0; i < withRespectTo.forceArr.length; i++) {
			let vectorFunc: DynamicVector = withRespectTo.forceArr[i];
			if (!this.forceArr.includes(vectorFunc)) { // if the force is applied to the frame and not the body
				let f: Vector = vectorFunc.at(this, this.time);
				// reverse vector for fictional force
				f.x = -f.x;
				f.y = -f.y;
				this.drawForce(f, context);
			}
		}


		this.drawBody(context, this.r.x - withRespectTo.r.x + this.getRi().x, this.r.y - withRespectTo.r.y + this.getRi().y);
	}

	public drawForce(force: Vector, context: CanvasRenderingContext2D): void {
		let from: Vector = new Vector(this.r.x, this.r.y + Config.canvasHeight);
		let to: Vector = new Vector(this.r.x + force.x, this.r.y + Config.canvasHeight - force.y);
		context.beginPath();
		context.moveTo(from.x, from.y); // line from the body to the tip of the vector, which is just the coordinates of the body to the coordinates of the body plus the x,y coodinates of the vector
		context.lineTo(to.x, to.y);
		context.stroke();

		let headlen = 8;

		// arrowhead
		context.beginPath();
		let theta: number = Math.atan2(-force.y, force.x); // angle of the vector
		context.moveTo(to.x, to.y);
		context.lineTo(to.x - headlen * Math.cos(theta - Math.PI / 6), to.y - headlen * Math.sin(theta - Math.PI / 6));
		context.lineTo(to.x - headlen * Math.cos(theta + Math.PI / 6), to.y - headlen * Math.sin(theta + Math.PI / 6));
		context.lineTo(to.x, to.y);
		context.fill();


		// context.beginPath();
		// context.moveTo(this.r.x, this.r.y + Config.canvasHeight); // line from the body to the tip of the vector, which is just the coordinates of the body to the coordinates of the body plus the x,y coodinates of the vector
		// context.lineTo(this.r.x + force.x, this.r.y + Config.canvasHeight - force.y);
		// context.stroke();
	}

	public setColor(color: string): void {
		this.color = color;
	}

	/** empty method because it is optional. if you want to implement an instance of PhysicsBody where initial conditions can change each time the simulation is rebooted, implement these methods. otherwise, don't and nothinig will happen when they are called */
	public updateRi(): void {
	}
	public updateVi(): void {
	}
}