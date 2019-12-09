videojs.registerPlugin('playlistMilenio', function(options) {
  var player = this,
  timeoutID = "",
  videoID = player.getAttribute("data-video-id"),
  catalogID = "",
  catalogLink = "",
  catalogImg = "",
  catalogTime = "",
  catalogTitle = "",
  catalogDesc = "";
  overlay = document.createElement('div');
  overlay.className = 'playlist-overlay playlist-hidden';

  $.get("http://pre.camus.milenio.com/playlist-props", function(data, status){
    overlay.innerHTML = data.html;

    player.el().appendChild(overlay);

    //catalogID = data.catalog[0];

    //var catlogLen = data.catalog.length;
    // $.each(data.catalog, function(i, v) {
    //   if(videoID == data.catalog[ catlogLen - 1 ]) {
    //     catalogID = data.catalog[0];
    //     return false;
    //   }else if(videoID == v) {
    //     catalogID = data.catalog[i + 1];
    //     return false;
    //   }
    // });

    //var vidsListLen = data.vidsList.length;
    // $.each(data.vidsList, function(i, v) {
    //   if(videoID == data.vidsList[vidsListLen - 1].id) {
    //     catalogID = data.vidsList[0].id;
    //     return false;
    //   } else if(videoID == v.id) {
    //     catalogID = data.vidsList[i + 1].id;
    //     return false;
    //   }
    // });

    player.on("pause", function() {
      $(overlay).removeClass("playlist-hidden");
    });

    player.on("play", function() {
      $(overlay).addClass("playlist-hidden");
      //clearInterval(intervalID);
    });

    player.on("ended", function() {
      videoID = player.getAttribute("data-video-id");
      $(overlay).find(".playlist-catalog").addClass("playlist-displace");
      $(overlay).find(".playlist-next").show();
      $(overlay).removeClass("playlist-hidden");
      //clearInterval(intervalID);

      var counter = 10;
      var intervalID = setInterval(function() {
        $(overlay).find(".playlist-counter").html = counter;

        if(counter <= 0) {
          clearInterval(intervalID);

          var vidsListLen = data.vidsList.length;
          $.each(data.vidsList, function(i, v) {
            if(videoID == data.vidsList[vidsListLen - 1].id) {
              catalogID = data.vidsList[0].id;
              catalogLink = "/mileniotv/"+data.vidsList[0].seccionNormalizado+"/"+data.vidsList[0].tituloNormalizado;
              catalogImg = data.vidsList[0].urlImagenFondo;
              catalogTime = data.vidsList[0].duracion;
              catalogTitle = data.vidsList[0].titulo;
              catalogDesc = data.vidsList[0].descripcion;
              return false;
            }
            if(videoID == v.id) {
              catalogID = data.vidsList[i + 1].id;
              catalogLink = "/mileniotv/"+data.vidsList[i + 1].seccionNormalizado+"/"+data.vidsList[i + 1].tituloNormalizado;
              catalogImg = data.vidsList[i + 1].urlImagenFondo
              catalogTime = data.vidsList[i + 1].duracion
              catalogTitle = data.vidsList[i + 1].titulo
              catalogDesc = data.vidsList[i + 1].descripcion
              return false;
            }
          });

          $(overlay).find(".next-link").attr("src", catalogLink);
          $(overlay).find(".next-img").attr("src", catalogImg);
          $(overlay).find(".next-time").html(catalogTime);
          $(overlay).find(".next-title").html(catalogTitle);
          $(overlay).find(".next-desc").html(catalogDesc);

          $(overlay).find(".playlist-next").hide();
          $(overlay).find(".playlist-catalog").removeClass("playlist-displace");

          player.catalog.getVideo(catalogID, function(err, vid) {
            player.catalog.load(vid);
            player.play();
          });
        }

        counter -= 1;
      }, 1000);
    });
  }, "json");
});
