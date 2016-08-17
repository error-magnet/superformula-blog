

var gui = new dat.GUI();
var init = {type: '3D', m: 1, n1:4, n2:4, n3: 3, a:10, b:10, M:1, N1:3, N2:3, N3:3, A:5, B:5};
var root = document.getElementById('root');

var threed = new ThreeD();

gui.add(init, 'type', ['2D', '3D'])
    .onFinishChange(function(val){
        init.type = val;
        plot(init);
    });

var f2d = gui.addFolder('Parameters - (both 2D & 3D)')
f2d.add(init, 'm', -10, 10).listen()
    .onFinishChange(function(val){
        init.m = val;
        plot(init);
    });
f2d.add(init, 'n1', -10, 10).listen()
    .onFinishChange(function(val){
        init.n1 = val;
        plot(init);
    });
f2d.add(init, 'n2', -10, 10).listen()
    .onFinishChange(function(val){
        init.n2 = val;
        plot(init);
    });
f2d.add(init, 'n3', -10, 10).listen()
    .onFinishChange(function(val){
        init.n3 = val;
        plot(init);
    });
f2d.add(init, 'a', -10, 10).listen()
    .onFinishChange(function(val){
        init.a = val;
        plot(init);
    });
f2d.add(init, 'b', -10, 10).listen()
    .onFinishChange(function(val){
        init.b = val;
        plot(init);
    });

var f3d = gui.addFolder('Additional parameters for 3D')
f3d.add(init, 'M', -10, 10).listen()
    .onFinishChange(function(val){
        init.M = val;
        plot(init);
    });
f3d.add(init, 'N1', -10, 10).listen()
    .onFinishChange(function(val){
        init.N1 = val;
        plot(init);
    });
f3d.add(init, 'N2', -10, 10).listen()
    .onFinishChange(function(val){
        init.N2 = val;
        plot(init);
    });
f3d.add(init, 'N3', -10, 10).listen()
    .onFinishChange(function(val){
        init.N3 = val;
        plot(init);
    });
f3d.add(init, 'A', -10, 10).listen()
    .onFinishChange(function(val){
        init.A = val;
        plot(init);
    });
f3d.add(init, 'B', -10, 10).listen();

f2d.open();
f3d.open();

var random = function(){
    init.m = 10*Math.random();
    init.n1 = 10*Math.random();
    init.n2 = 10*Math.random();
    init.n3 = 10*Math.random();
    init.a = 10*Math.random();
    init.b = 10*Math.random();
    init.M = 10*Math.random();
    init.N1 = 10*Math.random();
    init.N2 = 10*Math.random();
    init.N3 = 10*Math.random();
    init.A = 10*Math.random();
    init.B = 10*Math.random();
        
  
    plot(init);
};


gui.add(window, 'random').onFinishChange(function(){
       plot(init);
    });


var plot = function(init){
    root.innerHTML = '';
    if(init.type === '2D')
        plot2D(init);
    else
        threed.plot3D(init);

};

plot(init);
