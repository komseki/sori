const EventEmitter = require('events');


/**
 *
 * @param obj
 * @return {Promise}
 * @private
 */
function _request( obj ){
    return new Promise( (resolve, reject)=>{
        const xhr = new XMLHttpRequest();
        xhr.responseType = obj.responseType||'json';
        xhr.open(obj.method||'GET', obj.url, true);
        if( obj.header !== undefined ){
            Object.keys(obj.headers).forEach(key => {
                xhr.setRequestHeader(key, obj.headers[key]);
            });
        }
        xhr.onload = ()=>{
            const status = xhr.status;
            if(status >= 200 && status < 300){
                resolve(xhr.response);
            }else{
                reject(xhr.statusText);
            }
        }
        xhr.onerror = ()=> reject(xhr.statusText);
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
function _decode(context, res){
    return new Promise( (resolve, reject)=>{
        context.decodeAudioData(res, buffer=>{
            if(buffer === null || buffer === undefined){
                reject('buffer is not define');
            }
            resolve(buffer);
        }, err=>{
            reject(err);
        });
    });
}

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
        return _request(obj).then(res=>{
            return _decode(this.context, res);
        }).then(buffer=>{
            this.emit(SoundLoader.COMPLETE, obj, buffer);
        }).catch(err=>{
            this.emit(SoundLoader.ERROR, {url: obj.url, err});
        });
    }
}





export default SoundLoader;