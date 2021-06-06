import { PhysicsBody } from "./PhysicsBody";
import { HTMLVector } from "../Math/HTMLVector";
import { Vector } from "../Math/Vector";

export class HTMLBody extends PhysicsBody {
    riFunc: HTMLVector;
    viFunc: HTMLVector;
    ri: Vector;
    vi: Vector;
    
    constructor(name: HTMLInputElement, riFunc: HTMLVector, viFunc: HTMLVector) {
        super(name);
        this.riFunc = riFunc;
        this.viFunc = viFunc;

        // these dummy initializations have to be here to oinheriet from abstract, but they get immediatley overwritten by the update functions
        this.ri = new Vector(0, 0);
        this.vi = new Vector(0, 0);

        this.updateRi();
        this.updateVi();
    }


    // there is a separate updater method because if we only had a getRi function that evaluated riFunc, then ri would change immediatley when the input field was modified. this is problematic because canvas position drawing are determined relative to ri at the start of the simulation. this way, ri may be updated every time the simulation restarts, but not durring it
    updateRi(): void {
        let newRi: Vector = this.riFunc.at(this, 0);
        this.ri = newRi;
    }
    updateVi(): void {
        let newVi: Vector = this.viFunc.at(this, 0);
        this.vi = newVi;
    }

    getRi(): Vector {
        return this.ri;
    }
    
    getVi(): Vector {
        return this.vi;
    }
}