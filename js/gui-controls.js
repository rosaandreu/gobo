class GUIControls {
	constructor (segments, r1, r2, r3, r4, r5, exportSTL, isWireframe) {/*rotation*/
		this.segments = segments;
		this.r1 = r1;
		this.r2 = r2;
		this.r3 = r3;
		this.r4 = r4;
		this.r5 = r5;
		/*this.rotation = rotation;*/
		this.exportSTL = exportSTL;
		this.isWireframe = isWireframe;

		return this;
	}
}