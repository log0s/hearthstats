$(document).ready(function(){
'use strict';

// Ad refreshing
window.setInterval(function() {
  var iframe = document.getElementById('side1');
  iframe.src = iframe.src;
},180000);
window.setInterval(function() {
  var iframe = document.getElementById('side2');
  iframe.src = iframe.src;
},180000);

// Set height because CSS is messed up
// $("#sidebar").height($("#main").parent().height());
 
//================ Responsive menu ===================//

$('.top-nav').mobileMenu({
	defaultText: 'Navigation',
	className: 'select-menu',
	subMenuDash: '&ndash;'
});

//================ Win rate graph (Flot) ====================//


  $(function() {

    // We use an inline data source in the example, usually data would
    // be fetched from a server

    var data = [],
      totalPoints = 300;

    function getRandomData() {

      if (data.length > 0)
        data = data.slice(1);

      // Do a random walk

      while (data.length < totalPoints) {

        var prev = data.length > 0 ? data[data.length - 1] : 50,
          y = prev + Math.random() * 10 - 5;

        if (y < 0) {
          y = 0;
        } else if (y > 100) {
          y = 100;
        }

        data.push(y);
      }

      // Zip the generated y values with the x values

      var res = [];
      for (var i = 0; i < data.length; ++i) {
        res.push([i, data[i]])
      }

      return res;
    }

    // Set up the control widget

    var updateInterval = 30;
    $("#updateInterval").val(updateInterval).change(function () {
      var v = $(this).val();
      if (v && !isNaN(+v)) {
        updateInterval = +v;
        if (updateInterval < 1) {
          updateInterval = 1;
        } else if (updateInterval > 2000) {
          updateInterval = 2000;
        }
        $(this).val("" + updateInterval);
      }
    });

    var plot = $.plot("#wr-graph", [ getRandomData() ], {
      series: {
        shadowSize: 0 // Drawing is faster without shadows
      },
      yaxis: {
        min: 0,
        max: 100
      },
      xaxis: {
        show: false
      }
    });

    function update() {

      plot.setData([getRandomData()]);

      // Since the axes don't change, we don't need to call plot.setupGrid()

      plot.draw();
      setTimeout(update, updateInterval);
    }

    update();

  });

  $('table').footable({
    breakpoints: {
      phone: 480,
      tablet: 660
    }
  });
  $('#tab-container').easytabs();
  $('#stream-container').easytabs();
});

