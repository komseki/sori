webpackHotUpdate(0,{

/***/ 329:
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_core_js_object_keys__ = __webpack_require__(437);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_core_js_object_keys__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_core_js_promise__ = __webpack_require__(418);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Sound_js__ = __webpack_require__(440);







var EventEmitter = __webpack_require__(411);



/**
 *
 * @param obj
 * @return {Promise}
 * @private
 */
function _request(obj) {
    return new __WEBPACK_IMPORTED_MODULE_6_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.responseType = obj.responseType || 'json';
        xhr.open(obj.method || 'GET', obj.url, true);
        if (obj.header !== undefined) {
            __WEBPACK_IMPORTED_MODULE_5_babel_runtime_core_js_object_keys___default()(obj.headers).forEach(function (key) {
                xhr.setRequestHeader(key, obj.headers[key]);
            });
        }
        xhr.onload = function () {
            var status = xhr.status;
            if (status >= 200 && status < 300) {
                resolve(xhr.response);
            } else {
                reject(xhr.statusText);
            }
        };
        xhr.onerror = function () {
            return reject(xhr.statusText);
        };
        xhr.send(obj.body);
    });
}

/**
 *
 * @param context {AudioContext}
 * @param res {ArrayBuffer}
 * @return {Promise}
 * @private
 */
function _decode(context, res) {
    return new __WEBPACK_IMPORTED_MODULE_6_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
        context.decodeAudioData(res, function (buffer) {
            if (buffer === null || buffer === undefined) {
                reject('buffer is not define');
            }
            resolve(buffer);
        }, function (err) {
            reject(err);
        });
    });
}

/**
 *
 */

var SoundLoader = function (_EventEmitter) {
    __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(SoundLoader, _EventEmitter);

    /**
     * 생성자 함수
     * @param context {AudioContext}
     */
    function SoundLoader(context) {
        __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, SoundLoader);

        var _this = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (SoundLoader.__proto__ || __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default()(SoundLoader)).call(this));

        _this.context = context;
        return _this;
    }

    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(SoundLoader, [{
        key: 'load',
        value: function load(info) {
            var _this2 = this;

            if (Array.isArray(info)) {
                var arr = [];
                info.forEach(function (v) {
                    arr.push(_this2._load(v));
                });
                __WEBPACK_IMPORTED_MODULE_6_babel_runtime_core_js_promise___default.a.all(arr).then(function () {
                    _this2.emit(SoundLoader.FINISH);
                });
            } else {
                this._load(info);
            }
        }
    }, {
        key: '_load',
        value: function _load(obj) {
            var _this3 = this;

            return _request(obj).then(function (res) {
                return _decode(_this3.context, res);
            }).then(function (buffer) {
                //{ buffer:buffer, context:this._context, config:config, id:id }
                var info = {
                    buffer: buffer,
                    context: _this3.context,
                    config: obj.config,
                    id: obj.id
                },
                    snd = __WEBPACK_IMPORTED_MODULE_7__Sound_js__["a" /* default */].getInstance(info);
                _this3.emit(SoundLoader.COMPLETE, snd);
            }).catch(function (err) {
                console.log(err);
                _this3.emit(SoundLoader.ERROR, { url: obj.url, err: err });
            });
        }
    }]);

    return SoundLoader;
}(EventEmitter);

SoundLoader.FINISH = 'finish';
SoundLoader.COMPLETE = 'complete';
SoundLoader.ERROR = 'error';


var ldr = new SoundLoader(new AudioContext());
// ldr.load({url: '../assets/sound/eff_all.mp3', responseType: 'arraybuffer'});
ldr.load([{ url: '../assets/sound/eff_all.mp3', responseType: 'arraybuffer' }, { url: '../assets/sound/eff_cm_btn_basic.mp3', responseType: 'arraybuffer' }]);

ldr.on(SoundLoader.ERROR, function (url) {
    console.log(SoundLoader.ERROR, url);
});

ldr.on(SoundLoader.COMPLETE, function (snd) {
    console.log(SoundLoader.COMPLETE, snd);
    snd.stop();
});

