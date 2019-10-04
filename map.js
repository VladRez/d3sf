function getData(dateRange) {
  cleanupMap();
  loadingMeter();
  d3.queue()
    .defer(f => {
      d3.json("data/euSfGeo.json")
        .on("progress", e => {
          if (e.lengthComputable) {
            updateMeter(e.loaded, e.total);
          }
        })
        .get((error, data) => {
          f(error, data);
        });
    })
    .defer(d3.json, "data/PoliceDistricts.json")
    .defer(f => {
      d3.csv("data/2018pdi.csv")
        .on("progress", e => {
          e.preventDefault();

          if (e.lengthComputable) {
            updateMeter(e.loaded, e.total);
          }
        })
        .get((error, data) => {
          f(error, data);
        });
    })
    .await((err, mapData, pdData, dotData) => {
      d3.selectAll("#loadingMeter").remove();

      setupMap({ err, mapData, pdData, dotData, dateRange });
    });
}

function setupMap(dataObj) {
  const sfMap = initMap();
  drawMap(dataObj.err, dataObj.mapData, sfMap.path);
  let scaleData = util.pivot.incidentByDistrict(dataObj.dotData);
  drawPDMap(dataObj.err, dataObj.pdData, sfMap.path, scaleData);

  let params = ({ startDate, endDate }) => {
    let date = new Date(startDate);
    return function() {
      timelineStep(
        new Date(date.setDate(date.getDate() + 1)),
        new Date(endDate)
      );
    };
  };

  let stepper = setInterval(params(dataObj.dateRange), 50);

  let timelineStep = (date, endDate) => {
    requestAnimationFrame(function() {
      d3.select("#currentTime").html(util.formatDate(date));
      plotDots(
        dataObj.err,
        dataObj.dotData,
        sfMap.projection,
        util.formatDate(date)
      );
    });

    if (date >= endDate) {
      clearInterval(stepper);
    }

    return endDate;
  };
}
