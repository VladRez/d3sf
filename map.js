function setupMap(dataObj) {
 const sfMap = initMap();
          drawMap(dataObj.err, dataObj.mapData, sfMap.path);

          var stepper = setInterval(
            (function() {
              var date = new Date("1-1-2018"),
                endDate = new Date("3-30-2018");
              return function() {
                year = timelineStep(
                  new Date(date.setDate(date.getDate() + 1)),
                  endDate
                );
              };
            })(),
            50
          );

          function timelineStep(date, endDate) {
            requestAnimationFrame(function() {
              d3.select("#currentTime").html(util.formatDate(date));
              plotDots(dataObj.err, dataObj.dotData, sfMap.projection, util.formatDate(date));
            });

            if (date >= endDate) {
              clearInterval(stepper);
            }

            return endDate;
          }
}