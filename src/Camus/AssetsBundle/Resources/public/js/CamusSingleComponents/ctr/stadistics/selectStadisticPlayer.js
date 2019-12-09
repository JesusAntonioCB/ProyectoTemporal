import $ from "jquery";

export default function selectStadisticPlayer(){
    $(document).on('click', '.changeLeaguePlayer', function(){
      var idLeague = $(this).attr('idLeague');
      var idPlayer = $(this).attr('idPlayer');
      $.ajax({
        type: 'POST',
        url: '/getPlayerScores/'+idPlayer+'/'+idLeague,
        data: {'idLeague': idLeague},
        success: function(data){
          console.log(data);
        }
      });

    });
}

new selectStadisticPlayer();
