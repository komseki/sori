import Sori from './Sori.js';

/**
 * 효과음 스프라이트 사운드 시작커서위치 및 재생시간.
 * eff_all.mp3
 * 1. eff_cm_btn_basic : 0 - 0.156
 * 2. eff_cm_btn_choice : 0.156 - 0.365
 * 3. eff_cm_btn_remove : 0.365 - 0.844
 * 4. eff_cm_btn_rolling : 0.844 - 1.463
 * 5. eff_cm_btn_shooting : 1.463 - 2.113
 * 6. eff_cm_btn_touch.mp3 : 2.113 - 2.401
 * 7. eff_block_attached : 2.401 - 4.177
 * 8. eff_block_remove : 4.177 - 5.953
 * @type {{sprite1: {when: number, offset: number, duration: number}, sprite2: {when: number, offset: number, duration: number}, sprite3: {when: number, offset: number, duration: number}, sprite4: {when: number, offset: number, duration: number}, sprite5: {when: number, offset: number, duration: number}, sprite6: {when: number, offset: number, duration: number}, sprite7: {when: number, offset: number, duration: number}, sprite8: {when: number, offset: number, duration: number}}}
 */
const effSoundConfig = {
    sprite1 : {"when":0, "offset":0, "duration":0.156},
    sprite2 : {"when":0, "offset":0.156, "duration":0.209},
    sprite3 : {"when":0, "offset":0.365, "duration":0.479},
    sprite4 : {"when":0, "offset":0.844, "duration":0.619},
    sprite5 : {"when":0, "offset":1.463, "duration":0.65},
    sprite6 : {"when":0, "offset":2.113, "duration":0.288},
    sprite7 : {"when":0, "offset":2.401, "duration":1.776},
    sprite8 : {"when":0, "offset":4.177, "duration":1.776}
};

/**
 * @type {Sori}
 */
const sori = new Sori();

/**
 * 사운드 로드
 */
function init(){
    // 로드 목록.
    const arr = [
        {url: '../assets/sound/Pink-panther-theme-music-box.mp3', id: 'bgm1', config:{loop:true}},
        {url: '../assets/sound/Snowing-holiday music.mp3', id: 'bgm2'}
    ];
    // 로드 목록 추가.
    for( let id in effSoundConfig ){
        arr.push({
            url: '../assets/sound/eff_all.mp3',
            config: effSoundConfig[id],
            id
        })
    }

    // 개별 로드 완료
    sori.on( Sori.LOAD_COMPLETE, snd=>{
        //console.log(snd._id);
    } );

    // 전체 로드 완료.
    sori.on( Sori.LOAD_FINISH, onSoundLoaded );

    // 로드 시작.
    sori.load(arr);
}

/**
 * 전체 로드 완료 이벤트 리스너
 */
function onSoundLoaded(){
    setEvent();
}

/**
 * 버튼 이벤트 부여 및 재생.
 */
function setEvent(){
    const bgms = document.querySelectorAll('.toggle'),
        effs = document.querySelectorAll('.eff');

    // bgm 버튼 이벤트 및 재생 설정.
    bgms.forEach(el=>{
       el.addEventListener('click', e=>{
           let btn = e.target,
               id = btn.id,
               state;
           btn.dataset.state = state = btn.dataset.state==='on'? 'off' : 'on';
           btn.innerHTML = state;
           if( state === 'off' ){
               if( id === 'bgm2' ){
                   sori.getSoundById(id).on(Sori.PLAY_ENDED, ()=>{
                       btn.dataset.state = btn.innerHTML = 'on';
                   })
               }
               sori.getSoundById(id).start();
           }else{
               sori.getSoundById(id).stop();
           }
       });
    });

    // 효과음 스프라이트 사운드 버튼 이벤트 및 재생.
    effs.forEach(el=>{
        el.addEventListener('click', ()=>{
            sori.getSoundById(el.dataset.snd).start();
        });
    });

}

/**
 * DOMContentLoaded 이벤트 리스너.
 */
function domReady(){
    document.removeEventListener('DOMContentLoaded', domReady);
    init();
}

document.addEventListener('DOMContentLoaded', domReady);