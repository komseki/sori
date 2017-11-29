const EventEmitter = require('events');

/**
 *  사운드 객체.
 */
class Sound extends EventEmitter{

    //  사운드 재생 완료시 호출될 이벤트명.
    static ENDED = 'ended';

    // 아이디
    _id;
    // 음량을 위한  gainNode
    _gainNode;
    // AudioContext
    _context;
    // ArrayBuffer
    _buffer;
    // Audio  Source
    _source;
    // 로드 및 재생정보
    _config;
    // 반복 재생여부.
    _loop = false;

    /**
     * @description Sound 인스턴스 생성 및 반환.
     * @param info {AudioContext}
     * @return {Sound}
     * @static
     */
    static createInstance( info ){
        return new Sound().init(info);
    }

    /**
     * 생성자 함수.
     */
    constructor(){
        super();
    }

    /**
     * Sound 객체 초기화.
     * @param buffer {ArrayBuffer}
     * @param context {AudioContext}
     * @param config {Object}
     * @param id {String)
     * @return {*}
     */
    init( {buffer, context, config, id} ){
        if( buffer === undefined ) return;

        const ctx = this._context = context,
            destination = ctx.destination,
            gainNode = ctx.createGain();

        gainNode.connect( destination );

        this._buffer = buffer;
        this._config = config || {};
        this._loop = config.loop || false;
        this._id = id || `sound_${Date.now()}`;
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
    start( when, offset, duration ){
        when = (when===undefined? this._config.when : when) || 0;
        offset = (offset===undefined? this._config.offset : offset) || 0;
        duration = (duration===undefined? this._config.duration : duration) || this._buffer.duration;

        const ctx = this._context,
            source = ctx.createBufferSource();

        source.buffer = this._buffer;
        source.connect( ctx.destination );
        source.connect( this._gainNode.gain );

        // start 시에 source 생성함.
        this._source = source;

        /**
         * @description 재생 완료, evnet 발송.
         * @param e
         */
        source.onended = e=>{
            source.disconnect( ctx.destination );
            source.disconnect( this._gainNode.gain );
            this.emit(Sound.ENDED);
        };

        this._source.start = !this._source.start? this._source.noteOn : this._source.start;
        this._source.start( when, offset, duration );
        this._source.loop = this._loop;

        return this;
    }

    /**
     * @description 사운드 정지
     * @param when {Number} 정지 delay 시간.
     * @return {Object} Sound 객체
     */
    stop( when ){
        when = when || 0;
        if( when > this._buffer.duration ) when = this._buffer.duration;
        try{
            this._source.stop = !this._source.stop? this._source.noteOff : this._source.stop;
            this._source.stop( when );
        }catch(e){

        }
        return this;
    }

    /**
     * @description 반복여부 설정.
     * @param bool {boolean} true 반복
     * @return {Object} Sound 객체
     */
    setLoop( bool ){
        this._loop = bool;
        return this;
    }

    /**
     * @description 음량 설정.
     * @param val {Number} 소리크기
     * @return {Object} Sound 객체
     */
    setGain( val ){
        if( val < 0 ){
            val = 0;
        }
        this.gainNode.gain.value = val;
        return this;
    }

    /**
     * 사운드 객체 해제
     */
    release(){
        this._source.disconnect();
        this._buffer = null;
        this._source = null;
    }

}

export default Sound;