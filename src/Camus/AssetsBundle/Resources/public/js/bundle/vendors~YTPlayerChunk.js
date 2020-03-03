(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[7],{

/***/ 212:
/***/ (function(module, exports, __webpack_require__) {

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var EventEmitter = __webpack_require__(213).EventEmitter;

var loadScript = __webpack_require__(214);

var YOUTUBE_IFRAME_API_SRC = 'https://www.youtube.com/iframe_api';
var YOUTUBE_STATES = {
  '-1': 'unstarted',
  0: 'ended',
  1: 'playing',
  2: 'paused',
  3: 'buffering',
  5: 'cued'
};
var YOUTUBE_ERROR = {
  // The request contains an invalid parameter value. For example, this error
  // occurs if you specify a videoId that does not have 11 characters, or if the
  // videoId contains invalid characters, such as exclamation points or asterisks.
  INVALID_PARAM: 2,
  // The requested content cannot be played in an HTML5 player or another error
  // related to the HTML5 player has occurred.
  HTML5_ERROR: 5,
  // The video requested was not found. This error occurs when a video has been
  // removed (for any reason) or has been marked as private.
  NOT_FOUND: 100,
  // The owner of the requested video does not allow it to be played in embedded
  // players.
  UNPLAYABLE_1: 101,
  // This error is the same as 101. It's just a 101 error in disguise!
  UNPLAYABLE_2: 150
};
var loadIframeAPICallbacks = [];
/**
 * YouTube Player. Exposes a better API, with nicer events.
 * @param {HTMLElement|selector} element
 */

var YouTubePlayer =
/*#__PURE__*/
function (_EventEmitter) {
  _inherits(YouTubePlayer, _EventEmitter);

  function YouTubePlayer(element, opts) {
    var _this;

    _classCallCheck(this, YouTubePlayer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(YouTubePlayer).call(this));
    var elem = typeof element === 'string' ? document.querySelector(element) : element;

    if (elem.id) {
      _this._id = elem.id; // use existing element id
    } else {
      _this._id = elem.id = 'ytplayer-' + Math.random().toString(16).slice(2, 8);
    }

    _this._opts = Object.assign({
      width: 640,
      height: 360,
      autoplay: false,
      captions: undefined,
      controls: true,
      keyboard: true,
      fullscreen: true,
      annotations: true,
      modestBranding: false,
      related: true,
      timeupdateFrequency: 1000,
      playsInline: true
    }, opts);
    _this.videoId = null;
    _this.destroyed = false;
    _this._api = null;
    _this._autoplay = false; // autoplay the first video?

    _this._player = null;
    _this._ready = false; // is player ready?

    _this._queue = [];
    _this._interval = null; // Setup listeners for 'timeupdate' events. The YouTube Player does not fire
    // 'timeupdate' events, so they are simulated using a setInterval().

    _this._startInterval = _this._startInterval.bind(_assertThisInitialized(_this));
    _this._stopInterval = _this._stopInterval.bind(_assertThisInitialized(_this));

    _this.on('playing', _this._startInterval);

    _this.on('unstarted', _this._stopInterval);

    _this.on('ended', _this._stopInterval);

    _this.on('paused', _this._stopInterval);

    _this.on('buffering', _this._stopInterval);

    _this._loadIframeAPI(function (err, api) {
      if (err) return _this._destroy(new Error('YouTube Iframe API failed to load'));
      _this._api = api; // If load(videoId, [autoplay]) was called before Iframe API loaded, ensure it gets
      // called again now

      if (_this.videoId) _this.load(_this.videoId, _this._autoplay);
    });

    return _this;
  }

  _createClass(YouTubePlayer, [{
    key: "load",
    value: function load(videoId) {
      var autoplay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (this.destroyed) return;
      this.videoId = videoId;
      this._autoplay = autoplay; // If the Iframe API is not ready yet, do nothing. Once the Iframe API is
      // ready, `load(this.videoId)` will be called.

      if (!this._api) return; // If there is no player instance, create one.

      if (!this._player) {
        this._createPlayer(videoId);

        return;
      } // If the player instance is not ready yet, do nothing. Once the player
      // instance is ready, `load(this.videoId)` will be called. This ensures that
      // the last call to `load()` is the one that takes effect.


      if (!this._ready) return; // If the player instance is ready, load the given `videoId`.

      if (autoplay) {
        this._player.loadVideoById(videoId);
      } else {
        this._player.cueVideoById(videoId);
      }
    }
  }, {
    key: "play",
    value: function play() {
      if (this._ready) this._player.playVideo();else this._queueCommand('play');
    }
  }, {
    key: "pause",
    value: function pause() {
      if (this._ready) this._player.pauseVideo();else this._queueCommand('pause');
    }
  }, {
    key: "stop",
    value: function stop() {
      if (this._ready) this._player.stopVideo();else this._queueCommand('stop');
    }
  }, {
    key: "seek",
    value: function seek(seconds) {
      if (this._ready) this._player.seekTo(seconds, true);else this._queueCommand('seek', seconds);
    }
  }, {
    key: "setVolume",
    value: function setVolume(volume) {
      if (this._ready) this._player.setVolume(volume);else this._queueCommand('setVolume', volume);
    }
  }, {
    key: "getVolume",
    value: function getVolume() {
      return this._ready && this._player.getVolume() || 0;
    }
  }, {
    key: "mute",
    value: function mute() {
      if (this._ready) this._player.mute();else this._queueCommand('mute');
    }
  }, {
    key: "unMute",
    value: function unMute() {
      if (this._ready) this._player.unMute();else this._queueCommand('unMute');
    }
  }, {
    key: "isMuted",
    value: function isMuted() {
      return this._ready && this._player.isMuted() || false;
    }
  }, {
    key: "setSize",
    value: function setSize(width, height) {
      if (this._ready) this._player.setSize(width, height);else this._queueCommand('setSize', width, height);
    }
  }, {
    key: "setPlaybackRate",
    value: function setPlaybackRate(rate) {
      if (this._ready) this._player.setPlaybackRate(rate);else this._queueCommand('setPlaybackRate', rate);
    }
  }, {
    key: "setPlaybackQuality",
    value: function setPlaybackQuality(suggestedQuality) {
      if (this._ready) this._player.setPlaybackQuality(suggestedQuality);else this._queueCommand('setPlaybackQuality', suggestedQuality);
    }
  }, {
    key: "getPlaybackRate",
    value: function getPlaybackRate() {
      return this._ready && this._player.getPlaybackRate() || 1;
    }
  }, {
    key: "getAvailablePlaybackRates",
    value: function getAvailablePlaybackRates() {
      return this._ready && this._player.getAvailablePlaybackRates() || [1];
    }
  }, {
    key: "getDuration",
    value: function getDuration() {
      return this._ready && this._player.getDuration() || 0;
    }
  }, {
    key: "getProgress",
    value: function getProgress() {
      return this._ready && this._player.getVideoLoadedFraction() || 0;
    }
  }, {
    key: "getState",
    value: function getState() {
      return this._ready && YOUTUBE_STATES[this._player.getPlayerState()] || 'unstarted';
    }
  }, {
    key: "getCurrentTime",
    value: function getCurrentTime() {
      return this._ready && this._player.getCurrentTime() || 0;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this._destroy();
    }
  }, {
    key: "_destroy",
    value: function _destroy(err) {
      if (this.destroyed) return;
      this.destroyed = true;

      if (this._player) {
        this._player.stopVideo && this._player.stopVideo();

        this._player.destroy();
      }

      this.videoId = null;
      this._id = null;
      this._opts = null;
      this._api = null;
      this._player = null;
      this._ready = false;
      this._queue = null;

      this._stopInterval();

      this.removeListener('playing', this._startInterval);
      this.removeListener('paused', this._stopInterval);
      this.removeListener('buffering', this._stopInterval);
      this.removeListener('unstarted', this._stopInterval);
      this.removeListener('ended', this._stopInterval);
      if (err) this.emit('error', err);
    }
  }, {
    key: "_queueCommand",
    value: function _queueCommand(command) {
      if (this.destroyed) return;

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      this._queue.push([command, args]);
    }
  }, {
    key: "_flushQueue",
    value: function _flushQueue() {
      while (this._queue.length) {
        var command = this._queue.shift();

        this[command[0]].apply(this, command[1]);
      }
    }
  }, {
    key: "_loadIframeAPI",
    value: function _loadIframeAPI(cb) {
      // If API is loaded, there is nothing else to do
      if (window.YT && typeof window.YT.Player === 'function') {
        return cb(null, window.YT);
      } // Otherwise, queue callback until API is loaded


      loadIframeAPICallbacks.push(cb);
      var scripts = Array.from(document.getElementsByTagName('script'));
      var isLoading = scripts.some(function (script) {
        return script.src === YOUTUBE_IFRAME_API_SRC;
      }); // If API <script> tag is not present in the page, inject it. Ensures that
      // if user includes a hardcoded <script> tag in HTML for performance, another
      // one will not be added

      if (!isLoading) {
        loadScript(YOUTUBE_IFRAME_API_SRC)["catch"](function (err) {
          while (loadIframeAPICallbacks.length) {
            var loadCb = loadIframeAPICallbacks.shift();
            loadCb(err);
          }
        });
      } // If ready function is not present, create it


      if (typeof window.onYouTubeIframeAPIReady !== 'function') {
        window.onYouTubeIframeAPIReady = function () {
          while (loadIframeAPICallbacks.length) {
            var loadCb = loadIframeAPICallbacks.shift();
            loadCb(null, window.YT);
          }
        };
      }
    }
  }, {
    key: "_createPlayer",
    value: function _createPlayer(videoId) {
      var _this2 = this;

      if (this.destroyed) return;
      var opts = this._opts;
      this._player = new this._api.Player(this._id, {
        width: opts.width,
        height: opts.height,
        videoId: videoId,
        playerVars: {
          // This parameter specifies whether the initial video will automatically
          // start to play when the player loads. Supported values are 0 or 1. The
          // default value is 0.
          autoplay: opts.autoplay ? 1 : 0,
          // Setting the parameter's value to 1 causes closed captions to be shown
          // by default, even if the user has turned captions off. The default
          // behavior is based on user preference.
          cc_load_policy: opts.captions != null ? opts.captions !== false ? 1 : 0 : undefined,
          // default to not setting this option
          // Sets the player's interface language. The parameter value is an ISO
          // 639-1 two-letter language code or a fully specified locale. For
          // example, fr and fr-ca are both valid values. Other language input
          // codes, such as IETF language tags (BCP 47) might also be handled
          // properly.
          hl: opts.captions != null && opts.captions !== false ? opts.captions : undefined,
          // default to not setting this option
          // This parameter specifies the default language that the player will
          // use to display captions. Set the parameter's value to an ISO 639-1
          // two-letter language code.
          cc_lang_pref: opts.captions != null && opts.captions !== false ? opts.captions : undefined,
          // default to not setting this option
          // This parameter indicates whether the video player controls are
          // displayed. For IFrame embeds that load a Flash player, it also defines
          // when the controls display in the player as well as when the player
          // will load. Supported values are:
          //   - controls=0 – Player controls do not display in the player. For
          //                  IFrame embeds, the Flash player loads immediately.
          //   - controls=1 – (default) Player controls display in the player. For
          //                  IFrame embeds, the controls display immediately and
          //                  the Flash player also loads immediately.
          //   - controls=2 – Player controls display in the player. For IFrame
          //                  embeds, the controls display and the Flash player
          //                  loads after the user initiates the video playback.
          controls: opts.controls ? 2 : 0,
          // Setting the parameter's value to 1 causes the player to not respond to
          // keyboard controls. The default value is 0, which means that keyboard
          // controls are enabled.
          disablekb: opts.keyboard ? 0 : 1,
          // Setting the parameter's value to 1 enables the player to be
          // controlled via IFrame or JavaScript Player API calls. The default
          // value is 0, which means that the player cannot be controlled using
          // those APIs.
          enablejsapi: 1,
          // Setting this parameter to 0 prevents the fullscreen button from
          // displaying in the player. The default value is 1, which causes the
          // fullscreen button to display.
          fs: opts.fullscreen ? 1 : 0,
          // Setting the parameter's value to 1 causes video annotations to be
          // shown by default, whereas setting to 3 causes video annotations to not
          // be shown by default. The default value is 1.
          iv_load_policy: opts.annotations ? 1 : 3,
          // This parameter lets you use a YouTube player that does not show a
          // YouTube logo. Set the parameter value to 1 to prevent the YouTube logo
          // from displaying in the control bar. Note that a small YouTube text
          // label will still display in the upper-right corner of a paused video
          // when the user's mouse pointer hovers over the player.
          modestbranding: opts.modestBranding ? 1 : 0,
          // This parameter provides an extra security measure for the IFrame API
          // and is only supported for IFrame embeds. If you are using the IFrame
          // API, which means you are setting the enablejsapi parameter value to 1,
          // you should always specify your domain as the origin parameter value.
          origin: window.location.origin,
          // This parameter controls whether videos play inline or fullscreen in an
          // HTML5 player on iOS. Valid values are:
          //   - 0: This value causes fullscreen playback. This is currently the
          //        default value, though the default is subject to change.
          //   - 1: This value causes inline playback for UIWebViews created with
          //        the allowsInlineMediaPlayback property set to TRUE.
          playsinline: opts.playsInline ? 1 : 0,
          // This parameter indicates whether the player should show related
          // videos from the same channel (0) or from any channel (1) when
          // playback of the video ends. The default value is 1.
          rel: opts.related ? 1 : 0,
          // (Not part of documented API) Allow html elements with higher z-index
          // to be shown on top of the YouTube player.
          wmode: 'opaque'
        },
        events: {
          onReady: function onReady() {
            return _this2._onReady(videoId);
          },
          onStateChange: function onStateChange(data) {
            return _this2._onStateChange(data);
          },
          onPlaybackQualityChange: function onPlaybackQualityChange(data) {
            return _this2._onPlaybackQualityChange(data);
          },
          onPlaybackRateChange: function onPlaybackRateChange(data) {
            return _this2._onPlaybackRateChange(data);
          },
          onError: function onError(data) {
            return _this2._onError(data);
          }
        }
      });
    }
    /**
     * This event fires when the player has finished loading and is ready to begin
     * receiving API calls.
     */

  }, {
    key: "_onReady",
    value: function _onReady(videoId) {
      if (this.destroyed) return;
      this._ready = true; // Once the player is ready, always call `load(videoId, [autoplay])` to handle
      // these possible cases:
      //
      //   1. `load(videoId, true)` was called before the player was ready. Ensure that
      //      the selected video starts to play.
      //
      //   2. `load(videoId, false)` was called before the player was ready. Now the
      //      player is ready and there's nothing to do.
      //
      //   3. `load(videoId, [autoplay])` was called multiple times before the player
      //      was ready. Therefore, the player was initialized with the wrong videoId,
      //      so load the latest videoId and potentially autoplay it.

      this.load(this.videoId, this._autoplay);

      this._flushQueue();
    }
    /**
     * Called when the player's state changes. We emit friendly events so the user
     * doesn't need to use YouTube's YT.PlayerState.* event constants.
     */

  }, {
    key: "_onStateChange",
    value: function _onStateChange(data) {
      if (this.destroyed) return;
      var state = YOUTUBE_STATES[data.data];

      if (state) {
        // Send a 'timeupdate' anytime the state changes. When the video halts for any
        // reason ('paused', 'buffering', or 'ended') no further 'timeupdate' events
        // should fire until the video unhalts.
        if (['paused', 'buffering', 'ended'].includes(state)) this._onTimeupdate();
        this.emit(state); // When the video changes ('unstarted' or 'cued') or starts ('playing') then a
        // 'timeupdate' should follow afterwards (never before!) to reset the time.

        if (['unstarted', 'playing', 'cued'].includes(state)) this._onTimeupdate();
      } else {
        throw new Error('Unrecognized state change: ' + data);
      }
    }
    /**
     * This event fires whenever the video playback quality changes. Possible
     * values are: 'small', 'medium', 'large', 'hd720', 'hd1080', 'highres'.
     */

  }, {
    key: "_onPlaybackQualityChange",
    value: function _onPlaybackQualityChange(data) {
      if (this.destroyed) return;
      this.emit('playbackQualityChange', data.data);
    }
    /**
     * This event fires whenever the video playback rate changes.
     */

  }, {
    key: "_onPlaybackRateChange",
    value: function _onPlaybackRateChange(data) {
      if (this.destroyed) return;
      this.emit('playbackRateChange', data.data);
    }
    /**
     * This event fires if an error occurs in the player.
     */

  }, {
    key: "_onError",
    value: function _onError(data) {
      if (this.destroyed) return;
      var code = data.data; // The HTML5_ERROR error occurs when the YouTube player needs to switch from
      // HTML5 to Flash to show an ad. Ignore it.

      if (code === YOUTUBE_ERROR.HTML5_ERROR) return; // The remaining error types occur when the YouTube player cannot play the
      // given video. This is not a fatal error. Report it as unplayable so the user
      // has an opportunity to play another video.

      if (code === YOUTUBE_ERROR.UNPLAYABLE_1 || code === YOUTUBE_ERROR.UNPLAYABLE_2 || code === YOUTUBE_ERROR.NOT_FOUND || code === YOUTUBE_ERROR.INVALID_PARAM) {
        return this.emit('unplayable', this.videoId);
      } // Unexpected error, does not match any known type


      this._destroy(new Error('YouTube Player Error. Unknown error code: ' + code));
    }
    /**
     * This event fires when the time indicated by the `getCurrentTime()` method
     * has been updated.
     */

  }, {
    key: "_onTimeupdate",
    value: function _onTimeupdate() {
      this.emit('timeupdate', this.getCurrentTime());
    }
  }, {
    key: "_startInterval",
    value: function _startInterval() {
      var _this3 = this;

      this._interval = setInterval(function () {
        return _this3._onTimeupdate();
      }, this._opts.timeupdateFrequency);
    }
  }, {
    key: "_stopInterval",
    value: function _stopInterval() {
      clearInterval(this._interval);
      this._interval = null;
    }
  }]);

  return YouTubePlayer;
}(EventEmitter);

module.exports = YouTubePlayer;

/***/ }),

/***/ 213:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function $getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return $getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = $getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  var args = [];
  for (var i = 0; i < arguments.length; i++) args.push(arguments[i]);
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    ReflectApply(this.listener, this.target, args);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      if (typeof listener !== 'function') {
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
      }
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      if (typeof listener !== 'function') {
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
      }

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}


/***/ }),

/***/ 214:
/***/ (function(module, exports) {

module.exports = function loadScript2 (src, attrs, parentNode) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.async = true
    script.src = src

    for (const [k, v] of Object.entries(attrs || {})) {
      script.setAttribute(k, v)
    }

    script.onload = () => {
      script.onerror = script.onload = null
      resolve(script)
    }

    script.onerror = () => {
      script.onerror = script.onload = null
      reject(new Error(`Failed to load ${src}`))
    }

    const node = parentNode || document.head || document.getElementsByTagName('head')[0]
    node.appendChild(script)
  })
}


/***/ })

}]);