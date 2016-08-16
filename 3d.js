var ThreeD = function(){
    var _this = this;
    this.plot3D = function(obj){
        _this.clear();

        var div = document.getElementById('root');

        _this.renderer = new THREE.WebGLRenderer();
        _this.renderer.setClearColor(0xffffff);
        _this.renderer.setPixelRatio(window.devicePixelRatio);
        _this.renderer.setSize(window.innerWidth, window.innerHeight);
        div.appendChild(_this.renderer.domElement);
        _this.scene = new THREE.Scene();
        _this.camera = new THREE.PerspectiveCamera( 
                45, window.innerWidth / window.innerHeight, 1, 1000 );
        _this.camera.position.set( 0, 0, 300 );
        _this.controls = new THREE.TrackballControls( 
                _this.camera, _this.renderer.domElement);
        _this.controls.minDistance = 0.01;
        _this.controls.maxDistance = 500;
        _this.controls.noZoom = false;
        _this.controls.noPan = false;
        _this.scene.add(new THREE.AmbientLight(0x222222));
        var light = new THREE.PointLight(0xffffff);
        light.position.copy(_this.camera.position);
        _this.scene.add(light);


        var axisHelper = new THREE.AxisHelper(50);
        _this.scene.add(axisHelper);
        var geom;
    /*    var m = 4, n1 = 10, n2 = 10, n3 = 10, a = 2, b = 2;
        var M = 4, N1 = 10, N2 = 10, N3 = 10, A = 2, B = 2;   
    */
        var m = obj.m, n1 = obj.n1, n2 = obj.n2, n3 = obj.n3, a = obj.a, b = obj.b;
        var M = obj.M, N1 = obj.N1, N2 = obj.N2, N3 = obj.N3, A = obj.A, B = obj.B;
        geom = new THREE.Geometry();

        for(var i=0; i<=360; i=i+1){
            for(var j=0; j<=360; j=j+1){
                var theta = i*Math.PI/180;
                var phi = j*Math.PI/180;

                //Superformula by John Gielles
                //Extended to 3D supershape
                //Equations from: http://paulbourke.net/geometry/supershape/

                var term11 = Math.pow(Math.abs((1/a)*Math.cos(theta*m/4)), n2);
                var term12 = Math.pow(Math.abs((1/b)*Math.sin(theta*m/4)), n3);
                var denom1 = Math.pow(term11 + term12, 1/n1);
                var r1 =  1/denom1;
                
                var term21 = Math.pow(Math.abs((1/A)*Math.cos(phi*M/4)), N2);
                var term22 = Math.pow(Math.abs((1/B)*Math.sin(phi*M/4)), N3);
                var denom2 = Math.pow(term21 + term22, 1/N1);
                var r2 =  1/denom2;
                
                var x = 3*r1*Math.cos(theta)*r2*Math.cos(phi);
                var y = 3*r1*Math.sin(theta)*r2*Math.cos(phi);
                var z = 3*r2*Math.sin(phi);
                var v = new THREE.Vector3(x, y, z);
                

                geom.vertices.push(v);
                var face1 = new THREE.Face3((i)*360+j, (i+1)*360+j,  (i)*360+j+1);
                //face1.color.setRGB(0.3, 0.3, 0.3);
                face1.color.setRGB((j)/500, (j)/500, (j)/500);
                var face2 = new THREE.Face3((i+1)*360+j, (i)*360+j, (i+1)*360+j-1);
                //face2.color.setRGB(0.3, 0.3, 0.3);
                face2.color.setRGB((j)/500, (j)/500, (j)/500);
                geom.faces.push(face1);
                geom.faces.push(face2);

    /*          //just plot veritices for reference
                var dotMaterial = new THREE.PointsMaterial({size: 2, sizeAttenuation: false, color: 0xffffff});
                var dotGeometry = new THREE.Geometry();
                dotGeometry.vertices.push(new THREE.Vector3(x, y, z));
                var dot = new THREE.Points(dotGeometry, dotMaterial);
                scene.add(dot);
    */
            }
        }

        var material = new THREE.MeshBasicMaterial({vertexColors: THREE.FaceColors})
        var object = new THREE.Mesh(geom, material);
        _this.scene.add(object);
        _this.renderer.render(_this.scene, _this.camera);


        var animate = function(){
            _this.controls.update();
            _this.renderer.render(_this.scene, _this.camera);
            _this.id = requestAnimationFrame(animate);
        };

        animate();
    };
    this.empty = function(elem) {
            while (elem.lastChild) elem.removeChild(elem.lastChild);
        };

    this.clear = function(){
        if(_this.renderer){
            cancelAnimationFrame(this.id);// Stop the animation
            _this.renderer.domElement.addEventListener('dblclick', null, false); //remove listener to render
            _this.scene = null;
            _this.projector = null;
            _this.camera = null;
            _this.controls = null;
            //empty(modelContainer);    
        }
        
    };

};


/*


*/


