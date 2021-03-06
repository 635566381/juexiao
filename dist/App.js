/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _item = __webpack_require__(3);

var _item2 = _interopRequireDefault(_item);

var _html2canvas = __webpack_require__(4);

var _html2canvas2 = _interopRequireDefault(_html2canvas);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// import mp3 from '../media/bgm.mp3'
// import DATA from '../data'


var App = {
	isClose: true,
	init: function init(option) {
		var option = option || {};
		var _this = this;
		this.currentItem = null;
		this.isProducePic = false;
		this.tabBtnNames = option.tabBtnNames || {};
		// console.log(DATA)
		this.preload.init();

		$("#view").on("touchmove", function (e) {
			e.preventDefault();
		});
	},
	ready: function ready() {
		// console.log(App)
		var _this = this;

		//生成菜单
		for (var k in DATA) {
			if (k !== "_res") {
				var name = this.tabBtnNames[k] || k;
				$(".cs-tab-tools").append('<div class="cs-tab-btn" style="background-image: url(' + name + ')"></div>');
				_this.setMenuItem(DATA[k]);
			}
		}
		$(".cs-tab-btn").eq(0).addClass("active");
		$(".cs-tab-con").eq(0).addClass("active");
		//关闭元素添加菜单
		$(".cs-btn-close").on("touchend", function (e) {
			if (App.isClose) {
				$(".cs-tab-layer").addClass("close");
				//$(".cs-tab-btn").removeClass("active");
				App.isClose = false;
			} else {
				$(".cs-tab-layer").removeClass("close");
				App.isClose = true;
			}
		});

		$(".btn-start").on("touchend", function (e) {
			$('.load').fadeOut(500);
			$(".main").fadeIn(500);
			e.preventDefault();
		});

		//菜单选项
		$(".cs-tab-btn").on("touchend", function (e) {
			var index = $(this).index(".cs-tab-btn");
			$(".cs-tab-layer").removeClass("close");
			App.isClose = true;
			$(".cs-tab-btn").removeClass("active").eq(index).addClass("active");
			$(".cs-tab-con").removeClass("active").eq(index).addClass("active");
		});

		//合成图片
		$(".cs-btn-camera").on("touchstart", function () {
			App.loading.show();
			$(".cs-item").removeClass("active");
			$(".cs-tab-layer,.footer").hide();
			$(".bottom").fadeIn(500);
			if (!App.isProducePic) {
				App.isProducePic = true;
				(0, _html2canvas2.default)($("#view").get(0)).then(function (canvas) {
					timeout(500).then(function () {
						$("<img>").attr("src", canvas.toDataURL()).addClass("cs-pic").appendTo($("body")).fadeIn(300);
						App.loading.hide();
						return timeout(1000);
					}).then(function () {
						$(".tip-layer").addClass("show");
						return timeout(3000);
					}).then(function () {
						$(".tip-layer").removeClass("show");
					});
				});
			}
		});

		function timeout(time) {
			return new Promise(function (resolve, reject) {
				setTimeout(resolve, time);
			});
		}
	},
	//相机显示隐藏判断，当画面元素数量大于或等于2时显示相机
	setCamera: function setCamera() {
		var itemCount = $("#room .cs-item").length;
		if (itemCount >= 2) {
			$(".cs-btn-camera").fadeIn(300);
		} else {
			$(".cs-btn-camera").hide();
		}
	},
	//生成元素菜单
	setMenuItem: function setMenuItem(dataList) {
		var _this = this;
		// console.log(dataList)
		var ul = $("<ul>", {
			class: "cs-tab-con"
		}).appendTo(".cs-tab-contents");
		for (var i = 0; i < dataList.length; i++) {
			var data = dataList[i];
			$('<li>').css({
				"backgroundImage": "url(" + data.url + ")",
				"backgroundSize": "auto 50%"
			}).data("index", i).appendTo(ul);
		}

		ul.on("touchstart", ">li", function () {
			_this.itemLastLeft = $(this).offset().left;
			_this.itemLastTop = $(this).offset().top;
		}).on("touchend", ">li", function () {
			if (Math.abs(_this.itemLastLeft - $(this).offset().left) < 15 && Math.abs(_this.itemLastTop - $(this).offset().top) < 15) {
				var index = $(this).data("index");
				_this.currentItem && _this.currentItem.removeClass("active");
				_this.currentItem = new _item2.default(dataList[index]);
				//				_this.currentItem.addClass("active");
				App.setCamera();
			}
			return false;
		});
	},
	//预加载
	preload: {
		res: [].concat(_toConsumableArray(DATA["_res"])),
		init: function init() {
			this.target = new createjs.LoadQueue();
			this.target.installPlugin(createjs.Sound);
			this.target.loadManifest(this.res);
			/*this.target.on('fileload',function (e) {
                $.get(e.item.src);
            })*/
			this.target.on("progress", this.progress);
			this.target.on("complete", this.complete);
		},
		progress: function progress(e) {
			var percent = (App.preload.target.progress * 100 | 0) + "%";
			$(".progress").text(percent);
		},
		complete: function complete() {
			$(".progress").hide();
			$(".progr").hide();
			$(".btn-start").fadeIn(400);
			App.music.init();
			App.ready();
		}
	},
	//	背景音乐控制
	music: {
		oBGM: null,
		init: function init() {
			return;
			App.music.oBGM = createjs.Sound.play('audio');
			App.music.oBGM.loop = -1;
			$("#music_ctrl").on("touchend", function () {
				if (!App.music.oBGM.paused) {
					App.music.pause();
					console.log("pause");
				} else {
					App.music.play();
				}
			});
		},
		pause: function pause() {
			App.music.oBGM.pause();
			$('#music_ctrl').addClass("stop");
		},
		play: function play() {
			App.music.oBGM.play();
			$('#music_ctrl').removeClass("stop");
		}
	},
	loading: {
		show: function show() {
			$(".loading-layer").fadeIn(300);
		},
		hide: function hide() {
			$(".loading-layer").fadeOut(300);
		}
	}
};

exports.default = App;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/icon_arrow2.png";

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _main = __webpack_require__(0);

var _main2 = _interopRequireDefault(_main);

__webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_main2.default.init({
    tabBtnNames: {
        "Items1": "img/icon/1.png",
        "Items2": "img/icon/2.png",
        "Items3": "img/icon/3.png",
        "Items4": "img/icon/4.png",
        "Items5": "img/icon/5.png"
    }
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _main = __webpack_require__(0);

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Item = function Item(option) {
	this.url = option.url;
	this.width = this.sourceWidth = option.width;
	this.height = this.sourceHeight = option.height;
	// this.id = option.id;
	this.isRotateBtn = option.isrotatebtn;
	this.init();
	return this.$itemElement;
};
//初始化数据
/*
 * 装饰元素对象
 * */
Item.prototype.init = function () {
	this.scale = 1;
	this.createElement();
	this.bindRemoveHandle();
	this.bindMoveHandle();
	this.bindResizeHandle();
	this.bindRotateHandle();
	this.$itemElement.itemDate = this;
};
//创建dom元素
Item.prototype.createElement = function () {
	var winWidth = $(window).width();
	var winHeight = $(window).height();
	this.left = winWidth / 2;
	this.top = (winHeight - this.height) / 2;
	this.isRotate = false;
	var newItem = $('<div class="cs-item active">\n    \t\t\t\t\t<img src="" alt="" class="cs-body" />\n    \t\t\t\t\t<div class="cs-btn-remove"></div>\n\t\t\t\t\t\t' + (this.isRotateBtn ? '<div class="cs-btn-rotate"></div>' : '') + '\n\t\t\t\t\t\t<div class="cs-btn-resize"></div>\n    \t\t\t\t</div>');
	newItem.width(this.width);
	newItem.height(this.height);
	newItem.css({
		"left": this.left + rdmFn(-15, 15),
		"top": this.top + rdmFn(-15, 15),
		"marginLeft": -this.width / 2,
		"marginTop": -this.height / 2
	});
	newItem.data('id', this.id);
	newItem.children(".cs-body").attr('src', this.url);
	newItem.appendTo($("#room"));
	this.$itemElement = newItem;
};
//调整元素大小
Item.prototype.bindResizeHandle = function () {
	var _this = this;
	var tx, ty, cx, cy;
	this.$itemElement.children(".cs-btn-resize").on("touchstart", function (e) {
		tx = e.touches[0].clientX;
		ty = e.touches[0].clientY;
		cx = _this.$itemElement.offset().left + _this.width / 2;
		cy = _this.$itemElement.offset().top + _this.height / 2;
		e.preventDefault();
		e.stopPropagation();
	}).on("touchmove", function (e) {
		e.preventDefault();
		e.stopPropagation();
		var x = e.touches[0].clientX - cx;
		var y = e.touches[0].clientY - cy;
		var l1 = Math.sqrt(Math.pow(x, 2), Math.pow(y, 2));
		var l2 = Math.sqrt(Math.pow(_this.sourceWidth / 2, 2), Math.pow(_this.sourceHeight / 2, 2));
		_this.scale = l1 / l2;
		if (_this.scale > 2.5 || _this.scale < 0.3) {
			return;
		}
		_this.width = _this.sourceWidth * _this.scale;
		_this.height = _this.sourceHeight * _this.scale;
		_this.$itemElement.css({
			"width": _this.width,
			"height": _this.height,
			"marginLeft": -_this.width / 2,
			"marginTop": -_this.height / 2
		});
		e.preventDefault();
		e.stopPropagation();
	}).on("touchend", function (e) {
		e.preventDefault();
		e.stopPropagation();
	});
};
//移除元素
Item.prototype.bindRemoveHandle = function () {
	var _this = this;
	this.$itemElement.children(".cs-btn-remove").on("touchend", function (e) {
		_this.$itemElement.off("touchstart");
		_this.$itemElement.off("touchmove");
		_this.$itemElement.off("touchend");
		_this.url = _this.width = _this.height = _this.sourceWidth = _this.sourceHeight = _this.left = _this.top = _this.id = _this.scale = _this.$itemElement.itemDate = null;
		_this.$itemElement.remove();
		_main2.default.setCamera();
		_this.$itemElement = null;
		_this = null;
		e.stopPropagation();
	});
};
//移动元素
Item.prototype.bindMoveHandle = function () {
	var _this = this;
	var tx, ty;
	this.$itemElement.on("touchstart", function (e) {
		_main2.default.currentItem && _main2.default.currentItem.removeClass("active");
		_main2.default.currentItem = _this.$itemElement;
		//App.currentItem.addClass("active").appendTo($("#room"));

		if (_this.isRotateBtn) {
			_main2.default.currentItem.addClass("active").appendTo($("#room"));
		} else {
			_main2.default.currentItem.addClass("active").prependTo($("#room"));
		}
		tx = e.touches[0].clientX - _this.$itemElement.offset().left - _this.width / 2;
		ty = e.touches[0].clientY - _this.$itemElement.offset().top - _this.height / 2;
		var s = _this.scale + 0.1;
		e.preventDefault();
		e.stopPropagation();
	}).on("touchmove", function (e) {
		if (!_this.isRotate) {

			var x = e.touches[0].clientX - tx;
			var y = e.touches[0].clientY - ty;
			_main2.default.currentItem.css({
				"left": x,
				"top": y
			});
		}
		e.preventDefault();
		e.stopPropagation();
	}).on("touchend", function (e) {
		e.preventDefault();
		e.stopPropagation();
	});
	$(document).on("touchend", function () {
		_main2.default.currentItem && _main2.default.currentItem.removeClass("active");
		_main2.default.currentItem = null;
	});
};
//旋转元素
Item.prototype.bindRotateHandle = function () {
	var _this = this;
	var ax, ay;
	this.$itemElement.children(".cs-btn-rotate").on("touchstart", function (e) {
		_this.isRotate = true;
		ax = _this.$itemElement.offset().left + _this.width / 2;
		ay = _this.$itemElement.offset().top + _this.height / 2;
		e.preventDefault();
		e.stopPropagation();
	}).on("touchmove", function (e) {
		if (_this.isRotate) {
			var bx = e.touches[0].clientX;
			var by = e.touches[0].clientY;
			var ox = bx - ax;
			var oy = by - ay;
			var angle = Math.atan(Math.abs(ox / oy)) / (2 * Math.PI) * 360;
			if (ox < 0 && oy < 0) {
				angle = -angle;
			} else if (ox < 0 && oy > 0) {
				angle = -(180 - angle);
			} else if (ox > 0 && oy < 0) {
				angle = angle;
			} else if (ox > 0 && oy > 0) {
				angle = 180 - angle;
			}
			_this.$itemElement.css({
				"webkitTransform": "rotate(" + angle + "deg)",
				"transform": "rotate(" + angle + "deg)"
			});
			// console.log(angle)
		}
		e.preventDefault();
		e.stopPropagation();
	}).on("touchend", function () {
		_this.isRotate = false;
	});
};

function rdmFn(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

exports.default = Item;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * html2canvas 1.0.0-alpha.5 <https://html2canvas.hertzen.com>
 * Copyright (c) 2017 Niklas von Hertzen <https://hertzen.com>
 * Released under MIT License
 */
!function (e, t) {
  "object" == ( false ? "undefined" : _typeof(exports)) && "object" == ( false ? "undefined" : _typeof(module)) ? module.exports = t() :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (t),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? exports.html2canvas = t() : e.html2canvas = t();
}(undefined, function () {
  return function (e) {
    function t(r) {
      if (n[r]) return n[r].exports;var a = n[r] = { i: r, l: !1, exports: {} };return e[r].call(a.exports, a, a.exports, t), a.l = !0, a.exports;
    }var n = {};return t.m = e, t.c = n, t.d = function (e, n, r) {
      t.o(e, n) || Object.defineProperty(e, n, { configurable: !1, enumerable: !0, get: r });
    }, t.n = function (e) {
      var n = e && e.__esModule ? function () {
        return e.default;
      } : function () {
        return e;
      };return t.d(n, "a", n), n;
    }, t.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }, t.p = "", t(t.s = 24);
  }([function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var r = function () {
      return function (e, t) {
        if (Array.isArray(e)) return e;if (Symbol.iterator in Object(e)) return function (e, t) {
          var n = [],
              r = !0,
              a = !1,
              o = void 0;try {
            for (var i, u = e[Symbol.iterator](); !(r = (i = u.next()).done) && (n.push(i.value), !t || n.length !== t); r = !0) {}
          } catch (e) {
            a = !0, o = e;
          } finally {
            try {
              !r && u.return && u.return();
            } finally {
              if (a) throw o;
            }
          }return n;
        }(e, t);throw new TypeError("Invalid attempt to destructure non-iterable instance");
      };
    }(),
        a = function () {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
        }
      }return function (t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
      };
    }(),
        o = /^#([a-f0-9]{3})$/i,
        i = function i(e) {
      var t = e.match(o);return !!t && [parseInt(t[1][0] + t[1][0], 16), parseInt(t[1][1] + t[1][1], 16), parseInt(t[1][2] + t[1][2], 16), null];
    },
        u = /^#([a-f0-9]{6})$/i,
        l = function l(e) {
      var t = e.match(u);return !!t && [parseInt(t[1].substring(0, 2), 16), parseInt(t[1].substring(2, 4), 16), parseInt(t[1].substring(4, 6), 16), null];
    },
        s = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/,
        c = function c(e) {
      var t = e.match(s);return !!t && [Number(t[1]), Number(t[2]), Number(t[3]), null];
    },
        d = /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d?\.?\d+)\s*\)$/,
        f = function f(e) {
      var t = e.match(d);return !!(t && t.length > 4) && [Number(t[1]), Number(t[2]), Number(t[3]), Number(t[4])];
    },
        h = function h(e) {
      return [Math.min(e[0], 255), Math.min(e[1], 255), Math.min(e[2], 255), e.length > 3 ? e[3] : null];
    },
        p = function p(e) {
      var t = E[e.toLowerCase()];return t || !1;
    },
        g = function () {
      function e(t) {
        !function (e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }(this, e);var n = Array.isArray(t) ? h(t) : i(t) || c(t) || f(t) || p(t) || l(t) || [0, 0, 0, null],
            a = r(n, 4),
            o = a[0],
            u = a[1],
            s = a[2],
            d = a[3];this.r = o, this.g = u, this.b = s, this.a = d;
      }return a(e, [{ key: "isTransparent", value: function value() {
          return 0 === this.a;
        } }, { key: "toString", value: function value() {
          return null !== this.a && 1 !== this.a ? "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")" : "rgb(" + this.r + "," + this.g + "," + this.b + ")";
        } }]), e;
    }();t.default = g;var E = { transparent: [0, 0, 0, 0], aliceblue: [240, 248, 255, null], antiquewhite: [250, 235, 215, null], aqua: [0, 255, 255, null], aquamarine: [127, 255, 212, null], azure: [240, 255, 255, null], beige: [245, 245, 220, null], bisque: [255, 228, 196, null], black: [0, 0, 0, null], blanchedalmond: [255, 235, 205, null], blue: [0, 0, 255, null], blueviolet: [138, 43, 226, null], brown: [165, 42, 42, null], burlywood: [222, 184, 135, null], cadetblue: [95, 158, 160, null], chartreuse: [127, 255, 0, null], chocolate: [210, 105, 30, null], coral: [255, 127, 80, null], cornflowerblue: [100, 149, 237, null], cornsilk: [255, 248, 220, null], crimson: [220, 20, 60, null], cyan: [0, 255, 255, null], darkblue: [0, 0, 139, null], darkcyan: [0, 139, 139, null], darkgoldenrod: [184, 134, 11, null], darkgray: [169, 169, 169, null], darkgreen: [0, 100, 0, null], darkgrey: [169, 169, 169, null], darkkhaki: [189, 183, 107, null], darkmagenta: [139, 0, 139, null], darkolivegreen: [85, 107, 47, null], darkorange: [255, 140, 0, null], darkorchid: [153, 50, 204, null], darkred: [139, 0, 0, null], darksalmon: [233, 150, 122, null], darkseagreen: [143, 188, 143, null], darkslateblue: [72, 61, 139, null], darkslategray: [47, 79, 79, null], darkslategrey: [47, 79, 79, null], darkturquoise: [0, 206, 209, null], darkviolet: [148, 0, 211, null], deeppink: [255, 20, 147, null], deepskyblue: [0, 191, 255, null], dimgray: [105, 105, 105, null], dimgrey: [105, 105, 105, null], dodgerblue: [30, 144, 255, null], firebrick: [178, 34, 34, null], floralwhite: [255, 250, 240, null], forestgreen: [34, 139, 34, null], fuchsia: [255, 0, 255, null], gainsboro: [220, 220, 220, null], ghostwhite: [248, 248, 255, null], gold: [255, 215, 0, null], goldenrod: [218, 165, 32, null], gray: [128, 128, 128, null], green: [0, 128, 0, null], greenyellow: [173, 255, 47, null], grey: [128, 128, 128, null], honeydew: [240, 255, 240, null], hotpink: [255, 105, 180, null], indianred: [205, 92, 92, null], indigo: [75, 0, 130, null], ivory: [255, 255, 240, null], khaki: [240, 230, 140, null], lavender: [230, 230, 250, null], lavenderblush: [255, 240, 245, null], lawngreen: [124, 252, 0, null], lemonchiffon: [255, 250, 205, null], lightblue: [173, 216, 230, null], lightcoral: [240, 128, 128, null], lightcyan: [224, 255, 255, null], lightgoldenrodyellow: [250, 250, 210, null], lightgray: [211, 211, 211, null], lightgreen: [144, 238, 144, null], lightgrey: [211, 211, 211, null], lightpink: [255, 182, 193, null], lightsalmon: [255, 160, 122, null], lightseagreen: [32, 178, 170, null], lightskyblue: [135, 206, 250, null], lightslategray: [119, 136, 153, null], lightslategrey: [119, 136, 153, null], lightsteelblue: [176, 196, 222, null], lightyellow: [255, 255, 224, null], lime: [0, 255, 0, null], limegreen: [50, 205, 50, null], linen: [250, 240, 230, null], magenta: [255, 0, 255, null], maroon: [128, 0, 0, null], mediumaquamarine: [102, 205, 170, null], mediumblue: [0, 0, 205, null], mediumorchid: [186, 85, 211, null], mediumpurple: [147, 112, 219, null], mediumseagreen: [60, 179, 113, null], mediumslateblue: [123, 104, 238, null], mediumspringgreen: [0, 250, 154, null], mediumturquoise: [72, 209, 204, null], mediumvioletred: [199, 21, 133, null], midnightblue: [25, 25, 112, null], mintcream: [245, 255, 250, null], mistyrose: [255, 228, 225, null], moccasin: [255, 228, 181, null], navajowhite: [255, 222, 173, null], navy: [0, 0, 128, null], oldlace: [253, 245, 230, null], olive: [128, 128, 0, null], olivedrab: [107, 142, 35, null], orange: [255, 165, 0, null], orangered: [255, 69, 0, null], orchid: [218, 112, 214, null], palegoldenrod: [238, 232, 170, null], palegreen: [152, 251, 152, null], paleturquoise: [175, 238, 238, null], palevioletred: [219, 112, 147, null], papayawhip: [255, 239, 213, null], peachpuff: [255, 218, 185, null], peru: [205, 133, 63, null], pink: [255, 192, 203, null], plum: [221, 160, 221, null], powderblue: [176, 224, 230, null], purple: [128, 0, 128, null], rebeccapurple: [102, 51, 153, null], red: [255, 0, 0, null], rosybrown: [188, 143, 143, null], royalblue: [65, 105, 225, null], saddlebrown: [139, 69, 19, null], salmon: [250, 128, 114, null], sandybrown: [244, 164, 96, null], seagreen: [46, 139, 87, null], seashell: [255, 245, 238, null], sienna: [160, 82, 45, null], silver: [192, 192, 192, null], skyblue: [135, 206, 235, null], slateblue: [106, 90, 205, null], slategray: [112, 128, 144, null], slategrey: [112, 128, 144, null], snow: [255, 250, 250, null], springgreen: [0, 255, 127, null], steelblue: [70, 130, 180, null], tan: [210, 180, 140, null], teal: [0, 128, 128, null], thistle: [216, 191, 216, null], tomato: [255, 99, 71, null], turquoise: [64, 224, 208, null], violet: [238, 130, 238, null], wheat: [245, 222, 179, null], white: [255, 255, 255, null], whitesmoke: [245, 245, 245, null], yellow: [255, 255, 0, null], yellowgreen: [154, 205, 50, null] };t.TRANSPARENT = new g([0, 0, 0, 0]);
  }, function (e, t, n) {
    "use strict";
    function r(e) {
      return e && e.__esModule ? e : { default: e };
    }Object.defineProperty(t, "__esModule", { value: !0 }), t.parseBoundCurves = t.calculatePaddingBoxPath = t.calculateBorderBoxPath = t.parsePathForBorder = t.parseDocumentSize = t.calculateContentBox = t.calculatePaddingBox = t.parseBounds = t.Bounds = void 0;var a = function () {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
        }
      }return function (t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
      };
    }(),
        o = r(n(7)),
        i = r(n(29)),
        u = t.Bounds = function () {
      function e(t, n, r, a) {
        !function (e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }(this, e), this.left = t, this.top = n, this.width = r, this.height = a;
      }return a(e, null, [{ key: "fromClientRect", value: function value(t, n, r) {
          return new e(t.left + n, t.top + r, t.width, t.height);
        } }]), e;
    }(),
        l = (t.parseBounds = function (e, t, n) {
      return u.fromClientRect(e.getBoundingClientRect(), t, n);
    }, t.calculatePaddingBox = function (e, t) {
      return new u(e.left + t[3].borderWidth, e.top + t[0].borderWidth, e.width - (t[1].borderWidth + t[3].borderWidth), e.height - (t[0].borderWidth + t[2].borderWidth));
    }, t.calculateContentBox = function (e, t, n) {
      var r = t[0].value,
          a = t[1].value,
          o = t[2].value,
          i = t[3].value;return new u(e.left + i + n[3].borderWidth, e.top + r + n[0].borderWidth, e.width - (n[1].borderWidth + n[3].borderWidth + i + a), e.height - (n[0].borderWidth + n[2].borderWidth + r + o));
    }, t.parseDocumentSize = function (e) {
      var t = e.body,
          n = e.documentElement;if (!t || !n) throw new Error("");var r = Math.max(Math.max(t.scrollWidth, n.scrollWidth), Math.max(t.offsetWidth, n.offsetWidth), Math.max(t.clientWidth, n.clientWidth)),
          a = Math.max(Math.max(t.scrollHeight, n.scrollHeight), Math.max(t.offsetHeight, n.offsetHeight), Math.max(t.clientHeight, n.clientHeight));return new u(0, 0, r, a);
    }, t.parsePathForBorder = function (e, t) {
      switch (t) {case 0:
          return l(e.topLeftOuter, e.topLeftInner, e.topRightOuter, e.topRightInner);case 1:
          return l(e.topRightOuter, e.topRightInner, e.bottomRightOuter, e.bottomRightInner);case 2:
          return l(e.bottomRightOuter, e.bottomRightInner, e.bottomLeftOuter, e.bottomLeftInner);case 3:default:
          return l(e.bottomLeftOuter, e.bottomLeftInner, e.topLeftOuter, e.topLeftInner);}
    }, function (e, t, n, r) {
      var a = [];return e instanceof i.default ? a.push(e.subdivide(.5, !1)) : a.push(e), n instanceof i.default ? a.push(n.subdivide(.5, !0)) : a.push(n), r instanceof i.default ? a.push(r.subdivide(.5, !0).reverse()) : a.push(r), t instanceof i.default ? a.push(t.subdivide(.5, !1).reverse()) : a.push(t), a;
    }),
        s = (t.calculateBorderBoxPath = function (e) {
      return [e.topLeftOuter, e.topRightOuter, e.bottomRightOuter, e.bottomLeftOuter];
    }, t.calculatePaddingBoxPath = function (e) {
      return [e.topLeftInner, e.topRightInner, e.bottomRightInner, e.bottomLeftInner];
    }, t.parseBoundCurves = function (e, t, n) {
      var r = e.width / 2,
          a = e.height / 2,
          i = n[s.TOP_LEFT][0].getAbsoluteValue(e.width) < r ? n[s.TOP_LEFT][0].getAbsoluteValue(e.width) : r,
          u = n[s.TOP_LEFT][1].getAbsoluteValue(e.height) < a ? n[s.TOP_LEFT][1].getAbsoluteValue(e.height) : a,
          l = n[s.TOP_RIGHT][0].getAbsoluteValue(e.width) < r ? n[s.TOP_RIGHT][0].getAbsoluteValue(e.width) : r,
          d = n[s.TOP_RIGHT][1].getAbsoluteValue(e.height) < a ? n[s.TOP_RIGHT][1].getAbsoluteValue(e.height) : a,
          f = n[s.BOTTOM_RIGHT][0].getAbsoluteValue(e.width) < r ? n[s.BOTTOM_RIGHT][0].getAbsoluteValue(e.width) : r,
          h = n[s.BOTTOM_RIGHT][1].getAbsoluteValue(e.height) < a ? n[s.BOTTOM_RIGHT][1].getAbsoluteValue(e.height) : a,
          p = n[s.BOTTOM_LEFT][0].getAbsoluteValue(e.width) < r ? n[s.BOTTOM_LEFT][0].getAbsoluteValue(e.width) : r,
          g = n[s.BOTTOM_LEFT][1].getAbsoluteValue(e.height) < a ? n[s.BOTTOM_LEFT][1].getAbsoluteValue(e.height) : a,
          E = e.width - l,
          m = e.height - h,
          T = e.width - f,
          y = e.height - g;return { topLeftOuter: i > 0 || u > 0 ? c(e.left, e.top, i, u, s.TOP_LEFT) : new o.default(e.left, e.top), topLeftInner: i > 0 || u > 0 ? c(e.left + t[3].borderWidth, e.top + t[0].borderWidth, Math.max(0, i - t[3].borderWidth), Math.max(0, u - t[0].borderWidth), s.TOP_LEFT) : new o.default(e.left + t[3].borderWidth, e.top + t[0].borderWidth), topRightOuter: l > 0 || d > 0 ? c(e.left + E, e.top, l, d, s.TOP_RIGHT) : new o.default(e.left + e.width, e.top), topRightInner: l > 0 || d > 0 ? c(e.left + Math.min(E, e.width + t[3].borderWidth), e.top + t[0].borderWidth, E > e.width + t[3].borderWidth ? 0 : l - t[3].borderWidth, d - t[0].borderWidth, s.TOP_RIGHT) : new o.default(e.left + e.width - t[1].borderWidth, e.top + t[0].borderWidth), bottomRightOuter: f > 0 || h > 0 ? c(e.left + T, e.top + m, f, h, s.BOTTOM_RIGHT) : new o.default(e.left + e.width, e.top + e.height), bottomRightInner: f > 0 || h > 0 ? c(e.left + Math.min(T, e.width - t[3].borderWidth), e.top + Math.min(m, e.height + t[0].borderWidth), Math.max(0, f - t[1].borderWidth), h - t[2].borderWidth, s.BOTTOM_RIGHT) : new o.default(e.left + e.width - t[1].borderWidth, e.top + e.height - t[2].borderWidth), bottomLeftOuter: p > 0 || g > 0 ? c(e.left, e.top + y, p, g, s.BOTTOM_LEFT) : new o.default(e.left, e.top + e.height), bottomLeftInner: p > 0 || g > 0 ? c(e.left + t[3].borderWidth, e.top + y, Math.max(0, p - t[3].borderWidth), g - t[2].borderWidth, s.BOTTOM_LEFT) : new o.default(e.left + t[3].borderWidth, e.top + e.height - t[2].borderWidth) };
    }, { TOP_LEFT: 0, TOP_RIGHT: 1, BOTTOM_RIGHT: 2, BOTTOM_LEFT: 3 }),
        c = function c(e, t, n, r, a) {
      var u = (Math.sqrt(2) - 1) / 3 * 4,
          l = n * u,
          c = r * u,
          d = e + n,
          f = t + r;switch (a) {case s.TOP_LEFT:
          return new i.default(new o.default(e, f), new o.default(e, f - c), new o.default(d - l, t), new o.default(d, t));case s.TOP_RIGHT:
          return new i.default(new o.default(e, t), new o.default(e + l, t), new o.default(d, f - c), new o.default(d, f));case s.BOTTOM_RIGHT:
          return new i.default(new o.default(d, t), new o.default(d, t + c), new o.default(e + l, f), new o.default(e, f));case s.BOTTOM_LEFT:default:
          return new i.default(new o.default(d, f), new o.default(d - l, f), new o.default(e, t + c), new o.default(e, t));}
    };
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 }), t.calculateLengthFromValueWithUnit = t.LENGTH_TYPE = void 0;var r = function () {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
        }
      }return function (t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
      };
    }(),
        a = (function (e) {
      e && e.__esModule;
    }(n(4)), t.LENGTH_TYPE = { PX: 0, PERCENTAGE: 1 }),
        o = function () {
      function e(t) {
        !function (e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }(this, e), this.type = "%" === t.substr(t.length - 1) ? a.PERCENTAGE : a.PX;var n = parseFloat(t);this.value = isNaN(n) ? 0 : n;
      }return r(e, [{ key: "isPercentage", value: function value() {
          return this.type === a.PERCENTAGE;
        } }, { key: "getAbsoluteValue", value: function value(e) {
          return this.isPercentage() ? e * (this.value / 100) : this.value;
        } }], [{ key: "create", value: function value(t) {
          return new e(t);
        } }]), e;
    }();t.default = o;t.calculateLengthFromValueWithUnit = function (e, t, n) {
      switch (n) {case "px":case "%":
          return new o(t + n);case "em":case "rem":
          var r = new o(t);return r.value *= "em" === n ? parseFloat(e.style.font.fontSize) : function e(t) {
            var n = t.parent;return n ? e(n) : parseFloat(t.style.font.fontSize);
          }(e), r;default:
          return new o("0");}
    };
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });t.contains = function (e, t) {
      return 0 != (e & t);
    }, t.distance = function (e, t) {
      return Math.sqrt(e * e + t * t);
    }, t.copyCSSStyles = function (e, t) {
      for (var n = e.length - 1; n >= 0; n--) {
        var r = e.item(n);"content" !== r && t.style.setProperty(r, e.getPropertyValue(r));
      }return t;
    }, t.SMALL_IMAGE = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var r = function () {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
        }
      }return function (t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
      };
    }(),
        a = function (e) {
      return e && e.__esModule ? e : { default: e };
    }(n(0)),
        o = n(3),
        i = n(5),
        u = n(11),
        l = n(30),
        s = n(31),
        c = n(32),
        d = n(33),
        f = n(34),
        h = n(15),
        p = n(35),
        g = n(36),
        E = n(14),
        m = n(16),
        T = n(10),
        y = n(37),
        v = n(17),
        b = n(38),
        I = n(39),
        _ = n(40),
        w = n(1),
        A = n(18),
        O = n(21),
        S = ["INPUT", "TEXTAREA", "SELECT"],
        L = function () {
      function e(t, n, r, o) {
        var L = this;!function (e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }(this, e), this.parent = n, this.tagName = t.tagName, this.index = o, this.childNodes = [], this.listItems = [], "number" == typeof t.start && (this.listStart = t.start);var P = t.ownerDocument.defaultView,
            N = P.pageXOffset,
            C = P.pageYOffset,
            M = P.getComputedStyle(t, null),
            x = (0, s.parseDisplay)(M.display),
            D = "radio" === t.type || "checkbox" === t.type,
            k = (0, m.parsePosition)(M.position);if (this.style = { background: D ? A.INPUT_BACKGROUND : (0, i.parseBackground)(M, r), border: D ? A.INPUT_BORDERS : (0, u.parseBorder)(M), borderRadius: (t instanceof P.HTMLInputElement || t instanceof HTMLInputElement) && D ? (0, A.getInputBorderRadius)(t) : (0, l.parseBorderRadius)(M), color: D ? A.INPUT_COLOR : new a.default(M.color), display: x, float: (0, c.parseCSSFloat)(M.float), font: (0, d.parseFont)(M), letterSpacing: (0, f.parseLetterSpacing)(M.letterSpacing), listStyle: x === s.DISPLAY.LIST_ITEM ? (0, h.parseListStyle)(M) : null, margin: (0, p.parseMargin)(M), opacity: parseFloat(M.opacity), overflow: -1 === S.indexOf(t.tagName) ? (0, g.parseOverflow)(M.overflow) : g.OVERFLOW.HIDDEN, padding: (0, E.parsePadding)(M), position: k, textDecoration: (0, T.parseTextDecoration)(M), textShadow: (0, y.parseTextShadow)(M.textShadow), textTransform: (0, v.parseTextTransform)(M.textTransform), transform: (0, b.parseTransform)(M), visibility: (0, I.parseVisibility)(M.visibility), zIndex: (0, _.parseZIndex)(k !== m.POSITION.STATIC ? M.zIndex : "auto") }, this.isTransformed() && (t.style.transform = "matrix(1,0,0,1,0,0)"), x === s.DISPLAY.LIST_ITEM) {
          var B = (0, O.getListOwner)(this);if (B) {
            var Y = B.listItems.length;B.listItems.push(this), this.listIndex = t.hasAttribute("value") && "number" == typeof t.value ? t.value : 0 === Y ? "number" == typeof B.listStart ? B.listStart : 1 : B.listItems[Y - 1].listIndex + 1;
          }
        }"IMG" === t.tagName && t.addEventListener("load", function () {
          L.bounds = (0, w.parseBounds)(t, N, C), L.curvedBounds = (0, w.parseBoundCurves)(L.bounds, L.style.border, L.style.borderRadius);
        }), this.image = R(t, r), this.bounds = D ? (0, A.reformatInputBounds)((0, w.parseBounds)(t, N, C)) : (0, w.parseBounds)(t, N, C), this.curvedBounds = (0, w.parseBoundCurves)(this.bounds, this.style.border, this.style.borderRadius);
      }return r(e, [{ key: "getClipPaths", value: function value() {
          var e = this.parent ? this.parent.getClipPaths() : [];return this.style.overflow !== g.OVERFLOW.VISIBLE ? e.concat([(0, w.calculatePaddingBoxPath)(this.curvedBounds)]) : e;
        } }, { key: "isInFlow", value: function value() {
          return this.isRootElement() && !this.isFloating() && !this.isAbsolutelyPositioned();
        } }, { key: "isVisible", value: function value() {
          return !(0, o.contains)(this.style.display, s.DISPLAY.NONE) && this.style.opacity > 0 && this.style.visibility === I.VISIBILITY.VISIBLE;
        } }, { key: "isAbsolutelyPositioned", value: function value() {
          return this.style.position !== m.POSITION.STATIC && this.style.position !== m.POSITION.RELATIVE;
        } }, { key: "isPositioned", value: function value() {
          return this.style.position !== m.POSITION.STATIC;
        } }, { key: "isFloating", value: function value() {
          return this.style.float !== c.FLOAT.NONE;
        } }, { key: "isRootElement", value: function value() {
          return null === this.parent;
        } }, { key: "isTransformed", value: function value() {
          return null !== this.style.transform;
        } }, { key: "isPositionedWithZIndex", value: function value() {
          return this.isPositioned() && !this.style.zIndex.auto;
        } }, { key: "isInlineLevel", value: function value() {
          return (0, o.contains)(this.style.display, s.DISPLAY.INLINE) || (0, o.contains)(this.style.display, s.DISPLAY.INLINE_BLOCK) || (0, o.contains)(this.style.display, s.DISPLAY.INLINE_FLEX) || (0, o.contains)(this.style.display, s.DISPLAY.INLINE_GRID) || (0, o.contains)(this.style.display, s.DISPLAY.INLINE_LIST_ITEM) || (0, o.contains)(this.style.display, s.DISPLAY.INLINE_TABLE);
        } }, { key: "isInlineBlockOrInlineTable", value: function value() {
          return (0, o.contains)(this.style.display, s.DISPLAY.INLINE_BLOCK) || (0, o.contains)(this.style.display, s.DISPLAY.INLINE_TABLE);
        } }]), e;
    }();t.default = L;var R = function R(e, t) {
      if (e instanceof e.ownerDocument.defaultView.SVGSVGElement || e instanceof SVGSVGElement) {
        var n = new XMLSerializer();return t.loadImage("data:image/svg+xml," + encodeURIComponent(n.serializeToString(e)));
      }switch (e.tagName) {case "IMG":
          var r = e;return t.loadImage(r.currentSrc || r.src);case "CANVAS":
          var a = e;return t.loadCanvas(a);case "IFRAME":
          var o = e.getAttribute("data-html2canvas-internal-iframe-key");if (o) return o;}return null;
    };
  }, function (e, t, n) {
    "use strict";
    function r(e) {
      return e && e.__esModule ? e : { default: e };
    }Object.defineProperty(t, "__esModule", { value: !0 }), t.parseBackgroundImage = t.parseBackground = t.calculateBackgroundRepeatPath = t.calculateBackgroundPosition = t.calculateBackgroungPositioningArea = t.calculateBackgroungPaintingArea = t.calculateGradientBackgroundSize = t.calculateBackgroundSize = t.BACKGROUND_ORIGIN = t.BACKGROUND_CLIP = t.BACKGROUND_SIZE = t.BACKGROUND_REPEAT = void 0;var a = r(n(0)),
        o = r(n(2)),
        i = r(n(28)),
        u = r(n(7)),
        l = n(1),
        s = n(14),
        c = t.BACKGROUND_REPEAT = { REPEAT: 0, NO_REPEAT: 1, REPEAT_X: 2, REPEAT_Y: 3 },
        d = t.BACKGROUND_SIZE = { AUTO: 0, CONTAIN: 1, COVER: 2, LENGTH: 3 },
        f = t.BACKGROUND_CLIP = { BORDER_BOX: 0, PADDING_BOX: 1, CONTENT_BOX: 2 },
        h = t.BACKGROUND_ORIGIN = f,
        p = function e(t) {
      switch (function (e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
      }(this, e), t) {case "contain":
          this.size = d.CONTAIN;break;case "cover":
          this.size = d.COVER;break;case "auto":
          this.size = d.AUTO;break;default:
          this.value = new o.default(t);}
    },
        g = (t.calculateBackgroundSize = function (e, t, n) {
      var r = 0,
          a = 0,
          o = e.size;if (o[0].size === d.CONTAIN || o[0].size === d.COVER) {
        var u = n.width / n.height,
            l = t.width / t.height;return u < l != (o[0].size === d.COVER) ? new i.default(n.width, n.width / l) : new i.default(n.height * l, n.height);
      }return o[0].value && (r = o[0].value.getAbsoluteValue(n.width)), o[0].size === d.AUTO && o[1].size === d.AUTO ? a = t.height : o[1].size === d.AUTO ? a = r / t.width * t.height : o[1].value && (a = o[1].value.getAbsoluteValue(n.height)), o[0].size === d.AUTO && (r = a / t.height * t.width), new i.default(r, a);
    }, t.calculateGradientBackgroundSize = function (e, t) {
      var n = e.size,
          r = n[0].value ? n[0].value.getAbsoluteValue(t.width) : t.width,
          a = n[1].value ? n[1].value.getAbsoluteValue(t.height) : n[0].value ? r : t.height;return new i.default(r, a);
    }, new p("auto")),
        E = (t.calculateBackgroungPaintingArea = function (e, t) {
      switch (t) {case f.BORDER_BOX:
          return (0, l.calculateBorderBoxPath)(e);case f.PADDING_BOX:default:
          return (0, l.calculatePaddingBoxPath)(e);}
    }, t.calculateBackgroungPositioningArea = function (e, t, n, r) {
      var a = (0, l.calculatePaddingBox)(t, r);switch (e) {case h.BORDER_BOX:
          return t;case h.CONTENT_BOX:
          var o = n[s.PADDING_SIDES.LEFT].getAbsoluteValue(t.width),
              i = n[s.PADDING_SIDES.RIGHT].getAbsoluteValue(t.width),
              u = n[s.PADDING_SIDES.TOP].getAbsoluteValue(t.width),
              c = n[s.PADDING_SIDES.BOTTOM].getAbsoluteValue(t.width);return new l.Bounds(a.left + o, a.top + u, a.width - o - i, a.height - u - c);case h.PADDING_BOX:default:
          return a;}
    }, t.calculateBackgroundPosition = function (e, t, n) {
      return new u.default(e[0].getAbsoluteValue(n.width - t.width), e[1].getAbsoluteValue(n.height - t.height));
    }, t.calculateBackgroundRepeatPath = function (e, t, n, r, a) {
      switch (e.repeat) {case c.REPEAT_X:
          return [new u.default(Math.round(a.left), Math.round(r.top + t.y)), new u.default(Math.round(a.left + a.width), Math.round(r.top + t.y)), new u.default(Math.round(a.left + a.width), Math.round(n.height + r.top + t.y)), new u.default(Math.round(a.left), Math.round(n.height + r.top + t.y))];case c.REPEAT_Y:
          return [new u.default(Math.round(r.left + t.x), Math.round(a.top)), new u.default(Math.round(r.left + t.x + n.width), Math.round(a.top)), new u.default(Math.round(r.left + t.x + n.width), Math.round(a.height + a.top)), new u.default(Math.round(r.left + t.x), Math.round(a.height + a.top))];case c.NO_REPEAT:
          return [new u.default(Math.round(r.left + t.x), Math.round(r.top + t.y)), new u.default(Math.round(r.left + t.x + n.width), Math.round(r.top + t.y)), new u.default(Math.round(r.left + t.x + n.width), Math.round(r.top + t.y + n.height)), new u.default(Math.round(r.left + t.x), Math.round(r.top + t.y + n.height))];default:
          return [new u.default(Math.round(a.left), Math.round(a.top)), new u.default(Math.round(a.left + a.width), Math.round(a.top)), new u.default(Math.round(a.left + a.width), Math.round(a.height + a.top)), new u.default(Math.round(a.left), Math.round(a.height + a.top))];}
    }, t.parseBackground = function (e, t) {
      return { backgroundColor: new a.default(e.backgroundColor), backgroundImage: T(e, t), backgroundClip: E(e.backgroundClip), backgroundOrigin: m(e.backgroundOrigin) };
    }, function (e) {
      switch (e) {case "padding-box":
          return f.PADDING_BOX;case "content-box":
          return f.CONTENT_BOX;}return f.BORDER_BOX;
    }),
        m = function m(e) {
      switch (e) {case "padding-box":
          return h.PADDING_BOX;case "content-box":
          return h.CONTENT_BOX;}return h.BORDER_BOX;
    },
        T = function T(e, t) {
      var n = b(e.backgroundImage).map(function (e) {
        if ("url" === e.method) {
          var n = t.loadImage(e.args[0]);e.args = n ? [n] : [];
        }return e;
      }),
          r = e.backgroundPosition.split(","),
          a = e.backgroundRepeat.split(","),
          o = e.backgroundSize.split(",");return n.map(function (e, t) {
        var n = (o[t] || "auto").trim().split(" ").map(y),
            i = (r[t] || "auto").trim().split(" ").map(v);return { source: e, repeat: function (e) {
            switch (e.trim()) {case "no-repeat":
                return c.NO_REPEAT;case "repeat-x":case "repeat no-repeat":
                return c.REPEAT_X;case "repeat-y":case "no-repeat repeat":
                return c.REPEAT_Y;case "repeat":
                return c.REPEAT;}return c.REPEAT;
          }("string" == typeof a[t] ? a[t] : a[0]), size: n.length < 2 ? [n[0], g] : [n[0], n[1]], position: i.length < 2 ? [i[0], i[0]] : [i[0], i[1]] };
      });
    },
        y = function y(e) {
      return "auto" === e ? g : new p(e);
    },
        v = function v(e) {
      switch (e) {case "bottom":case "right":
          return new o.default("100%");case "left":case "top":
          return new o.default("0%");case "auto":
          return new o.default("0");}return new o.default(e);
    },
        b = t.parseBackgroundImage = function (e) {
      var t = /^\s$/,
          n = [],
          r = [],
          a = "",
          o = null,
          i = "",
          u = 0,
          l = 0,
          s = function s() {
        var e = "";if (a) {
          '"' === i.substr(0, 1) && (i = i.substr(1, i.length - 2)), i && r.push(i.trim());var t = a.indexOf("-", 1) + 1;"-" === a.substr(0, 1) && t > 0 && (e = a.substr(0, t).toLowerCase(), a = a.substr(t)), "none" !== (a = a.toLowerCase()) && n.push({ prefix: e, method: a, args: r });
        }r = [], a = i = "";
      };return e.split("").forEach(function (e) {
        if (0 !== u || !t.test(e)) {
          switch (e) {case '"':
              o ? o === e && (o = null) : o = e;break;case "(":
              if (o) break;if (0 === u) return void (u = 1);l++;break;case ")":
              if (o) break;if (1 === u) {
                if (0 === l) return u = 0, void s();l--;
              }break;case ",":
              if (o) break;if (0 === u) return void s();if (1 === u && 0 === l && !a.match(/^url$/i)) return r.push(i.trim()), void (i = "");}0 === u ? a += e : i += e;
        }
      }), s(), n;
    };
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });t.PATH = { VECTOR: 0, BEZIER_CURVE: 1, CIRCLE: 2 };
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var r = n(6);t.default = function e(t, n) {
      !function (e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
      }(this, e), this.type = r.PATH.VECTOR, this.x = t, this.y = n;
    };
  }, function (e, t, n) {
    "use strict";
    function r(e, t, n) {
      return e.length > 0 ? t + n.toUpperCase() : e;
    }Object.defineProperty(t, "__esModule", { value: !0 });var a = function () {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
        }
      }return function (t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
      };
    }(),
        o = n(17),
        i = n(19),
        u = function () {
      function e(t, n, r) {
        !function (e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }(this, e), this.text = t, this.parent = n, this.bounds = r;
      }return a(e, null, [{ key: "fromTextNode", value: function value(t, n) {
          var r = s(t.data, n.style.textTransform);return new e(r, n, (0, i.parseTextBounds)(r, n, t));
        } }]), e;
    }();t.default = u;var l = /(^|\s|:|-|\(|\))([a-z])/g,
        s = function s(e, t) {
      switch (t) {case o.TEXT_TRANSFORM.LOWERCASE:
          return e.toLowerCase();case o.TEXT_TRANSFORM.CAPITALIZE:
          return e.replace(l, r);case o.TEXT_TRANSFORM.UPPERCASE:
          return e.toUpperCase();default:
          return e;}
    };
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var r = n(20),
        a = function a(e) {
      return 0 === e[0] && 255 === e[1] && 0 === e[2] && 255 === e[3];
    },
        o = { get SUPPORT_RANGE_BOUNDS() {
        var e = function (e) {
          if (e.createRange) {
            var t = e.createRange();if (t.getBoundingClientRect) {
              var n = e.createElement("boundtest");n.style.height = "123px", n.style.display = "block", e.body.appendChild(n), t.selectNode(n);var r = t.getBoundingClientRect(),
                  a = Math.round(r.height);if (e.body.removeChild(n), 123 === a) return !0;
            }
          }return !1;
        }(document);return Object.defineProperty(o, "SUPPORT_RANGE_BOUNDS", { value: e }), e;
      }, get SUPPORT_SVG_DRAWING() {
        var e = function (e) {
          var t = new Image(),
              n = e.createElement("canvas"),
              r = n.getContext("2d");t.src = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'></svg>";try {
            r.drawImage(t, 0, 0), n.toDataURL();
          } catch (e) {
            return !1;
          }return !0;
        }(document);return Object.defineProperty(o, "SUPPORT_SVG_DRAWING", { value: e }), e;
      }, get SUPPORT_BASE64_DRAWING() {
        return function (e) {
          var t = function (e, t) {
            var n = new Image(),
                r = e.createElement("canvas"),
                a = r.getContext("2d");return new Promise(function (e) {
              n.src = t;var o = function o() {
                try {
                  a.drawImage(n, 0, 0), r.toDataURL();
                } catch (t) {
                  return e(!1);
                }return e(!0);
              };n.onload = o, n.onerror = function () {
                return e(!1);
              }, !0 === n.complete && setTimeout(function () {
                o();
              }, 500);
            });
          }(document, e);return Object.defineProperty(o, "SUPPORT_BASE64_DRAWING", { value: function value() {
              return t;
            } }), t;
        };
      }, get SUPPORT_FOREIGNOBJECT_DRAWING() {
        var e = "function" == typeof Array.from && "function" == typeof window.fetch ? function (e) {
          var t = e.createElement("canvas");t.width = 100, t.height = 100;var n = t.getContext("2d");n.fillStyle = "rgb(0, 255, 0)", n.fillRect(0, 0, 100, 100);var o = new Image(),
              i = t.toDataURL();o.src = i;var u = (0, r.createForeignObjectSVG)(100, 100, 0, 0, o);return n.fillStyle = "red", n.fillRect(0, 0, 100, 100), (0, r.loadSerializedSVG)(u).then(function (t) {
            n.drawImage(t, 0, 0);var o = n.getImageData(0, 0, 100, 100).data;n.fillStyle = "red", n.fillRect(0, 0, 100, 100);var u = e.createElement("div");return u.style.backgroundImage = "url(" + i + ")", u.style.height = "100px", a(o) ? (0, r.loadSerializedSVG)((0, r.createForeignObjectSVG)(100, 100, 0, 0, u)) : Promise.reject(!1);
          }).then(function (e) {
            return n.drawImage(e, 0, 0), a(n.getImageData(0, 0, 100, 100).data);
          }).catch(function (e) {
            return !1;
          });
        }(document) : Promise.resolve(!1);return Object.defineProperty(o, "SUPPORT_FOREIGNOBJECT_DRAWING", { value: e }), e;
      }, get SUPPORT_CORS_IMAGES() {
        var e = void 0 !== new Image().crossOrigin;return Object.defineProperty(o, "SUPPORT_CORS_IMAGES", { value: e }), e;
      }, get SUPPORT_RESPONSE_TYPE() {
        var e = "string" == typeof new XMLHttpRequest().responseType;return Object.defineProperty(o, "SUPPORT_RESPONSE_TYPE", { value: e }), e;
      }, get SUPPORT_CORS_XHR() {
        var e = "withCredentials" in new XMLHttpRequest();return Object.defineProperty(o, "SUPPORT_CORS_XHR", { value: e }), e;
      } };t.default = o;
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 }), t.parseTextDecoration = t.TEXT_DECORATION_LINE = t.TEXT_DECORATION = t.TEXT_DECORATION_STYLE = void 0;var r = function (e) {
      return e && e.__esModule ? e : { default: e };
    }(n(0)),
        a = t.TEXT_DECORATION_STYLE = { SOLID: 0, DOUBLE: 1, DOTTED: 2, DASHED: 3, WAVY: 4 },
        o = t.TEXT_DECORATION = { NONE: null },
        i = t.TEXT_DECORATION_LINE = { UNDERLINE: 1, OVERLINE: 2, LINE_THROUGH: 3, BLINK: 4 },
        u = function u(e) {
      switch (e) {case "underline":
          return i.UNDERLINE;case "overline":
          return i.OVERLINE;case "line-through":
          return i.LINE_THROUGH;}return i.BLINK;
    };t.parseTextDecoration = function (e) {
      var t = function (e) {
        return "none" === e ? null : e.split(" ").map(u);
      }(e.textDecorationLine ? e.textDecorationLine : e.textDecoration);if (null === t) return o.NONE;return { textDecorationLine: t, textDecorationColor: e.textDecorationColor ? new r.default(e.textDecorationColor) : null, textDecorationStyle: function (e) {
          switch (e) {case "double":
              return a.DOUBLE;case "dotted":
              return a.DOTTED;case "dashed":
              return a.DASHED;case "wavy":
              return a.WAVY;}return a.SOLID;
        }(e.textDecorationStyle) };
    };
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 }), t.parseBorder = t.BORDER_SIDES = t.BORDER_STYLE = void 0;var r = function (e) {
      return e && e.__esModule ? e : { default: e };
    }(n(0)),
        a = t.BORDER_STYLE = { NONE: 0, SOLID: 1 },
        o = t.BORDER_SIDES = { TOP: 0, RIGHT: 1, BOTTOM: 2, LEFT: 3 },
        i = Object.keys(o).map(function (e) {
      return e.toLowerCase();
    });t.parseBorder = function (e) {
      return i.map(function (t) {
        var n = new r.default(e.getPropertyValue("border-" + t + "-color")),
            o = function (e) {
          switch (e) {case "none":
              return a.NONE;}return a.SOLID;
        }(e.getPropertyValue("border-" + t + "-style")),
            i = parseFloat(e.getPropertyValue("border-" + t + "-width"));return { borderColor: n, borderStyle: o, borderWidth: isNaN(i) ? 0 : i };
      });
    };
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var r = function () {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
        }
      }return function (t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
      };
    }(),
        a = n(6),
        o = n(10),
        i = function i(e, t) {
      var n = Math.max.apply(null, e.colorStops.map(function (e) {
        return e.stop;
      })),
          r = 1 / Math.max(1, n);e.colorStops.forEach(function (e) {
        t.addColorStop(r * e.stop, e.color.toString());
      });
    },
        u = function () {
      function e(t) {
        !function (e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }(this, e), this.canvas = t || document.createElement("canvas");
      }return r(e, [{ key: "render", value: function value(e) {
          this.ctx = this.canvas.getContext("2d"), this.options = e, this.canvas.width = Math.floor(e.width * e.scale), this.canvas.height = Math.floor(e.height * e.scale), this.canvas.style.width = e.width + "px", this.canvas.style.height = e.height + "px", this.ctx.scale(this.options.scale, this.options.scale), this.ctx.translate(-e.x, -e.y), this.ctx.textBaseline = "bottom", e.logger.log("Canvas renderer initialized (" + e.width + "x" + e.height + " at " + e.x + "," + e.y + ") with scale " + this.options.scale);
        } }, { key: "clip", value: function value(e, t) {
          var n = this;e.length && (this.ctx.save(), e.forEach(function (e) {
            n.path(e), n.ctx.clip();
          })), t(), e.length && this.ctx.restore();
        } }, { key: "drawImage", value: function value(e, t, n) {
          this.ctx.drawImage(e, t.left, t.top, t.width, t.height, n.left, n.top, n.width, n.height);
        } }, { key: "drawShape", value: function value(e, t) {
          this.path(e), this.ctx.fillStyle = t.toString(), this.ctx.fill();
        } }, { key: "fill", value: function value(e) {
          this.ctx.fillStyle = e.toString(), this.ctx.fill();
        } }, { key: "getTarget", value: function value() {
          return Promise.resolve(this.canvas);
        } }, { key: "path", value: function value(e) {
          var t = this;this.ctx.beginPath(), Array.isArray(e) ? e.forEach(function (e, n) {
            var r = e.type === a.PATH.VECTOR ? e : e.start;0 === n ? t.ctx.moveTo(r.x, r.y) : t.ctx.lineTo(r.x, r.y), e.type === a.PATH.BEZIER_CURVE && t.ctx.bezierCurveTo(e.startControl.x, e.startControl.y, e.endControl.x, e.endControl.y, e.end.x, e.end.y);
          }) : this.ctx.arc(e.x + e.radius, e.y + e.radius, e.radius, 0, 2 * Math.PI, !0), this.ctx.closePath();
        } }, { key: "rectangle", value: function value(e, t, n, r, a) {
          this.ctx.fillStyle = a.toString(), this.ctx.fillRect(e, t, n, r);
        } }, { key: "renderLinearGradient", value: function value(e, t) {
          var n = this.ctx.createLinearGradient(e.left + t.direction.x1, e.top + t.direction.y1, e.left + t.direction.x0, e.top + t.direction.y0);i(t, n), this.ctx.fillStyle = n, this.ctx.fillRect(e.left, e.top, e.width, e.height);
        } }, { key: "renderRadialGradient", value: function value(e, t) {
          var n = this,
              r = e.left + t.center.x,
              a = e.top + t.center.y,
              o = this.ctx.createRadialGradient(r, a, 0, r, a, t.radius.x);if (o) if (i(t, o), this.ctx.fillStyle = o, t.radius.x !== t.radius.y) {
            var u = e.left + .5 * e.width,
                l = e.top + .5 * e.height,
                s = t.radius.y / t.radius.x,
                c = 1 / s;this.transform(u, l, [1, 0, 0, s, 0, 0], function () {
              return n.ctx.fillRect(e.left, c * (e.top - l) + l, e.width, e.height * c);
            });
          } else this.ctx.fillRect(e.left, e.top, e.width, e.height);
        } }, { key: "renderRepeat", value: function value(e, t, n, r, a) {
          this.path(e), this.ctx.fillStyle = this.ctx.createPattern(this.resizeImage(t, n), "repeat"), this.ctx.translate(r, a), this.ctx.fill(), this.ctx.translate(-r, -a);
        } }, { key: "renderTextNode", value: function value(e, t, n, r, a) {
          var i = this;this.ctx.font = [n.fontStyle, n.fontVariant, n.fontWeight, n.fontSize, n.fontFamily].join(" "), e.forEach(function (e) {
            if (i.ctx.fillStyle = t.toString(), a && e.text.trim().length ? a.slice(0).reverse().forEach(function (t) {
              i.ctx.shadowColor = t.color.toString(), i.ctx.shadowOffsetX = t.offsetX * i.options.scale, i.ctx.shadowOffsetY = t.offsetY * i.options.scale, i.ctx.shadowBlur = t.blur, i.ctx.fillText(e.text, e.bounds.left, e.bounds.top + e.bounds.height);
            }) : i.ctx.fillText(e.text, e.bounds.left, e.bounds.top + e.bounds.height), null !== r) {
              var u = r.textDecorationColor || t;r.textDecorationLine.forEach(function (t) {
                switch (t) {case o.TEXT_DECORATION_LINE.UNDERLINE:
                    var r = i.options.fontMetrics.getMetrics(n).baseline;i.rectangle(e.bounds.left, Math.round(e.bounds.top + e.bounds.height - r), e.bounds.width, 1, u);break;case o.TEXT_DECORATION_LINE.OVERLINE:
                    i.rectangle(e.bounds.left, Math.round(e.bounds.top), e.bounds.width, 1, u);break;case o.TEXT_DECORATION_LINE.LINE_THROUGH:
                    var a = i.options.fontMetrics.getMetrics(n).middle;i.rectangle(e.bounds.left, Math.ceil(e.bounds.top + a), e.bounds.width, 1, u);}
              });
            }
          });
        } }, { key: "resizeImage", value: function value(e, t) {
          if (e.width === t.width && e.height === t.height) return e;var n = this.canvas.ownerDocument.createElement("canvas");n.width = t.width, n.height = t.height;return n.getContext("2d").drawImage(e, 0, 0, e.width, e.height, 0, 0, t.width, t.height), n;
        } }, { key: "setOpacity", value: function value(e) {
          this.ctx.globalAlpha = e;
        } }, { key: "transform", value: function value(e, t, n, r) {
          this.ctx.save(), this.ctx.translate(e, t), this.ctx.transform(n[0], n[1], n[2], n[3], n[4], n[5]), this.ctx.translate(-e, -t), r(), this.ctx.restore();
        } }]), e;
    }();t.default = u;
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var r = function () {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
        }
      }return function (t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
      };
    }(),
        a = function () {
      function e(t, n, r) {
        !function (e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }(this, e), this.enabled = t, this.start = r || Date.now(), this.id = n;
      }return r(e, [{ key: "child", value: function value(t) {
          return new e(this.enabled, t, this.start);
        } }, { key: "log", value: function value() {
          if (this.enabled && window.console && window.console.log) {
            for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) {
              t[n] = arguments[n];
            }Function.prototype.bind.call(window.console.log, window.console).apply(window.console, [Date.now() - this.start + "ms", this.id ? "html2canvas (" + this.id + "):" : "html2canvas:"].concat([].slice.call(t, 0)));
          }
        } }, { key: "error", value: function value() {
          if (this.enabled && window.console && window.console.error) {
            for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) {
              t[n] = arguments[n];
            }Function.prototype.bind.call(window.console.error, window.console).apply(window.console, [Date.now() - this.start + "ms", this.id ? "html2canvas (" + this.id + "):" : "html2canvas:"].concat([].slice.call(t, 0)));
          }
        } }]), e;
    }();t.default = a;
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 }), t.parsePadding = t.PADDING_SIDES = void 0;var r = function (e) {
      return e && e.__esModule ? e : { default: e };
    }(n(2)),
        a = (t.PADDING_SIDES = { TOP: 0, RIGHT: 1, BOTTOM: 2, LEFT: 3 }, ["top", "right", "bottom", "left"]);t.parsePadding = function (e) {
      return a.map(function (t) {
        return new r.default(e.getPropertyValue("padding-" + t));
      });
    };
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 }), t.parseListStyle = t.LIST_STYLE_TYPE = t.LIST_STYLE_POSITION = void 0;var r = n(5),
        a = t.LIST_STYLE_POSITION = { INSIDE: 0, OUTSIDE: 1 },
        o = t.LIST_STYLE_TYPE = { NONE: -1, DISC: 0, CIRCLE: 1, SQUARE: 2, DECIMAL: 3, CJK_DECIMAL: 4, DECIMAL_LEADING_ZERO: 5, LOWER_ROMAN: 6, UPPER_ROMAN: 7, LOWER_GREEK: 8, LOWER_ALPHA: 9, UPPER_ALPHA: 10, ARABIC_INDIC: 11, ARMENIAN: 12, BENGALI: 13, CAMBODIAN: 14, CJK_EARTHLY_BRANCH: 15, CJK_HEAVENLY_STEM: 16, CJK_IDEOGRAPHIC: 17, DEVANAGARI: 18, ETHIOPIC_NUMERIC: 19, GEORGIAN: 20, GUJARATI: 21, GURMUKHI: 22, HEBREW: 22, HIRAGANA: 23, HIRAGANA_IROHA: 24, JAPANESE_FORMAL: 25, JAPANESE_INFORMAL: 26, KANNADA: 27, KATAKANA: 28, KATAKANA_IROHA: 29, KHMER: 30, KOREAN_HANGUL_FORMAL: 31, KOREAN_HANJA_FORMAL: 32, KOREAN_HANJA_INFORMAL: 33, LAO: 34, LOWER_ARMENIAN: 35, MALAYALAM: 36, MONGOLIAN: 37, MYANMAR: 38, ORIYA: 39, PERSIAN: 40, SIMP_CHINESE_FORMAL: 41, SIMP_CHINESE_INFORMAL: 42, TAMIL: 43, TELUGU: 44, THAI: 45, TIBETAN: 46, TRAD_CHINESE_FORMAL: 47, TRAD_CHINESE_INFORMAL: 48, UPPER_ARMENIAN: 49, DISCLOSURE_OPEN: 50, DISCLOSURE_CLOSED: 51 },
        i = (t.parseListStyle = function (e) {
      var t = (0, r.parseBackgroundImage)(e.getPropertyValue("list-style-image"));return { listStyleType: function (e) {
          switch (e) {case "disc":
              return o.DISC;case "circle":
              return o.CIRCLE;case "square":
              return o.SQUARE;case "decimal":
              return o.DECIMAL;case "cjk-decimal":
              return o.CJK_DECIMAL;case "decimal-leading-zero":
              return o.DECIMAL_LEADING_ZERO;case "lower-roman":
              return o.LOWER_ROMAN;case "upper-roman":
              return o.UPPER_ROMAN;case "lower-greek":
              return o.LOWER_GREEK;case "lower-alpha":
              return o.LOWER_ALPHA;case "upper-alpha":
              return o.UPPER_ALPHA;case "arabic-indic":
              return o.ARABIC_INDIC;case "armenian":
              return o.ARMENIAN;case "bengali":
              return o.BENGALI;case "cambodian":
              return o.CAMBODIAN;case "cjk-earthly-branch":
              return o.CJK_EARTHLY_BRANCH;case "cjk-heavenly-stem":
              return o.CJK_HEAVENLY_STEM;case "cjk-ideographic":
              return o.CJK_IDEOGRAPHIC;case "devanagari":
              return o.DEVANAGARI;case "ethiopic-numeric":
              return o.ETHIOPIC_NUMERIC;case "georgian":
              return o.GEORGIAN;case "gujarati":
              return o.GUJARATI;case "gurmukhi":
              return o.GURMUKHI;case "hebrew":
              return o.HEBREW;case "hiragana":
              return o.HIRAGANA;case "hiragana-iroha":
              return o.HIRAGANA_IROHA;case "japanese-formal":
              return o.JAPANESE_FORMAL;case "japanese-informal":
              return o.JAPANESE_INFORMAL;case "kannada":
              return o.KANNADA;case "katakana":
              return o.KATAKANA;case "katakana-iroha":
              return o.KATAKANA_IROHA;case "khmer":
              return o.KHMER;case "korean-hangul-formal":
              return o.KOREAN_HANGUL_FORMAL;case "korean-hanja-formal":
              return o.KOREAN_HANJA_FORMAL;case "korean-hanja-informal":
              return o.KOREAN_HANJA_INFORMAL;case "lao":
              return o.LAO;case "lower-armenian":
              return o.LOWER_ARMENIAN;case "malayalam":
              return o.MALAYALAM;case "mongolian":
              return o.MONGOLIAN;case "myanmar":
              return o.MYANMAR;case "oriya":
              return o.ORIYA;case "persian":
              return o.PERSIAN;case "simp-chinese-formal":
              return o.SIMP_CHINESE_FORMAL;case "simp-chinese-informal":
              return o.SIMP_CHINESE_INFORMAL;case "tamil":
              return o.TAMIL;case "telugu":
              return o.TELUGU;case "thai":
              return o.THAI;case "tibetan":
              return o.TIBETAN;case "trad-chinese-formal":
              return o.TRAD_CHINESE_FORMAL;case "trad-chinese-informal":
              return o.TRAD_CHINESE_INFORMAL;case "upper-armenian":
              return o.UPPER_ARMENIAN;case "disclosure-open":
              return o.DISCLOSURE_OPEN;case "disclosure-closed":
              return o.DISCLOSURE_CLOSED;case "none":default:
              return o.NONE;}
        }(e.getPropertyValue("list-style-type")), listStyleImage: t.length ? t[0] : null, listStylePosition: i(e.getPropertyValue("list-style-position")) };
    }, function (e) {
      switch (e) {case "inside":
          return a.INSIDE;case "outside":default:
          return a.OUTSIDE;}
    });
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var r = t.POSITION = { STATIC: 0, RELATIVE: 1, ABSOLUTE: 2, FIXED: 3, STICKY: 4 };t.parsePosition = function (e) {
      switch (e) {case "relative":
          return r.RELATIVE;case "absolute":
          return r.ABSOLUTE;case "fixed":
          return r.FIXED;case "sticky":
          return r.STICKY;}return r.STATIC;
    };
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var r = t.TEXT_TRANSFORM = { NONE: 0, LOWERCASE: 1, UPPERCASE: 2, CAPITALIZE: 3 };t.parseTextTransform = function (e) {
      switch (e) {case "uppercase":
          return r.UPPERCASE;case "lowercase":
          return r.LOWERCASE;case "capitalize":
          return r.CAPITALIZE;}return r.NONE;
    };
  }, function (e, t, n) {
    "use strict";
    function r(e) {
      return e && e.__esModule ? e : { default: e };
    }Object.defineProperty(t, "__esModule", { value: !0 }), t.reformatInputBounds = t.inlineSelectElement = t.inlineTextAreaElement = t.inlineInputElement = t.getInputBorderRadius = t.INPUT_BACKGROUND = t.INPUT_BORDERS = t.INPUT_COLOR = void 0;var a = r(n(8)),
        o = n(5),
        i = n(11),
        u = r(n(44)),
        l = r(n(7)),
        s = r(n(0)),
        c = r(n(2)),
        d = (n(1), n(19), n(3)),
        f = (t.INPUT_COLOR = new s.default([42, 42, 42]), new s.default([165, 165, 165])),
        h = new s.default([222, 222, 222]),
        p = { borderWidth: 1, borderColor: f, borderStyle: i.BORDER_STYLE.SOLID },
        g = (t.INPUT_BORDERS = [p, p, p, p], t.INPUT_BACKGROUND = { backgroundColor: h, backgroundImage: [], backgroundClip: o.BACKGROUND_CLIP.PADDING_BOX, backgroundOrigin: o.BACKGROUND_ORIGIN.PADDING_BOX }, new c.default("50%")),
        E = [g, g],
        m = [E, E, E, E],
        T = new c.default("3px"),
        y = [T, T],
        v = [y, y, y, y],
        b = (t.getInputBorderRadius = function (e) {
      return "radio" === e.type ? m : v;
    }, t.inlineInputElement = function (e, t) {
      if ("radio" === e.type || "checkbox" === e.type) {
        if (e.checked) {
          var n = Math.min(t.bounds.width, t.bounds.height);t.childNodes.push("checkbox" === e.type ? [new l.default(t.bounds.left + .39363 * n, t.bounds.top + .79 * n), new l.default(t.bounds.left + .16 * n, t.bounds.top + .5549 * n), new l.default(t.bounds.left + .27347 * n, t.bounds.top + .44071 * n), new l.default(t.bounds.left + .39694 * n, t.bounds.top + .5649 * n), new l.default(t.bounds.left + .72983 * n, t.bounds.top + .23 * n), new l.default(t.bounds.left + .84 * n, t.bounds.top + .34085 * n), new l.default(t.bounds.left + .39363 * n, t.bounds.top + .79 * n)] : new u.default(t.bounds.left + n / 4, t.bounds.top + n / 4, n / 4));
        }
      } else b(I(e), e, t, !1);
    }, t.inlineTextAreaElement = function (e, t) {
      b(e.value, e, t, !0);
    }, t.inlineSelectElement = function (e, t) {
      var n = e.options[e.selectedIndex || 0];b(n ? n.text || "" : "", e, t, !1);
    }, t.reformatInputBounds = function (e) {
      return e.width > e.height ? (e.left += (e.width - e.height) / 2, e.width = e.height) : e.width < e.height && (e.top += (e.height - e.width) / 2, e.height = e.width), e;
    }, function (e, t, n, r) {
      var o = t.ownerDocument.body;if (e.length > 0 && o) {
        var i = t.ownerDocument.createElement("html2canvaswrapper");(0, d.copyCSSStyles)(t.ownerDocument.defaultView.getComputedStyle(t, null), i), i.style.position = "fixed", i.style.left = n.bounds.left + "px", i.style.top = n.bounds.top + "px", r || (i.style.whiteSpace = "nowrap");var u = t.ownerDocument.createTextNode(e);i.appendChild(u), o.appendChild(i), n.childNodes.push(a.default.fromTextNode(u, n)), o.removeChild(i);
      }
    }),
        I = function I(e) {
      var t = "password" === e.type ? new Array(e.value.length + 1).join("•") : e.value;return 0 === t.length ? e.placeholder || "" : t;
    };
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 }), t.parseTextBounds = t.TextBounds = void 0;var r = n(41),
        a = n(1),
        o = n(10),
        i = function (e) {
      return e && e.__esModule ? e : { default: e };
    }(n(9)),
        u = /[^\u0000-\u00ff]/,
        l = function l(e) {
      return r.ucs2.encode([e]);
    },
        s = t.TextBounds = function e(t, n) {
      !function (e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
      }(this, e), this.text = t, this.bounds = n;
    },
        c = (t.parseTextBounds = function (e, t, n) {
      for (var a = r.ucs2.decode(e), h = 0 !== t.style.letterSpacing || function (e) {
        return u.test(e);
      }(e) ? a.map(l) : f(a), p = h.length, g = n.parentNode ? n.parentNode.ownerDocument.defaultView : null, E = g ? g.pageXOffset : 0, m = g ? g.pageYOffset : 0, T = [], y = 0, v = 0; v < p; v++) {
        var b = h[v];if (t.style.textDecoration !== o.TEXT_DECORATION.NONE || b.trim().length > 0) {
          if (i.default.SUPPORT_RANGE_BOUNDS) T.push(new s(b, d(n, y, b.length, E, m)));else {
            var I = n.splitText(b.length);T.push(new s(b, c(n, E, m))), n = I;
          }
        } else i.default.SUPPORT_RANGE_BOUNDS || (n = n.splitText(b.length));y += b.length;
      }return T;
    }, function (e, t, n) {
      var r = e.ownerDocument.createElement("html2canvaswrapper");r.appendChild(e.cloneNode(!0));var o = e.parentNode;if (o) {
        o.replaceChild(r, e);var i = (0, a.parseBounds)(r, t, n);return r.firstChild && o.replaceChild(r.firstChild, r), i;
      }return new a.Bounds(0, 0, 0, 0);
    }),
        d = function d(e, t, n, r, o) {
      var i = e.ownerDocument.createRange();return i.setStart(e, t), i.setEnd(e, t + n), a.Bounds.fromClientRect(i.getBoundingClientRect(), r, o);
    },
        f = function f(e) {
      for (var t = [], n = 0, a = !1, o = void 0; e.length;) {
        h(e[n]) === a ? ((o = e.splice(0, n)).length && t.push(r.ucs2.encode(o)), a = !a, n = 0) : n++, n >= e.length && (o = e.splice(0, n)).length && t.push(r.ucs2.encode(o));
      }return t;
    },
        h = function h(e) {
      return -1 !== [32, 13, 10, 9, 45].indexOf(e);
    };
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var r = function () {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
        }
      }return function (t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
      };
    }(),
        a = function () {
      function e(t) {
        !function (e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }(this, e), this.element = t;
      }return r(e, [{ key: "render", value: function value(e) {
          var t = this;this.options = e, this.canvas = document.createElement("canvas"), this.ctx = this.canvas.getContext("2d"), this.canvas.width = Math.floor(e.width) * e.scale, this.canvas.height = Math.floor(e.height) * e.scale, this.canvas.style.width = e.width + "px", this.canvas.style.height = e.height + "px", e.logger.log("ForeignObject renderer initialized (" + e.width + "x" + e.height + " at " + e.x + "," + e.y + ") with scale " + e.scale);var n = o(Math.max(e.windowWidth, e.width) * e.scale, Math.max(e.windowHeight, e.height) * e.scale, e.scrollX * e.scale, e.scrollY * e.scale, this.element);return i(n).then(function (n) {
            return e.backgroundColor && (t.ctx.fillStyle = e.backgroundColor.toString(), t.ctx.fillRect(0, 0, e.width * e.scale, e.height * e.scale)), t.ctx.drawImage(n, -e.x * e.scale, -e.y * e.scale), t.canvas;
          });
        } }]), e;
    }();t.default = a;var o = t.createForeignObjectSVG = function (e, t, n, r, a) {
      var o = "http://www.w3.org/2000/svg",
          i = document.createElementNS(o, "svg"),
          u = document.createElementNS(o, "foreignObject");return i.setAttributeNS(null, "width", e), i.setAttributeNS(null, "height", t), u.setAttributeNS(null, "width", "100%"), u.setAttributeNS(null, "height", "100%"), u.setAttributeNS(null, "x", n), u.setAttributeNS(null, "y", r), u.setAttributeNS(null, "externalResourcesRequired", "true"), i.appendChild(u), u.appendChild(a), i;
    },
        i = t.loadSerializedSVG = function (e) {
      return new Promise(function (t, n) {
        var r = new Image();r.onload = function () {
          return t(r);
        }, r.onerror = n, r.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(new XMLSerializer().serializeToString(e));
      });
    };
  }, function (e, t, n) {
    "use strict";
    function r(e) {
      return e && e.__esModule ? e : { default: e };
    }Object.defineProperty(t, "__esModule", { value: !0 }), t.inlineListItemElement = t.getListOwner = void 0;var a = n(3),
        o = r(n(4)),
        i = r(n(8)),
        u = n(15),
        l = n(45),
        s = ["OL", "UL", "MENU"],
        c = (t.getListOwner = function (e) {
      var t = e.parent;if (!t) return null;do {
        if (-1 !== s.indexOf(t.tagName)) return t;t = t.parent;
      } while (t);return e.parent;
    }, t.inlineListItemElement = function (e, t, n) {
      var r = t.style.listStyle;if (r) {
        var l = e.ownerDocument.defaultView.getComputedStyle(e, null),
            s = e.ownerDocument.createElement("html2canvaswrapper");switch ((0, a.copyCSSStyles)(l, s), s.style.position = "absolute", s.style.bottom = "auto", s.style.display = "block", s.style.letterSpacing = "normal", r.listStylePosition) {case u.LIST_STYLE_POSITION.OUTSIDE:
            s.style.left = "auto", s.style.right = e.ownerDocument.defaultView.innerWidth - t.bounds.left - t.style.margin[1].getAbsoluteValue(t.bounds.width) + 7 + "px", s.style.textAlign = "right";break;case u.LIST_STYLE_POSITION.INSIDE:
            s.style.left = t.bounds.left - t.style.margin[3].getAbsoluteValue(t.bounds.width) + "px", s.style.right = "auto", s.style.textAlign = "left";}var c = void 0,
            d = t.style.margin[0].getAbsoluteValue(t.bounds.width),
            f = r.listStyleImage;if (f) {
          if ("url" === f.method) {
            var h = e.ownerDocument.createElement("img");h.src = f.args[0], s.style.top = t.bounds.top - d + "px", s.style.width = "auto", s.style.height = "auto", s.appendChild(h);
          } else {
            var p = .5 * parseFloat(t.style.font.fontSize);s.style.top = t.bounds.top - d + t.bounds.height - 1.5 * p + "px", s.style.width = p + "px", s.style.height = p + "px", s.style.backgroundImage = l.listStyleImage;
          }
        } else "number" == typeof t.listIndex && (c = e.ownerDocument.createTextNode(y(t.listIndex, r.listStyleType)), s.appendChild(c), s.style.top = t.bounds.top - d + "px");var g = e.ownerDocument.body;g.appendChild(s), c ? (t.childNodes.push(i.default.fromTextNode(c, t)), g.removeChild(s)) : t.childNodes.push(new o.default(s, t, n, 0));
      }
    }, { integers: [1e3, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1], values: ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"] }),
        d = { integers: [9e3, 8e3, 7e3, 6e3, 5e3, 4e3, 3e3, 2e3, 1e3, 900, 800, 700, 600, 500, 400, 300, 200, 100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1], values: ["Ք", "Փ", "Ւ", "Ց", "Ր", "Տ", "Վ", "Ս", "Ռ", "Ջ", "Պ", "Չ", "Ո", "Շ", "Ն", "Յ", "Մ", "Ճ", "Ղ", "Ձ", "Հ", "Կ", "Ծ", "Խ", "Լ", "Ի", "Ժ", "Թ", "Ը", "Է", "Զ", "Ե", "Դ", "Գ", "Բ", "Ա"] },
        f = { integers: [1e4, 9e3, 8e3, 7e3, 6e3, 5e3, 4e3, 3e3, 2e3, 1e3, 400, 300, 200, 100, 90, 80, 70, 60, 50, 40, 30, 20, 19, 18, 17, 16, 15, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1], values: ["י׳", "ט׳", "ח׳", "ז׳", "ו׳", "ה׳", "ד׳", "ג׳", "ב׳", "א׳", "ת", "ש", "ר", "ק", "צ", "פ", "ע", "ס", "נ", "מ", "ל", "כ", "יט", "יח", "יז", "טז", "טו", "י", "ט", "ח", "ז", "ו", "ה", "ד", "ג", "ב", "א"] },
        h = { integers: [1e4, 9e3, 8e3, 7e3, 6e3, 5e3, 4e3, 3e3, 2e3, 1e3, 900, 800, 700, 600, 500, 400, 300, 200, 100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1], values: ["ჵ", "ჰ", "ჯ", "ჴ", "ხ", "ჭ", "წ", "ძ", "ც", "ჩ", "შ", "ყ", "ღ", "ქ", "ფ", "ჳ", "ტ", "ს", "რ", "ჟ", "პ", "ო", "ჲ", "ნ", "მ", "ლ", "კ", "ი", "თ", "ჱ", "ზ", "ვ", "ე", "დ", "გ", "ბ", "ა"] },
        p = function p(e, t, n, r, a) {
      var o = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : ". ";return e < t || e > n ? y(e, a) : r.integers.reduce(function (t, n, a) {
        for (; e >= n;) {
          e -= n, t += r.values[a];
        }return t;
      }, "") + o;
    },
        g = function g(e, t, n, r) {
      var a = "";do {
        n || e--, a = r(e) + a, e /= t;
      } while (e * t >= t);return a;
    },
        E = function E(e, t, n, r) {
      var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : ". ",
          o = n - t + 1;return (e < 0 ? "-" : "") + (g(Math.abs(e), o, r, function (e) {
        return (0, l.fromCodePoint)(Math.floor(e % o) + t);
      }) + a);
    },
        m = function m(e, t) {
      var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : ". ",
          r = t.length;return g(Math.abs(e), r, !1, function (e) {
        return t[Math.floor(e % r)];
      }) + n;
    },
        T = function T(e, t, n, r, o, i) {
      if (e < -9999 || e > 9999) return y(e, u.LIST_STYLE_TYPE.CJK_DECIMAL);var l = Math.abs(e),
          s = o;if (0 === l) return t[0] + s;for (var c = 0; l > 0 && c <= 4; c++) {
        var d = l % 10;0 === d && (0, a.contains)(i, 1) && "" !== s ? s = t[d] + s : d > 1 || 1 === d && 0 === c || 1 === d && 1 === c && (0, a.contains)(i, 2) || 1 === d && 1 === c && (0, a.contains)(i, 4) && e > 100 || 1 === d && c > 1 && (0, a.contains)(i, 8) ? s = t[d] + (c > 0 ? n[c - 1] : "") + s : 1 === d && c > 0 && (s = n[c - 1] + s), l = Math.floor(l / 10);
      }return (e < 0 ? r : "") + s;
    },
        y = function y(e, t) {
      switch (t) {case u.LIST_STYLE_TYPE.DISC:
          return "•";case u.LIST_STYLE_TYPE.CIRCLE:
          return "◦";case u.LIST_STYLE_TYPE.SQUARE:
          return "◾";case u.LIST_STYLE_TYPE.DECIMAL_LEADING_ZERO:
          var n = E(e, 48, 57, !0);return n.length < 4 ? "0" + n : n;case u.LIST_STYLE_TYPE.CJK_DECIMAL:
          return m(e, "〇一二三四五六七八九", "、");case u.LIST_STYLE_TYPE.LOWER_ROMAN:
          return p(e, 1, 3999, c, u.LIST_STYLE_TYPE.DECIMAL).toLowerCase();case u.LIST_STYLE_TYPE.UPPER_ROMAN:
          return p(e, 1, 3999, c, u.LIST_STYLE_TYPE.DECIMAL);case u.LIST_STYLE_TYPE.LOWER_GREEK:
          return E(e, 945, 969, !1);case u.LIST_STYLE_TYPE.LOWER_ALPHA:
          return E(e, 97, 122, !1);case u.LIST_STYLE_TYPE.UPPER_ALPHA:
          return E(e, 65, 90, !1);case u.LIST_STYLE_TYPE.ARABIC_INDIC:
          return E(e, 1632, 1641, !0);case u.LIST_STYLE_TYPE.ARMENIAN:case u.LIST_STYLE_TYPE.UPPER_ARMENIAN:
          return p(e, 1, 9999, d, u.LIST_STYLE_TYPE.DECIMAL);case u.LIST_STYLE_TYPE.LOWER_ARMENIAN:
          return p(e, 1, 9999, d, u.LIST_STYLE_TYPE.DECIMAL).toLowerCase();case u.LIST_STYLE_TYPE.BENGALI:
          return E(e, 2534, 2543, !0);case u.LIST_STYLE_TYPE.CAMBODIAN:case u.LIST_STYLE_TYPE.KHMER:
          return E(e, 6112, 6121, !0);case u.LIST_STYLE_TYPE.CJK_EARTHLY_BRANCH:
          return m(e, "子丑寅卯辰巳午未申酉戌亥", "、");case u.LIST_STYLE_TYPE.CJK_HEAVENLY_STEM:
          return m(e, "甲乙丙丁戊己庚辛壬癸", "、");case u.LIST_STYLE_TYPE.CJK_IDEOGRAPHIC:case u.LIST_STYLE_TYPE.TRAD_CHINESE_INFORMAL:
          return T(e, "零一二三四五六七八九", "十百千萬", "負", "、", 14);case u.LIST_STYLE_TYPE.TRAD_CHINESE_FORMAL:
          return T(e, "零壹貳參肆伍陸柒捌玖", "拾佰仟萬", "負", "、", 15);case u.LIST_STYLE_TYPE.SIMP_CHINESE_INFORMAL:
          return T(e, "零一二三四五六七八九", "十百千萬", "负", "、", 14);case u.LIST_STYLE_TYPE.SIMP_CHINESE_FORMAL:
          return T(e, "零壹贰叁肆伍陆柒捌玖", "拾佰仟萬", "负", "、", 15);case u.LIST_STYLE_TYPE.JAPANESE_INFORMAL:
          return T(e, "〇一二三四五六七八九", "十百千万", "マイナス", "、", 0);case u.LIST_STYLE_TYPE.JAPANESE_FORMAL:
          return T(e, "零壱弐参四伍六七八九", "拾百千万", "マイナス", "、", 7);case u.LIST_STYLE_TYPE.KOREAN_HANGUL_FORMAL:
          return T(e, "영일이삼사오육칠팔구", "십백천만", "마이너스 ", ", ", 7);case u.LIST_STYLE_TYPE.KOREAN_HANJA_INFORMAL:
          return T(e, "零一二三四五六七八九", "十百千萬", "마이너스 ", ", ", 0);case u.LIST_STYLE_TYPE.KOREAN_HANJA_FORMAL:
          return T(e, "零壹貳參四五六七八九", "拾百千", "마이너스 ", ", ", 7);case u.LIST_STYLE_TYPE.DEVANAGARI:
          return E(e, 2406, 2415, !0);case u.LIST_STYLE_TYPE.GEORGIAN:
          return p(e, 1, 19999, h, u.LIST_STYLE_TYPE.DECIMAL);case u.LIST_STYLE_TYPE.GUJARATI:
          return E(e, 2790, 2799, !0);case u.LIST_STYLE_TYPE.GURMUKHI:
          return E(e, 2662, 2671, !0);case u.LIST_STYLE_TYPE.HEBREW:
          return p(e, 1, 10999, f, u.LIST_STYLE_TYPE.DECIMAL);case u.LIST_STYLE_TYPE.HIRAGANA:
          return m(e, "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわゐゑをん");case u.LIST_STYLE_TYPE.HIRAGANA_IROHA:
          return m(e, "いろはにほへとちりぬるをわかよたれそつねならむうゐのおくやまけふこえてあさきゆめみしゑひもせす");case u.LIST_STYLE_TYPE.KANNADA:
          return E(e, 3302, 3311, !0);case u.LIST_STYLE_TYPE.KATAKANA:
          return m(e, "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヰヱヲン", "、");case u.LIST_STYLE_TYPE.KATAKANA_IROHA:
          return m(e, "イロハニホヘトチリヌルヲワカヨタレソツネナラムウヰノオクヤマケフコエテアサキユメミシヱヒモセス", "、");case u.LIST_STYLE_TYPE.LAO:
          return E(e, 3792, 3801, !0);case u.LIST_STYLE_TYPE.MONGOLIAN:
          return E(e, 6160, 6169, !0);case u.LIST_STYLE_TYPE.MYANMAR:
          return E(e, 4160, 4169, !0);case u.LIST_STYLE_TYPE.ORIYA:
          return E(e, 2918, 2927, !0);case u.LIST_STYLE_TYPE.PERSIAN:
          return E(e, 1776, 1785, !0);case u.LIST_STYLE_TYPE.TAMIL:
          return E(e, 3046, 3055, !0);case u.LIST_STYLE_TYPE.TELUGU:
          return E(e, 3174, 3183, !0);case u.LIST_STYLE_TYPE.THAI:
          return E(e, 3664, 3673, !0);case u.LIST_STYLE_TYPE.TIBETAN:
          return E(e, 3872, 3881, !0);case u.LIST_STYLE_TYPE.DECIMAL:default:
          return E(e, 48, 57, !0);}
    };
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 }), t.FontMetrics = void 0;var r = function () {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
        }
      }return function (t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
      };
    }(),
        a = n(3);t.FontMetrics = function () {
      function e(t) {
        !function (e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }(this, e), this._data = {}, this._document = t;
      }return r(e, [{ key: "_parseMetrics", value: function value(e) {
          var t = this._document.createElement("div"),
              n = this._document.createElement("img"),
              r = this._document.createElement("span"),
              o = this._document.body;if (!o) throw new Error("");t.style.visibility = "hidden", t.style.fontFamily = e.fontFamily, t.style.fontSize = e.fontSize, t.style.margin = "0", t.style.padding = "0", o.appendChild(t), n.src = a.SMALL_IMAGE, n.width = 1, n.height = 1, n.style.margin = "0", n.style.padding = "0", n.style.verticalAlign = "baseline", r.style.fontFamily = e.fontFamily, r.style.fontSize = e.fontSize, r.style.margin = "0", r.style.padding = "0", r.appendChild(this._document.createTextNode("Hidden Text")), t.appendChild(r), t.appendChild(n);var i = n.offsetTop - r.offsetTop + 2;t.removeChild(r), t.appendChild(this._document.createTextNode("Hidden Text")), t.style.lineHeight = "normal", n.style.verticalAlign = "super";var u = n.offsetTop - t.offsetTop + 2;return o.removeChild(t), { baseline: i, middle: u };
        } }, { key: "getMetrics", value: function value(e) {
          var t = e.fontFamily + " " + e.fontSize;return void 0 === this._data[t] && (this._data[t] = this._parseMetrics(e)), this._data[t];
        } }]), e;
    }();
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 }), t.Proxy = void 0;var r = function (e) {
      return e && e.__esModule ? e : { default: e };
    }(n(9));t.Proxy = function (e, t) {
      if (!t.proxy) return Promise.reject(null);var n = t.proxy;return new Promise(function (a, o) {
        var i = r.default.SUPPORT_CORS_XHR && r.default.SUPPORT_RESPONSE_TYPE ? "blob" : "text",
            u = r.default.SUPPORT_CORS_XHR ? new XMLHttpRequest() : new XDomainRequest();if (u.onload = function () {
          if (u instanceof XMLHttpRequest) {
            if (200 === u.status) {
              if ("text" === i) a(u.response);else {
                var e = new FileReader();e.addEventListener("load", function () {
                  return a(e.result);
                }, !1), e.addEventListener("error", function (e) {
                  return o(e);
                }, !1), e.readAsDataURL(u.response);
              }
            } else o("");
          } else a(u.responseText);
        }, u.onerror = o, u.open("GET", n + "?url=" + encodeURIComponent(e) + "&responseType=" + i), "text" !== i && u instanceof XMLHttpRequest && (u.responseType = i), t.imageTimeout) {
          var l = t.imageTimeout;u.timeout = l, u.ontimeout = function () {
            return o("");
          };
        }u.send();
      });
    };
  }, function (e, t, n) {
    "use strict";
    function r(e) {
      return e && e.__esModule ? e : { default: e };
    }var a = Object.assign || function (e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];for (var r in n) {
          Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
        }
      }return e;
    },
        o = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
      return typeof e === "undefined" ? "undefined" : _typeof(e);
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof(e);
    },
        i = r(n(12)),
        u = r(n(13)),
        l = n(25),
        s = n(1),
        c = function c(e, t) {
      "object" === ("undefined" == typeof console ? "undefined" : o(console)) && "function" == typeof console.log && console.log("html2canvas 1.0.0-alpha.5");var n = t || {},
          r = new u.default("boolean" != typeof n.logging || n.logging);var c = e.ownerDocument;if (!c) return Promise.reject("Provided element is not within a Document");var d = c.defaultView,
          f = d.pageXOffset,
          h = d.pageYOffset,
          p = "HTML" === e.tagName || "BODY" === e.tagName ? (0, s.parseDocumentSize)(c) : (0, s.parseBounds)(e, f, h),
          g = p.width,
          E = p.height,
          m = p.left,
          T = p.top,
          y = { async: !0, allowTaint: !1, backgroundColor: "#ffffff", imageTimeout: 15e3, logging: !0, proxy: null, removeContainer: !0, foreignObjectRendering: !1, scale: d.devicePixelRatio || 1, target: new i.default(n.canvas), useCORS: !1, x: m, y: T, width: Math.ceil(g), height: Math.ceil(E), windowWidth: d.innerWidth, windowHeight: d.innerHeight, scrollX: d.pageXOffset, scrollY: d.pageYOffset },
          v = (0, l.renderElement)(e, a({}, y, n), r);return v;
    };c.CanvasRenderer = i.default, e.exports = c;
  }, function (e, t, n) {
    "use strict";
    function r(e) {
      return e && e.__esModule ? e : { default: e };
    }Object.defineProperty(t, "__esModule", { value: !0 }), t.renderElement = void 0;var a = function () {
      return function (e, t) {
        if (Array.isArray(e)) return e;if (Symbol.iterator in Object(e)) return function (e, t) {
          var n = [],
              r = !0,
              a = !1,
              o = void 0;try {
            for (var i, u = e[Symbol.iterator](); !(r = (i = u.next()).done) && (n.push(i.value), !t || n.length !== t); r = !0) {}
          } catch (e) {
            a = !0, o = e;
          } finally {
            try {
              !r && u.return && u.return();
            } finally {
              if (a) throw o;
            }
          }return n;
        }(e, t);throw new TypeError("Invalid attempt to destructure non-iterable instance");
      };
    }(),
        o = (r(n(13)), n(26)),
        i = r(n(46)),
        u = r(n(20)),
        l = r(n(9)),
        s = n(1),
        c = n(49),
        d = n(22),
        f = n(0),
        h = r(f);t.renderElement = function e(t, n, r) {
      var p = t.ownerDocument,
          g = new s.Bounds(n.scrollX, n.scrollY, n.windowWidth, n.windowHeight),
          E = p.documentElement ? new h.default(getComputedStyle(p.documentElement).backgroundColor) : f.TRANSPARENT,
          m = p.body ? new h.default(getComputedStyle(p.body).backgroundColor) : f.TRANSPARENT,
          T = t === p.documentElement ? E.isTransparent() ? m.isTransparent() ? n.backgroundColor ? new h.default(n.backgroundColor) : null : m : E : n.backgroundColor ? new h.default(n.backgroundColor) : null;return (n.foreignObjectRendering ? l.default.SUPPORT_FOREIGNOBJECT_DRAWING : Promise.resolve(!1)).then(function (l) {
        return l ? function (e) {
          return e.inlineFonts(p).then(function () {
            return e.resourceLoader.ready();
          }).then(function () {
            return new u.default(e.documentElement).render({ backgroundColor: T, logger: r, scale: n.scale, x: n.x, y: n.y, width: n.width, height: n.height, windowWidth: n.windowWidth, windowHeight: n.windowHeight, scrollX: n.scrollX, scrollY: n.scrollY });
          });
        }(new c.DocumentCloner(t, n, r, !0, e)) : (0, c.cloneWindow)(p, g, t, n, r, e).then(function (e) {
          var t = a(e, 3),
              u = t[0],
              l = t[1],
              s = t[2];var c = (0, o.NodeParser)(l, s, r),
              h = l.ownerDocument;return T === c.container.style.background.backgroundColor && (c.container.style.background.backgroundColor = f.TRANSPARENT), s.ready().then(function (e) {
            var t = new d.FontMetrics(h);var a = { backgroundColor: T, fontMetrics: t, imageStore: e, logger: r, scale: n.scale, x: n.x, y: n.y, width: n.width, height: n.height };if (Array.isArray(n.target)) return Promise.all(n.target.map(function (e) {
              return new i.default(e, a).render(c);
            }));var o = new i.default(n.target, a).render(c);return !0 === n.removeContainer && u.parentNode && u.parentNode.removeChild(u), o;
          });
        });
      });
    };
  }, function (e, t, n) {
    "use strict";
    function r(e) {
      return e && e.__esModule ? e : { default: e };
    }Object.defineProperty(t, "__esModule", { value: !0 }), t.NodeParser = void 0;var a = r(n(27)),
        o = r(n(4)),
        i = r(n(8)),
        u = n(18),
        l = n(21),
        s = (t.NodeParser = function (e, t, n) {
      var r = 0,
          i = new o.default(e, null, t, r++),
          u = new a.default(i, null, !0);return c(e, i, u, t, r), u;
    }, ["SCRIPT", "HEAD", "TITLE", "OBJECT", "BR", "OPTION"]),
        c = function e(t, n, r, c, h) {
      for (var p, g = t.firstChild; g; g = p) {
        p = g.nextSibling;var E = g.ownerDocument.defaultView;if (g instanceof E.Text || g instanceof Text || E.parent && g instanceof E.parent.Text) g.data.trim().length > 0 && n.childNodes.push(i.default.fromTextNode(g, n));else if (g instanceof E.HTMLElement || g instanceof HTMLElement || E.parent && g instanceof E.parent.HTMLElement) {
          if (-1 === s.indexOf(g.nodeName)) {
            var m = new o.default(g, n, c, h++);if (m.isVisible()) {
              "INPUT" === g.tagName ? (0, u.inlineInputElement)(g, m) : "TEXTAREA" === g.tagName ? (0, u.inlineTextAreaElement)(g, m) : "SELECT" === g.tagName ? (0, u.inlineSelectElement)(g, m) : m.style.listStyle && "none" !== m.style.listStyle.listStyleType && (0, l.inlineListItemElement)(g, m, c);var T = "TEXTAREA" !== g.tagName,
                  y = d(m, g);if (y || f(m)) {
                var v = y || m.isPositioned() ? r.getRealParentStackingContext() : r,
                    b = new a.default(m, v, y);v.contexts.push(b), T && e(g, m, b, c, h);
              } else r.children.push(m), T && e(g, m, r, c, h);
            }
          }
        } else if (g instanceof E.SVGSVGElement || g instanceof SVGSVGElement || E.parent && g instanceof E.parent.SVGSVGElement) {
          var I = new o.default(g, n, c, h++),
              _ = d(I, g);if (_ || f(I)) {
            var w = _ || I.isPositioned() ? r.getRealParentStackingContext() : r,
                A = new a.default(I, w, _);w.contexts.push(A);
          } else r.children.push(I);
        }
      }
    },
        d = function d(e, t) {
      return e.isRootElement() || e.isPositionedWithZIndex() || e.style.opacity < 1 || e.isTransformed() || h(e, t);
    },
        f = function f(e) {
      return e.isPositioned() || e.isFloating();
    },
        h = function h(e, t) {
      return "BODY" === t.nodeName && e.parent instanceof o.default && e.parent.style.background.backgroundColor.isTransparent();
    };
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var r = function () {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
        }
      }return function (t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
      };
    }(),
        a = (function (e) {
      e && e.__esModule;
    }(n(4)), n(16), function () {
      function e(t, n, r) {
        !function (e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }(this, e), this.container = t, this.parent = n, this.contexts = [], this.children = [], this.treatAsRealStackingContext = r;
      }return r(e, [{ key: "getOpacity", value: function value() {
          return this.parent ? this.container.style.opacity * this.parent.getOpacity() : this.container.style.opacity;
        } }, { key: "getRealParentStackingContext", value: function value() {
          return !this.parent || this.treatAsRealStackingContext ? this : this.parent.getRealParentStackingContext();
        } }]), e;
    }());t.default = a;
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });t.default = function e(t, n) {
      !function (e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
      }(this, e), this.width = t, this.height = n;
    };
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var r = function () {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
        }
      }return function (t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
      };
    }(),
        a = n(6),
        o = function (e) {
      return e && e.__esModule ? e : { default: e };
    }(n(7)),
        i = function i(e, t, n) {
      return new o.default(e.x + (t.x - e.x) * n, e.y + (t.y - e.y) * n);
    },
        u = function () {
      function e(t, n, r, o) {
        !function (e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }(this, e), this.type = a.PATH.BEZIER_CURVE, this.start = t, this.startControl = n, this.endControl = r, this.end = o;
      }return r(e, [{ key: "subdivide", value: function value(t, n) {
          var r = i(this.start, this.startControl, t),
              a = i(this.startControl, this.endControl, t),
              o = i(this.endControl, this.end, t),
              u = i(r, a, t),
              l = i(a, o, t),
              s = i(u, l, t);return n ? new e(this.start, r, u, s) : new e(s, l, o, this.end);
        } }, { key: "reverse", value: function value() {
          return new e(this.end, this.endControl, this.startControl, this.start);
        } }]), e;
    }();t.default = u;
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 }), t.parseBorderRadius = void 0;var r = function () {
      return function (e, t) {
        if (Array.isArray(e)) return e;if (Symbol.iterator in Object(e)) return function (e, t) {
          var n = [],
              r = !0,
              a = !1,
              o = void 0;try {
            for (var i, u = e[Symbol.iterator](); !(r = (i = u.next()).done) && (n.push(i.value), !t || n.length !== t); r = !0) {}
          } catch (e) {
            a = !0, o = e;
          } finally {
            try {
              !r && u.return && u.return();
            } finally {
              if (a) throw o;
            }
          }return n;
        }(e, t);throw new TypeError("Invalid attempt to destructure non-iterable instance");
      };
    }(),
        a = function (e) {
      return e && e.__esModule ? e : { default: e };
    }(n(2)),
        o = ["top-left", "top-right", "bottom-right", "bottom-left"];t.parseBorderRadius = function (e) {
      return o.map(function (t) {
        var n = e.getPropertyValue("border-" + t + "-radius").split(" ").map(a.default.create),
            o = r(n, 2),
            i = o[0],
            u = o[1];return void 0 === u ? [i, i] : [i, u];
      });
    };
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var r = t.DISPLAY = { NONE: 1, BLOCK: 2, INLINE: 4, RUN_IN: 8, FLOW: 16, FLOW_ROOT: 32, TABLE: 64, FLEX: 128, GRID: 256, RUBY: 512, SUBGRID: 1024, LIST_ITEM: 2048, TABLE_ROW_GROUP: 4096, TABLE_HEADER_GROUP: 8192, TABLE_FOOTER_GROUP: 16384, TABLE_ROW: 32768, TABLE_CELL: 65536, TABLE_COLUMN_GROUP: 1 << 17, TABLE_COLUMN: 1 << 18, TABLE_CAPTION: 1 << 19, RUBY_BASE: 1 << 20, RUBY_TEXT: 1 << 21, RUBY_BASE_CONTAINER: 1 << 22, RUBY_TEXT_CONTAINER: 1 << 23, CONTENTS: 1 << 24, INLINE_BLOCK: 1 << 25, INLINE_LIST_ITEM: 1 << 26, INLINE_TABLE: 1 << 27, INLINE_FLEX: 1 << 28, INLINE_GRID: 1 << 29 },
        a = function a(e, t) {
      return e | function (e) {
        switch (e) {case "block":
            return r.BLOCK;case "inline":
            return r.INLINE;case "run-in":
            return r.RUN_IN;case "flow":
            return r.FLOW;case "flow-root":
            return r.FLOW_ROOT;case "table":
            return r.TABLE;case "flex":
            return r.FLEX;case "grid":
            return r.GRID;case "ruby":
            return r.RUBY;case "subgrid":
            return r.SUBGRID;case "list-item":
            return r.LIST_ITEM;case "table-row-group":
            return r.TABLE_ROW_GROUP;case "table-header-group":
            return r.TABLE_HEADER_GROUP;case "table-footer-group":
            return r.TABLE_FOOTER_GROUP;case "table-row":
            return r.TABLE_ROW;case "table-cell":
            return r.TABLE_CELL;case "table-column-group":
            return r.TABLE_COLUMN_GROUP;case "table-column":
            return r.TABLE_COLUMN;case "table-caption":
            return r.TABLE_CAPTION;case "ruby-base":
            return r.RUBY_BASE;case "ruby-text":
            return r.RUBY_TEXT;case "ruby-base-container":
            return r.RUBY_BASE_CONTAINER;case "ruby-text-container":
            return r.RUBY_TEXT_CONTAINER;case "contents":
            return r.CONTENTS;case "inline-block":
            return r.INLINE_BLOCK;case "inline-list-item":
            return r.INLINE_LIST_ITEM;case "inline-table":
            return r.INLINE_TABLE;case "inline-flex":
            return r.INLINE_FLEX;case "inline-grid":
            return r.INLINE_GRID;}return r.NONE;
      }(t);
    };t.parseDisplay = function (e) {
      return e.split(" ").reduce(a, 0);
    };
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var r = t.FLOAT = { NONE: 0, LEFT: 1, RIGHT: 2, INLINE_START: 3, INLINE_END: 4 };t.parseCSSFloat = function (e) {
      switch (e) {case "left":
          return r.LEFT;case "right":
          return r.RIGHT;case "inline-start":
          return r.INLINE_START;case "inline-end":
          return r.INLINE_END;}return r.NONE;
    };
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });t.parseFont = function (e) {
      return { fontFamily: e.fontFamily, fontSize: e.fontSize, fontStyle: e.fontStyle, fontVariant: e.fontVariant, fontWeight: function (e) {
          switch (e) {case "normal":
              return 400;case "bold":
              return 700;}var t = parseInt(e, 10);return isNaN(t) ? 400 : t;
        }(e.fontWeight) };
    };
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });t.parseLetterSpacing = function (e) {
      if ("normal" === e) return 0;var t = parseFloat(e);return isNaN(t) ? 0 : t;
    };
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 }), t.parseMargin = void 0;var r = function (e) {
      return e && e.__esModule ? e : { default: e };
    }(n(2)),
        a = ["top", "right", "bottom", "left"];t.parseMargin = function (e) {
      return a.map(function (t) {
        return new r.default(e.getPropertyValue("margin-" + t));
      });
    };
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var r = t.OVERFLOW = { VISIBLE: 0, HIDDEN: 1, SCROLL: 2, AUTO: 3 };t.parseOverflow = function (e) {
      switch (e) {case "hidden":
          return r.HIDDEN;case "scroll":
          return r.SCROLL;case "auto":
          return r.AUTO;case "visible":default:
          return r.VISIBLE;}
    };
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 }), t.parseTextShadow = void 0;var r = function (e) {
      return e && e.__esModule ? e : { default: e };
    }(n(0)),
        a = /^([+-]|\d|\.)$/i;t.parseTextShadow = function (e) {
      if ("none" === e || "string" != typeof e) return null;for (var t = "", n = !1, o = [], i = [], u = 0, l = null, s = function s() {
        t.length && (n ? o.push(parseFloat(t)) : l = new r.default(t)), n = !1, t = "";
      }, c = function c() {
        o.length && null !== l && i.push({ color: l, offsetX: o[0] || 0, offsetY: o[1] || 0, blur: o[2] || 0 }), o.splice(0, o.length), l = null;
      }, d = 0; d < e.length; d++) {
        var f = e[d];switch (f) {case "(":
            t += f, u++;break;case ")":
            t += f, u--;break;case ",":
            0 === u ? (s(), c()) : t += f;break;case " ":
            0 === u ? s() : t += f;break;default:
            0 === t.length && a.test(f) && (n = !0), t += f;}
      }return s(), c(), 0 === i.length ? null : i;
    };
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 }), t.parseTransform = void 0;var r = function (e) {
      return e && e.__esModule ? e : { default: e };
    }(n(2)),
        a = function a(e) {
      return parseFloat(e.trim());
    },
        o = /(matrix|matrix3d)\((.+)\)/,
        i = (t.parseTransform = function (e) {
      var t = u(e.transform || e.webkitTransform || e.mozTransform || e.msTransform || e.oTransform);return null === t ? null : { transform: t, transformOrigin: i(e.transformOrigin || e.webkitTransformOrigin || e.mozTransformOrigin || e.msTransformOrigin || e.oTransformOrigin) };
    }, function (e) {
      if ("string" != typeof e) {
        var t = new r.default("0");return [t, t];
      }var n = e.split(" ").map(r.default.create);return [n[0], n[1]];
    }),
        u = function u(e) {
      if ("none" === e || "string" != typeof e) return null;var t = e.match(o);if (t) {
        if ("matrix" === t[1]) {
          var n = t[2].split(",").map(a);return [n[0], n[1], n[2], n[3], n[4], n[5]];
        }var r = t[2].split(",").map(a);return [r[0], r[1], r[4], r[5], r[12], r[13]];
      }return null;
    };
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var r = t.VISIBILITY = { VISIBLE: 0, HIDDEN: 1, COLLAPSE: 2 };t.parseVisibility = function (e) {
      switch (e) {case "hidden":
          return r.HIDDEN;case "collapse":
          return r.COLLAPSE;case "visible":default:
          return r.VISIBLE;}
    };
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });t.parseZIndex = function (e) {
      var t = "auto" === e;return { auto: t, order: t ? 0 : parseInt(e, 10) };
    };
  }, function (e, t, n) {
    (function (e, r) {
      var a;!function (o) {
        function i(e) {
          throw new RangeError(P[e]);
        }function u(e, t) {
          for (var n = e.length, r = []; n--;) {
            r[n] = t(e[n]);
          }return r;
        }function l(e, t) {
          var n = e.split("@"),
              r = "";n.length > 1 && (r = n[0] + "@", e = n[1]);return r + u((e = e.replace(R, ".")).split("."), t).join(".");
        }function s(e) {
          for (var t, n, r = [], a = 0, o = e.length; a < o;) {
            (t = e.charCodeAt(a++)) >= 55296 && t <= 56319 && a < o ? 56320 == (64512 & (n = e.charCodeAt(a++))) ? r.push(((1023 & t) << 10) + (1023 & n) + 65536) : (r.push(t), a--) : r.push(t);
          }return r;
        }function c(e) {
          return u(e, function (e) {
            var t = "";return e > 65535 && (t += M((e -= 65536) >>> 10 & 1023 | 55296), e = 56320 | 1023 & e), t += M(e);
          }).join("");
        }function d(e) {
          return e - 48 < 10 ? e - 22 : e - 65 < 26 ? e - 65 : e - 97 < 26 ? e - 97 : y;
        }function f(e, t) {
          return e + 22 + 75 * (e < 26) - ((0 != t) << 5);
        }function h(e, t, n) {
          var r = 0;for (e = n ? C(e / _) : e >> 1, e += C(e / t); e > N * b >> 1; r += y) {
            e = C(e / N);
          }return C(r + (N + 1) * e / (e + I));
        }function p(e) {
          var t,
              n,
              r,
              a,
              o,
              u,
              l,
              s,
              f,
              p,
              g = [],
              E = e.length,
              m = 0,
              I = A,
              _ = w;for ((n = e.lastIndexOf(O)) < 0 && (n = 0), r = 0; r < n; ++r) {
            e.charCodeAt(r) >= 128 && i("not-basic"), g.push(e.charCodeAt(r));
          }for (a = n > 0 ? n + 1 : 0; a < E;) {
            for (o = m, u = 1, l = y; a >= E && i("invalid-input"), ((s = d(e.charCodeAt(a++))) >= y || s > C((T - m) / u)) && i("overflow"), m += s * u, f = l <= _ ? v : l >= _ + b ? b : l - _, !(s < f); l += y) {
              u > C(T / (p = y - f)) && i("overflow"), u *= p;
            }_ = h(m - o, t = g.length + 1, 0 == o), C(m / t) > T - I && i("overflow"), I += C(m / t), m %= t, g.splice(m++, 0, I);
          }return c(g);
        }function g(e) {
          var t,
              n,
              r,
              a,
              o,
              u,
              l,
              c,
              d,
              p,
              g,
              E,
              m,
              I,
              _,
              S = [];for (E = (e = s(e)).length, t = A, n = 0, o = w, u = 0; u < E; ++u) {
            (g = e[u]) < 128 && S.push(M(g));
          }for (r = a = S.length, a && S.push(O); r < E;) {
            for (l = T, u = 0; u < E; ++u) {
              (g = e[u]) >= t && g < l && (l = g);
            }for (l - t > C((T - n) / (m = r + 1)) && i("overflow"), n += (l - t) * m, t = l, u = 0; u < E; ++u) {
              if ((g = e[u]) < t && ++n > T && i("overflow"), g == t) {
                for (c = n, d = y; p = d <= o ? v : d >= o + b ? b : d - o, !(c < p); d += y) {
                  _ = c - p, I = y - p, S.push(M(f(p + _ % I, 0))), c = C(_ / I);
                }S.push(M(f(c, 0))), o = h(n, m, r == a), n = 0, ++r;
              }
            }++n, ++t;
          }return S.join("");
        }"object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) && t && t.nodeType, "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && e && e.nodeType;var E = "object" == (typeof r === "undefined" ? "undefined" : _typeof(r)) && r;var m,
            T = 2147483647,
            y = 36,
            v = 1,
            b = 26,
            I = 38,
            _ = 700,
            w = 72,
            A = 128,
            O = "-",
            S = /^xn--/,
            L = /[^\x20-\x7E]/,
            R = /[\x2E\u3002\uFF0E\uFF61]/g,
            P = { overflow: "Overflow: input needs wider integers to process", "not-basic": "Illegal input >= 0x80 (not a basic code point)", "invalid-input": "Invalid input" },
            N = y - v,
            C = Math.floor,
            M = String.fromCharCode;m = { version: "1.4.1", ucs2: { decode: s, encode: c }, decode: p, encode: g, toASCII: function toASCII(e) {
            return l(e, function (e) {
              return L.test(e) ? "xn--" + g(e) : e;
            });
          }, toUnicode: function toUnicode(e) {
            return l(e, function (e) {
              return S.test(e) ? p(e.slice(4).toLowerCase()) : e;
            });
          } }, void 0 === (a = function () {
          return m;
        }.call(t, n, t, e)) || (e.exports = a);
      }();
    }).call(t, n(42)(e), n(43));
  }, function (e, t) {
    e.exports = function (e) {
      return e.webpackPolyfill || (e.deprecate = function () {}, e.paths = [], e.children || (e.children = []), Object.defineProperty(e, "loaded", { enumerable: !0, get: function get() {
          return e.l;
        } }), Object.defineProperty(e, "id", { enumerable: !0, get: function get() {
          return e.i;
        } }), e.webpackPolyfill = 1), e;
    };
  }, function (e, t) {
    var n;n = function () {
      return this;
    }();try {
      n = n || Function("return this")() || (0, eval)("this");
    } catch (e) {
      "object" == (typeof window === "undefined" ? "undefined" : _typeof(window)) && (n = window);
    }e.exports = n;
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var r = n(6);t.default = function e(t, n, a) {
      !function (e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
      }(this, e), this.type = r.PATH.CIRCLE, this.x = t, this.y = n, this.radius = a;
    };
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });t.fromCodePoint = function () {
      if (String.fromCodePoint) return String.fromCodePoint.apply(String, arguments);var e = arguments.length;if (!e) return "";for (var t = [], n = -1, r = ""; ++n < e;) {
        var a = arguments.length <= n ? void 0 : arguments[n];a <= 65535 ? t.push(a) : (a -= 65536, t.push(55296 + (a >> 10), a % 1024 + 56320)), (n + 1 === e || t.length > 16384) && (r += String.fromCharCode.apply(String, t), t.length = 0);
      }return r;
    };
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var r = function () {
      return function (e, t) {
        if (Array.isArray(e)) return e;if (Symbol.iterator in Object(e)) return function (e, t) {
          var n = [],
              r = !0,
              a = !1,
              o = void 0;try {
            for (var i, u = e[Symbol.iterator](); !(r = (i = u.next()).done) && (n.push(i.value), !t || n.length !== t); r = !0) {}
          } catch (e) {
            a = !0, o = e;
          } finally {
            try {
              !r && u.return && u.return();
            } finally {
              if (a) throw o;
            }
          }return n;
        }(e, t);throw new TypeError("Invalid attempt to destructure non-iterable instance");
      };
    }(),
        a = function () {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
        }
      }return function (t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
      };
    }(),
        o = n(1),
        i = (n(22), n(47)),
        u = function (e) {
      return e && e.__esModule ? e : { default: e };
    }(n(8)),
        l = n(5),
        s = n(11),
        c = function () {
      function e(t, n) {
        !function (e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }(this, e), this.target = t, this.options = n, t.render(n);
      }return a(e, [{ key: "renderNode", value: function value(e) {
          e.isVisible() && (this.renderNodeBackgroundAndBorders(e), this.renderNodeContent(e));
        } }, { key: "renderNodeContent", value: function value(e) {
          var t = this,
              n = function n() {
            if (e.childNodes.length && e.childNodes.forEach(function (n) {
              if (n instanceof u.default) {
                var r = n.parent.style;t.target.renderTextNode(n.bounds, r.color, r.font, r.textDecoration, r.textShadow);
              } else t.target.drawShape(n, e.style.color);
            }), e.image) {
              var n = t.options.imageStore.get(e.image);if (n) {
                var r = (0, o.calculateContentBox)(e.bounds, e.style.padding, e.style.border),
                    a = "number" == typeof n.width && n.width > 0 ? n.width : r.width,
                    i = "number" == typeof n.height && n.height > 0 ? n.height : r.height;a > 0 && i > 0 && t.target.clip([(0, o.calculatePaddingBoxPath)(e.curvedBounds)], function () {
                  t.target.drawImage(n, new o.Bounds(0, 0, a, i), r);
                });
              }
            }
          },
              r = e.getClipPaths();r.length ? this.target.clip(r, n) : n();
        } }, { key: "renderNodeBackgroundAndBorders", value: function value(e) {
          var t = this,
              n = !e.style.background.backgroundColor.isTransparent() || e.style.background.backgroundImage.length,
              r = e.style.border.filter(function (e) {
            return e.borderStyle !== s.BORDER_STYLE.NONE && !e.borderColor.isTransparent();
          }),
              a = function a() {
            var a = (0, l.calculateBackgroungPaintingArea)(e.curvedBounds, e.style.background.backgroundClip);n && t.target.clip([a], function () {
              e.style.background.backgroundColor.isTransparent() || t.target.fill(e.style.background.backgroundColor), t.renderBackgroundImage(e);
            }), r.forEach(function (n, r) {
              t.renderBorder(n, r, e.curvedBounds);
            });
          };if (n || r.length) {
            var o = e.parent ? e.parent.getClipPaths() : [];o.length ? this.target.clip(o, a) : a();
          }
        } }, { key: "renderBackgroundImage", value: function value(e) {
          var t = this;e.style.background.backgroundImage.slice(0).reverse().forEach(function (n) {
            "url" === n.source.method && n.source.args.length ? t.renderBackgroundRepeat(e, n) : /gradient/i.test(n.source.method) && t.renderBackgroundGradient(e, n);
          });
        } }, { key: "renderBackgroundRepeat", value: function value(e, t) {
          var n = this.options.imageStore.get(t.source.args[0]);if (n) {
            var r = (0, l.calculateBackgroungPositioningArea)(e.style.background.backgroundOrigin, e.bounds, e.style.padding, e.style.border),
                a = (0, l.calculateBackgroundSize)(t, n, r),
                o = (0, l.calculateBackgroundPosition)(t.position, a, r),
                i = (0, l.calculateBackgroundRepeatPath)(t, o, a, r, e.bounds),
                u = Math.round(r.left + o.x),
                s = Math.round(r.top + o.y);this.target.renderRepeat(i, n, a, u, s);
          }
        } }, { key: "renderBackgroundGradient", value: function value(e, t) {
          var n = (0, l.calculateBackgroungPositioningArea)(e.style.background.backgroundOrigin, e.bounds, e.style.padding, e.style.border),
              r = (0, l.calculateGradientBackgroundSize)(t, n),
              a = (0, l.calculateBackgroundPosition)(t.position, r, n),
              u = new o.Bounds(Math.round(n.left + a.x), Math.round(n.top + a.y), r.width, r.height),
              s = (0, i.parseGradient)(e, t.source, u);if (s) switch (s.type) {case i.GRADIENT_TYPE.LINEAR_GRADIENT:
              this.target.renderLinearGradient(u, s);break;case i.GRADIENT_TYPE.RADIAL_GRADIENT:
              this.target.renderRadialGradient(u, s);}
        } }, { key: "renderBorder", value: function value(e, t, n) {
          this.target.drawShape((0, o.parsePathForBorder)(n, t), e.borderColor);
        } }, { key: "renderStack", value: function value(e) {
          var t = this;if (e.container.isVisible()) {
            var n = e.getOpacity();n !== this._opacity && (this.target.setOpacity(e.getOpacity()), this._opacity = n);var r = e.container.style.transform;null !== r ? this.target.transform(e.container.bounds.left + r.transformOrigin[0].value, e.container.bounds.top + r.transformOrigin[1].value, r.transform, function () {
              return t.renderStackContent(e);
            }) : this.renderStackContent(e);
          }
        } }, { key: "renderStackContent", value: function value(e) {
          var t = f(e),
              n = r(t, 5),
              a = n[0],
              o = n[1],
              i = n[2],
              u = n[3],
              l = n[4],
              s = d(e),
              c = r(s, 2),
              p = c[0],
              g = c[1];this.renderNodeBackgroundAndBorders(e.container), a.sort(h).forEach(this.renderStack, this), this.renderNodeContent(e.container), g.forEach(this.renderNode, this), u.forEach(this.renderStack, this), l.forEach(this.renderStack, this), p.forEach(this.renderNode, this), o.forEach(this.renderStack, this), i.sort(h).forEach(this.renderStack, this);
        } }, { key: "render", value: function value(e) {
          this.options.backgroundColor && this.target.rectangle(this.options.x, this.options.y, this.options.width, this.options.height, this.options.backgroundColor), this.renderStack(e);var t = this.target.getTarget();return t;
        } }]), e;
    }();t.default = c;var d = function d(e) {
      for (var t = [], n = [], r = e.children.length, a = 0; a < r; a++) {
        var o = e.children[a];o.isInlineLevel() ? t.push(o) : n.push(o);
      }return [t, n];
    },
        f = function f(e) {
      for (var t = [], n = [], r = [], a = [], o = [], i = e.contexts.length, u = 0; u < i; u++) {
        var l = e.contexts[u];l.container.isPositioned() || l.container.style.opacity < 1 || l.container.isTransformed() ? l.container.style.zIndex.order < 0 ? t.push(l) : l.container.style.zIndex.order > 0 ? r.push(l) : n.push(l) : l.container.isFloating() ? a.push(l) : o.push(l);
      }return [t, n, r, a, o];
    },
        h = function h(e, t) {
      return e.container.style.zIndex.order > t.container.style.zIndex.order ? 1 : e.container.style.zIndex.order < t.container.style.zIndex.order ? -1 : e.container.index > t.container.index ? 1 : -1;
    };
  }, function (e, t, n) {
    "use strict";
    function r(e) {
      return e && e.__esModule ? e : { default: e };
    }function a(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }Object.defineProperty(t, "__esModule", { value: !0 }), t.transformWebkitRadialGradientArgs = t.parseGradient = t.RadialGradient = t.LinearGradient = t.RADIAL_GRADIENT_SHAPE = t.GRADIENT_TYPE = void 0;var o = function () {
      return function (e, t) {
        if (Array.isArray(e)) return e;if (Symbol.iterator in Object(e)) return function (e, t) {
          var n = [],
              r = !0,
              a = !1,
              o = void 0;try {
            for (var i, u = e[Symbol.iterator](); !(r = (i = u.next()).done) && (n.push(i.value), !t || n.length !== t); r = !0) {}
          } catch (e) {
            a = !0, o = e;
          } finally {
            try {
              !r && u.return && u.return();
            } finally {
              if (a) throw o;
            }
          }return n;
        }(e, t);throw new TypeError("Invalid attempt to destructure non-iterable instance");
      };
    }(),
        i = (r(n(4)), n(48)),
        u = r(n(0)),
        l = n(2),
        s = r(l),
        c = n(3),
        d = /^(to )?(left|top|right|bottom)( (left|top|right|bottom))?$/i,
        f = /^([+-]?\d*\.?\d+)% ([+-]?\d*\.?\d+)%$/i,
        h = /(px)|%|( 0)$/i,
        p = /^(from|to|color-stop)\((?:([\d.]+)(%)?,\s*)?(.+?)\)$/i,
        g = /^\s*(circle|ellipse)?\s*((?:([\d.]+)(px|r?em|%)\s*(?:([\d.]+)(px|r?em|%))?)|closest-side|closest-corner|farthest-side|farthest-corner)?\s*(?:at\s*(?:(left|center|right)|([\d.]+)(px|r?em|%))\s+(?:(top|center|bottom)|([\d.]+)(px|r?em|%)))?(?:\s|$)/i,
        E = t.GRADIENT_TYPE = { LINEAR_GRADIENT: 0, RADIAL_GRADIENT: 1 },
        m = t.RADIAL_GRADIENT_SHAPE = { CIRCLE: 0, ELLIPSE: 1 },
        T = { left: new s.default("0%"), top: new s.default("0%"), center: new s.default("50%"), right: new s.default("100%"), bottom: new s.default("100%") },
        y = t.LinearGradient = function e(t, n) {
      a(this, e), this.type = E.LINEAR_GRADIENT, this.colorStops = t, this.direction = n;
    },
        v = t.RadialGradient = function e(t, n, r, o) {
      a(this, e), this.type = E.RADIAL_GRADIENT, this.colorStops = t, this.shape = n, this.center = r, this.radius = o;
    },
        b = (t.parseGradient = function (e, t, n) {
      var r = t.args,
          a = t.method,
          o = t.prefix;return "linear-gradient" === a ? I(r, n, !!o) : "gradient" === a && "linear" === r[0] ? I(["to bottom"].concat(N(r.slice(3))), n, !!o) : "radial-gradient" === a ? _(e, "-webkit-" === o ? P(r) : r, n) : "gradient" === a && "radial" === r[0] ? _(e, N(P(r.slice(1))), n) : void 0;
    }, function (e, t, n) {
      for (var r = [], a = t; a < e.length; a++) {
        var o = e[a],
            i = h.test(o),
            l = o.lastIndexOf(" "),
            c = new u.default(i ? o.substring(0, l) : o),
            d = i ? new s.default(o.substring(l + 1)) : a === t ? new s.default("0%") : a === e.length - 1 ? new s.default("100%") : null;r.push({ color: c, stop: d });
      }for (var f = r.map(function (e) {
        var t = e.color,
            r = e.stop;return { color: t, stop: 0 === n ? 0 : r ? r.getAbsoluteValue(n) / n : null };
      }), p = f[0].stop, g = 0; g < f.length; g++) {
        if (null !== p) {
          var E = f[g].stop;if (null === E) {
            for (var m = g; null === f[m].stop;) {
              m++;
            }for (var T = m - g + 1, y = (f[m].stop - p) / T; g < m; g++) {
              p = f[g].stop = p + y;
            }
          } else p = E;
        }
      }return f;
    }),
        I = function I(e, t, n) {
      var r = (0, i.parseAngle)(e[0]),
          a = d.test(e[0]),
          o = a || null !== r || f.test(e[0]),
          u = o ? null !== r ? w(n ? r - .5 * Math.PI : r, t) : a ? O(e[0], t) : S(e[0], t) : w(Math.PI, t),
          l = o ? 1 : 0,
          s = Math.min((0, c.distance)(Math.abs(u.x0) + Math.abs(u.x1), Math.abs(u.y0) + Math.abs(u.y1)), 2 * t.width, 2 * t.height);return new y(b(e, l, s), u);
    },
        _ = function _(e, t, n) {
      var r = t[0].match(g),
          a = r && ("circle" === r[1] || void 0 !== r[3] && void 0 === r[5]) ? m.CIRCLE : m.ELLIPSE,
          o = {},
          i = {};r && (void 0 !== r[3] && (o.x = (0, l.calculateLengthFromValueWithUnit)(e, r[3], r[4]).getAbsoluteValue(n.width)), void 0 !== r[5] && (o.y = (0, l.calculateLengthFromValueWithUnit)(e, r[5], r[6]).getAbsoluteValue(n.height)), r[7] ? i.x = T[r[7].toLowerCase()] : void 0 !== r[8] && (i.x = (0, l.calculateLengthFromValueWithUnit)(e, r[8], r[9])), r[10] ? i.y = T[r[10].toLowerCase()] : void 0 !== r[11] && (i.y = (0, l.calculateLengthFromValueWithUnit)(e, r[11], r[12])));var u = { x: void 0 === i.x ? n.width / 2 : i.x.getAbsoluteValue(n.width), y: void 0 === i.y ? n.height / 2 : i.y.getAbsoluteValue(n.height) },
          s = R(r && r[2] || "farthest-corner", a, u, o, n);return new v(b(t, r ? 1 : 0, Math.min(s.x, s.y)), a, u, s);
    },
        w = function w(e, t) {
      var n = t.width,
          r = t.height,
          a = .5 * n,
          o = .5 * r,
          i = (Math.abs(n * Math.sin(e)) + Math.abs(r * Math.cos(e))) / 2,
          u = a + Math.sin(e) * i,
          l = o - Math.cos(e) * i;return { x0: u, x1: n - u, y0: l, y1: r - l };
    },
        A = function A(e) {
      return Math.acos(e.width / 2 / ((0, c.distance)(e.width, e.height) / 2));
    },
        O = function O(e, t) {
      switch (e) {case "bottom":case "to top":
          return w(0, t);case "left":case "to right":
          return w(Math.PI / 2, t);case "right":case "to left":
          return w(3 * Math.PI / 2, t);case "top right":case "right top":case "to bottom left":case "to left bottom":
          return w(Math.PI + A(t), t);case "top left":case "left top":case "to bottom right":case "to right bottom":
          return w(Math.PI - A(t), t);case "bottom left":case "left bottom":case "to top right":case "to right top":
          return w(A(t), t);case "bottom right":case "right bottom":case "to top left":case "to left top":
          return w(2 * Math.PI - A(t), t);case "top":case "to bottom":default:
          return w(Math.PI, t);}
    },
        S = function S(e, t) {
      var n = e.split(" ").map(parseFloat),
          r = o(n, 2),
          a = r[0],
          i = r[1],
          u = a / 100 * t.width / (i / 100 * t.height);return w(Math.atan(isNaN(u) ? 1 : u) + Math.PI / 2, t);
    },
        L = function L(e, t, n, r) {
      return [{ x: 0, y: 0 }, { x: 0, y: e.height }, { x: e.width, y: 0 }, { x: e.width, y: e.height }].reduce(function (e, a) {
        var o = (0, c.distance)(t - a.x, n - a.y);return (r ? o < e.optimumDistance : o > e.optimumDistance) ? { optimumCorner: a, optimumDistance: o } : e;
      }, { optimumDistance: r ? 1 / 0 : -1 / 0, optimumCorner: null }).optimumCorner;
    },
        R = function R(e, t, n, r, a) {
      var o = n.x,
          i = n.y,
          u = 0,
          l = 0;switch (e) {case "closest-side":
          t === m.CIRCLE ? u = l = Math.min(Math.abs(o), Math.abs(o - a.width), Math.abs(i), Math.abs(i - a.height)) : t === m.ELLIPSE && (u = Math.min(Math.abs(o), Math.abs(o - a.width)), l = Math.min(Math.abs(i), Math.abs(i - a.height)));break;case "closest-corner":
          if (t === m.CIRCLE) u = l = Math.min((0, c.distance)(o, i), (0, c.distance)(o, i - a.height), (0, c.distance)(o - a.width, i), (0, c.distance)(o - a.width, i - a.height));else if (t === m.ELLIPSE) {
            var s = Math.min(Math.abs(i), Math.abs(i - a.height)) / Math.min(Math.abs(o), Math.abs(o - a.width)),
                d = L(a, o, i, !0);l = s * (u = (0, c.distance)(d.x - o, (d.y - i) / s));
          }break;case "farthest-side":
          t === m.CIRCLE ? u = l = Math.max(Math.abs(o), Math.abs(o - a.width), Math.abs(i), Math.abs(i - a.height)) : t === m.ELLIPSE && (u = Math.max(Math.abs(o), Math.abs(o - a.width)), l = Math.max(Math.abs(i), Math.abs(i - a.height)));break;case "farthest-corner":
          if (t === m.CIRCLE) u = l = Math.max((0, c.distance)(o, i), (0, c.distance)(o, i - a.height), (0, c.distance)(o - a.width, i), (0, c.distance)(o - a.width, i - a.height));else if (t === m.ELLIPSE) {
            var f = Math.max(Math.abs(i), Math.abs(i - a.height)) / Math.max(Math.abs(o), Math.abs(o - a.width)),
                h = L(a, o, i, !1);l = f * (u = (0, c.distance)(h.x - o, (h.y - i) / f));
          }break;default:
          u = r.x || 0, l = void 0 !== r.y ? r.y : u;}return { x: u, y: l };
    },
        P = t.transformWebkitRadialGradientArgs = function (e) {
      var t = "",
          n = "",
          r = "",
          a = "",
          o = 0,
          i = /^(left|center|right|\d+(?:px|r?em|%)?)(?:\s+(top|center|bottom|\d+(?:px|r?em|%)?))?$/i,
          u = /^\d+(px|r?em|%)?(?:\s+\d+(px|r?em|%)?)?$/i,
          l = e[o].match(i);l && o++;var s = e[o].match(/^(circle|ellipse)?\s*(closest-side|closest-corner|farthest-side|farthest-corner|contain|cover)?$/i);s && (t = s[1] || "", "contain" === (r = s[2] || "") ? r = "closest-side" : "cover" === r && (r = "farthest-corner"), o++);var c = e[o].match(u);c && o++;var d = e[o].match(i);d && o++;var f = e[o].match(u);f && o++;var h = d || l;h && h[1] && (a = h[1] + (/^\d+$/.test(h[1]) ? "px" : ""), h[2] && (a += " " + h[2] + (/^\d+$/.test(h[2]) ? "px" : "")));var p = f || c;return p && (n = p[0], p[1] || (n += "px")), !a || t || n || r || (n = a, a = ""), a && (a = "at " + a), [[t, r, n, a].filter(function (e) {
        return !!e;
      }).join(" ")].concat(e.slice(o));
    },
        N = function N(e) {
      return e.map(function (e) {
        return e.match(p);
      }).map(function (t, n) {
        if (!t) return e[n];switch (t[1]) {case "from":
            return t[4] + " 0%";case "to":
            return t[4] + " 100%";case "color-stop":
            return "%" === t[3] ? t[4] + " " + t[2] : t[4] + " " + 100 * parseFloat(t[2]) + "%";}
      });
    };
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var r = /([+-]?\d*\.?\d+)(deg|grad|rad|turn)/i;t.parseAngle = function (e) {
      var t = e.match(r);if (t) {
        var n = parseFloat(t[1]);switch (t[2].toLowerCase()) {case "deg":
            return Math.PI * n / 180;case "grad":
            return Math.PI / 200 * n;case "rad":
            return n;case "turn":
            return 2 * Math.PI * n;}
      }return null;
    };
  }, function (e, t, n) {
    "use strict";
    function r(e) {
      return e && e.__esModule ? e : { default: e };
    }Object.defineProperty(t, "__esModule", { value: !0 }), t.cloneWindow = t.DocumentCloner = void 0;var a = function () {
      return function (e, t) {
        if (Array.isArray(e)) return e;if (Symbol.iterator in Object(e)) return function (e, t) {
          var n = [],
              r = !0,
              a = !1,
              o = void 0;try {
            for (var i, u = e[Symbol.iterator](); !(r = (i = u.next()).done) && (n.push(i.value), !t || n.length !== t); r = !0) {}
          } catch (e) {
            a = !0, o = e;
          } finally {
            try {
              !r && u.return && u.return();
            } finally {
              if (a) throw o;
            }
          }return n;
        }(e, t);throw new TypeError("Invalid attempt to destructure non-iterable instance");
      };
    }(),
        o = function () {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
        }
      }return function (t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
      };
    }(),
        i = n(1),
        u = n(23),
        l = r(n(50)),
        s = n(3),
        c = n(5),
        d = r(n(12)),
        f = "data-html2canvas-ignore",
        h = t.DocumentCloner = function () {
      function e(t, n, r, a, o) {
        !function (e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }(this, e), this.referenceElement = t, this.scrolledElements = [], this.copyStyles = a, this.inlineImages = a, this.logger = r, this.options = n, this.renderer = o, this.resourceLoader = new l.default(n, r, window), this.documentElement = this.cloneNode(t.ownerDocument.documentElement);
      }return o(e, [{ key: "inlineAllImages", value: function value(e) {
          var t = this;if (this.inlineImages && e) {
            var n = e.style;Promise.all((0, c.parseBackgroundImage)(n.backgroundImage).map(function (e) {
              return "url" === e.method ? t.resourceLoader.inlineImage(e.args[0]).then(function (e) {
                return e && "string" == typeof e.src ? 'url("' + e.src + '")' : "none";
              }).catch(function (e) {
                0;
              }) : Promise.resolve("" + e.prefix + e.method + "(" + e.args.join(",") + ")");
            })).then(function (e) {
              e.length > 1 && (n.backgroundColor = ""), n.backgroundImage = e.join(",");
            }), e instanceof HTMLImageElement && this.resourceLoader.inlineImage(e.src).then(function (t) {
              if (t && e instanceof HTMLImageElement && e.parentNode) {
                var n = e.parentNode,
                    r = (0, s.copyCSSStyles)(e.style, t.cloneNode(!1));n.replaceChild(r, e);
              }
            }).catch(function (e) {
              0;
            });
          }
        } }, { key: "inlineFonts", value: function value(e) {
          var t = this;return Promise.all(Array.from(e.styleSheets).map(function (t) {
            return t.href ? fetch(t.href).then(function (e) {
              return e.text();
            }).then(function (e) {
              return g(e, t.href);
            }).catch(function (e) {
              return [];
            }) : p(t, e);
          })).then(function (e) {
            return e.reduce(function (e, t) {
              return e.concat(t);
            }, []);
          }).then(function (e) {
            return Promise.all(e.map(function (e) {
              return fetch(e.formats[0].src).then(function (e) {
                return e.blob();
              }).then(function (e) {
                return new Promise(function (t, n) {
                  var r = new FileReader();r.onerror = n, r.onload = function () {
                    var e = r.result;t(e);
                  }, r.readAsDataURL(e);
                });
              }).then(function (t) {
                return e.fontFace.setProperty("src", 'url("' + t + '")'), "@font-face {" + e.fontFace.cssText + " ";
              });
            }));
          }).then(function (n) {
            var r = e.createElement("style");r.textContent = n.join("\n"), t.documentElement.appendChild(r);
          });
        } }, { key: "createElementClone", value: function value(e) {
          var t = this;if (this.copyStyles && e instanceof HTMLCanvasElement) {
            var n = e.ownerDocument.createElement("img");try {
              return n.src = e.toDataURL(), n;
            } catch (e) {
              0;
            }
          }if (e instanceof HTMLIFrameElement) {
            var r = e.cloneNode(!1),
                a = L();r.setAttribute("data-html2canvas-internal-iframe-key", a);var o = (0, i.parseBounds)(e, 0, 0),
                u = o.width,
                l = o.height;return this.resourceLoader.cache[a] = P(e, this.options).then(function (e) {
              return t.renderer(e, { async: t.options.async, allowTaint: t.options.allowTaint, backgroundColor: "#ffffff", canvas: null, imageTimeout: t.options.imageTimeout, logging: t.options.logging, proxy: t.options.proxy, removeContainer: t.options.removeContainer, scale: t.options.scale, foreignObjectRendering: t.options.foreignObjectRendering, useCORS: t.options.useCORS, target: new d.default(), width: u, height: l, x: 0, y: 0, windowWidth: e.ownerDocument.defaultView.innerWidth, windowHeight: e.ownerDocument.defaultView.innerHeight, scrollX: e.ownerDocument.defaultView.pageXOffset, scrollY: e.ownerDocument.defaultView.pageYOffset }, t.logger.child(a));
            }).then(function (t) {
              return new Promise(function (n, a) {
                var o = document.createElement("img");o.onload = function () {
                  return n(t);
                }, o.onerror = a, o.src = t.toDataURL(), r.parentNode && r.parentNode.replaceChild((0, s.copyCSSStyles)(e.ownerDocument.defaultView.getComputedStyle(e), o), r);
              });
            }), r;
          }return e.cloneNode(!1);
        } }, { key: "cloneNode", value: function value(e) {
          var t = e.nodeType === Node.TEXT_NODE ? document.createTextNode(e.nodeValue) : this.createElementClone(e),
              n = e.ownerDocument.defaultView;this.referenceElement === e && t instanceof n.HTMLElement && (this.clonedReferenceElement = t), t instanceof n.HTMLBodyElement && A(t);for (var r = e.firstChild; r; r = r.nextSibling) {
            (r.nodeType !== Node.ELEMENT_NODE || "SCRIPT" !== r.nodeName && !r.hasAttribute(f)) && (this.copyStyles && "STYLE" === r.nodeName || t.appendChild(this.cloneNode(r)));
          }if (e instanceof n.HTMLElement && t instanceof n.HTMLElement) switch (this.inlineAllImages(m(e, t, v)), this.inlineAllImages(m(e, t, b)), !this.copyStyles || e instanceof HTMLIFrameElement || (0, s.copyCSSStyles)(e.ownerDocument.defaultView.getComputedStyle(e), t), this.inlineAllImages(t), 0 === e.scrollTop && 0 === e.scrollLeft || this.scrolledElements.push([t, e.scrollLeft, e.scrollTop]), e.nodeName) {case "CANVAS":
              this.copyStyles || E(e, t);break;case "TEXTAREA":case "SELECT":
              t.value = e.value;}return t;
        } }]), e;
    }(),
        p = function p(e, t) {
      return (e.cssRules ? Array.from(e.cssRules) : []).filter(function (e) {
        return e.type === CSSRule.FONT_FACE_RULE;
      }).map(function (e) {
        for (var n = (0, c.parseBackgroundImage)(e.style.getPropertyValue("src")), r = [], a = 0; a < n.length; a++) {
          if ("url" === n[a].method && n[a + 1] && "format" === n[a + 1].method) {
            var o = t.createElement("a");o.href = n[a].args[0], t.body && t.body.appendChild(o);var i = { src: o.href, format: n[a + 1].args[0] };r.push(i);
          }
        }return { formats: r.filter(function (e) {
            return (/^woff/i.test(e.format)
            );
          }), fontFace: e.style };
      }).filter(function (e) {
        return e.formats.length;
      });
    },
        g = function g(e, t) {
      var n = document.implementation.createHTMLDocument(""),
          r = document.createElement("base");r.href = t;var a = document.createElement("style");return a.textContent = e, n.head && n.head.appendChild(r), n.body && n.body.appendChild(a), a.sheet ? p(a.sheet, n) : [];
    },
        E = function E(e, t) {
      try {
        if (t) {
          t.width = e.width, t.height = e.height;var n = e.getContext("2d"),
              r = t.getContext("2d");n ? r.putImageData(n.getImageData(0, 0, e.width, e.height), 0, 0) : r.drawImage(e, 0, 0);
        }
      } catch (e) {}
    },
        m = function m(e, t, n) {
      var r = e.ownerDocument.defaultView.getComputedStyle(e, n);if (r && r.content && "none" !== r.content && "-moz-alt-content" !== r.content && "none" !== r.display) {
        var a = T(r.content),
            o = a.match(y),
            i = t.ownerDocument.createElement(o ? "img" : "html2canvaspseudoelement");return o ? i.src = T(o[1]) : i.textContent = a, (0, s.copyCSSStyles)(r, i), i.className = I + " " + _, t.className += n === v ? " " + I : " " + _, n === v ? t.insertBefore(i, t.firstChild) : t.appendChild(i), i;
      }
    },
        T = function T(e) {
      var t = e.substr(0, 1);return t === e.substr(e.length - 1) && t.match(/['"]/) ? e.substr(1, e.length - 2) : e;
    },
        y = /^url\((.+)\)$/i,
        v = ":before",
        b = ":after",
        I = "___html2canvas___pseudoelement_before",
        _ = "___html2canvas___pseudoelement_after",
        w = '{\n    content: "" !important;\n    display: none !important;\n}',
        A = function A(e) {
      O(e, "." + I + v + w + "\n         ." + _ + b + w);
    },
        O = function O(e, t) {
      var n = e.ownerDocument.createElement("style");n.innerHTML = t, e.appendChild(n);
    },
        S = function S(e) {
      var t = a(e, 3),
          n = t[0],
          r = t[1],
          o = t[2];n.scrollLeft = r, n.scrollTop = o;
    },
        L = function L() {
      return Math.ceil(Date.now() + 1e7 * Math.random()).toString(16);
    },
        R = /^data:text\/(.+);(base64)?,(.*)$/i,
        P = function P(e, t) {
      try {
        return Promise.resolve(e.contentWindow.document.documentElement);
      } catch (n) {
        return t.proxy ? (0, u.Proxy)(e.src, t).then(function (e) {
          var t = e.match(R);return t ? "base64" === t[2] ? window.atob(decodeURIComponent(t[3])) : decodeURIComponent(t[3]) : Promise.reject();
        }).then(function (t) {
          return N(e.ownerDocument, (0, i.parseBounds)(e, 0, 0)).then(function (e) {
            var n = e.contentWindow.document;n.open(), n.write(t);var r = C(e).then(function () {
              return n.documentElement;
            });return n.close(), r;
          });
        }) : Promise.reject();
      }
    },
        N = function N(e, t) {
      var n = e.createElement("iframe");return n.className = "html2canvas-container", n.style.visibility = "hidden", n.style.position = "fixed", n.style.left = "-10000px", n.style.top = "0px", n.style.border = "0", n.width = t.width.toString(), n.height = t.height.toString(), n.scrolling = "no", n.setAttribute(f, "true"), e.body ? (e.body.appendChild(n), Promise.resolve(n)) : Promise.reject("");
    },
        C = function C(e) {
      var t = e.contentWindow,
          n = t.document;return new Promise(function (r, a) {
        t.onload = e.onload = n.onreadystatechange = function () {
          var t = setInterval(function () {
            n.body.childNodes.length > 0 && "complete" === n.readyState && (clearInterval(t), r(e));
          }, 50);
        };
      });
    };t.cloneWindow = function (e, t, n, r, a, o) {
      var i = new h(n, r, a, !1, o),
          u = e.defaultView.pageXOffset,
          l = e.defaultView.pageYOffset;return N(e, t).then(function (r) {
        var a = r.contentWindow,
            o = a.document,
            s = C(r).then(function () {
          return i.scrolledElements.forEach(S), a.scrollTo(t.left, t.top), !/(iPad|iPhone|iPod)/g.test(navigator.userAgent) || a.scrollY === t.top && a.scrollX === t.left || (o.documentElement.style.top = -t.top + "px", o.documentElement.style.left = -t.left + "px", o.documentElement.style.position = "absolute"), i.clonedReferenceElement instanceof a.HTMLElement || i.clonedReferenceElement instanceof e.defaultView.HTMLElement || i.clonedReferenceElement instanceof HTMLElement ? Promise.resolve([r, i.clonedReferenceElement, i.resourceLoader]) : Promise.reject("");
        });return o.open(), o.write("<!DOCTYPE html><html></html>"), function (e, t, n) {
          !e.defaultView || t === e.defaultView.pageXOffset && n === e.defaultView.pageYOffset || e.defaultView.scrollTo(t, n);
        }(n.ownerDocument, u, l), o.replaceChild(o.adoptNode(i.documentElement), o.documentElement), o.close(), s;
      });
    };
  }, function (e, t, n) {
    "use strict";
    function r(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }Object.defineProperty(t, "__esModule", { value: !0 }), t.ResourceStore = void 0;var a = function () {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
        }
      }return function (t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
      };
    }(),
        o = function (e) {
      return e && e.__esModule ? e : { default: e };
    }(n(9)),
        i = n(23),
        u = function () {
      function e(t, n, a) {
        r(this, e), this.options = t, this._window = a, this.origin = this.getOrigin(a.location.href), this.cache = {}, this.logger = n, this._index = 0;
      }return a(e, [{ key: "loadImage", value: function value(e) {
          var t = this;if (this.hasResourceInCache(e)) return e;if (!p(e) || o.default.SUPPORT_SVG_DRAWING) {
            if (!0 === this.options.allowTaint || f(e) || this.isSameOrigin(e)) return this.addImage(e, e, !1);if (!this.isSameOrigin(e)) {
              if ("string" == typeof this.options.proxy) return this.cache[e] = (0, i.Proxy)(e, this.options).then(function (e) {
                return g(e, t.options.imageTimeout || 0);
              }), e;if (!0 === this.options.useCORS && o.default.SUPPORT_CORS_IMAGES) return this.addImage(e, e, !0);
            }
          }
        } }, { key: "inlineImage", value: function value(e) {
          var t = this;return f(e) ? g(e, this.options.imageTimeout || 0) : this.hasResourceInCache(e) ? this.cache[e] : this.isSameOrigin(e) || "string" != typeof this.options.proxy ? this.xhrImage(e) : this.cache[e] = (0, i.Proxy)(e, this.options).then(function (e) {
            return g(e, t.options.imageTimeout || 0);
          });
        } }, { key: "xhrImage", value: function value(e) {
          var t = this;return this.cache[e] = new Promise(function (n, r) {
            var a = new XMLHttpRequest();if (a.onreadystatechange = function () {
              if (4 === a.readyState) if (200 !== a.status) r("Failed to fetch image " + e.substring(0, 256) + " with status code " + a.status);else {
                var t = new FileReader();t.addEventListener("load", function () {
                  var e = t.result;n(e);
                }, !1), t.addEventListener("error", function (e) {
                  return r(e);
                }, !1), t.readAsDataURL(a.response);
              }
            }, a.responseType = "blob", t.options.imageTimeout) {
              var o = t.options.imageTimeout;a.timeout = o, a.ontimeout = function () {
                return r("");
              };
            }a.open("GET", e, !0), a.send();
          }).then(function (e) {
            return g(e, t.options.imageTimeout || 0);
          }), this.cache[e];
        } }, { key: "loadCanvas", value: function value(e) {
          var t = String(this._index++);return this.cache[t] = Promise.resolve(e), t;
        } }, { key: "hasResourceInCache", value: function value(e) {
          return void 0 !== this.cache[e];
        } }, { key: "addImage", value: function value(e, t, n) {
          var r = this;var a = function a(e) {
            return new Promise(function (a, o) {
              var i = new Image();if (i.onload = function () {
                return a(i);
              }, e && !n || (i.crossOrigin = "anonymous"), i.onerror = o, i.src = t, !0 === i.complete && setTimeout(function () {
                a(i);
              }, 500), r.options.imageTimeout) {
                var u = r.options.imageTimeout;setTimeout(function () {
                  return o("");
                }, u);
              }
            });
          };return this.cache[e] = h(t) && !p(t) ? o.default.SUPPORT_BASE64_DRAWING(t).then(a) : a(!0), e;
        } }, { key: "isSameOrigin", value: function value(e) {
          return this.getOrigin(e) === this.origin;
        } }, { key: "getOrigin", value: function value(e) {
          var t = this._link || (this._link = this._window.document.createElement("a"));return t.href = e, t.href = t.href, t.protocol + t.hostname + t.port;
        } }, { key: "ready", value: function value() {
          var e = this,
              t = Object.keys(this.cache),
              n = t.map(function (t) {
            return e.cache[t].catch(function (e) {
              return null;
            });
          });return Promise.all(n).then(function (e) {
            return new l(t, e);
          });
        } }]), e;
    }();t.default = u;var l = t.ResourceStore = function () {
      function e(t, n) {
        r(this, e), this._keys = t, this._resources = n;
      }return a(e, [{ key: "get", value: function value(e) {
          var t = this._keys.indexOf(e);return -1 === t ? null : this._resources[t];
        } }]), e;
    }(),
        s = /^data:image\/svg\+xml/i,
        c = /^data:image\/.*;base64,/i,
        d = /^data:image\/.*/i,
        f = function f(e) {
      return d.test(e);
    },
        h = function h(e) {
      return c.test(e);
    },
        p = function p(e) {
      return "svg" === e.substr(-3).toLowerCase() || s.test(e);
    },
        g = function g(e, t) {
      return new Promise(function (n, r) {
        var a = new Image();a.onload = function () {
          return n(a);
        }, a.onerror = r, a.src = e, !0 === a.complete && setTimeout(function () {
          n(a);
        }, 500), t && setTimeout(function () {
          return r("");
        }, t);
      });
    };
  }]);
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)(module)))

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(7);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(20)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./index.scss", function() {
		var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./index.scss");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(8);
exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, "@charset \"UTF-8\";\nbody, div, ul, li, img, p, a, h1, h2, h3, input {\n  margin: 0px;\n  padding: 0px;\n  border: 0px;\n  font-family: \"YouYuan\", \"microsoft yahei\"; }\n\na {\n  text-decoration: none; }\n\nli {\n  list-style: none; }\n\nhtml, body {\n  position: relative;\n  width: 750px;\n  height: 100%;\n  overflow: hidden;\n  margin: 0 auto;\n  background: #fff; }\n\n@media all and (orientation: landscape) {\n  .heng {\n    height: 100%;\n    width: 100%;\n    text-align: center;\n    background: #fff;\n    position: absolute;\n    z-index: 99999;\n    display: block; }\n    .heng div {\n      /*横屏时的样式*/\n      position: absolute;\n      width: 140px;\n      height: 200px;\n      left: 50%;\n      top: 0;\n      bottom: 0;\n      margin: auto -70px; }\n      .heng div i {\n        display: inline-block;\n        width: 60px;\n        height: 90px;\n        background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAABaCAYAAADkUTU1AAAI9ElEQVR4Xu1cfXBcVRU/5+Z1N8GEj2AhFQvUIigfBetYaRVbBhADU2wHVoYk3bx3k8kMcSyFPxzUf8IfOjrqIHYUXbL3vW6mKXbtINapg1ColLEUnYIj9QPGOE0VdUjjlE3tdnffO87J7GY26yZ9H5tNst37X5tzzu/87rl777v3nnMR5rhFo9HLhBDrhRC3AMBqAFgBABfmYU8CwAgAHAGAVwDgJaXUO+Vc6u7uXhkOh0/GYrGxIC5jEOVZdLG3t7fdcZyHiOgORHSL4xDRfiHEE/F4fB8AEGNIKdcS0fMA8IxpmluC+OzWEdcY0Wh0jaZp2wFgjWulMoJE9CoRbRVCEHcCIp4PAOOpVOqSZDJp+7VdMcIbNmzQVqxYMYCIXwEA4dehEj2O+GlEfF/h/xFxfTwef9mv/YoQ7u/vb06n00kA+FypIxweAHgdAJ4DgF9nMpmj4+Pj77Jca2vr0nA4fC0ArAeAO4lotYvh/22l1JfnjXAkEmluaWn5JQB8ukx09hLRgGVZb7hxUNf1m4QQjxHRxlmI/0kpxZ3kqwWNMEopfwIAkRL0fwNAn1Lq51696ujouKKxsfEwAFw6k246nV45PDzMs7vnFoiwlPIRAPhuCeqbjuPcYVnWv7x609nZ+cFwOMzL0xVn0d2qlOKJ0XPzTZjXxYaGhqMAEC5C/aOmaetisRivr55aV1fXsiVLlhxExJVnU+QlyjTNz55NrtzffROWUj4DAJuKjI4j4up4PH7MjyOGYTyNiPe70SWiDCK+XymVciNfLOOLcDQaXaVpGk9EU/qO40Qtyxry6kBB3jCMpUQUEUJsIKIbEPEqANBmsseypmn+1CueL8JSyh8AQH8BjIiOmKb5ca/gs8l3dnae39jYeJfjODxjXw8APNSn1mMiUqZp9njF9EXYMIw3EfG6IsKbTNN81iu4F/mBgQExOjq6DgA2A8AnAeC3SqmHvdhgWb+E/4mIbXkwO5VKXZxMJj1PVF6drYS8X8IPI+K3AKCBiLabprmtEs5Uw4YvwuyYrusXnjlzRtu1a1eg7Vo1SAaepavtZCXxfEe4kk5U01adcDV7ez6w6hGej16vJmY9wtXs7fnAKhvhSCTS1NTUtFQIcZ5t2xUbBYjo+7TRbecIITKZTObk8PDwf8rpTCPT0dFxUTgc/ioA8Kdjg1uQhShHRG8T0bZTp069kEwmMwUfpwgbhnEtIv4GAC5YiAT8+sTEbdu+NZFI/GNqtxSJRFqbm5v/ioiFKxC/9heq3gki+qhpmu9ORrinp+cpIupdqN5WyK+fKaU2Y19f3wW5XO4Eb/XKGHYK9zteQIlIuDhQ92KyIrKO41yNhmF0IWLZsygi6jdN88mKoM2BEcMwHkTEH7o1TUSP8EH64wBQdgNfa4QBwCrcHHyhXC/VIOE9TJiPOu+tE+bZqsZ+wwBQj/C0kV2PsNv5v0pyXpel+pAuDUytDulfAMDd59KyVCdciPYiHdJj2Wx2zdDQ0N90Xf+wEILzRS7Kc5pch2spwg4iLo3H4+OFoEkpPwAAf8/flNYc4f1KqdtL5yMpJSfKfKqwLNVShA8rpW4uJdzT0/M6Ed1Uc4Q56w8RP6OU4ohOtu7u7tuEEM/nDyRqbkgzxywRDRLRbkTsRES9KDmmJgnP9mG7h494ONz/90NnrUW6LM1OWErJidd1wvUIV2nL5wXG7/awPqQX+bf0bIMkyd/S50yEiWi4Trh4PNTaOlyIMGfB3nMunHgQUYy/tL6RrzUqxzlJRFMf4l6WjErJIiJXajXPYG8NIm50izV5mabr+i1CCN+FT27BFoJcLpe7hi/EeeI6lE+6Xgh+zZUPu5VS909mAESj0as1TePqsfPmCm0+7RLRO7Ztr0okEiemklrypLlc7sr5dG4OsF8TQtwzODjIxWPTSwA4P6ulpYWrSh5DxE/MAXi1THKqBpcHfjOVSh0qrkadMelMStmSTqdbGxsbF1W+Vi6XOyOEOGFZVrpc71Ysy65aoQuKUycctAcXun49wgs9QkH9W5QR3rJly/VNTU0jsVjsv147YFERbm9vDy9btoxvA28koveI6POWZR3wQtoP4YLO5Bsb1Wy6rm8UQhSX2T+tlHrAiw+eCRuGsQcRbwOAo1xGK4T4VSaTeXFoaOiUF2A/slJKTpHkVMnJRkRPmqY5VdbrxqYfwuX2z1kA4Az0P/DzMgCwzzTN424c8CIjpdxd/MCC4zjbLMt6wosNz4R1Xb9ZCMHbydkaX+TxmzpcZ/xjpRSXzwdqfX19S3K5HG8ACrf5IIRYOzg4+KoXw54Jc+HysWPHuH74EpdA25VSW13Kziim6zqXy3OEC20slUq1eX2mxjNhRpNSmlxR64LEHk3THojFYjzkAzUp5e8AoLjs/kdKqQe9GvVLmNON+cGS2dpzjuNsmmnX4sVRXdc7hBA7i3R4hfiYUur3XuywrC/C/CBBOBzm93RC5QCJ6MWxsbGNe/fu9fxhUGovGo1e3tDQcAQRLy78jYieNU2z+EkN17x9Ec4P6xcAgJenaY2IDk5MTNyVTCYnXHsxgyB3bCgUehkRbywim7Ft+4ZEIvGWH/u+Ceu6/pAQ4ntlQF87ffr03UFL5Xt7ey+1bXsfP4ZSjOE4zqOWZfH7A76ab8JdXV1XhUKht2cY0qOO48gdO3bs9+OVYRh3AkAcES8r0edSHM7e5yMcX8034fyw/jMAXAMAXFNYehTETvFE83Wl1F/ceNfd3X2dEOJr+Sdqpj1CRkSHJyYmbg/6UwlE2DAMPuyLZLPZezVNiyFi6ZtazJOJ8+0F54Mdymazbx0/fnwyU2758uWtoVDoI7Ztr+WTRSJaW67eiSfBTCazeefOne+56bjZZAIRzhtmG8Q7mba2tu8AwBcrWKTFnfX4yMjIowcOHMgFJcv6lSA8zQ8p5a0AwJPZqiAOEtEb/AigZVkHg9gp1a04YQaIRCINzc3N9yHil4honYeIF4b/9/Pf374np5k6aU4IF4NJKT8EAO355E5+NelyACjcBvJ7WKMAwLusV3K53L5EIsH/nrP2PzAJNfmP9znfAAAAAElFTkSuQmCC\") no-repeat; }\n      .heng div p {\n        color: #222;\n        line-height: 25px; } }\n\n#music_ctrl {\n  width: 50px;\n  height: 50px;\n  position: absolute;\n  z-index: 10;\n  left: 20px;\n  top: 20px;\n  background: url(" + escape(__webpack_require__(10)) + ") no-repeat;\n  background-size: 50px;\n  -webkit-animation: musicPlay 2s linear infinite;\n  animation: musicPlay 2s linear infinite;\n  z-index: 1000; }\n\n#music_ctrl.stop {\n  background-position-y: -50px;\n  -webkit-animation-play-state: paused;\n  animation-play-state: paused; }\n\n@-webkit-keyframes musicPlay {\n  from {\n    -webkit-transform: rotate(0deg);\n    transform: rotate(0deg); }\n  to {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg); } }\n\n@keyframes musicPlay {\n  from {\n    -webkit-transform: rotate(0deg);\n    transform: rotate(0deg); }\n  to {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg); } }\n\n.page {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  display: none; }\n\n.load {\n  display: block;\n  background: #70bfff;\n  z-index: 10000; }\n  .load .box {\n    width: 100%;\n    height: 100px;\n    position: absolute;\n    left: 0;\n    bottom: 0;\n    top: 0;\n    margin: auto; }\n  .load .btn-start {\n    display: none;\n    width: 361px;\n    height: 100px;\n    background: #fff;\n    border: 2px solid skyblue;\n    border-radius: 5px;\n    text-align: center;\n    font-size: 32px;\n    line-height: 100px;\n    position: absolute;\n    left: 0;\n    right: 0;\n    margin: 0 auto;\n    top: 28px; }\n  .load .progr {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    width: 200px;\n    height: 200px;\n    border: 1px solid #fff;\n    border-right: transparent;\n    border-left: transparent;\n    margin-left: -100px;\n    margin-top: -100px;\n    border-radius: 50%;\n    line-height: 200px; }\n  .load .progr1 {\n    border: 1px solid #fff; }\n  .load .progr2 {\n    width: 150px;\n    height: 150px;\n    margin-left: -75px;\n    margin-top: -75px;\n    -webkit-animation: loadingRotate 2s steps(12, end) infinite;\n    animation: loadingRotate 2s steps(12, end) infinite; }\n  .load .progr3 {\n    width: 100px;\n    height: 100px;\n    margin-left: -50px;\n    margin-top: -50px;\n    -webkit-animation: loadingRotate 1s steps(12, end) infinite;\n    animation: loadingRotate 1s steps(12, end) infinite; }\n  .load .banquan {\n    color: #fff;\n    position: absolute;\n    width: 100%;\n    text-align: center;\n    bottom: 20px;\n    font-size: 20px; }\n  .load .progress {\n    position: absolute;\n    top: 50%;\n    font-size: 28px;\n    color: #fff;\n    font-weight: bold;\n    width: 100%;\n    text-align: center;\n    margin-top: -14px; }\n\n.container {\n  width: 100%;\n  height: 100%;\n  position: relative; }\n\n.cs-room {\n  box-sizing: border-box;\n  /*width: 100%;\n  height: 100%;\n  padding-bottom: 200px;*/\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 100px;\n  background: url(" + escape(__webpack_require__(11)) + ") center bottom no-repeat;\n  background-size: 100% 100%; }\n  .cs-room .cs-item {\n    text-align: center;\n    position: absolute;\n    border: 1px solid transparent; }\n    .cs-room .cs-item .cs-body {\n      width: 96%;\n      margin-top: 1%; }\n    .cs-room .cs-item .cs-btn-resize, .cs-room .cs-item .cs-btn-remove, .cs-room .cs-item .cs-btn-rotate {\n      width: 60px;\n      height: 60px;\n      -webkit-background-size: 100%;\n      background-size: 100%;\n      position: absolute;\n      display: none; }\n    .cs-room .cs-item .cs-btn-resize {\n      background-image: url(" + escape(__webpack_require__(12)) + ");\n      top: -30px;\n      right: -30px;\n      z-index: 100; }\n    .cs-room .cs-item .cs-btn-remove {\n      background-image: url(" + escape(__webpack_require__(13)) + ");\n      left: -30px;\n      bottom: -30px; }\n    .cs-room .cs-item .cs-btn-rotate {\n      background-image: url(" + escape(__webpack_require__(14)) + ");\n      left: -30px;\n      top: -30px; }\n    .cs-room .cs-item.active {\n      border: 1px solid dodgerblue; }\n      .cs-room .cs-item.active .cs-btn-resize, .cs-room .cs-item.active .cs-btn-remove, .cs-room .cs-item.active .cs-btn-rotate {\n        display: block; }\n\n.bottom, .footer, .tip-layer {\n  width: 100%;\n  height: 215px;\n  border-top: 2px solid #fff;\n  position: absolute;\n  left: 0;\n  bottom: 0; }\n\n.bottom {\n  background: #fff; }\n  .bottom .logo {\n    width: 55%;\n    display: inline-block;\n    text-align: center; }\n    .bottom .logo i {\n      display: inline-block;\n      width: 150px;\n      height: 170px;\n      margin: 0 auto;\n      background: url(" + escape(__webpack_require__(15)) + ") no-repeat;\n      background-size: 100% 100%; }\n    .bottom .logo .text {\n      font-size: 22px;\n      line-height: 22px; }\n  .bottom .ewm {\n    display: inline-block;\n    width: 40%;\n    text-align: center; }\n    .bottom .ewm i {\n      display: inline-block;\n      width: 195px;\n      height: 195px;\n      margin: -10px auto;\n      background: url(" + escape(__webpack_require__(16)) + ") no-repeat;\n      background-size: 100% 100%; }\n\n.footer {\n  background: #f6f6f6; }\n  .footer .arrow {\n    width: 37px;\n    height: 33px;\n    background: url(" + escape(__webpack_require__(17)) + ") no-repeat;\n    position: absolute;\n    top: 60px;\n    left: 0;\n    right: 0;\n    margin: 0 auto;\n    -webkit-animation: arrowMove 1s linear infinite;\n    animation: arrowMove 1s linear infinite; }\n\n@-webkit-keyframes arrowMove {\n  0% {\n    -webkit-transform: translate(0, 0);\n    transform: translate(0, 0); }\n  100% {\n    -webkit-transform: translate(0, 20px);\n    transform: translate(0, 20px); } }\n\n@keyframes arrowMove {\n  0% {\n    -webkit-transform: translate(0, 0);\n    transform: translate(0, 0); }\n  100% {\n    -webkit-transform: translate(0, 20px);\n    transform: translate(0, 20px); } }\n\n.cs-tab-layer {\n  width: 100%;\n  height: 434px;\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  -webkit-transition: 0.2s;\n  transition: 0.2s; }\n  .cs-tab-layer.close {\n    bottom: -366px; }\n    .cs-tab-layer.close .cs-btn-close {\n      transform: rotate(180deg);\n      transition: transform 0.3s ease-in-out; }\n  .cs-tab-layer .cs-btn-camera {\n    display: none;\n    width: 89px;\n    height: 83px;\n    background: url(" + escape(__webpack_require__(18)) + ") no-repeat;\n    position: absolute;\n    top: -110px;\n    right: 40px; }\n\n.cs-tab-tools {\n  width: 100%;\n  height: 68px;\n  background: #fff; }\n  .cs-tab-tools .cs-tab-btn, .cs-tab-tools .cs-tab-btnlogin {\n    float: left;\n    height: 68px;\n    width: 68px;\n    padding: 0 20px;\n    background: url(" + escape(__webpack_require__(19)) + ") no-repeat center;\n    background-size: auto 100%;\n    line-height: 68px; }\n  .cs-tab-tools .active {\n    background-color: #f6f6f6; }\n  .cs-tab-tools .cs-btn-close {\n    float: right;\n    width: 100px;\n    height: 100%;\n    transition: transform 0.3s ease;\n    background: url(" + escape(__webpack_require__(1)) + ") center center no-repeat; }\n\n.cs-tab-contents {\n  width: 100%;\n  height: 366px;\n  background: #f6f6f6;\n  overflow: hidden; }\n  .cs-tab-contents .cs-tab-con {\n    display: none;\n    height: 366px;\n    overflow-y: scroll;\n    -webkit-overflow-scrolling: touch; }\n    .cs-tab-contents .cs-tab-con.active {\n      display: block; }\n    .cs-tab-contents .cs-tab-con li {\n      float: left;\n      width: 33.333%;\n      height: 170px;\n      background: url(" + escape(__webpack_require__(1)) + ") center center no-repeat;\n      -webkit-background-size: contain;\n      background-size: contain; }\n\n.cs-pic {\n  display: none;\n  width: 100%;\n  position: absolute;\n  left: 0;\n  top: 0;\n  z-index: 9999; }\n\n.loading-box {\n  width: 220px;\n  height: 176px;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  margin-left: -110px;\n  margin-top: -88px;\n  background: rgba(0, 0, 0, 0.7);\n  border-radius: 12px; }\n  .loading-box .icon {\n    width: 90px;\n    height: 90px;\n    margin: 10px auto 2px;\n    background-image: url(\"data:image/svg+xml;charset=utf8, <svg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 100 100'><path fill='none' d='M0 0h100v100H0z'></path><rect width='7' height='20' x='46.5' y='40' fill='%23E9E9E9' rx='5' ry='5' transform='translate(0 -30)'></rect><rect width='7' height='20' x='46.5' y='40' fill='%23989697' rx='5' ry='5' transform='rotate(30 105.98 65)'></rect><rect width='7' height='20' x='46.5' y='40' fill='%239B999A' rx='5' ry='5' transform='rotate(60 75.98 65)'></rect><rect width='7' height='20' x='46.5' y='40' fill='%23A3A1A2' rx='5' ry='5' transform='rotate(90 65 65)'></rect><rect width='7' height='20' x='46.5' y='40' fill='%23ABA9AA' rx='5' ry='5' transform='rotate(120 58.66 65)'></rect><rect width='7' height='20' x='46.5' y='40' fill='%23B2B2B2' rx='5' ry='5' transform='rotate(150 54.02 65)'></rect><rect width='7' height='20' x='46.5' y='40' fill='%23BAB8B9' rx='5' ry='5' transform='rotate(180 50 65)'></rect><rect width='7' height='20' x='46.5' y='40' fill='%23C2C0C1' rx='5' ry='5' transform='rotate(-150 45.98 65)'></rect><rect width='7' height='20' x='46.5' y='40' fill='%23CBCBCB' rx='5' ry='5' transform='rotate(-120 41.34 65)'></rect><rect width='7' height='20' x='46.5' y='40' fill='%23D2D2D2' rx='5' ry='5' transform='rotate(-90 35 65)'></rect><rect width='7' height='20' x='46.5' y='40' fill='%23DADADA' rx='5' ry='5' transform='rotate(-60 24.02 65)'></rect><rect width='7' height='20' x='46.5' y='40' fill='%23E2E2E2' rx='5' ry='5' transform='rotate(-30 -5.98 65)'></rect></svg>\");\n    background-size: 100%;\n    -webkit-animation: loadingRotate 1s steps(12, end) infinite;\n    animation: loadingRotate 1s steps(12, end) infinite; }\n  .loading-box .content {\n    color: #fff;\n    margin: 0;\n    padding: 0 15px 10px;\n    text-align: center;\n    font-size: 28px;\n    margin-top: 16px; }\n\n@-webkit-keyframes loadingRotate {\n  0% {\n    -webkit-transform: rotate(0);\n    transform: rotate(0); }\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg); } }\n\n@keyframes loadingRotate {\n  0% {\n    -webkit-transform: rotate(0);\n    transform: rotate(0); }\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg); } }\n\n.tip-layer {\n  background: #fff;\n  z-index: 999999;\n  line-height: 215px;\n  font-size: 36px;\n  text-align: center;\n  -webkit-transform: translate(0, 230px);\n  transform: translate(0, 230px);\n  -webkit-transition: 0.8s;\n  transition: 0.8s; }\n  .tip-layer.show {\n    -webkit-transform: translate(0, 0);\n    transform: translate(0, 0); }\n", ""]);

// exports


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = function escape(url) {
    if (typeof url !== 'string') {
        return url
    }
    // If url is already wrapped in quotes, remove them
    if (/^['"].*['"]$/.test(url)) {
        url = url.slice(1, -1);
    }
    // Should url be wrapped?
    // See https://drafts.csswg.org/css-values-3/#urls
    if (/["'() \t\n]/.test(url)) {
        return '"' + url.replace(/"/g, '\\"').replace(/\n/g, '\\n') + '"'
    }

    return url
}


/***/ }),
/* 9 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/music_btn.png";

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/Room.png";

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/resize.png";

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/remove.png";

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/rotate.png";

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/logo.png";

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/ewm.jpg";

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/icon_arrow.png";

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/icon_camera.png";

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/0.png";

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target) {
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(21);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 21 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ })
/******/ ]);