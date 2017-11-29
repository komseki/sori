## **Sori**
Web Audio API를 이용한 음원 로드 및 재생.
Sori인스턴스를 이용해 음원을 로드하고 Sound 객체를 조회해 재생한다.

인스턴스를 생성해 사용한다.
``` javascript
import Sori from './Sori.js';
const sori = new Sori();
```

----

### Method

##### load( loadInfo )
음원을 로드해 사운드 객체로 만든다.
* loadInfo {Object|Array} 로드 및 재생 정보. 여러개의 파일을 로드 할 경우 배열을 이용한다.<br />
###### loadInfo
**url**<br />
type: String<br />
로드할 음원의 경로. 사운드 검색시에도 사용된다. 동일한 주소의 파일은 한번만 로드된다.<br />
**id**<br />
type: String<br />
사운드 재생을 위해 부여하는 아이디. 아이디는 부여하지 않으면 자동으로 생성된다.<br />
**config**<br />
type: Object<br />
사운드 재생을 위한 설정 객체.<br />

###### config
**when**<br />
type: Number<br />
재생지연시간. (단위 : 초)<br /><br />
**offset**<br />
type: Number<br />
사운드 재생을 시작할 위치.(단위 : 초)<br /><br />
**duration**<br />
type: Number<br />
offset 으로 지정된 구간부터 부터 재생할 시간 (단위 : 초)<br /><br />
**loop**<br />
type: Boolean / Default: false<br />
사운드 반복 여부.<br />

##### getSoundById( id )
아이디로 사운드 객체를 가져온다.
* id 음원 로드시 부여한 아이디 또는 자동으로 생성된 아이디.

##### getSoundByUrl( url )
음원의 URL로 사운드 객체를 가져온다.
* url : 음원 로드시 사용한 주소
##### getSoundAll()
사용 가능한 모든 사운드 객체를 반환한다.

----

#### Properties

##### Sori.LOAD_COMPLETE
type : String / value : loadComplete<br />
로드 완료 이벤트에 사용되는 이벤트 네임.
##### Sori.LOAD_FINISH
type : String / value : loadFinish
전체 로드 완료 이벤트에 사용되는 이벤트 네임.
##### Sori.LOAD_ERROR
type : String / value : loadError
로드 에러시 사용되는 이벤트 네임.
##### Sori.PLAY_ENDED
type : String / value : ended
재생 완료시 사용되는 이벤트 네임.

----

#### Event

EventEmitter를 상속하고 있어, EventEmitter 형태로 이벤트를 사용한다.

##### loadComplete
개별 파일 로드, 디코드 및 사운드 객체 생성 완료시
##### loadFinish
모든 파일 로드, 디코드 및 사운드 객체 생성 완료시
##### loadError
파일 로드, 디코드 에러시.

----


## **Sound**

Sori 모듈을 통해 로드한 오디오의 Buffer와 재생정보를 가지고 있는 객체. Sori를 이용해 조회해 가져 올 수 있으며, 실제 재생등의 동작을 수행한다. EventEmitter를 상속하고 있어 동일 방식으로 이벤트를 사용한다.

----

### Method

##### start( [when, offset, duration] )
사운드를 재생한다.
* when {Number} / Default: 0<br />
바로 재생하지 않고 지연시간을 두려면 값을 지정한다.(단위 : 초)
* offset {Number} / Default: 0<br />
재생 위치를 지정하려면 값을 지정한다.(단위 : 초)
* duration {Number}<br />
얼마간 재생할지 지정한다. offset에서 부터 재생될 시간이다.(단위 : 초)
##### stop( [when] )
사운드를 정지한다.
* when {Number}<br /> 바로 정지하지 않고 지연시간을 두려면 값을 지정한다. (단위 : 초)


##### setLoop( bool )
* bool {Boolean}<br />
반복 재생여부.

##### setGain( value )
* value {int}<br />
볼륨을 조절한다.

##### release()
사운드 객체를 해제한다.

----

### Event
##### ended
재생 완료 이벤트.

----

#### 예제

``` javascript
import Sori from './Sori.js';

const list = [
	{url: 'audio1.mp3', id: 'snd1'},
    {url: 'audio2.mp3', id: 'snd2' config:{loop: true}},
    {url: 'audio3.mp3', id: 'snd3' config:{when: 0, offset: 1.3, duration: 5.2}}
]

const sori = new Sori();

sori.on(Sori.LOAD_COMPLETE, sound=>{
    console.log( sound );
});

sori.on(Sori.LOAD_ERROR, url=>{
    console.log( url );
});

sori.on(Sori.LOAD_FINISH, sound=>{
    let sound = sori.getSoundById('snd1');
    sound.on(Sori.PLAY_ENDED, ()=>{
        console.log('ended');
    }); 
    sound.start();
});

```





