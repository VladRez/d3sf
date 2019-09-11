function plotDots(err, d, myProjection) {
  if (err) throw error;
  coor = d.map(point => {
    return {
      id: point.IncidntNum,
      category: point.Category,
      coordinates: [+point.X, +point.Y]
    };
  });

  d3.select("#sfmap")
    .append("g")
    .selectAll("circle")
    .data(coor)
    .enter()
    .append("circle")
    .attr("cy", d => myProjection(d.coordinates)[1])
    .attr("cx", d => myProjection(d.coordinates)[0])
    .attr("r", 2)
    .attr("fill", "red")
    .attr("id", d => d.id)
    // .transition().style("opacity","0").duration(2000)
    .attr("category", d => d.category)
    .on("mouseover", function(d) {
      d3.select(this).style("fill", "orange");
      tooltip
        .transition()
        .duration(200)
        .style("opacity", 0.9);
      let coordHtmlInfo = `Category: ${d.category}, lat: ${
        d.coordinates[1]
      }, lng: ${d.coordinates[0]}`;
      tooltip.html(coordHtmlInfo);
      // Get x & y co-ordinates in pixels
      // console.log(d3.mouse(this));
    })
    .on("mouseout", function(d) {
      d3.select(this).style("fill", "red");
      tooltip
        .transition()
        .duration(200)
        .style("opacity", 0);
    });
}

// d3.select("body")
//   .append("fieldset")
//   .selectAll("input")
//   .data(categories)
//   .enter()
//   .append("input")
//   .attr("type", "checkbox")
//   .attr("id", "categories")
//   .attr("checked","")
//   .attr("value", d => d)

// d3.selectAll("input#categories").on('click', (d)=>{
//  d3.selectAll("circle").filter(circle=>circle.category === d).style("opacity", 0)
// //  d3.selectAll("circle").filter(circle=>circle.category !== d).style("opacity", 100)
// })
