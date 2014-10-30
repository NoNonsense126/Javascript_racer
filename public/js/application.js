$(document).ready(function() {
  var Stopwatch = function(elem, options) {

    var timer       = createTimer(),
        startButton = createButton("start", start),
        stopButton  = createButton("stop", stop),
        resetButton = createButton("reset", reset),
        offset,
        clock,
        interval;

    // default options
    options = options || {};
    options.delay = options.delay || 1;

    // append elements     
    elem.appendChild(timer);

    // initialize
    reset();

    // private functions
    function createTimer() {
      return document.createElement("span");
    }

    function createButton(action, handler) {
      var a = document.createElement("a");
      a.href = "#" + action;
      a.innerHTML = action;
      a.addEventListener("click", function(event) {
        handler();
        event.preventDefault();
      });
      return a;
    }

    function start() {
      if (!interval) {
        offset   = Date.now();
        interval = setInterval(update, options.delay);
      }
    }

    function stop() {
      if (interval) {
        clearInterval(interval);
        interval = null;
      }
    }

    function reset() {
      clock = 0;
      render();
    }

    function update() {
      clock += delta();
      render();
    }

    function render() {
      timer.innerHTML = clock/1000; 
    }

    function delta() {
      var now = Date.now(),
          d   = now - offset;

      offset = now;
      return d;
    }

    // public API
    this.start  = start;
    this.stop   = stop;
    this.reset  = reset;
 };

    var elems = document.getElementsByClassName("basic");

    for (var i=0, len=elems.length; i<len; i++) {
      aTimer = new Stopwatch(elems[i], {delay: 10});
    }

    function restart() {
      $('tr td.active').replaceWith('<td>-</td>');
      $('tr#player1_strip td').eq(0).replaceWith("<td class= 'active'><img src='images/car.jpeg' alt='car' class='image'></td>");
      $('tr#player2_strip td').eq(0).replaceWith("<td class= 'active'><img src='images/car2.jpeg' alt='car' class='image'></td>");
    };

    function moveCar(player, car_path) {
      aTimer.start()
      var active_ele = "tr#" + player + "_strip td"
      var index = $(active_ele + ".active").index(); 
      $(active_ele + ".active").replaceWith("<td>-</td>")
      $(active_ele).eq(index + 1).replaceWith( "<td class= 'active'><img src=" + car_path + " alt='car' class='image'></td>" );
    }

    function checkWinAndRestart(player) {
      var active_ele = "tr#" + player + "_strip td";
      var index = $(active_ele + ".active").index();
      if (index == 19) {
        aTimer.stop()
        alert(player.charAt(0).toUpperCase() + player.slice(1) + "Won!");
        window.location = '/won?won=' + player + '&player1=' + location('player1') + '&player2=' + location('player2') + '&time=' + $('span').text()
      }
    };

    function location(player) {
      var active_ele = "tr#" + player + "_strip td";
      var index = $(active_ele + ".active").index();
      return index;
    }

    $(document).on("keyup", function(e) {
        if(e.which == 81){
          moveCar('player1', "images/car.jpeg");
          checkWinAndRestart('player1')
        } 
        if(e.which == 80){
          moveCar('player2', "images/car2.jpeg");
          checkWinAndRestart('player2')
        } 
    });
    
  });