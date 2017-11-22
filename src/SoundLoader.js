const EventEmitter = require('events');

import request from './utils/request';
import decodeAudioData from './decodeAudioData';

/**
 *
 */
class SoundLoader extends EventEmitter{
    static FINISH = 'finish';
    static COMPLETE = 'complete';
    static ERROR = 'error';

    context;

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

    _load( obj ){
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
}





export default SoundLoader;