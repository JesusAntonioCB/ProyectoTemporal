(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{133:function(t,e,n){"use strict";n.r(e);var r=n(1),o=n.n(r),c=n(18),a=n.n(c),i=n(0),l=n.n(i),u=n(123),f=n.n(u),p=n(132);function s(t){return(s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function y(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function d(t){return(d=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function b(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function h(t,e){return(h=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function m(t){return l()(".contenedor-notas-block, .nd-error404, #md-profile, .block-terms-conditions").length?null:o.a.createElement(p.a,{percent:t.perc,strokeLinecap:"square",strokeColor:"#E51B3F",style:{width:"100%",height:"5px"}})}var w=function(t){function e(){var t,n,r;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),n=this,(t=!(r=d(e).call(this))||"object"!==s(r)&&"function"!=typeof r?b(n):r).state={perc:0},t.myScrollStartHandler=t.myScrollStartHandler.bind(b(t)),t}var n,r,c;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&h(t,e)}(e,t),n=e,(r=[{key:"myScrollStartHandler",value:function(t){var e=t.target,n=100*Math.max(0,Math.min(1,l()(window).scrollTop()/(l()(e).height()-l()(window).height())));n>=1?this.setState({perc:n}):this.setState({perc:0})}},{key:"componentDidMount",value:function(){(new f.a).addScrollHandler("redband",this.myScrollStartHandler)}},{key:"render",value:function(){return o.a.createElement(m,{perc:this.state.perc})}}])&&y(n.prototype,r),c&&y(n,c),e}(o.a.Component);a.a.render(o.a.createElement(w,null),document.getElementById("container-redband")),e.default=w}}]);