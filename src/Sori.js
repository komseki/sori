import SoundLoader from './SoundLoader.js';
import Sound from './Sound.js';

const EventEmitter = require('events');

class Sori extends EventEmitter{

    static LOAD_COMPLETE = 'loadComplete';
    static LOAD_FINISH = 'loadFinish';
    static LOAD_ERROR = 'loadError';

    _context;
    _uidCnt = 0;
    _urlList = {};
    _audioBufferList = {};
    _soundList = {};
    _loadInfos= {};



    constructor(){
        super();
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        this._context = new AudioContext();
    }

    load( list ){
        const loadList = this._parseList(list);
        let ldr = SoundLoader.createInstance(new AudioContext()),
            loadInfo,
            uids;

        ldr.on(SoundLoader.ERROR, url=>{
            this.emit( Sori.LOAD_ERROR, url );
        });

        ldr.on(SoundLoader.COMPLETE, (obj, buffer)=>{
            this._audioBufferList[obj.url] = buffer;
            uids = this._urlList[obj.url];
            uids.forEach(v=>{
                loadInfo = this._loadInfos[v];
                const info = {
                        buffer,
                        context: this._context,
                        config: loadInfo.config || {},
                        id: loadInfo.id,
                        uid: v
                    },
                    snd = Sound.createInstance(info);
                //
                this._soundList[v] = snd;
            });
            this.emit( Sori.LOAD_COMPLETE, snd );
        });

        ldr.on(SoundLoader.FINISH, ()=>{
            this.emit(Sori.LOAD_FINISH);
        });

        ldr.load( loadList );
    }

    _parseList( list ){
        let state = false;
        return list.filter( v=>{
            v._uid = this._uidCnt++;
            if( v.id === undefined ){
                v.id = `snd_${this._uidCnt}`
            }
            if( this._urlList[v.url] === undefined ){
                this._urlList[v.url] = [v._uid];
                state = true;
            }else{
                this._urlList[v.url].push(v._uid);
                state = false;
            }

            this._loadInfos[v._uid] = v;

            // id: uid; 1
            // url: uid; ...
            //

            return state;
        });
    }

    _getSoundByUid( uid ){
        return this._soundList[uid];
    }

    getSoundById(id){

    }

    getSoundByUrl(url){

    }

    getSoundAll(){

    }

    getPlayNote(){

    }

    addPlayNote(){

    }

}

const sori = new Sori();
sori.load([
    {url: '../assets/sound/eff_all.mp3', id: 'test'},
    {url: '../assets/sound/eff_all.mp3'},
    {url: '../assets/sound/eff_cm_btn_basic.mp3'}
]);

sori.on( Sori.LOAD_COMPLETE, snd=>{

} );

sori.on( Sori.LOAD_FINISH, ()=>{
} );

export default Sori;



// ldr.load({url: '../assets/sound/eff_all.mp3', responseType: 'arraybuffer'});


