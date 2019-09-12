function initMap() {
  var lng = -122.434469;
  var lat = 37.774313;
  var scale = 400000;
  var center = [lng, lat];
  var width = window.innerWidth / 2;
  var height = window.innerHeight / 2.5;
  const dayHeader = d3
    .select("body")
    .append("div")
    .attr("id", "currentTime")
    .attr("class", "timestamp");
  const charts = d3
    .select("body")
    .append("table")
    .attr("id", "charts")
    .attr("class", "charts");
  const tooltip = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);
  const svg = d3
    .select("body")
    .append("svg")
    .attr("id", "sfmap")
    .attr("width", "100%")
    .attr("height", "1100px")
    .call(
      d3.zoom().on("zoom", function() {
        svg.attr("transform", d3.event.transform);
      })
    );

  //   const myProjection = d3.geoAlbers();
  const myProjection = d3
    .geoMercator()
    .center(center)
    .scale(scale)
    .translate([width, height]);

  const path = d3.geoPath().projection(myProjection);

  //   svg.call(zoom)

  return { svg, path, projection: myProjection };
}

function drawMap(err, geojson, path) {
  if (err) throw err;

  d3.select("#sfmap")
    .append("g")
    .selectAll("path")
    .data(geojson.features)
    .enter()
    .append("path")
    .attr("class", "sfmappath")
    .attr("d", path);
}

function drawPDMap(err, geojson, path, scaleData) {
  if (err) throw err;

  let domain = scaleData.map(d => d.value);

  let colorScale = d3
    .scaleLinear()
    .domain(domain)
    .range([
      "#d73027",
      "#f46d43",
      "#fdae61",
      "#fee08b",
      "#ffffbf",
      "#d9ef8b",
      "#a6d96a",
      "#66bd63",
      "#1a9850"
    ]);

  for (let i = 0; i < scaleData.length; i++) {
    let scaleDataDistrict = scaleData[i].key;
    let value = scaleData[i].value;
    for (let j = 0; j < geojson.features.length; j++) {
      let geoJsonDistrict = geojson.features[j].properties.district;

      if (scaleDataDistrict === geoJsonDistrict) {
        geojson.features[j].properties.value = value;
        break;
      }
    }
  }

  let districts = d3
    .select("#sfmap")
    .append("g")
    .selectAll("path")
    .data(geojson.features)
    .enter()
    .append("path")
    .attr("class", "sfmapdistrictpath")
    .attr("d", path)
    .style("fill", d => {
      let propertyValue = d.properties.value;

      if (propertyValue) {
        return colorScale(propertyValue);
      }
    });
}
