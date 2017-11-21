const EventEmitter = require('events');

import Sound from './Sound.js';

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
            //{ buffer:buffer, context:this._context, config:config, id:id }
            const info = {
                    buffer,
                    context: this.context,
                    config: obj.config,
                    id: obj.id
                },
                snd = Sound.getInstance(info);
            this.emit(SoundLoader.COMPLETE, snd);
        }).catch(err=>{
            console.log(err);
            this.emit(SoundLoader.ERROR, {url: obj.url, err});
        });
    }
}

let ldr = new SoundLoader(new AudioContext());
// ldr.load({url: '../assets/sound/eff_all.mp3', responseType: 'arraybuffer'});
ldr.load([
    {url: '../assets/sound/eff_all.mp3', responseType: 'arraybuffer'},
    {url: '../assets/sound/eff_cm_btn_basic.mp3', responseType: 'arraybuffer'}
]);

ldr.on(SoundLoader.ERROR, url=>{
    console.log(SoundLoader.ERROR, url);
});

ldr.on(SoundLoader.COMPLETE, snd=>{
    console.log(SoundLoader.COMPLETE, snd);
    snd.stop();
});

ldr.on(SoundLoader.FINISH, ()=>{
    console.log(SoundLoader.FINISH);
});



export default SoundLoader;