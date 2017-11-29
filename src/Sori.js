import SoundLoader from './SoundLoader.js';
import Sound from './Sound.js';

const EventEmitter = require('events');

/**
 * Sori 클래스.
 * 오디오 로드 및 재생을 관리한다.
 */
class Sori extends EventEmitter{

    // 개별 로드 완료시 이벤트명
    static LOAD_COMPLETE = 'loadComplete';
    // 전체 로드 완료시 이벤트명
    static LOAD_FINISH = 'loadFinish';
    // 로드 에러시 이벤트명
    static LOAD_ERROR = 'loadError';
    // 재생완료 이벤트명
    static PLAY_ENDED = Sound.ENDED;

    // AudioContext
    _context;
    // UID 생성 카운트
    _uidCnt = 0;
    // URL : [UID] 형태로 저장된 리스트
    _urlList = {};
    // UID : Buffer 형태로 저장된 리스트
    _audioBufferList = {};
    // UID : Sound 형태로 저장된 리스트
    _soundList = {};
    // UID : Object(로드정보) 형태로 저장된 리스트.
    _loadInfos = {};
    // ID : UID 형태로 저장된 리스트.
    _idList = {};


    /**
     * 생성자 함수
     */
    constructor(){
        super();
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        this._context = new AudioContext();
    }

    /**
     * 로드 명령을 내린다
     * @param list
     */
    load( list ){
        list = Array.isArray(list)? list : [list];

        const loadList = this._parseList(list);
        let ldr = SoundLoader.createInstance(this._context)

        /**
         * 로드 에러.
         */
        ldr.on(SoundLoader.ERROR, url=>{
            this.emit( Sori.LOAD_ERROR, url );
        });

        /**
         * 개별 로드 완료. 사운드 객체를 만든다.
         */
        ldr.on(SoundLoader.COMPLETE, (obj, buffer)=>{
            buffer = buffer || this._audioBufferList[obj.url];
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

    /**
     * Sound 객체의 인스턴스를 생성한다.
     * @param obj - 로드된 오디오 로드/재생 정보.
     * @param buffer - 로드된 오디오의 버퍼
     */
    createSound(obj, buffer){
        let loadInfo,
            uids;
        uids = this._urlList[obj.url];
        uids.forEach(v=>{
            if( this._soundList[v] === undefined ){
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
            }
        });
    }

    /**
     * 오디오의 주소를 이용해 로드할 목록을 새로 만든다.
     * @param list
     * @private
     */
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

            v._isLoad = state;

            this._urlList[v.url].push(v._uid);
            this._idList[v.id] = v._uid;
            this._loadInfos[v._uid] = v;

            return true;
        });
    }

    /**
     * @description 오디오 파일의 UID에 매칭되는 사운드 객체를 반환한다.
     * @param uid
     * @return {Sound}
     * @private
     */
    _getSoundByUid( uid ){
        return this._soundList[uid];
    }

    /**
     * @description 오디오 파일의 ID에 매칭되는 사운드 객체를 반환한다.
     * @param id
     * @return {Sound}
     */
    getSoundById(id){
        const uid = this._idList[id];
        return this._getSoundByUid( uid );
    }

    /**
     * @description  오디오 파일의 URL에 매칭되는 사운드 객체를 반환한다.
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
     * @description 전체 사운드 객체의 목록을 가져온다.
     * @return {Array}
     */
    getSoundAll(){
        return this._soundList;
    }
}


export default Sori;

