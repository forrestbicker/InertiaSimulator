import { Body } from "../Body";
import { Vector } from "./Vector";

/** a vector that changes magnitude and direction depending on the body state and time */
export interface DynamicVector {
	at(body: Body, time: number): Vector;
}