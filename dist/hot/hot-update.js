webpackHotUpdate(0,{

/***/ 388:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__SoundLoader_js__ = __webpack_require__(421);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Sound_js__ = __webpack_require__(440);








var EventEmitter = __webpack_require__(128);

var Sori = function (_EventEmitter) {
    __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(Sori, _EventEmitter);

    function Sori() {
        __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, Sori);

        var _this = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Sori.__proto__ || __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default()(Sori)).call(this));

        _this._uidCnt = 0;
        _this._urlList = {};
        _this._audioBufferList = {};
        _this._soundList = {};
        _this._loadInfos = {};

        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        _this._context = new AudioContext();
        return _this;
    }

    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(Sori, [{
        key: 'load',
        value: function load(list) {
            var _this2 = this;

            var loadList = this._parseList(list);
            var ldr = __WEBPACK_IMPORTED_MODULE_5__SoundLoader_js__["a" /* default */].createInstance(new AudioContext()),
                loadInfo = void 0,
                uids = void 0;

            ldr.on(__WEBPACK_IMPORTED_MODULE_5__SoundLoader_js__["a" /* default */].ERROR, function (url) {
                _this2.emit(Sori.LOAD_ERROR, url);
            });

            ldr.on(__WEBPACK_IMPORTED_MODULE_5__SoundLoader_js__["a" /* default */].COMPLETE, function (obj, buffer) {
                _this2._audioBufferList[obj.url] = buffer;
                uids = _this2._urlList[obj.url];
                uids.forEach(function (v) {
                    loadInfo = _this2._loadInfos[v];
                    var info = {
                        buffer: buffer,
                        context: _this2._context,
                        config: loadInfo.config || {},
                        id: loadInfo.id,
                        uid: v
                    },
                        snd = __WEBPACK_IMPORTED_MODULE_6__Sound_js__["a" /* default */].createInstance(info);
                    //
                    _this2._soundList[v] = snd;
                });
                _this2.emit(Sori.LOAD_COMPLETE, snd);
            });

            ldr.on(__WEBPACK_IMPORTED_MODULE_5__SoundLoader_js__["a" /* default */].FINISH, function () {
                _this2.emit(Sori.LOAD_FINISH);
            });

            ldr.load(loadList);
        }
    }, {
        key: '_parseList',
        value: function _parseList(list) {
            var _this3 = this;

            var state = false;
            return list.filter(function (v) {
                v._uid = _this3._uidCnt++;
                if (v.id === undefined) {
                    v.id = 'snd_' + _this3._uidCnt;
                }
                if (_this3._urlList[v.url] === undefined) {
                    _this3._urlList[v.url] = [v._uid];
                    state = true;
                } else {
                    _this3._urlList[v.url].push(v._uid);
                    state = false;
                }

                _this3._loadInfos[v._uid] = v;

                // id: uid; 1
                // url: uid; ...
                //

                return state;
            });
        }
    }, {
        key: '_getSoundByUid',
        value: function _getSoundByUid(uid) {
            return this._soundList[uid];
        }
    }, {
        key: 'getSoundById',
        value: function getSoundById(id) {}
    }, {
        key: 'getSoundByUrl',
        value: function getSoundByUrl(url) {}
    }, {
        key: 'getSoundAll',
        value: function getSoundAll() {}
    }, {
        key: 'getPlayNote',
        value: function getPlayNote() {}
    }, {
        key: 'addPlayNote',
        value: function addPlayNote() {}
    }]);

    return Sori;
}(EventEmitter);

Sori.LOAD_COMPLETE = 'loadComplete';
Sori.LOAD_FINISH = 'loadFinish';
Sori.LOAD_ERROR = 'loadError';


var sori = new Sori();
sori.load([{ url: '../assets/sound/eff_all.mp3', id: 'test' }, { url: '../assets/sound/eff_all.mp3' }, { url: '../assets/sound/eff_cm_btn_basic.mp3' }]);

sori.on(Sori.LOAD_COMPLETE, function (snd) {});

sori.on(Sori.LOAD_FINISH, function () {});

/* unused harmony default export */ var _unused_webpack_default_export = (Sori);

// ldr.load({url: '../assets/sound/eff_all.mp3', responseType: 'arraybuffer'});

/***/ })

})