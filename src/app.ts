import { Body } from "./Body";
import { Config } from "./Config";
import { vect } from "./Math/Util";
import { Vector } from "./Math/Vector";
import { VectorFunction } from "./Math/VectorFunction";
import { Universe } from "./Universe";

let inertialCanvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('inertial-frame');
let nonInertialCanvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('non-inertial-frame');

inertialCanvas.width = Config.canvasWidth;
inertialCanvas.height = Config.canvasHeight;
nonInertialCanvas.width = Config.canvasWidth;
nonInertialCanvas.height = Config.canvasHeight;

let nonInertialContext: CanvasRenderingContext2D = nonInertialCanvas.getContext("2d")!;
let inertialContext: CanvasRenderingContext2D = inertialCanvas.getContext("2d")!;

let b1: Body = new Body("ball", vect(100, 150), vect(30, 100));
let rf: Body = new Body("reference", vect(50, 150), vect(0, 0));
rf.setColor("#FF0000");

let f: VectorFunction = new VectorFunction("0", "-50");

b1.addForce(f);
rf.addForce(f);

let u: Universe = new Universe(rf, inertialContext, nonInertialContext);
u.addBody(b1);

u.run();
