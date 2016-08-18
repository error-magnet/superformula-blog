//Function to create 3D superformula plot

var ThreeD = function(){
    var _this = this;
    this.plot3D = function(state){

        //if there is an existing scene, just update the plot
        if(_this.scene){
            _this.updateGeom(state); 
        }
        else{
            //setup a THREE JS scene
            var div = document.getElementById('root');
            _this.renderer = new THREE.WebGLRenderer({ antialias: true });
            _this.renderer.setClearColor(0xffffff);
            _this.renderer.setPixelRatio(window.devicePixelRatio);
            _this.renderer.setSize(window.innerWidth, window.innerHeight);
            div.appendChild(_this.renderer.domElement);
            _this.scene = new THREE.Scene();

            //setup camera
            _this.camera = new THREE.PerspectiveCamera( 
                    45, window.innerWidth / window.innerHeight, 1, 1000 );
            _this.camera.position.set(0, 0, 300);
            _this.controls = new THREE.TrackballControls( 
                    _this.camera, _this.renderer.domElement);
            _this.controls.minDistance = 0.01;
            _this.controls.maxDistance = 500;
            _this.controls.noZoom = false;
            _this.controls.noPan = false;

            /*
            var axisHelper = new THREE.AxisHelper(50);
            _this.scene.add(axisHelper);
            */

            //create line with superformula geometry
            _this.updateGeom(state);

     
            //add it to the scene
            _this.scene.add(_this.line);

            //animate the scene, mainly for zooming, panning etc
            //if the parameters are changed for 3D, vertices are updated
            var animate = function(){
                _this.line.geometry.verticesNeedUpdate = true;
                _this.controls.update();
                _this.renderer.render(_this.scene, _this.camera);
                _this.id = requestAnimationFrame(animate);
            };

            animate();
        }
    };

    //clear the scene when not in use, else it will harm the performance
    this.clear = function(){
        if(_this.renderer){
            //stop the animation
            cancelAnimationFrame(this.id);
            //remove listener to render
            _this.renderer.domElement.addEventListener('dblclick', null, false);
            _this.scene = null;
            _this.projector = null;
            _this.camera = null;
            _this.controls = null;

            //remove the canvas entirely
            try{
                document.querySelector('canvas').remove();    
            }
            catch(e){};
        }
        
    };

    //function to calculate the coordinates from the superformula
    //and create the geometry
    this.updateGeom = function(state){
        var data = [], xMin = Infinity, xMax = -Infinity, 
            yMin = Infinity, yMax = -Infinity,
            zMin = Infinity, zMax = -Infinity;
    
        var m1 = state.m1, m2 = state.m2, n1 = state.n1, n2 = state.n2, 
            n3 = state.n3, a = state.a, b = state.b;
        var M1 = state.M2, M2 = state.M2, N1 = state.N1, N2 = state.N2, 
            N3 = state.N3, A = state.A, B = state.B;

        //Superformula by John Gielles
        //Extended to 3D supershape
        //Equations from: http://paulbourke.net/geometry/supershape/
        for(var i=-180; i<=180; i=i+5){
            for(var j=-90; j<=90; j=j+5){

                //to radians
                var theta = i*Math.PI/180;
                var phi = j*Math.PI/180;

                var term11 = Math.pow(Math.abs((1/a)*Math.cos(theta*m1/4)), n2);
                var term12 = Math.pow(Math.abs((1/b)*Math.sin(theta*m2/4)), n3);
                var denom1 = Math.pow(term11 + term12, -1/n1);
                var r1 =  1/denom1;
                

                var term21 = Math.pow(Math.abs((1/A)*Math.cos(phi*M1/4)), N2);
                var term22 = Math.pow(Math.abs((1/B)*Math.sin(phi*M2/4)), N3);
                var denom2 = Math.pow(term21 + term22, -1/N1);
                var r2 =  1/denom2;
                
                var x = 3*r1*Math.cos(theta)*r2*Math.cos(phi);
                var y = 3*r1*Math.sin(theta)*r2*Math.cos(phi);
                var z = 3*r2*Math.sin(phi);

                data.push({x: x, y: y, z: z});

                //calculate min max to we can scale it
                xMin = xMin > x ? x : xMin;
                xMax = xMax < x ? x : xMax;
                yMin = yMin > y ? y : yMin;
                yMax = yMax < y ? y : yMax;
                zMin = zMin > z ? z : zMin;
                zMax = zMax < z ? z : zMax;
            }
        }

        //scale it so the plot fits nicely on the screen
        var xScale = d3.scale.linear().range([-50, 50]).domain([xMin, xMax]);
        var yScale = d3.scale.linear().range([-50, 50]).domain([yMax, yMin]);
        var zScale = d3.scale.linear().range([-50, 50]).domain([zMin, zMax]);
        var points = [];       

        //create points vector
        data.forEach(function(d){
            points.push(new THREE.Vector3(xScale(d.x), 
                    yScale(d.y), zScale(d.z)));        
        })        
        
        //create a spline so we get a smooth curve
        var spline = new THREE.CatmullRomCurve3(points);
    
        //get the spline points
        var splinePoints = spline.getPoints(data.length);


        if(!_this.geometry)
            _this.geometry = new THREE.Geometry();
        
        var colorScale = d3.scale.linear().domain([0, 1]).range(['#77b9cf',
                '#2f4a52'])
        //create the geometry based on the spline points
        //and color it
        for(var i = 0; i < splinePoints.length; i++){
            _this.geometry.vertices[i] = splinePoints[i];  
            _this.geometry.colors[ i ] = new THREE.Color(colorScale(Math.random()));
                //new THREE.Color(0.46, 
                    //0.72, 0.8);
            _this.geometry.colors[ i + 1 ] = _this.geometry.colors[ i ];
        }
        
        var material = new THREE.LineBasicMaterial({
                linewidth: 3,
                vertexColors: THREE.VertexColors
            });

        //create the new line
       _this.line = new THREE.Line(_this.geometry, material);
    
    };

};


