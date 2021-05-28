import { number } from "mathjs";
import { Vector } from "./Vector";

export function vect(x: number, y: number): Vector {
	return new Vector(x, -y);
}