import $ from "jquery";

export default function Canvas(){
  try {
    if(!window.location.pathname.match(/\/ficha$/)) throw false;
  } catch (e) {
    return e;
  }

  var c = document.getElementById("fieldImage"),
  ctx = c.getContext("2d"),
  centerX = c.width / 2,
  centerY = c.height / 2,
  offsetX,offsetY,
  radius = 11,
  white = '#FFFFFF',
  yellow = '#FBAF3F',
  black = '#000000',
  matchPlayersData = [];

  reOffset();

  window.onscroll=function(e){ reOffset(); }
  window.onresize=function(e){ reOffset(); }
  var wrappers = document.querySelectorAll('.player-wrapper');
  var shirts = document.querySelectorAll('.wrapper-player');

  function shirtListener(e) {
    var playerId = this.id.replace('player-shirt-', '');
    if(playerId) {
      var shirt = document.querySelector('[data-id="' + playerId + '"]');
      if(e.type === "mouseover") {
        shirt.classList.add('active');
      } else {
        shirt.classList.remove('active');
      }
    }
  }
  playersItem('.home-lineup .wrapper-lineup .player-wrapper', 'home');
  playersItem('.away-lineup .wrapper-lineup .player-wrapper', 'away');

  // Listen for mouse moves
  c.addEventListener('mousemove', function(e) {
    // mouse position
    mouseX=parseInt(e.clientX-offsetX);
    mouseY=parseInt(e.clientY-offsetY);
    // Check whether point is inside circle
    $.each(matchPlayersData, function( circ ) {
      if (Math.sqrt((mouseX-matchPlayersData[circ][3])*(mouseX-matchPlayersData[circ][3]) + (mouseY-matchPlayersData[circ][4])*(mouseY-matchPlayersData[circ][4])) < 11) {
        playerItem(this[1],this[2],this[3],this[4],yellow,white,yellow);
        $('[data-id='+this[0]+']').css('background-color',yellow);
      }
      else {
        playerItem(this[1],this[2],this[3],this[4],this[5]);
        $('[data-id='+this[0]+']').removeAttr("style");
      }
    });
  });

  function reOffset(){
    var BB=c.getBoundingClientRect();
    offsetX=BB.left;
    offsetY=BB.top;
  }

  function simpleLine (x, y, pos_x, pos_y) {
    ctx.moveTo(pos_x,pos_y);
    ctx.lineTo(x,y);
    ctx.moveTo(0,0);
  }

  function simpleRectangle (x, y, pos_x, pos_y) {
    ctx.rect(pos_x, pos_y, x, y);
  }

  function simpleCircle (x, y, r, sAngle, eAngle, counterclockwise) {
    ctx.arc(x, y, r, sAngle * Math.PI, eAngle * Math.PI, counterclockwise);
  }

  function nameListener(e) {
    var playerId = this.dataset.id;
    ctx.lineWidth = 2;
    if(playerId) {
      var matchPlayerData = matchPlayersData.filter(function (ply) { return ply[0] == playerId; }),
          playerIdX = matchPlayerData[0][3],
          playerIdY = matchPlayerData[0][4];
      ctx.save();
      ctx.beginPath();
      if(e.type === "mouseover") {
        playerItem(matchPlayerData[0][1],matchPlayerData[0][2],matchPlayerData[0][3],matchPlayerData[0][4],yellow,white,yellow);
        $(this).css('background-color',yellow);
      } else {
        playerItem(matchPlayerData[0][1],matchPlayerData[0][2],matchPlayerData[0][3],matchPlayerData[0][4],matchPlayerData[0][5]);
        $(this).removeAttr("style");
      }
      ctx.fill();
      ctx.stroke();
    }
  }

  function fieldArea() {
    var radius = 30;
    var fieldRectAreas = [
      [0, 10, c.width, c.height - 20],
      [centerX-15.03, 1.79, 30.06, 8.21],
      [centerX-38, 10, 76, 25],
      [centerX-88.5, 10, 167, 70],
      [centerX-15.03, 462, 30.06, 8.21],
      [centerX-38, 437, 76, 25],
      [centerX-88.5, 392, 167, 70]
    ];
    var fieldArcAreas = [
      [centerX, 70, 30, 0.1, -1.1, true],
      [centerX, centerY, radius, 0, 2, false],
      [centerX, 400, 30, 1.1, -0.1, true]
    ];
    ctx.lineWidth = 2;
    ctx.strokeStyle = white;
    simpleLine(c.width,centerY,0,centerY);
    for (i = 0; i < fieldRectAreas.length; i++) {
      simpleRectangle(fieldRectAreas[i][2],fieldRectAreas[i][3],fieldRectAreas[i][0],fieldRectAreas[i][1]);
    }
    ctx.stroke();
    for (j = 0; j < fieldArcAreas.length; j++) {
      ctx.beginPath();
      simpleCircle(fieldArcAreas[j][0],fieldArcAreas[j][1],fieldArcAreas[j][2],fieldArcAreas[j][3],fieldArcAreas[j][4]);
      ctx.stroke();
    }
  }

  function playerItem(location,shirt,coordX,coordY,colorStroke,textFill,colorFill) {
    ctx.beginPath();
    var radius = 11;
    ctx.lineWidth = 2;
    ctx.font = "12px roboto";
    simpleCircle(coordX, coordY, radius, 0, 2, false);
    ctx.strokeStyle = colorStroke;
    var shirt_y = coordY - 5;
    if (parseInt(shirt) >= 100) {
      var shirt_x = coordX - 9;
    } else if (parseInt(shirt) >= 10) {
      var shirt_x = coordX - 6;
    } else {
      var shirt_x = coordX - 3;
    }
    ctx.fillStyle = colorFill || white;
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = textFill || black; // font color to write the text with
    var font = "bold 13px serif";
    ctx.font = font; // specify the font
    ctx.textBaseline = "top"; // set the baseline as top
    ctx.beginPath();
    ctx.fillText(shirt, shirt_x, shirt_y); // render the text with its x and y coordinates
  }

  function playersItem(lineup,location) {
    if (location == 'home') {
      var teamPlayers = teamSetting('.home-lineup .wrapper-lineup .player-wrapper');
      var colorStroke = yellow;
    } else if (location == 'away') {
      var teamPlayers = teamSetting('.away-lineup .wrapper-lineup .player-wrapper');
      var colorStroke = black;
    }
    var cnt = 1;
    $(lineup).not( ":last" ).each(function () {
      var id_player = $(this).attr('data-id');
      var shirt_player = $(this).find('.shirt-number').text();
      var pos_player = $(this).find('.position-wrapper').text();
      var coords = getCoords(teamPlayers, shirt_player, location, pos_player, cnt);
      playerItem(location,shirt_player,coords[1],coords[0], colorStroke);
      matchPlayersData.push([id_player,location,shirt_player,coords[1],coords[0],colorStroke]);
      if (cnt == coords[2]) {
        cnt = 0;
      }
      cnt = cnt + 1;
      this.addEventListener('mouseover', nameListener, false);
      this.addEventListener('mouseout', nameListener, false);
    });
  }

  // fieldArea();

  function getCoords(formation, shirt, location, pos, c) {
    var diameter = 26,
        canvasWidth = 281;
    switch (pos) {
      case 'Por':
        if (location == 'home') {
          var y = 18;
        } else if (location == 'away') {
          var y = 457;
        }
        var nmb = formation[0];
        break;
      case 'Def':
        if (location == 'home') {
          var y = 96;
        } else if (location == 'away') {
          var y = 374;
        }
        var idx = 1;
        nmb = formation[idx];
        break;
      case 'Med':
        if (location == 'home') {
          var y = 141;
        } else if (location == 'away') {
          var y = 329;
        }
        var idx = 2;
        nmb = formation[idx];
        break;
      case 'Del':
        if (location == 'home') {
          var y = 186;
        } else if (location == 'away') {
          var y = 284;
        }
        var idx = 3;
        nmb = formation[idx];
        break;
      default:
        // pass
    }
    var diam_x_nmb = diameter * nmb;
    var cnv_dxn = 281;
    return [y, (cnv_dxn/(nmb+1)*c), nmb];
  }

  function teamSetting(team) {
    var gk = 0,
        d = 0,
        m = 0,
        f = 0;
    $(team).not( ":last" ).each(function () {
      var pos_player = $(this).find('.position-wrapper').text();
      switch (pos_player) {
        case 'Por':
          gk = gk + 1;
          break;
        case 'Def':
          d = d + 1;
          break;
        case 'Med':
          m = m + 1;
          break;
        case 'Del':
          f = f + 1;
          break;
        default:
          // pass
      }
    });
    return [gk,d,m,f];
  }
}

new Canvas();
