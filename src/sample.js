import Sori from './Sori.js';


let dummy = {
    /**
     * 사용할 사운드파일 정보
     */
    sound : {
        basicOnly : "assets/sound/eff_cm_btn_basic.mp3",
            soundList : [
            {"id" : "contents", "url" : 'assets/sound/bgm_cm_contents.mp3'},
            {"id" : "intro", "url" : 'assets/sound/bgm_cm_intro.mp3'},
            {"id" : "eff_all", "url" : 'assets/sound/eff_all.mp3'},
            {"id" : "nar", "url" : 'assets/sound/nar_cm_moby_direct.mp3'}
        ]
    },
    /* 사운드 시작커서위치 및 재생시간.
    1-8번까지 파일 합쳐 eff_all.mp3 만듦.
    eff_all.mp3
    1. eff_cm_btn_basic : 0 - 0.156
    2. eff_cm_btn_choice : 0.156 - 0.365
    3. eff_cm_btn_remove : 0.365 - 0.844
    4. eff_cm_btn_rolling : 0.844 - 1.463
    5. eff_cm_btn_shooting : 1.463 - 2.113
    6. eff_cm_btn_touch.mp3 : 2.113 - 2.401
    7. eff_block_attached : 2.401 - 4.177
    8. eff_block_remove : 4.177 - 5.953
    */
    effSoundConfig : {
        basic : {"when":0, "offset":0, "duration":0.156},
        choice : {"when":0, "offset":0.156, "duration":0.209},
        remove : {"when":0, "offset":0.365, "duration":0.479},
        rolling : {"when":0, "offset":0.844, "duration":0.619},
        shooting : {"when":0, "offset":1.463, "duration":0.65},
        touch : {"when":0, "offset":2.113, "duration":0.288},
        attachedBlock : {"when":0, "offset":2.401, "duration":1.776},
        removeBlock : {"when":0, "offset":4.177, "duration":1.776}
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
