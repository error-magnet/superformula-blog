

var gui = new dat.GUI();
var init = {type: '3D', m: 1, n1:4, n2:4, n3: 3, a:10, b:10, M:1, N1:3, N2:3, N3:3, A:5, B:5};
var root = document.getElementById('root');

var threed = new ThreeD();

gui.add(init, 'type', ['2D', '3D'])
    .onFinishChange(function(val){
        init.type = val;
        plot(init);
    });
gui.addFolder('Parameters - (both 2D & 3D)')
gui.add(init, 'm', -10, 1000)
    .onFinishChange(function(val){
        init.m = val;
        plot(init);
    });
gui.add(init, 'n1', -10, 1000)
    .onFinishChange(function(val){
        init.n1 = val;
        plot(init);
    });
gui.add(init, 'n2', -10, 1000)
    .onFinishChange(function(val){
        init.n2 = val;
        plot(init);
    });
gui.add(init, 'n3', -10, 1000)
    .onFinishChange(function(val){
        init.n3 = val;
        plot(init);
    });
gui.add(init, 'a', -10, 1000)
    .onFinishChange(function(val){
        init.a = val;
        plot(init);
    });
gui.add(init, 'b', -10, 1000)
    .onFinishChange(function(val){
        init.b = val;
        plot(init);
    });

gui.addFolder('Additional parameters for 3D')
gui.add(init, 'M', -10, 1000)
    .onFinishChange(function(val){
        init.M = val;
        plot(init);
    });
gui.add(init, 'N1', -10, 1000)
    .onFinishChange(function(val){
        init.N1 = val;
        plot(init);
    });
gui.add(init, 'N2', -10, 1000)
    .onFinishChange(function(val){
        init.N2 = val;
        plot(init);
    });
gui.add(init, 'N3', -10, 1000)
    .onFinishChange(function(val){
        init.N3 = val;
        plot(init);
    });
gui.add(init, 'A', -10, 1000)
    .onFinishChange(function(val){
        init.A = val;
        plot(init);
    });
gui.add(init, 'B', -10, 1000)
    .onFinishChange(function(val){
        init.B = val;
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
