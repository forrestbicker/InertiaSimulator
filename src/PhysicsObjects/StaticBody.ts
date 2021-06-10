import { Vector } from "../Math/Vector";
import { PhysicsBody } from "./PhysicsBody";

export class StaticBody extends PhysicsBody {
    r: Vector;
    v: Vector;
    ri: Vector;
    vi: Vector;
    constructor(ri: Vector, vi: Vector, name: string) {
        super(name)
        this.ri = new Vector(ri.x, ri.y); // create new object so value cannot be modified externally
        this.vi = new Vector(vi.x, vi.y);

        this.r = new Vector(this.getRi().x, this.getRi().y);
        this.v = new Vector(this.getVi().x, this.getVi().y);

        this.setInitialState();
    }

    public getRi(): Vector {
        return new Vector(this.ri.x, this.ri.y);
    }

    public getVi(): Vector {
        return new Vector(this.vi.x, this.vi.y);
    }
}