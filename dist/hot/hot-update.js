webpackHotUpdate(0,{

/***/ 442:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);





var EventEmitter = __webpack_require__(129);

/**
 *  사운드 객체.
 */

var Sound = function (_EventEmitter) {
    __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(Sound, _EventEmitter);

    __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(Sound, null, [{
        key: 'createInstance',


        /**
         * @description Sound 인스턴스 생성 및 반환.
         * @param info {AudioContext}
         * @return {Sound}
         * @static
         */

        // 로드 및 재생정보

        // ArrayBuffer

        // 음량을 위한  gainNode


        //  사운드 재생 완료시 호출될 이벤트명.
        value: function createInstance(info) {
            return new Sound().init(info);
        }

        /**
         * 생성자 함수.
         */

        // 반복 재생여부.

        // Audio  Source

        // AudioContext


        // 아이디

    }]);

    function Sound() {
        __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, Sound);

        var _this = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Sound.__proto__ || __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default()(Sound)).call(this));

        _this._loop = false;
        return _this;
    }

    /**
     * Sound 객체 초기화.
     * @param buffer {ArrayBuffer}
     * @param context {AudioContext}
     * @param config {Object}
     * @param id {String)
     * @return {*}
     */


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
                gainNode = ctx.createGain();

            gainNode.connect(destination);

            this._buffer = buffer;
            this._config = config || {};
            this._loop = config.loop || false;
            this._id = id || 'sound_' + Date.now();
            this._gainNode = gainNode;

            return this;
        }

        /**
         * @description 사운드 재생시작.
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
         * @description 사운드 정지
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
         * @description 반복여부 설정.
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
         * @description 음량 설정.
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