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
    // .transition().style("opacity","1").duration(2000)
    .attr("category", d => d.category)
    .on("mouseover", function(d) {
      d3.select(this).style("fill", "orange");
      
      let tooltip = d3.select(".tooltip")
      tooltip.transition()
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
      let tooltip = d3.select(".tooltip")
      tooltip.transition()
        .duration(500)
        .style("opacity", 0);
    }).on("click", function(d){
        // debugger
        let url = `http://www.google.com/maps/place/${d.coordinates.reverse().join(',')}`
        window.open(url,'_blank')
        // let frame ="<iframe id=\"map_frame\" "
        //                         + "width=\"100%\" height=\"600px\" frameborder=\"0\" scrolling=\"no\" marginheight=\"0\" marginwidth=\"0\" "
        //                         + "src=\"https://www.google.sk/maps?f=q&amp;output=embed&amp;source=s_q&amp;hl=sk&amp;geocode=&amp;q=https:%2F%2Fwww.google.sk%2Fmaps%2Fms%3Fauthuser%3D0%26vps%3D5%26hl%3Dsk%26ie%3DUTF8%26oe%3DUTF8%26msa%3D0%26output%3Dkml%26msid%3D205427380680792264646.0004fe643d107ef29299a&amp;aq=&amp;sll=48.669026,19.699024&amp;sspn=4.418559,10.821533&amp;ie=UTF8&amp;ll="
        //                         + "lat" + "," + "lon"
        //                         + "&amp;spn=0.199154,0.399727&amp;t=m&amp;z="
        //                         + "zoom" + "\"" + "></iframe>"
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
