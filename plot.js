function plotDots(err, d, myProjection, date) {
  if (err) throw error;

  coor = d
    .filter(p => {
      return (
        util.formatDate(new Date(p.Date)) === date &&
        !["OTHER OFFENSES", "NON-CRIMINAL"].includes(p.Category)
      );
    })
    .map(point => {
      return {
        id: point.IncidntNum,
        category: point.Category,
        coordinates: [+point.X, +point.Y],
        resolution: point.Resolution,
        descript: point.Descript,
        time: point.Time,
        pddistrict: point.PdDistrict,
        address: point.Address,
        date: point.Date
      };
    });

  acc = d
    .filter(p => {
      return (
        util.formatDate(new Date(p.Date)) <= date &&
        !["OTHER OFFENSES", "NON-CRIMINAL"].includes(p.Category)
      );
    })
    .map(point => {
      return {
        category: point.Category
      };
    });

  let categoryByTime = d3
    .nest()
    .key(d => d.category)
    .rollup(v => v.length)
    .entries(acc);

  let categoryTableRows = categoryByTime
    .sort((a, b) => a.value <= b.value)
    .map(
      detail =>
        `<tr id="${detail.key}"><td>${detail.key}</td><td>${detail.value}</td></tr>`
    );
  categoryTableRows = `${categoryTableRows}<tr id=totals><td>Totals</td><td>${categoryByTime.reduce(
    (c, a) =>{return a.value + c}
  , 0)}</td></tr>`;
  let categoryTable = `<table><tbody>${categoryTableRows}</tbody></table>`;

  // d3.select("#charts").html(categoryTable);

  d3.select("#sfmap")
    .append("g")
    .selectAll("circle")
    .data(coor)
    .enter()
    .append("circle")
    .attr("cy", d => myProjection(d.coordinates)[1])
    .attr("cx", d => myProjection(d.coordinates)[0])
    .attr("r", 2)
    .attr("class", "incidents")
    .attr("id", d => d.id)
    .style("fill", d => (d.resolution === "NONE" ? "red" : "green"))
    // .transition().style("opacity","1").duration(2000)
    .attr("category", d => d.category)
    .on("mouseover", function(d) {
      d3.select(this)
        .style("opacity", "1")
        .attr("r", 5)
        .style("stroke", "orange")
        .style("stroke-width", "2px");
      let tableBody = Object.keys(d).map(
        info => `<tr><td>${info}</td><td>${d[info]}</td></tr>`
      );
      // let url = `http://www.google.com/maps/place/${d.coordinates
      //   .reverse()
      //   .join(",")}`;
      // tableBody = `${tableBody}<tr><td>google</td><td><a href="${url}">${d.id}</a></td></tr>`;
      let tooltip = d3.select(".tooltip");
      let table = `<table><tbody>${tableBody}</tbody></table>`;
      tooltip
        .transition()
        .duration(200)
        .style("opacity", 0.9);

      tooltip.html(table);
    })
    .on("mouseout", function(d) {
      d3.select(this)
        .style("fill", d => (d.resolution === "NONE" ? "red" : "green"))
        .style("opacity", ".3")
        .attr("r", 2)
        .style("stroke", "black")
        .style("stroke-width", "1px");
      let tooltip = d3.select(".tooltip");
      tooltip
        .transition()
        .duration(200)
        .style("opacity", 0);
    })
    .on("click", function(d) {
      let url = `http://www.google.com/maps/place/${d.coordinates
        .reverse()
        .join(",")}`;

      window.open(url, "_blank");
      // let frame ="<iframe id=\"map_frame\" "
      //                         + "width=\"100%\" height=\"600px\" frameborder=\"0\" scrolling=\"no\" marginheight=\"0\" marginwidth=\"0\" "
      //                         + "src=\"https://www.google.sk/maps?f=q&amp;output=embed&amp;source=s_q&amp;hl=sk&amp;geocode=&amp;q=https:%2F%2Fwww.google.sk%2Fmaps%2Fms%3Fauthuser%3D0%26vps%3D5%26hl%3Dsk%26ie%3DUTF8%26oe%3DUTF8%26msa%3D0%26output%3Dkml%26msid%3D205427380680792264646.0004fe643d107ef29299a&amp;aq=&amp;sll=48.669026,19.699024&amp;sspn=4.418559,10.821533&amp;ie=UTF8&amp;ll="
      //                         + "lat" + "," + "lon"
      //                         + "&amp;spn=0.199154,0.399727&amp;t=m&amp;z="
      //                         + "zoom" + "\"" + "></iframe>"
    })
    .transition()
    .style("opacity", "0.3")
    .duration(800);

  categoryByTime.forEach(cat => {
    let key = cat.key;
    d3.select(`tr[id='${cat.key}']`)
      .on("mouseover", function() {
        //  debugger
        let circles = d3.selectAll(`circle[category='${this.id}']`);
        circles
          .style("opacity", "1")
          .attr("r", 5)
          .style("stroke", "orange")
          .style("stroke-width", "2px");
      })
      .on("mouseout", function() {
        let circles = d3
          .selectAll(`circle[category='${this.id}']`)
          .attr("class", "incidents");
        circles
          .style("opacity", ".3")
          .attr("r", 2)
          .style("stroke", "black")
          .style("stroke-width", "1px");
      });
  });
}

function removeDots(err, d, myProjection, date) {
  if (err) throw error;
  let coor = d
    .filter(p => util.formatDate(new Date(p.Date)) < date)
    .map(point => point.IncidntNum);
  coor.forEach(c => {
    d3.select(`circle[id=\'${c}]\'`).remove();
  });
}
