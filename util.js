var util = {
  pivot: {
    incidentByDistrict: data =>
      d3
        .nest()
        .key(d => d.PdDistrict)
        .rollup(v => v.length)
        .entries(data)
  }
};
