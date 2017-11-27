webpackHotUpdate(0,{

/***/ 389:
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__SoundLoader_js__ = __webpack_require__(422);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Sound_js__ = __webpack_require__(442);








var EventEmitter = __webpack_require__(129);

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
        _this._idList = {};

        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        _this._context = new AudioContext();
        return _this;
    }

    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(Sori, [{
        key: 'load',
        value: function load(list) {
            var _this2 = this;

            var loadList = this._parseList(list);
            console.log(loadList);

            // 버퍼가 이미 있는지 확인한다. 버퍼가 있으면 있는 버퍼로 사용한다.
            // 버퍼가 이미 없으나 동일한 주소의 호출이 있다면, 예약을 만들어 놓는다.

            var ldr = __WEBPACK_IMPORTED_MODULE_5__SoundLoader_js__["a" /* default */].createInstance(this._context);

            /**
             * 로드 에러.
             */
            ldr.on(__WEBPACK_IMPORTED_MODULE_5__SoundLoader_js__["a" /* default */].ERROR, function (url) {
                _this2.emit(Sori.LOAD_ERROR, url);
            });

            /**
             * 개별 로드 완료
             */
            ldr.on(__WEBPACK_IMPORTED_MODULE_5__SoundLoader_js__["a" /* default */].COMPLETE, function (obj, buffer) {
                buffer = buffer || _this2._audioBufferList[obj.url];
                console.log(obj, buffer);
                if (!!buffer) {
                    _this2._audioBufferList[obj.url] = buffer;
                    _this2.createSound(obj, buffer);
                }
            });

            /**
             * 전체 로드 완료
             */
            ldr.on(__WEBPACK_IMPORTED_MODULE_5__SoundLoader_js__["a" /* default */].FINISH, function () {
                _this2.emit(Sori.LOAD_FINISH);
            });

            /**
             * 로드 시작
             */
            ldr.load(loadList);
        }
    }, {
        key: 'createSound',
        value: function createSound(obj, buffer) {
            var _this3 = this;

            var loadInfo = void 0,
                uids = void 0;
            uids = this._urlList[obj.url];
            uids.forEach(function (v) {
                // TODO ::  Sound 객체가 있는지 확인하고 생성한다.
                loadInfo = _this3._loadInfos[v];
                var info = {
                    buffer: buffer,
                    context: _this3._context,
                    config: loadInfo.config || {},
                    id: loadInfo.id,
                    uid: v
                },
                    snd = __WEBPACK_IMPORTED_MODULE_6__Sound_js__["a" /* default */].createInstance(info);
                //
                _this3._soundList[v] = snd;
                _this3.emit(Sori.LOAD_COMPLETE, snd);
            });
        }
    }, {
        key: '_parseList',
        value: function _parseList(list) {
            var _this4 = this;

            var state = false;
            return list.filter(function (v) {
                v._uid = _this4._uidCnt++;
                if (v.id === undefined) {
                    v.id = 'snd_' + _this4._uidCnt;
                }
                if (_this4._urlList[v.url] === undefined) {
                    _this4._urlList[v.url] = [v._uid];
                    state = true;
                } else {
                    state = false;
                }
                console.log(v.id, state);

                v._isLoad = state;

                _this4._urlList[v.url].push(v._uid);
                _this4._idList[v.id] = v._uid;
                _this4._loadInfos[v._uid] = v;

                return true;
            });
        }

        /**
         * @description
         * @param uid
         * @return {Sound}
         * @private
         */

    }, {
        key: '_getSoundByUid',
        value: function _getSoundByUid(uid) {
            return this._soundList[uid];
        }

        /**
         * @description
         * @param id
         * @return {Sound}
         */

    }, {
        key: 'getSoundById',
        value: function getSoundById(id) {
            var uid = this._idList[id];
            return this._getSoundByUid(uid);
        }

        /**
         *
         * @description
         * @param url
         * @return {Array}
         */

    }, {
        key: 'getSoundByUrl',
        value: function getSoundByUrl(url) {
            var _this5 = this;

            var arr = this._urlList[url] || [];
            return arr.map(function (v) {
                return _this5._soundList[v];
            });
        }

        /**
         * @description
         * @return {Array}
         */

    }, {
        key: 'getSoundAll',
        value: function getSoundAll() {
            return this._soundList;
        }
    }]);

    return Sori;
}(EventEmitter);

Sori.LOAD_COMPLETE = 'loadComplete';
Sori.LOAD_FINISH = 'loadFinish';
Sori.LOAD_ERROR = 'loadError';


var sori = new Sori();
sori.load([{ url: '../assets/sound/eff_all.mp3', id: 'test' }, { url: '../assets/sound/eff_all.mp3' }, { url: '../assets/sound/eff_cm_btn_basic.mp3' }]);

sori.on(Sori.LOAD_COMPLETE, function (snd) {
    console.log(snd._id);
});

sori.on(Sori.LOAD_FINISH, function () {
    var snd = sori.getSoundByUrl('../assets/sound/eff_all.mp3');
    console.log(sori.getSoundById('aaa'), sori._soundList);
});

/* unused harmony default export */ var _unused_webpack_default_export = (Sori);

// ldr.load({url: '../assets/sound/eff_all.mp3', responseType: 'arraybuffer'});

/***/ })

})