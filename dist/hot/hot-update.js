webpackHotUpdate(0,{

/***/ 441:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(371);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(376);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(433);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(377);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(403);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__SoundLoader_js__ = __webpack_require__(329);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Sound_js__ = __webpack_require__(440);








var EventEmitter = __webpack_require__(411);

var Sori = function (_EventEmitter) {
    __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(Sori, _EventEmitter);

    function Sori() {
        __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, Sori);

        var _this = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Sori.__proto__ || __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default()(Sori)).call(this));

        _this._audioBufferList = {};
        _this._soundList = {};
        _this._loadedList = {};

        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        _this._context = new AudioContext();
        return _this;
    }

    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(Sori, [{
        key: 'load',
        value: function load() {}
    }, {
        key: 'getSound',
        value: function getSound() {}
    }]);

    return Sori;
}(EventEmitter);

Sori.LOAD_COMPLETE = 'loadComplete';
Sori.LOAD_FINISH = 'loadFinish';
Sori.LOAD_ERROR = 'loadError';


/* unused harmony default export */ var _unused_webpack_default_export = (Sori);

var ldr = __WEBPACK_IMPORTED_MODULE_5__SoundLoader_js__["a" /* default */].createInstance(new AudioContext());
// ldr.load({url: '../assets/sound/eff_all.mp3', responseType: 'arraybuffer'});
ldr.load([{ url: '../assets/sound/eff_all.mp3', responseType: 'arraybuffer' }, { url: '../assets/sound/eff_cm_btn_basic.mp3', responseType: 'arraybuffer' }]);

ldr.on(__WEBPACK_IMPORTED_MODULE_5__SoundLoader_js__["a" /* default */].ERROR, function (url) {
    console.log(__WEBPACK_IMPORTED_MODULE_5__SoundLoader_js__["a" /* default */].ERROR, url);
});

ldr.on(__WEBPACK_IMPORTED_MODULE_5__SoundLoader_js__["a" /* default */].COMPLETE, function (obj, buffer) {
    console.log(__WEBPACK_IMPORTED_MODULE_5__SoundLoader_js__["a" /* default */].COMPLETE, obj, buffer);
    /*
    //{ buffer:buffer, context:this._context, config:config, id:id }
    const info = {
            buffer,
            context: this.context,
            config: obj.config,
            id: obj.id
        },
        snd = Sound.createInstance(info);
    //
    snd.stop();
    */
});

ldr.on(__WEBPACK_IMPORTED_MODULE_5__SoundLoader_js__["a" /* default */].FINISH, function () {
    console.log(__WEBPACK_IMPORTED_MODULE_5__SoundLoader_js__["a" /* default */].FINISH);
});

/***/ })

})