ldr.on(SoundLoader.FINISH, function () {
    console.log(SoundLoader.FINISH);
});

/* unused harmony default export */ var _unused_webpack_default_export = (SoundLoader);

/***/ }),

/***/ 440:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(371);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(376);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(377);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__ = __webpack_require__(433);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(403);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);





var EventEmitter = __webpack_require__(411);

var Sound = function (_EventEmitter) {
    __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(Sound, _EventEmitter);

    __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(Sound, null, [{
        key: 'getInstance',
        value: function getInstance(info) {
            return new Sound().init(info);
        }
    }]);

    function Sound() {
        __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, Sound);

        var _this = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Sound.__proto__ || __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default()(Sound)).call(this));

        _this._loop = false;
        return _this;
    }

    // { buffer:buffer, context:this._context, config:config, id:id }


    __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(Sound, [{
        key: 'init',
        value: function init(_ref) {
            var buffer = _ref.buffer,
                context = _ref.context,
                config = _ref.config,
                id = _ref.id;

            if (buffer === undefined) return;

            var ctx = this._context = context,
                destination = ctx.destination,

            // source = ctx.createBufferSource(),
            oscillator = ctx.createOscillator(),
                gainNode = ctx.createGain();

            //oscillator.connect( gainNode );
            gainNode.connect(destination);

            //
            // source.buffer = buffer;
            //
            // source.connect( ctx.destination );
            // source.connect( gainNode.gain );
            // this._source = source;

            this._buffer = buffer;
            this._loop = false;
            this._id = id || 'sound_' + Date.now();
            this._gainNode = gainNode;
            this._config = config || {};

            return this;
        }

        /**
         *
         * @param when {Number} 재생전 pause 타임.
         * @param offset {Number} 시작위치
         * @param duration {Number} 재생할 시간
         * @return {Sound}
         */

    }, {
        key: 'start',
        value: function start(when, offset, duration) {
            var _this2 = this;

            when = (when === undefined ? this._config.when : when) || 0;
            offset = (offset === undefined ? this._config.offset : offset) || 0;
            duration = (duration === undefined ? this._config.duration : duration) || this._buffer.duration;

            var ctx = this._context,
                source = ctx.createBufferSource();

            source.buffer = this._buffer;
            source.connect(ctx.destination);
            source.connect(this._gainNode.gain);

            // start 시에 source 생성함.
            this._source = source;

            /**
             * @description 재생 완료, evnet 발송.
             * @param e
             */
            source.onended = function (e) {
                source.disconnect(ctx.destination);
                source.disconnect(_this2._gainNode.gain);
                _this2.emit(Sound.ENDED);
            };

            this._source.start = !this._source.start ? this._source.noteOn : this._source.start;
            this._source.start(when, offset, duration);
            this._source.loop = this._loop;

            return this;
        }

        /**
         * 정지
         * @param when {Number} 정지 delay 시간.
         * @return {Object} Sound 객체
         */

    }, {
        key: 'stop',
        value: function stop(when) {
            when = when || 0;
            if (when > this._buffer.duration) when = this._buffer.duration;
            try {
                this._source.stop = !this._source.stop ? this._source.noteOff : this._source.stop;
                this._source.stop(when);
            } catch (e) {}
            return this;
        }

        /**
         * 반복
         * @param bool {boolean} true 반복
         * @return {Object} Sound 객체
         */

    }, {
        key: 'setLoop',
        value: function setLoop(bool) {
            this._loop = bool;
            return this;
        }

        /**
         * 음량.
         * @param val {Number} 소리크기
         * @return {Object} Sound 객체
         */

    }, {
        key: 'setGain',
        value: function setGain(val) {
            if (val < 0) {
                val = 0;
            }
            this.gainNode.gain.value = val;
            return this;
        }

        /**
         * 사운드 객체 해제
         */

    }, {
        key: 'release',
        value: function release() {
            this._source.disconnect();
            this._buffer = null;
            this._source = null;
        }
    }]);

    return Sound;
}(EventEmitter);

Sound.ENDED = 'ended';


/* harmony default export */ __webpack_exports__["a"] = (Sound);

/***/ })

})