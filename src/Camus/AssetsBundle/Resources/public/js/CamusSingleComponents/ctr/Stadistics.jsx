import React from 'react';
import $ from "jquery";

class Stadistics extends React.Component {
  constructor(props) {
    super(props);
    this.initialize();
  }
  initialize(){
    if($(".ctr-stadistics-league").find(".dropdown-content").length > 0){
      $("body").on("click",".ctr-stadistics-league .dropdown-content a",function(){
        var name = $(this).text();
        var typeS = $(this).attr("type");
        var leagueId = $(this).closest(".select-items").attr("league-id");
        var itemsTemplate = [];
        $.each($('div[class^=sn-league-stadistics]'),function(key,value){
          itemsTemplate.push($(value).attr("template"));
        });
        $(".front-modal,.container-loader").toggle();
        if(typeS == "season"){
          var season = $(this).attr("value");
          $(this).parent().prev().attr("season-id",season);
          $.ajax({
            method: "GET",
            url: "/get-rounds",
            data: {
              league: leagueId,
              season: season,
              templates: itemsTemplate
            },
            success: (data) => {
              var elemDropDown = $(this).closest(".select-items").find(".jornada-select").find(".dropdown-content");
              elemDropDown.empty();
              $.each(data["rounds"],function(key,value){
                elemDropDown.append($('<a type="round" value="'+value["id"]+'">'+value["label"]+'</a>'));
              });
              var cloneSn = $('div[class^=sn-league-stadistics]');
              var refTemplate = $('div[class^=sn-league-stadistics]')[0];
              $.each(data["templates"],function(key,value){
                $(refTemplate).before(value);
              });
              $(cloneSn).remove();
              $(".front-modal,.container-loader").toggle();

              // Check for seasonsRounds in data.
              if(typeof data["seasonRound"] !== 'undefined') {
                var elemDropDown = $(this).closest(".select-items").find(".fases-select").find(".dropdown-content");
                elemDropDown.empty();
                $.each(data["seasonRound"],function(key,value){
                  elemDropDown.append($('<a type="seasonRound" value="'+value["id"]+'">'+value["label"]+'</a>'));
                });
                $('.fases-select .select-box.select-fases .title-box .dropbtn').text(data["seasonRound"][0]["label"]);
              } else {
                $('.fases-select .select-box.select-fases .title-box .dropbtn').text("Sin fases");
              }

              $('.jornada-select .select-box.select-rounds .title-box .dropbtn').text(data["lastRound"]);
              if($(".jornada-select").is(":hidden")){
                $(".jornada-select").show();
              }

            }
          });
        }else if(typeS == "round"){
          var season = $(this).closest(".select-items").find(".apertura-select").find(".dropbtn").attr("season-id");
          var round = $(this).attr("value");
          $.ajax({
            method: "GET",
            url: "/get-stats",
            data: {
              league: leagueId,
              season: season,
              round: round
            },
            success: (data) => {
              var cloneS = $('div[class^=sn-league-stadistics][template^=league_standings]');
              $(cloneS).before(data["standing"]);
              $(cloneS).remove();
              var cloneC = $('div[class^=sn-league-stadistics][template^=league_calendar]');
              $(cloneC).before(data["calendar"]);
              $(cloneC).remove();
              $(".front-modal,.container-loader").toggle();
            }
          });
        } else if(typeS == "seasonRound"){
          var season = $(this).closest(".select-items").find(".apertura-select").find(".dropbtn").attr("season-id");
          var seasonRound = $(this).attr("value");
          $.ajax({
            method: "GET",
            url: "/get-seasons-round",
            data: {
              league: leagueId,
              season: season,
              seasonRound: seasonRound
            },
            success: (data) => {
              if(typeof data["seasonRound"] !== 'undefined'){
                if(seasonRound !== data["seasonRound"][0]["id"]) {
                  $(".jornada-select").hide();
                } else {
                  $('.jornada-select .select-box.select-rounds .title-box .dropbtn').text(data["lastRound"]);
                  $(".jornada-select").show();
                }
              }

              var cloneS = $('div[class^=sn-league-stadistics][template^=league_standings]');
              $(cloneS).before(data["standing"]);
              $(cloneS).remove();
              var cloneC = $('div[class^=sn-league-stadistics][template^=league_calendar]');
              $(cloneC).before(data["calendar"]);
              $(cloneC).remove();
              $(".front-modal,.container-loader").toggle();
            }
          });
        }
        $(this).parent().prev().text(name);
      });
    }
  }
}

export default Stadistics;
