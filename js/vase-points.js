class VasePoints {
    // definimos los atributos del objeto vasepoints
    constructor() {
    this.pointsOuter = [];
    this.pointsInner = [];
  }

  setPoints(r1, r2, r3, r4, r5) {
      // llena el array pointsOuter para la spline exterior y el de pointsInner para la interior

      // vaciamos los vectores para volver a llenarlos
      var points = [];
      var thickness = 1;
      var interpolate_resolution = 30;

      this.pointsOuter = new Array(interpolate_resolution+1);
      this.pointsInner = new Array(interpolate_resolution+1);

      // INTERPOLATE SPLINE
      var xs = [r1, r2, r3, r4, r5];
      var ys = [-15, -7.5, 0, 7.5, 15]; // la h de los radios es fija

      // representa una spline que pase por esos puntos
      var curve = new THREE.SplineCurve([
          new THREE.Vector2(xs[0], ys[0]),
          new THREE.Vector2(xs[1], ys[1]),
          new THREE.Vector2(xs[2], ys[2]),
          new THREE.Vector2(xs[3], ys[3]),
          new THREE.Vector2(xs[4], ys[4])
      ]);

      // le pedimos que nos dé los puntos para tener la spline con una resolución de 30 y no de 5
      // forEach es una función que aplica a cada punto del vector la función que le pasamos como argumento point (el objeto puntos es un array)
      points = curve.getPoints(interpolate_resolution);

	  var i;
      for( i = 0; i < points.length; i++){
      	this.pointsOuter[i] = new THREE.Vector3(points[i].x, 0, points[i].y);
        this.pointsInner[i] = new THREE.Vector3(points[i].x - thickness, 0, points[i].y);
      }
      // Cerramos las mallas
      // Cerramos la malla por debajo anyadiendo el ultimo punto de outer a inner
      this.pointsInner.push(this.pointsOuter[this.pointsOuter.length-1]);

      // Cerramos la malla por arriba ANYADIENDO (NO sustituyendo) el primer punto de inner al primero de outer
      this.pointsOuter.splice(0, 0, this.pointsInner[0]);
  }

  getPointsOuter () {
    return this.pointsOuter;
  }

  getPointsInner () {
    return this.pointsInner;
  }
}