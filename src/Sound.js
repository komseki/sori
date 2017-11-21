const EventEmitter = require('events');

class Sound extends EventEmitter{

    static ENDED = 'ended';

    _id;
    _gainNode;
    _context;
    _buffer;
    _source;
    _config;
    _loop = false;

    static createInstance( info ){
        return new Sound().init(info);
    }

    constructor(){
        super();
    }

    // { buffer:buffer, context:this._context, config:config, id:id }
    init( {buffer, context, config, id} ){
        if( buffer === undefined ) return;

        const ctx = this._context = context,
            destination = ctx.destination,
            // source = ctx.createBufferSource(),
            oscillator = ctx.createOscillator(),
            gainNode = ctx.createGain();

        //oscillator.connect( gainNode );
        gainNode.connect( destination );

        //
        // source.buffer = buffer;
        //
        // source.connect( ctx.destination );
        // source.connect( gainNode.gain );
        // this._source = source;

        this._buffer = buffer;
        this._loop = false;
        this._id = id || `sound_${Date.now()}`;
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
     * 정지
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
     * 반복
     * @param bool {boolean} true 반복
     * @return {Object} Sound 객체
     */
    setLoop( bool ){
        this._loop = bool;
        return this;
    }

    /**
     * 음량.
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