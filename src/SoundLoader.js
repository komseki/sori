const EventEmitter = require('events');

import request from './utils/request';
import decodeAudioData from './decodeAudioData';

/**
 * 웹 오디오 로드및 디코딩.
 */
class SoundLoader extends EventEmitter{
    // 전체 로드 완료 이벤트명.
    static FINISH = 'finish';
    // 개별 로드 완료 이벤트명.
    static COMPLETE = 'complete';
    // 로드 에러 이벤트명.
    static ERROR = 'error';

    // AudioContext
    context;

    /**
     * @description SoundLoader 인스턴스 생성 및 반환.
     * @param context {AudioContext}
     * @return {SoundLoader}
     * @static
     */
    static createInstance(context){
        return new SoundLoader(context);
    }

    /**
     * 생성자 함수
     * @param context {AudioContext}
     */
    constructor( context ){
        super();
        this.context = context;
    }

    /**
     * @description  Audio 로드 및 디코딩.
     * @param info
     */
    load( info ){
        if(Array.isArray(info)){
            const arr = [];
            info.forEach(v=>{
                arr.push( this._load(v) );
            });
            Promise.all( arr ).then(()=>{
                this.emit(SoundLoader.FINISH);
            });
        }else{
            this._load( info );
        }
    }

    /**
     * Audio 로드 및 디코딩.
     * @param obj
     * @return {Promise}
     * @private
     */
    _load( obj ){
        if( obj._isLoad === false ){
            return this._skipLoad( obj ).then(()=>{
                this.emit(SoundLoader.COMPLETE, obj, null);
            });
            return;
        }
        // arrayybuffer로 강제 지정한다.
        obj.responseType = 'arraybuffer';
        return request(obj).then(res=>{
            return decodeAudioData(this.context, res);
        }).then(buffer=>{
            this.emit(SoundLoader.COMPLETE, obj, buffer);
        }).catch(err=>{
            this.emit(SoundLoader.ERROR, {url: obj.url, err});
        });
    }

    /**
     * 재활용 가능한 버퍼의는 로드 하지 않고, resolve()를 바로 호출 한다.
     * @param obj
     * @return {Promise}
     * @private
     */
    _skipLoad( obj ){
        return new Promise((resolve, reject)=>{
            resolve();
        });
    }
}





export default SoundLoader;