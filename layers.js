function initMap() {
  var lng = -122.434469;
  var lat = 37.774313;
  var scale = 400000;
  var center = [lng, lat];
  var width = window.innerWidth / 2;
  var height = window.innerWidth / 4.6;

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
    .attr("height", "1000px");

  //   const myProjection = d3.geoAlbers();
  const myProjection = d3
    .geoMercator()
    .center(center)
    .scale(scale)
    .translate([width, height]);

  const path = d3.geoPath().projection(myProjection);

  return { path, projection: myProjection };
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

function drawPDMap(err, geojson, path) {
  if (err) throw err;

  d3.select("#sfmap")
    .append("g")
    .selectAll("path")
    .data(geojson.features)
    .enter()
    .append("path")
    .attr("class", "sfmapdistrictpath")
    .attr("d", path);
}
