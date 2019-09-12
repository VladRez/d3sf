//    plotDots(err, dotData);
//           d3.select("body").append("h1")
var stepper = setInterval(
  (function() {
    var date = new Date('1-1-2018'),
      endDate = new Date('12-31-2018');
    return function() {
      year = timeline_step(new Date(date.setDate(date.getDate() + 1)), endDate);
    };
  })(),
  1000
);

function timeline_step(date, endDate) {
  d3.select("h1").html(step);
  requestAnimationFrame(function() {
    // plotDots(err, dotData, step);
  });
  if (date >= endDate) {
    clearInterval(stepper);
  }

  return endDate;
}
