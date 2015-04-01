function initializeOptions(title, location){
  return {
    chart: {
      renderTo: location,
      type: 'areaspline',
      zoomType: 'x',
      panning: true,
      panKey: 'shift'
    },
    title: {
      text: title
    },
    credits: {
      enabled: false
    },
    xAxis: {
      type: 'datetime',
      title: {
        text: 'Time'
      },
      labels: { y: 20, rotation: -50, align: 'right' }
    },
    yAxis: {
      title: {
        text: 'Data'
      }
    },
    plotoptions: {
      connectEnds: false,
      connectNulls: false
    },
    series: []
  }
}

function initializeSeries(name){
  return {name: name, data: []}
}

function createGraph(name, datafile, location, series){
  // datafile = JSON
  // location = DOM id
  // series = array of objects each returned by initializeSeries()
  $.getJSON(datafile, function(data){
    $.each(data,function(key,val){
      var time = key;
      console.log("Key: "+key+" Val: "+val);
      var year = time.substr(0,4);
      var month = (parseInt(time.substr(4,2)) - 1); // 1-12 -> 0-11
      var day = time.substr(6,2);
      var hour = time.substr(8,2);
      var minute = time.substr(10,2);
      var millis = time.substr(12,2);
      var UTCtime = parseInt(Date.UTC(year,month,day,hour,minute,millis));
      console.log("Year:"+year+" Month:"+month+" Day:"+day);
      if (val.constructor === Array){
        for(var i = 0; i < series.length; i++){
            console.log("Pushing: "+Number(val[i]));
            series[i].data.push([UTCtime, Number(val[i])]);
        }
      }
      else
      {
        for(var i = 0; i < series.length; i++){
          console.log("Pushing: "+Number(val));
          series[i].data.push([UTCtime, Number(val)]);
        }
      }
    });
    options = initializeOptions(name, location);
    for(var i = 0; i < series.length; i++){
      series[i].data.sort();
      options.series.push(series[i]);
    }
    console.log(options);
    var chart = new Highcharts.Chart(options);
  });
}
