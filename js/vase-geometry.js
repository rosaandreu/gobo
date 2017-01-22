class VaseGeometry {

	constructor (segments, r1, r2, r3, r4, r5) {

    this.segments = segments;
    this.phiStart = 0;
    this.phiLength = 2 * Math.PI;

    this.vasePoints = new VasePoints();

    this.r1 = r1;
    this.r2 = r2;
    this.r3 = r3;
    this.r4 = r4;
    this.r5 = r5;

    this.geometryOuter = {};
    this.geometryInner = {};

    this.vasePoints.setPoints(this.r1, this.r2, this.r3, this.r4, this.r5);

    // revoluciona la spline del vector de puntos que forman la spline externa
    this.geometryOuter = new THREE.LatheGeometry(this.vasePoints.getPointsOuter(), this.segments, this.phiStart, this.phiLength);
    // revoluciona la spline del vector puntos que forman la spline interna
    this.geometryInner = new THREE.LatheGeometry(this.vasePoints.getPointsInner(), this.segments, this.phiStart, this.phiLength);
    // devuelve la geometría resultante de la fusión entre la lathe externa y la lathe interna
    this.geometryOuter.merge(this.geometryInner);
    return this.geometryOuter;
	}

}