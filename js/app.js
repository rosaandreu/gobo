// once everything is loaded, we run our Three.js stuff.
function init() {

    //vars
    var stats = new Stats(),
        myStats = new StatsInit(stats, "Stats-output", "absolute", "top", "left", "0px"),
        scene = new THREE.Scene(),
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000),
        lighting,
        latheMesh,
        latheGeometry,
        vaseNum = 0,
        gui = new dat.GUI(),
        cameraControls = new THREE.OrbitControls(camera),
        isWireframe = true,
        webGLRenderer = new THREE.WebGLRenderer();

    //functions
    function redraw() {
        scene.remove(latheMesh);
        latheGeometry = new VaseGeometry(guiControls.segments, guiControls.r1, guiControls.r2, guiControls.r3, guiControls.r4, guiControls.r5);
        latheMesh = new VaseMesh(latheGeometry, guiControls.isWireframe);
        /*latheMesh.rotation.x = guiControls.rotation;
        latheMesh.translateX(-9);*/
        scene.add(latheMesh);
    }

    function exportSTL() {
        var stlGeometry = latheGeometry.clone();
        var myStlString = stlFromGeometry(stlGeometry, {
            setHref: true
        });
    }

    function render() {
        myStats.update();
        requestAnimationFrame(render);
        webGLRenderer.render(scene, camera);
        cameraControls.update();
    }

    //scene
    webGLRenderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));
    webGLRenderer.setSize(window.innerWidth, window.innerHeight);
    webGLRenderer.shadowMapEnabled = true;

    //lighting
    lighting = new THREEx.ThreePointsLighting();
    scene.add(lighting);

    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 100;
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    document.getElementById("WebGL-output").appendChild(webGLRenderer.domElement);

    var guiControls = new GUIControls(25, 10, 25, 30, 20, 15, exportSTL, isWireframe); /*-(Math.PI / 2)*/
    gui.add(guiControls, 'segments', 25, 50).name('Segments').step(1).onChange(redraw);
    gui.add(guiControls, 'r5', 5, 30).name('Radio5 Superior').onChange(redraw);
    gui.add(guiControls, 'r4', 5, 30).name('Radio4').onChange(redraw);
    gui.add(guiControls, 'r3', 5, 30).name('Radio3').onChange(redraw);
    gui.add(guiControls, 'r2', 5, 30).name('Radio2').onChange(redraw);
    gui.add(guiControls, 'r1', 5, 30).name('Radio1 Inferior').onChange(redraw);

    /*gui.add(guiControls, 'rotation', -(Math.PI / 2), Math.PI).name('Rotation').onChange(redraw);*/
    gui.add(guiControls, 'isWireframe').name('Wireframe On').onChange(redraw);


    latheGeometry = new VaseGeometry(25, 10, 25, 30, 20, 15);
    latheMesh = new VaseMesh(latheGeometry, isWireframe);
    /*latheMesh.rotation.x = -(Math.PI / 2);
    latheMesh.translateX(-9);*/
    scene.add(latheMesh);

    //subsequently
    $("a.download").on("click", function () {
        exportSTL();
        vaseNum++;
        $(this).attr('href', document.myHref).attr("download", "vase-" + vaseNum + ".stl");
    })

    //render
    render();

}
window.onload = init;