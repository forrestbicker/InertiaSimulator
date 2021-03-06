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

	public path: Vector[]

	constructor(name: string) {
		this.name = name;
		this.color = "#000000";

		this.forceArr = [];

		this.time = 0;
		
		this.path = []
	}

	abstract getRi(): Vector;
	abstract getVi(): Vector;

	/** reset body to its initial state in terms of pos, vel, and time */
	public setInitialState(): void {
		this.r = new Vector(this.getRi().x, -this.getRi().y);
		this.v = new Vector(this.getVi().x, -this.getVi().y);
		this.time = 0;
		this.path = []
	}

	public addForce(force: DynamicVector): void {
		this.forceArr.push(force);
	}

	public getName(): string {
		return this.name;
	}

	public removeForce(force: DynamicVector): void {
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
			this.v.x += a.x * dt;
			this.v.y -= a.y * dt;
		}

		this.path.push(new Vector(this.r.x, this.r.y)) // log the xy position in every interval
		// so a path can be drawn
		this.time += dt;
	}

	private drawBody(context: CanvasRenderingContext2D, position: Vector) {
		// TODO: add different shape / custom shape drawings
		context.beginPath();
		context.arc(
			position.x + Config.canvasOffset.x,
			position.y + Config.canvasOffset.y,
			10, 0, 2 * Math.PI
		); // offset to center
		context.fill();
		// console.log(`${x}, ${y + Config.canvasHeight}`);
	}

	public drawInertial(context: CanvasRenderingContext2D): void {
		context.fillStyle = this.color;
		context.strokeStyle = this.color;

		for (var i = 0; i < this.forceArr.length; i++) {
			let f: Vector = this.forceArr[i].at(this, this.time);
			this.drawForce(this.r, f, context);
		}

		this.drawBody(context, this.r);
		this.drawInertialPath(context);
	}

	public drawNonInertial(context: CanvasRenderingContext2D, withRespectTo: PhysicsBody): void {
		let frameOffset: Vector = new Vector(
			withRespectTo.getRi().x - withRespectTo.r.x,
			withRespectTo.getRi().y - withRespectTo.r.y
		)
		let position: Vector = new Vector(this.r.x + frameOffset.x, this.r.y + frameOffset.y); // the modified position to account for non-intertal reference frame

		context.fillStyle = this.color;
		context.strokeStyle = this.color;

		// if the frame of reference is undergoing the same force, then don't draw it
		// if the frame of reference is undergoing a force that the body is not, draw an reverse fictional force
		// otherwise, draw forces as normal
		for (var i = 0; i < this.forceArr.length; i++) {
			let vectorFunc: DynamicVector = this.forceArr[i];
			if (!withRespectTo.forceArr.includes(vectorFunc)) { // if the force is applied to the body and not the frame
				let f: Vector = vectorFunc.at(this, this.time);
				this.drawForce(position, f, context);
			}
		}

		for (var i = 0; i < withRespectTo.forceArr.length; i++) {
			let vectorFunc: DynamicVector = withRespectTo.forceArr[i];
			if (!this.forceArr.includes(vectorFunc)) { // if the force is applied to the frame and not the body
				let f: Vector = vectorFunc.at(this, this.time);
				// reverse vector for fictional force
				f.x = -f.x;
				f.y = -f.y;
				context.setLineDash([5, 3]);
				this.drawForce(position, f, context);
				// context.setLineDash([1, 0]);
			}
		}


		this.drawBody(context, position);
		this.drawNonInertialPath(context, withRespectTo);
	}

	/** draw a force vector `force` starting from the point `origin` onto the canvas `context`*/
	private drawForce(origin: Vector, force: Vector, context: CanvasRenderingContext2D): void {
		let scaleFactor: number = Config.fps / 4; // we use fps because dt is determined by fps, and dt ultimatley determines the magnitude of the vector. we must lengthen vector so it is visible, if not scalled up then the entire arrow would be obscured by the circular body. to lengthen the vector we multiply the x and y components of the force by the scale factor

		let from: Vector = new Vector(
			origin.x + Config.canvasOffset.x,
			origin.y + Config.canvasOffset.y
		);
		let to: Vector = new Vector(
			from.x + scaleFactor * force.x,
			from.y - scaleFactor * force.y
		);


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

	private drawInertialPath(context: CanvasRenderingContext2D) {
		context.fillStyle = this.color;
		context.strokeStyle = this.color;
	
		context.beginPath();

		for (var i = 0; i < this.path.length; i++) {
			context.lineTo(
				this.path[i].x + Config.canvasOffset.x,
				this.path[i].y + Config.canvasOffset.y
			);
		}

		context.stroke();
	}

	private drawNonInertialPath(context: CanvasRenderingContext2D, withRespectTo: PhysicsBody) {
		context.fillStyle = this.color;
		context.strokeStyle = this.color;

		context.beginPath();
		for (var i = 0; i < this.path.length; i++) {
			let frameOffset: Vector = new Vector(
				withRespectTo.getRi().x - withRespectTo.path[i].x,
				withRespectTo.getRi().y - withRespectTo.path[i].y
			); // offset to account for frame of reference

			context.lineTo(
				this.path[i].x + frameOffset.x + Config.canvasOffset.x,
				this.path[i].y + frameOffset.y + Config.canvasOffset.y
			);
		}

		context.stroke();
	}
}