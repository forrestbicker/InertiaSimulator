import { PhysicsBody } from "../PhysicsObjects/PhysicsBody";
import { Vector } from "./Vector";

/** a vector that changes magnitude and direction depending on the body state and time */
export interface DynamicVector {
	at(body: PhysicsBody, time: number): Vector;
}