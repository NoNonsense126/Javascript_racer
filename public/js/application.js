$(document).ready(function() {
    function restart() {  
      console.log("Test2");
      $('tr td.active').replaceWith('<td>-</td>');
      $('tr#player1_strip td').eq(0).replaceWith("<td class= 'active'><img src='images/car.jpeg' alt='car' class='image'></td>");
      $('tr#player2_strip td').eq(0).replaceWith("<td class= 'active'><img src='images/car2.jpeg' alt='car' class='image'></td>");
    };

    function moveCar(player, car_path) {
      var active_ele = "tr#" + player + "_strip td"
      var index = $(active_ele + ".active").index(); 
      $(active_ele + ".active").replaceWith("<td>-</td>")
      $(active_ele).eq(index + 1).replaceWith( "<td class= 'active'><img src=" + car_path + " alt='car' class='image'></td>" );
    }

    function checkWinAndRestart(player) {
      var active_ele = "tr#" + player + "_strip td"
      var index = $(active_ele + ".active").index();
      if (index == -1) {
        alert(player.charAt(0).toUpperCase() + player.slice(1) + "Won!");
        restart();
      }
    };

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