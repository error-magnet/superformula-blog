//Function toe build 2D superformula SVG graphic

var TwoD = function(){
    var _this = this;


    //plot2D clears the entire document and initializes an svg
    this.plot2D = function(state){
        document.getElementById('root').innerHTML = '';
        var width = 800;
        var height = 800;
        var svg = d3.select('#root').append('svg')
            .attr('width', height).attr('height', height);

        this.g = svg.append('g');
    };
   
    //calculate data points from superformula
    this.update = function(state){

        var m1 = state.m1, m2 = state.m2, n1 = state.n1, n2 = state.n2, 
            n3 = state.n3, a = state.a, b = state.b;

        var data = [], xMin = Infinity, xMax = -Infinity, 
            yMin = Infinity, yMax = -Infinity;

        //loop through (-180 degrees to 180degrees) one point for each degree
        for(var i=-180; i<=180; i++){
            var theta = i*Math.PI/180;
            
            //Code for the superformula
            //https://en.wikipedia.org/wiki/Superformula
            var term1 = Math.pow(Math.abs((1/a)*Math.cos(theta*m1/4)), n2);
            var term2 = Math.pow(Math.abs((1/b)*Math.sin(theta*m2/4)), n3);
            var denom = Math.pow(term1 + term2, -1/n1);
            var r =  1/denom;
            var x = r*Math.cos(theta);
            var y = r*Math.sin(theta);

            if(isNaN(x) || !isFinite(x))
                x = 0; 
            if(isNaN(y) || !isFinite(y))
                y = 0;

            data.push({x: x, y: y});

            //calculate min, max values
            xMin = xMin > x ? x : xMin;
            xMax = xMax < x ? x : xMax;
            yMin = yMin > y ? y : yMin;
            yMax = yMax < y ? y : yMax;
        }
        
        //make scales so overall size of the plot is around the same time
        var xScale = d3.scale.linear().range([550, 800]).domain([xMin, xMax]);
        var yScale = d3.scale.linear().range([250, 500]).domain([yMax, yMin]);

        //create the line
        var line = d3.svg.line()
                .x(function(d) {
                    return xScale(parseFloat(d.x)); 
                })
                .y(function(d) { 
                    return yScale(parseFloat(d.y));
                });
        
        //transition nicely to new values if there is already a svg and line
        if(document.querySelector('svg')){
           _this.path.transition().duration(500)
               .attr('d', line(data)); 
        }
        else{
            //else create new svg and draw a new line
            _this.plot2D(state);
            _this.path = _this.g.append('path').attr('d', line(data))
                .style('fill', '#77b9cf').style('stroke', 'grey');
        }
        
    };
};

