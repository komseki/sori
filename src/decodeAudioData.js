/**
 * @description ArrayBuffer 타입의 오디오파일을 디코딩 한다.
 * @param context {AudioContext}
 * @param res {ArrayBuffer}
 * @return {Promise}
 * @private
 */
export default function(context, res){
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