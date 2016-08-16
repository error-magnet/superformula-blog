var plot2D = function(obj){
    var svg = d3.select('#root').append('svg')
        .attr('width', document.body.scrollWidth).attr('height', document.body.scrollHeight);

    var g = svg.append('g');

    var path;

    //formula constants
    //var m = 10, n1 = 100, n2 = 100, n3 = 100, a = 7, b = 2;
    var m = obj.m, n1 = obj.n1, n2 = obj.n2, n3 = obj.n3, a = obj.a, b = obj.b;

    var data = [];
    for(var i=0; i<360; i++){
        var theta = i*Math.PI/180;
        var term1 = Math.pow(Math.abs((1/a)*Math.cos(theta*m/4)), n2);
        var term2 = Math.pow(Math.abs((1/b)*Math.sin(theta*m/4)), n3);
        var denom = Math.pow(term1 + term2, 1/n1);
        var r =  1/denom;
        data.push({x: r*Math.cos(theta), y:r*Math.sin(theta)});
    }


    var line = d3.svg.line()
            .x(function(d) {
                if(d.x === Infinity || d.y === Infinity) 
                    return 0;

                return 20*parseFloat(d.x)+300; 
            })
            .y(function(d) { 
                if(d.x === Infinity || d.y === Infinity) 
                    return 0;
                return 20*parseFloat(d.y)+300; 
            })

    if(path)
        path.remove();

    path = g.append("path").attr("d", line(data));

};

