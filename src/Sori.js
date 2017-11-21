import SoundLoader from './SoundLoader.js';
import Sound from './Sound.js';

const EventEmitter = require('events');

class Sori extends EventEmitter{

    static LOAD_COMPLETE = 'loadComplete';
    static LOAD_FINISH = 'loadFinish';
    static LOAD_ERROR = 'loadError';

    _context;
    _audioBufferList = {};
    _soundList = {};
    _loadedList = {};


    constructor(){
        super();
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        this._context = new AudioContext();
    }

    load(){

    }

    getSound(){

    }

}



export default Sori;


let ldr = SoundLoader.createInstance(new AudioContext());
// ldr.load({url: '../assets/sound/eff_all.mp3', responseType: 'arraybuffer'});
ldr.load([
    {url: '../assets/sound/eff_all.mp3', responseType: 'arraybuffer'},
    {url: '../assets/sound/eff_cm_btn_basic.mp3', responseType: 'arraybuffer'}
]);

ldr.on(SoundLoader.ERROR, url=>{
    console.log(SoundLoader.ERROR, url);
});

ldr.on(SoundLoader.COMPLETE, (obj, buffer)=>{
    console.log(SoundLoader.COMPLETE, obj, buffer);
    /*
    //{ buffer:buffer, context:this._context, config:config, id:id }
    const info = {
            buffer,
            context: this.context,
            config: obj.config,
            id: obj.id
        },
        snd = Sound.createInstance(info);
    //
    snd.stop();
    */
});

ldr.on(SoundLoader.FINISH, ()=>{
    console.log(SoundLoader.FINISH);
});