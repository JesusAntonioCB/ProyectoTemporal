import React from 'react';
import $ from "jquery";
import moment from "moment";

class TickerCaliente extends React.Component {
  constructor(props) {
    super(props);
    this.initialize();
  }
  buildExternalOlama(matchId,text){
    return "<a href='/external/ulama/"+matchId+"'>"+text+"</a>";
  }
  renderlrTicker(data){
    var oThis = this;
    var competitionId = data["competition_id"];
    var matchId = data["match_id"];
    var serverTime = data["server_time"];
    var currentPeriodStartTime = data["current_period_start_time"];
    var currentPeriodStopTime = data["current_period_stop_time"];
    var matchDate = data["match_date"];
    var currentPeriod = data["current_period"];
    var matchStatus = data["match_status"];
    var titleStatus = '';
    var meses = ['','Ene',"Feb","Mar","Abr","May","Jun","Jul","Ago","Sept","Oct","Nov","Dic"];
    var htmlTeamHomeScore = '';
    var htmlTeamAwayScore = '';
    var calienteUrl = "http://online.caliente.mx/promoRedirect?key=ej01NTE5MzgxOCZsPTAmcD0xODgyMTQz&amp;LANGUAGE_CODE=es_MX&amp;BET_REF=";

    if(matchStatus == "Terminado"){
      titleStatus = "Finalizado";
    }else if (matchStatus == "Jugando") {
      if(currentPeriodStopTime == null){
        var time = moment(matchDate).tz('America/Mexico_City');
        titleStatus = time.format('HH:mm') + " HRS";
      }
    }else if (matchStatus == "Programado") {
      if(currentPeriodStopTime == null){
        var time = moment(matchDate).tz('America/Mexico_City');
        var day = meses[time.format('M')] + " " + time.format('D');
        var hour = time.format('HH:mm');
        titleStatus = day + " / " + hour;
      }
    }

    if(matchStatus == "Terminado"){
      htmlTeamHomeScore = data["home_team_score"];
      if(data["home_team_shoot_out_score"] != null){
        htmlTeamHomeScore = htmlTeamHomeScore + "(" + data["home_team_shoot_out_score"] + ")";
      }
      htmlTeamHomeScore = oThis.buildExternalOlama(matchId,htmlTeamHomeScore);
    }else if (matchStatus == "Jugando" || matchStatus == "Programado") {
      if(data["home_team_odds"] == null){
        if(matchStatus == "Jugando"){
          htmlTeamHomeScore = data["home_team_score"];
          if(data["home_team_shoot_out_score"] != null){
            htmlTeamHomeScore = htmlTeamHomeScore + "(" + data["home_team_shoot_out_score"] + ")";
          }
          htmlTeamHomeScore = oThis.buildExternalOlama(matchId,htmlTeamHomeScore);
        }
      }else{
        if(matchStatus == "Jugando"){
          htmlTeamHomeScore = data["home_team_score"];
          if(data["home_team_shoot_out_score"] != null){
            htmlTeamHomeScore = htmlTeamHomeScore + "(" + data["home_team_shoot_out_score"] + ")";
          }
          htmlTeamHomeScore = oThis.buildExternalOlama(matchId,htmlTeamHomeScore);
        }
        htmlTeamHomeScore = htmlTeamHomeScore + "<a href='"+calienteUrl+data["home_team_bet_id"]+"' target='_blank'>"+data["home_team_odds"]+"</a>";
      }
      if(data["draw_odds"] != null){
        htmlTeamHomeScore = htmlTeamHomeScore + "<span class='odds-home'><a href="+calienteUrl+data["draw_bet_id"]+" target='_blank'>"+data["draw_odds"]+"</a></span>";
      }
    }
    // AWAY
    if(matchStatus == "Terminado"){
      htmlTeamAwayScore = data["away_team_score"];
      if(data["away_team_shoot_out_score"] != null){
        htmlTeamAwayScore = htmlTeamAwayScore + "(" + data["away_team_shoot_out_score"] + ")";
      }
      htmlTeamAwayScore = oThis.buildExternalOlama(matchId,htmlTeamAwayScore);
    }else if (matchStatus == "Jugando" || matchStatus == "Programado") {
      if(matchStatus == "Programado"){}
      if(data["away_team_odds"] == null){
        if(matchStatus == "Jugando"){
          htmlTeamAwayScore = data["away_team_score"];
          if(data["away_team_shoot_out_score"] != null){
            htmlTeamAwayScore = htmlTeamAwayScore + "(" + data["away_team_shoot_out_score"] + ")";
          }
          htmlTeamAwayScore = oThis.buildExternalOlama(matchId,htmlTeamAwayScore);
        }
      }else{
        if(matchStatus == "Jugando"){
          htmlTeamAwayScore = data["away_team_score"];
          if(data["away_team_shoot_out_score"] != null){
            htmlTeamAwayScore = htmlTeamAwayScore + "(" + data["away_team_shoot_out_score"] + ")";
          }
          htmlTeamAwayScore = oThis.buildExternalOlama(matchId,htmlTeamAwayScore);
        }
        htmlTeamAwayScore = htmlTeamAwayScore + "<a href='"+calienteUrl+data["away_team_bet_id"]+"' target='_blank'>"+data["away_team_odds"]+"</a>";
      }
    }

    var currentStartDate = '';
    if(data["current_period_start_time"] != null){
      currentStartDate = data["current_period_start_time"];
    }
    var html = '<div class="lr-row-ticker-caliente" competition_id="'+competitionId+'" match_id="'+matchId+'" date_actual="'+serverTime+'" start_date="'+currentStartDate+'" stop_date="'+currentPeriodStopTime+'" match_date="'+matchDate+'" current_period="'+currentPeriod+'" match_status="'+matchStatus+'">\
      <div class="title">\
        '+ titleStatus +'\
      </div>\
      <div class="team-first">\
        <img class="team-image" onerror="this.onerror=null;this.src=\'/bundles/camusassets/images/mt_placeholder_team.png\';" src="https://static.mediotiempo.com/0x30/'+data["home_team_logo"]+'" alt="'+data["home_team_name"]+'">\
        <span class="team-name"><a href="/external/ulama/'+data["match_id"]+'">'+data["home_team_name"]+'</a></span>\
        <span class="team-score">\
          '+htmlTeamHomeScore+'\
        </span>\
      </div>\
      <div class="team-second">\
        <img class="team-image" onerror="this.onerror=null;this.src=\'/bundles/camusassets/images/mt_placeholder_team.png\';" src="https://static.mediotiempo.com/0x30/'+data["away_team_logo"]+'" alt="'+data["away_team_name"]+'">\
        <span class="team-name"><a href="/external/ulama/'+data["match_id"]+'">'+data["away_team_name"]+'</a></span>\
        <span class="team-score">\
          '+htmlTeamAwayScore+'\
        </span>\
      </div>\
    </div>';

    return html;
  }
  initialize(){
    var flagTimer = false;
    var oThis = this;
    var elSliTicker = $(".sli-ticker-caliente");
    if(elSliTicker.length > 0){
      $.ajax({
        method: "GET",
        url: "https://mictlan.mediotiempo.com/v1/ticker",
        dataType: "json",
        success: (dataService) => {
          var data = [];
          var uniqueData = [];
          $.each(dataService["matches"],function(key,value){
            data.push(value["competition"]);
          });
          $.each(data, function(i, el){
              if($.inArray(el, uniqueData) === -1) uniqueData.push(el);
          });
          data = {};
          $.each(uniqueData,function(key,value){
            data[key] ={ "competition":value };
          });
          $.each(dataService["matches"],function(key,value){
            var keyFind = -1;
            $.each(data,function(keyS,valueS){
              if(value["competition"] == valueS["competition"]){
                keyFind = keyS;
              }
            });
            if(!("logo" in data[keyFind])){
              data[keyFind]["logo"] = "";
            }
            if(!("competition_id" in data[keyFind])){
              data[keyFind]["competition_id"] = "";
            }
            if(!("matches" in data[keyFind])){
              data[keyFind]["matches"] = {};
            }
            data[keyFind]["logo"] = "https://static.mediotiempo.com/0x50/"+value["competition_logo"];
            data[keyFind]["competition_id"] = value["competition_id"];
            switch (value["match_status"]) {
              case 'Terminado':
                if(!("terminado" in data[keyFind]["matches"])){
                  data[keyFind]["matches"]["terminado"] = [];
                }
                data[keyFind]["matches"]["terminado"].push(value);
                break;
              case 'Jugando':
                if(!("jugando" in data[keyFind]["matches"])){
                  data[keyFind]["matches"]["jugando"] = [];
                }
                data[keyFind]["matches"]["jugando"].push(value);
                break;
              case 'Programado':
                if(!("programado" in data[keyFind]["matches"])){
                  data[keyFind]["matches"]["programado"] = [];
                }
                data[keyFind]["matches"]["programado"].push(value);
            }
          });
          var countAd = 1;
          var adLoaded = false;
          $.each(data,function(key,value){
            elSliTicker.find(".items-league").append("<img class='img-league' onerror='this.onerror=null;this.src=\"/bundles/camusassets/images/mt_placeholder_team.png\";' src="+value["logo"]+" alt='Liga'>");
            if(value["matches"]["jugando"] != undefined ){
              $.each(value["matches"]["jugando"],function(keyT,valueT){
                var htmlLrTicker = oThis.renderlrTicker(valueT);
                elSliTicker.find(".items-league").append(htmlLrTicker);
                countAd = countAd + 1;
                if(countAd == 3){
                  if(adLoaded == false){
                    elSliTicker.find(".items-league").append('<div class="ad ticker"><div data-camus-module-ad-div="true" id="div-gpt-ad-ticker-1"><script>googletag.cmd.push(function() {googletag.display("div-gpt-ad-ticker-1");});</script></div></div>');
                    adLoaded = true;
                  }
                }
              });
            }
            if(value["matches"]["programado"] != undefined ){
              $.each(value["matches"]["programado"],function(keyT,valueT){
                var htmlLrTicker = oThis.renderlrTicker(valueT);
                elSliTicker.find(".items-league").append(htmlLrTicker);
                countAd = countAd + 1;
                if(countAd == 3){
                  if(adLoaded == false){
                    elSliTicker.find(".items-league").append('<div class="ad ticker"><div data-camus-module-ad-div="true" id="div-gpt-ad-ticker-1"><script>googletag.cmd.push(function() {googletag.display("div-gpt-ad-ticker-1");});</script></div></div>');
                    adLoaded = true;
                  }
                }
              });
            }
            if(value["matches"]["terminado"] != undefined ){
              $.each(value["matches"]["terminado"],function(keyT,valueT){
                var htmlLrTicker = oThis.renderlrTicker(valueT);
                elSliTicker.find(".items-league").append(htmlLrTicker);
                countAd = countAd + 1;
                if(countAd == 3){
                  if(adLoaded == false){
                    elSliTicker.find(".items-league").append('<div class="ad ticker"><div data-camus-module-ad-div="true" id="div-gpt-ad-ticker-1"><script>googletag.cmd.push(function() {googletag.display("div-gpt-ad-ticker-1");});</script></div></div>');
                    adLoaded = true;
                  }
                }
              });
            }
          });
          var arrowLeft = elSliTicker.find(".left");
          var arrowRight = elSliTicker.find(".right");
          $($(elSliTicker).find(".items-league")).slick({
            infinite: false,
            lazyLoad: 'ondemand',
            variableWidth: true,
            prevArrow: arrowLeft,
            nextArrow: arrowRight,
            dots: false
          });
          if($(".lr-row-ticker-caliente").length > 0){
            var intervals = [];
            $.each($(".lr-row-ticker-caliente"),function(key,value){
              var period = $(value).attr("current_period");
              var matchStatus = $(value).attr("match_status");
              var stopDate = $(value).attr("stop_date");
              var startDate = $(value).attr("start_date");
              var actualDate = $(value).attr("date_actual");
              var matchDate = $(value).attr("match_date");
              var matchId = $(value).attr("match_id");
              var timerInterval = "";
              var addMinutes = 0;
              var totalMinutes = 0;
              var seconds = 0;

              if(startDate != ""){
                var aDate = new Date();
                var actualHours = actualDate.split("T")[1].slice(0,-1);
                actualHours = actualHours.split(":");
                var aa = aDate.setHours(actualHours[0], actualHours[1], actualHours[2]);

                var sDate = new Date();
                var startHours = startDate.split("T")[1].slice(0,-1);
                startHours = startHours.split(":");
                var bb = sDate.setHours(startHours[0], startHours[1], startHours[2]);

                var timeGap = Math.abs(aa - bb);
                var totalMinutes = Math.floor((timeGap/1000)/60);

                var d = new Date();
                var seconds = d.getSeconds();
              }
              if(period == "Penales" && matchStatus=="Jugando"){
                $(value).find(".title").text("PENALTIS");
              }else if(period == "Primer Tiempo" && stopDate != "null" && matchStatus=="Jugando"){
                $(value).find(".title").text("Medio Tiempo");
              }else if(period == "Segundo Tiempo" && stopDate != "null" && matchStatus=="Jugando"){
                $(value).find(".title").text("2T / FIN");
              }else if(period == "Primer Tiempo Extra" && stopDate != "null" && matchStatus=="Jugando"){
                $(value).find(".title").text("MTE");
              }else if(period == "Segundo Tiempo Extra" && stopDate != "null" && matchStatus=="Jugando"){
                $(value).find(".title").text("2TE / FIN");
              }
              if(period == "Segundo Tiempo"){
                addMinutes = 45;
              }else if(period == "Primer Tiempo Extra"){
                addMinutes = 90;
              }else if(period == "Segundo Tiempo Extra"){
                addMinutes = 105;
              }
              totalMinutes = totalMinutes + addMinutes;
              if(matchStatus == "Programado"){
                var aDateRest = new Date();
                var actualHoursRest = actualDate.split("T")[1].slice(0,-1);
                var actualDaysRest = actualDate.split("T")[0];
                actualHoursRest = actualHoursRest.split(":");
                var aaRest = aDateRest.setHours(actualHoursRest[0], actualHoursRest[1], actualHoursRest[2]);

                var sDateRest = new Date();
                var startHoursRest = matchDate.split("T")[1].slice(0,-1);
                startHoursRest = startHoursRest.split(":");
                var startDaysRest = matchDate.split("T")[0];
                var bbRest = sDateRest.setHours(startHoursRest[0], startHoursRest[1], startHoursRest[2]);

                var acDaysRest = new Date(actualDaysRest).getTime();
                var stDaysRest = new Date(startDaysRest).getTime();
                var totalDaysRest = stDaysRest - acDaysRest;

                var timeGapRest = Math.abs(aaRest - bbRest);
                var totalMinutesRest = Math.floor((timeGapRest/1000)/60);

                if (totalDaysRest === 0) {
                  if(totalMinutesRest < 15){
                    $(value).find(".title").text("Por comenzar");
                  }
                }
              }else if(matchStatus == "Jugando" && stopDate == "null"){
                flagTimer = true;
                var input = {
                    year: 0,
                    month: 0,
                    day: 0,
                    hours: 0,
                    minutes: totalMinutes,
                    seconds: seconds
                };

                var timestamp = new Date(input.year, input.month, input.day,
                input.hours, input.minutes, input.seconds);

                var interval = 1;

                timerInterval = setInterval(function () {
                  timestamp = new Date(timestamp.getTime() + interval * 1000);
                  var secondsT = timestamp.getSeconds();
                  if(secondsT == 0){
                    totalMinutes = totalMinutes + 1;
                  }
                  var minutesT = totalMinutes;
                  if(minutesT < 10){
                    minutesT = "0" + minutesT;
                  }
                  if(secondsT < 10){
                    secondsT = "0" + secondsT;
                  }

                  var periodTimer = "";
                  if(period == "Penales" && matchStatus=="Jugando"){
                    periodTimer = "Penales";
                  }else if(period == "Primer Tiempo"){
                    periodTimer = "1T/" + minutesT + ':' + secondsT + '';
                  }else if(period == "Segundo Tiempo"){
                    periodTimer = "2T/" + minutesT + ':' + secondsT + '';
                  }else if(period == "Primer Tiempo Extra"){
                    periodTimer = "1TE/" + minutesT + ':' + secondsT + '';
                  }else if(period == "Segundo Tiempo Extra" && stopDate != "null" && matchStatus=="Jugando"){
                    periodTimer = "2TE/" + minutesT + ':' + secondsT + '';
                  }else{
                    periodTimer = minutesT + ':' + secondsT + '';
                  }
                  $(value).find(".title").text(periodTimer);
                }, Math.abs(interval) * 1000);
                intervals[matchId] = timerInterval;
              }
            });
            setInterval(function(){
              $.ajax({
                method: "GET",
                url: "https://mictlan.mediotiempo.com/v1/ticker",
                dataType: "json",
                success: (dataService) => {
                  var data = [];
                  var uniqueData = [];
                  $.each(dataService["matches"],function(key,value){
                    data.push(value["competition"]);
                  });
                  $.each(data, function(i, el){
                      if($.inArray(el, uniqueData) === -1) uniqueData.push(el);
                  });
                  data = {};
                  $.each(uniqueData,function(key,value){
                    data[key] ={ "competition":value };
                  });
                  $.each(dataService["matches"],function(key,value){
                    var keyFind = -1;
                    $.each(data,function(keyS,valueS){
                      if(value["competition"] == valueS["competition"]){
                        keyFind = keyS;
                      }
                    });
                    if(!("logo" in data[keyFind])){
                      data[keyFind]["logo"] = "";
                    }
                    if(!("competition_id" in data[keyFind])){
                      data[keyFind]["competition_id"] = "";
                    }
                    if(!("matches" in data[keyFind])){
                      data[keyFind]["matches"] = {};
                    }
                    data[keyFind]["logo"] = "https://static.mediotiempo.com/0x50/"+value["competition_logo"];
                    data[keyFind]["competition_id"] = value["competition_id"];
                    switch (value["match_status"]) {
                      case 'Terminado':
                        if(!("terminado" in data[keyFind]["matches"])){
                          data[keyFind]["matches"]["terminado"] = [];
                        }
                        data[keyFind]["matches"]["terminado"].push(value);
                        break;
                      case 'Jugando':
                        if(!("jugando" in data[keyFind]["matches"])){
                          data[keyFind]["matches"]["jugando"] = [];
                        }
                        data[keyFind]["matches"]["jugando"].push(value);
                        break;
                      case 'Programado':
                        if(!("programado" in data[keyFind]["matches"])){
                          data[keyFind]["matches"]["programado"] = [];
                        }
                        data[keyFind]["matches"]["programado"].push(value);
                    }
                  });
                  $.each($(".lr-row-ticker-caliente"),function(keylr,valuelr){
                    var competitionId = $(valuelr).attr("competition_id");
                    var matchId = $(valuelr).attr("match_id");
                    var period = $(valuelr).attr("current_period");
                    var matchStatus = $(valuelr).attr("match_status");
                    var stopDate = $(valuelr).attr("stop_date");
                    var startDate = $(valuelr).attr("start_date");
                    var actualDate = $(valuelr).attr("date_actual");
                    var timerIntervalEx = "";
                    $.each(data,function(key,value){
                      if(value["competition_id"] == competitionId){
                        var typeCompetition = typeof value["matches"][matchStatus.toLowerCase()];
                        if(typeCompetition == "object"){
                          var itemCompetition = value["matches"][matchStatus.toLowerCase()];
                          $.each(itemCompetition,function(keyItem,valueItem){
                            if(valueItem["match_id"] == matchId){
                              if(valueItem["current_period_stop_time"] != null){
                                flagTimer = false;
                              }
                              if(valueItem["current_period"] == "Penales" && valueItem["match_status"]=="Jugando"){
                                $(valuelr).find(".title").html("PENALTIS");
                                flagTimer = true;
                              }else if(valueItem["current_period"] == "Primer Tiempo" && valueItem["current_period_stop_time"] != null && valueItem["match_status"]=="Jugando"){
                                $(valuelr).find(".title").html("Medio Tiempo");
                                flagTimer = true;
                              }else if(valueItem["current_period"] == "Segundo Tiempo" && valueItem["current_period_stop_time"] != null && valueItem["match_status"]=="Jugando"){
                                $(valuelr).find(".title").html("2T / FIN");
                                flagTimer = true;
                              }else if(valueItem["current_period"] == "Primer Tiempo Extra" && valueItem["current_period_stop_time"] != null && valueItem["match_status"]=="Jugando"){
                                $(valuelr).find(".title").html("MTE");
                                flagTimer = true;
                              }else if(valueItem["current_period"] == "Segundo Tiempo Extra" && valueItem["current_period_stop_time"] != null && valueItem["match_status"]=="Jugando"){
                                $(valuelr).find(".title").html("2TE / FIN");
                                flagTimer = true;
                              }

                              var addMinutes = 0;
                              var totalMinutes = 0;
                              var seconds = 0;

                              if(valueItem["current_period_start_time"] != null){
                                var aDate = new Date();
                                var actualHours = valueItem["current_period_start_time"].split("T")[1].slice(0,-1);
                                actualHours = actualHours.split(":");
                                var aa = aDate.setHours(actualHours[0], actualHours[1], actualHours[2]);

                                var sDate = new Date();
                                var startHours = valueItem["server_time"].split("T")[1].slice(0,-1);
                                startHours = startHours.split(":");
                                var bb = sDate.setHours(startHours[0], startHours[1], startHours[2]);

                                var timeGap = Math.abs(aa - bb);
                                var totalMinutes = Math.floor((timeGap/1000)/60);

                                var d = new Date();
                                var seconds = d.getSeconds();
                              }

                              if(valueItem["current_period"] == "Segundo Tiempo"){
                                addMinutes = 45;
                              }else if(valueItem["current_period"] == "Primer Tiempo Extra"){
                                addMinutes = 90;
                              }else if(valueItem["current_period"] == "Segundo Tiempo Extra"){
                                addMinutes = 105;
                              }

                              totalMinutes = totalMinutes + addMinutes;

                              if(valueItem["match_status"] == "Programado" && $(valuelr).find(".title").text() != "Por comenzar"){
                                var aDateRest = new Date();
                                var actualHoursRest = valueItem["server_time"].split("T")[1].slice(0,-1);
                                var actualDaysRest = valueItem["server_time"].split("T")[0];
                                actualHoursRest = actualHoursRest.split(":");
                                var aaRest = aDateRest.setHours(actualHoursRest[0], actualHoursRest[1], actualHoursRest[2]);

                                var sDateRest = new Date();
                                var startHoursRest = valueItem["match_date"].split("T")[1].slice(0,-1);
                                var startDaysRest = valueItem["match_date"].split("T")[0];
                                startHoursRest = startHoursRest.split(":");
                                var bbRest = sDateRest.setHours(startHoursRest[0], startHoursRest[1], startHoursRest[2]);

                                var acDaysRest = new Date(actualDaysRest).getTime();
                                var stDaysRest = new Date(startDaysRest).getTime();
                                var totalDaysRest = stDaysRest - acDaysRest;

                                var timeGapRest = Math.abs(aaRest - bbRest);
                                var totalMinutesRest = Math.floor((timeGapRest/1000)/60);

                                if (totalDaysRest === 0) {
                                  if(totalMinutesRest < 15){
                                    $(valuelr).find(".title").text("Por comenzar");
                                  }
                                }
                              }else if(valueItem["match_status"] == "Jugando" && valueItem["current_period_stop_time"] == null){
                                if(!flagTimer){
                                  var input = {
                                      year: 0,
                                      month: 0,
                                      day: 0,
                                      hours: 0,
                                      minutes: totalMinutes,
                                      seconds: seconds
                                  };

                                  var timestamp = new Date(input.year, input.month, input.day,
                                  input.hours, input.minutes, input.seconds);

                                  var interval = 1;
                                  flagTimer = true;

                                  clearInterval(intervals[matchId]);

                                  timerIntervalEx = setInterval(function () {
                                      timestamp = new Date(timestamp.getTime() + interval * 1000);
                                      var secondsT = timestamp.getSeconds();
                                      if(secondsT == 0){
                                        totalMinutes = totalMinutes + 1;
                                      }
                                      var minutesT = totalMinutes;
                                      if(minutesT < 10){
                                        minutesT = "0" + minutesT;
                                      }
                                      if(secondsT < 10){
                                        secondsT = "0" + secondsT;
                                      }

                                      var periodTimer = "";
                                      if(valueItem["current_period"] == "Penales" && valueItem["match_status"]=="Jugando"){
                                        periodTimer = "Penales";
                                      }else if(valueItem["current_period"] == "Primer Tiempo"){
                                        periodTimer = "1T/" + minutesT + ':' + secondsT + '';
                                      }else if(valueItem["current_period"] == "Segundo Tiempo"){
                                        periodTimer = "2T/" + minutesT + ':' + secondsT + '';
                                      }else if(valueItem["current_period"] == "Primer Tiempo Extra"){
                                        periodTimer = "1TE/" + minutesT + ':' + secondsT + '';
                                      }else if(valueItem["current_period"] == "Segundo Tiempo Extra"){
                                        periodTimer = "2TE/" + minutesT + ':' + secondsT + '';
                                      }else{
                                        periodTimer = minutesT + ':' + secondsT + '';
                                      }
                                      $(valuelr).find(".title").text(periodTimer);
                                  }, Math.abs(interval) * 1000);
                                  intervals[matchId] = timerIntervalEx;
                                }
                              }
                              var hostMAM = "/external/ulama/"+valueItem["match_id"];
                              if(valueItem["match_status"] == "Terminado"){
                                var score = valueItem["home_team_score"];
                                if( valueItem["home_team_shoot_out_score"] != null){
                                  score = score + "(" + valueItem["home_team_shoot_out_score"] + ")";
                                }
                                var scoreAway = valueItem["away_team_score"];
                                if( valueItem["away_team_shoot_out_score"] != null){
                                  scoreAway = scoreAway + "(" + valueItem["home_team_shoot_out_score"] + ")";
                                }
                                $(valuelr).find(".team-first").find(".team-score").html("<a href='"+hostMAM+"'>"+score+"</a>");
                                $(valuelr).find(".team-second").find(".team-score").html("<a href='"+hostMAM+"'>"+scoreAway+"</a>");
                              }else if (valueItem["match_status"] == "Jugando" || valueItem["match_status"] == "Programado" ){
                                if( valueItem["home_team_odds"] == null){
                                  if(valueItem["match_status"] == "Jugando"){
                                    var score = valueItem["home_team_score"];
                                    if( valueItem["home_team_shoot_out_score"] != null){
                                       score = score + "(" + valueItem["home_team_shoot_out_score"] + ")";
                                    }
                                    $(valuelr).find(".team-first").find(".team-score").html("<a href='"+hostMAM+"'>"+score+"</a>");
                                  }
                                }else{
                                  if(valueItem["match_status"] == "Jugando"){
                                    var score = valueItem["home_team_score"];
                                    if( valueItem["home_team_shoot_out_score"] != null){
                                       score = score + "(" + valueItem["home_team_shoot_out_score"] + ")";
                                    }
                                  }
                                  if(valueItem["match_status"] == "Programado"){
                                    $(valuelr).find(".team-first").find(".team-score").html('<a href="http://online.caliente.mx/promoRedirect?key=ej01NTE5MzgxOCZsPTAmcD0xODgyMTQz&amp;LANGUAGE_CODE=es_MX&amp;BET_REF='+valueItem["home_team_bet_id"]+'" target="_blank">'+valueItem["home_team_odds"]+'</a>');
                                  }else if(valueItem["match_status"] == "Jugando"){
                                    $(valuelr).find(".team-first").find(".team-score").html('<a href="'+hostMAM+'">'+score+' </a><a href="http://online.caliente.mx/promoRedirect?key=ej01NTE5MzgxOCZsPTAmcD0xODgyMTQz&amp;LANGUAGE_CODE=es_MX&amp;BET_REF='+valueItem["home_team_bet_id"]+'" target="_blank">'+valueItem["home_team_odds"]+'</a>');
                                  }

                                }

                                if( valueItem["draw_odds"] != null ){
                                  $(valuelr).find(".team-first").find(".team-score").append('<span class="odds-home"><a href="http://online.caliente.mx/promoRedirect?key=ej01NTE5MzgxOCZsPTAmcD0xODgyMTQz&amp;LANGUAGE_CODE=es_MX&amp;BET_REF='+valueItem["draw_bet_id"]+'" target="_blank">'+valueItem["draw_odds"]+'</a></span>');
                                }

                                if( valueItem["away_team_odds"] == null){
                                  if(valueItem["match_status"] == "Jugando"){
                                    var scoreAway = valueItem["away_team_score"];
                                    if( valueItem["away_team_shoot_out_score"] != null){
                                       scoreAway = scoreAway + "(" + valueItem["away_team_shoot_out_score"] + ")";
                                    }
                                    $(valuelr).find(".team-second").find(".team-score").html("<a href='"+hostMAM+"'>"+score+"</a>");
                                  }

                                }else{
                                  if(valueItem["match_status"] == "Jugando"){
                                    var scoreAway = valueItem["away_team_score"];
                                    if( valueItem["away_team_shoot_out_score"] != null){
                                       scoreAway = scoreAway + "(" + valueItem["away_team_shoot_out_score"] + ")";
                                    }
                                    $(valuelr).find(".team-second").find(".team-score").html("<a href='"+hostMAM+"'>"+scoreAway+"</a>");
                                  }
                                  if(valueItem["match_status"] == "Programado"){
                                    $(valuelr).find(".team-second").find(".team-score").html('<a href="http://online.caliente.mx/promoRedirect?key=ej01NTE5MzgxOCZsPTAmcD0xODgyMTQz&amp;LANGUAGE_CODE=es_MX&amp;BET_REF='+valueItem["away_team_bet_id"]+'" target="_blank">'+valueItem["away_team_odds"]+'</a>');
                                  }else if(valueItem["match_status"] == "Jugando"){
                                    $(valuelr).find(".team-second").find(".team-score").html('<a href="'+hostMAM+'">'+scoreAway+' </a><a href="http://online.caliente.mx/promoRedirect?key=ej01NTE5MzgxOCZsPTAmcD0xODgyMTQz&amp;LANGUAGE_CODE=es_MX&amp;BET_REF='+valueItem["away_team_bet_id"]+'" target="_blank">'+valueItem["away_team_odds"]+'</a>');
                                  }
                                }
                              }
                            }
                          });
                        }
                      }
                    });
                  });
                }
              });
            }, 60000);
          }
        }
      });
    }
  }
}

export default TickerCaliente;
