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
    _loadInfos = {};
    _idList = {};



    constructor(){
        super();
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        this._context = new AudioContext();
    }

    load( list ){
        const loadList = this._parseList(list);
        console.log(loadList)

        // 버퍼가 이미 있는지 확인한다. 버퍼가 있으면 있는 버퍼로 사용한다.
        // 버퍼가 이미 없으나 동일한 주소의 호출이 있다면, 예약을 만들어 놓는다.

        let ldr = SoundLoader.createInstance(this._context)


        /**
         * 로드 에러.
         */
        ldr.on(SoundLoader.ERROR, url=>{
            this.emit( Sori.LOAD_ERROR, url );
        });

        /**
         * 개별 로드 완료
         */
        ldr.on(SoundLoader.COMPLETE, (obj, buffer)=>{
            buffer = buffer || this._audioBufferList[obj.url];
            console.log( obj, buffer );
            if( !!buffer ) {
                this._audioBufferList[obj.url] = buffer;
                this.createSound(obj, buffer);
            }
        });

        /**
         * 전체 로드 완료
         */
        ldr.on(SoundLoader.FINISH, ()=>{
            this.emit(Sori.LOAD_FINISH);
        });

        /**
         * 로드 시작
         */
        ldr.load( loadList );
    }

    createSound(obj, buffer){
        let loadInfo,
            uids;
        uids = this._urlList[obj.url];
        uids.forEach(v=>{
            // TODO ::  Sound 객체가 있는지 확인하고 생성한다.
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
            this.emit( Sori.LOAD_COMPLETE, snd );
        });
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
                state = false;
            }
            console.log( v.id, state );

            v._isLoad = state;

            this._urlList[v.url].push(v._uid);
            this._idList[v.id] = v._uid;
            this._loadInfos[v._uid] = v;

            return true;
        });
    }

    /**
     * @description
     * @param uid
     * @return {Sound}
     * @private
     */
    _getSoundByUid( uid ){
        return this._soundList[uid];
    }

    /**
     * @description
     * @param id
     * @return {Sound}
     */
    getSoundById(id){
        const uid = this._idList[id];
        return this._getSoundByUid( uid );
    }

    /**
     *
     * @description
     * @param url
     * @return {Array}
     */
    getSoundByUrl(url){
        const arr = this._urlList[url] || [];
        return arr.map(v=>{
            return this._soundList[v];
        });
    }

    /**
     * @description
     * @return {Array}
     */
    getSoundAll(){
        return this._soundList;
    }
}

const sori = new Sori();
sori.load([
    {url: '../assets/sound/eff_all.mp3', id: 'test'},
    {url: '../assets/sound/eff_all.mp3'},
    {url: '../assets/sound/eff_cm_btn_basic.mp3'}
]);

sori.on( Sori.LOAD_COMPLETE, snd=>{
    console.log(snd._id);
} );

sori.on( Sori.LOAD_FINISH, ()=>{
    let snd = sori.getSoundByUrl('../assets/sound/eff_all.mp3');
    console.log(sori.getSoundById('aaa'), sori._soundList);
} );



export default Sori;



// ldr.load({url: '../assets/sound/eff_all.mp3', responseType: 'arraybuffer'});


