/*********
 * Superformula explorer in 2D and 3D
 *
 * Libraries used: d3.js, three.js, dat.gui
 *
 * *********/

var gui = new dat.GUI();
var state = {type: '3D', m1: 20, m2: 8, n1:1, n2:1, n3: 8, a:10, b:10, M1:1, 
    M2:10, N1:3, N2:3, N3:3, A:5, B:5};
var root = document.getElementById('root');

var threed = new ThreeD();
var twod = new TwoD();

//Add control panel to change parameters

// Dropdown for 2D/3D
gui.add(state, 'type', ['2D', '3D'])
    .onFinishChange(function(val){
        state.type = val;
        plot(state);
    });

//2D control panel
var f2d = gui.addFolder('Parameters - (both 2D & 3D)')
f2d.add(state, 'm1', -1000, 1000)
    .onFinishChange(function(val){
        state.m1 = val;
        plot(state);
    });
f2d.add(state, 'm2', -1000, 1000)
    .onFinishChange(function(val){
        state.m2 = val;
        plot(state);
    });
f2d.add(state, 'n1', -100, 100)
    .onFinishChange(function(val){
        state.n1 = val;
        plot(state);
    });
f2d.add(state, 'n2', -100, 100)
    .onFinishChange(function(val){
        state.n2 = val;
        plot(state);
    });
f2d.add(state, 'n3', -100, 100)
    .onFinishChange(function(val){
        state.n3 = val;
        plot(state);
    });
f2d.add(state, 'a', -100, 100)
    .onFinishChange(function(val){
        state.a = val;
        plot(state);
    });
f2d.add(state, 'b', -100, 100)
    .onFinishChange(function(val){
        state.b = val;
        plot(state);
    });

//3D control panel
var f3d = gui.addFolder('Additional parameters for 3D')
f3d.add(state, 'M1', -1000, 1000)
    .onFinishChange(function(val){
        state.M1 = val;
        plot(state);
    });
f3d.add(state, 'M2', -1000, 1000)
    .onFinishChange(function(val){
        state.M2 = val;
        plot(state);
    });
f3d.add(state, 'N1', -100, 100)
    .onFinishChange(function(val){
        state.N1 = val;
        plot(state);
    });
f3d.add(state, 'N2', -100, 100)
    .onFinishChange(function(val){
        state.N2 = val;
        plot(state);
    });
f3d.add(state, 'N3', -100, 100)
    .onFinishChange(function(val){
        state.N3 = val;
        plot(state);
    });
f3d.add(state, 'A', -100, 100)
    .onFinishChange(function(val){
        state.A = val;
        plot(state);
    });
f3d.add(state, 'B', -100, 100)

f2d.open();
f3d.open();

//select random values
var random = function(){
    state.m1 = 1000*Math.random();
    state.m1 = 1000*Math.random();
    state.n1 = 100*Math.random();
    state.n2 = 100*Math.random();
    state.n3 = 100*Math.random();
    state.a = 100*Math.random();
    state.b = 100*Math.random();
    state.M1 = 1000*Math.random();
    state.M2 = 1000*Math.random();
    state.N1 = 100*Math.random();
    state.N2 = 100*Math.random();
    state.N3 = 100*Math.random();
    state.A = 100*Math.random();
    state.B = 100*Math.random();
    
    //update dat gui to reflect the randomize changes
    //.listen() could be used, but it is bugged
    //so manually updating each controller value
    for(var f in gui.__folders){
        gui.__folders[f].__controllers.forEach(function(c){
            c.updateDisplay();
        });
    }
     
    plot(state);
};

//add a randomize function for fun
gui.add(window, 'random').onFinishChange(function(){
       plot(state);
    });

var plot = function(state){
    if(state.type === '2D'){
        //clear 3D plot if it exists
        threed.clear();
        //create/update 2D plot
        twod.update(state);
    }
    else{
        //remove 2D plot
        d3.select('svg').remove();
        //create/update 3D plot
        threed.plot3D(state);
    }

};

//actually plot the formula!
plot(state);

