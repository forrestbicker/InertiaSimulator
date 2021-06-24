import { PhysicsBody } from "./PhysicsBody";
import { HTMLVector } from "../Math/HTMLVector";
import { Vector } from "../Math/Vector";
import { DynamicVector } from "../Math/DynamicVector";

export class HTMLBody extends PhysicsBody {
    nameInput: HTMLInputElement;

    // these dummy initializations have to be here to oinheriet from abstract, but they get immediatley overwritten by the update functions
    r: Vector = new Vector(0, 0);
    v: Vector = new Vector(0, 0);
    ri: Vector = new Vector(0, 0);
    vi: Vector = new Vector(0, 0);
    riFunc: DynamicVector;
    viFunc: DynamicVector;
    
    constructor(nameInput: HTMLInputElement, riFunc: DynamicVector, viFunc: DynamicVector) {
        super(nameInput.value); // the name attribute from super is never used in this object, but that should still be safe because name is declared private on PhysicsBody and the HTMLBody's name is only ever retrived through getName()
        this.nameInput = nameInput;

        this.riFunc = riFunc;
        this.viFunc = viFunc;

        this.updateRi();
        this.updateVi();

        this.r = new Vector(this.getRi().x, this.getRi().y);
        this.v = new Vector(this.getVi().x, this.getVi().y);

        this.setInitialState();
    }


    // there is a separate updater method because if we only had a getRi function that evaluated riFunc, then ri would change immediatley when the input field was modified. this is problematic because canvas position drawing are determined relative to ri at the start of the simulation. this way, ri may be updated every time the simulation restarts, but not durring it
    public updateRi(): void {
        let newRi: Vector = this.riFunc.at(this, 0);
        this.ri = newRi;
    }
    public updateVi(): void {
        let newVi: Vector = this.viFunc.at(this, 0);
        this.vi = newVi;
    }

    public getRi(): Vector {
        return new Vector(this.ri.x, this.ri.y);
    }

    public getVi(): Vector {
        return new Vector(this.vi.x, this.vi.y);
    }

    public getName(): string {
        return this.nameInput.value;
    }
}