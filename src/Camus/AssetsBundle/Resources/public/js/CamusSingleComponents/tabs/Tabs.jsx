import React from 'react';
import $ from "jquery";

class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.addTabs();
    this.addRadio();
  }

  addTabs() {
    var tabItems = $(this.props).find(".tabs li"),
    contentItems = $(this.props).find(".tab-content"),
    jSelect = $(this.props).find(".editions-list");

    var tabActiveClass = "tab-title-active",
    contentActiveClass = "tab-active";

    tabItems.on("click", function() {
      if(this.classList.contains(tabActiveClass) === false) {
        tabItems.removeClass(tabActiveClass);
        this.classList.add(tabActiveClass);

        contentItems.removeClass(contentActiveClass);
        contentItems.eq($(this).index()).addClass(contentActiveClass);
      }
    });

    if(jSelect.length){
      jSelect.on("change", function() {
        $.ajax({
          type: "POST",
          async: true,
          url: "/sport-results",
          data: {
            "day": $(this).val()
          },
          dataType: "json",
          success: function(data){
            var jTable = "";
            $.each(data, function(key, value) {
              jTable += '<tr>'+
              '<td class="start-date">'+value.startdate+'</td>'+
              '<td class="start-time">'+value.starttime+'</td>'+
              '<td class="team-home">'+value.home_team+'</td>'+
              '<td class="logo-home"><img src="'+value.img_home+'"/></td>'+
              '<td class="score">'+value.home_score+'-'+value.away_score+'</td>'+
              '<td class="logo-away"><img src="'+value.img_away+'"/></td>'+
              '<td class="team-away">'+value.away_team+'</td>'+
              '</tr>';
            });
            $(".grid-container-results .grid tr:nth-child(n+2)").remove();
            $(".grid-container-results .grid tbody").append(jTable);
          },
          complete:function(xhr,status){}
        });
      });
    }
  }

  addRadio() {
    var contentItems = $(this.props).find(".tab-content .player"),
    playIcons = contentItems.find(".sphere"),
    audioContainers = contentItems.find(".audio-container");

    contentItems.each(function(){
      var playIcon = $(this).find(".sphere");
      var audioContainer = $(this).find(".audio-container")[0];
      playIcon.click(function(){
        var frameUrl = $(audioContainer).attr("data-link");
      })
    })
  }
}

export default Tabs;
