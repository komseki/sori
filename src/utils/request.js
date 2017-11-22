/**
 * obj.url
 * obj.responseType
 * obj.header
 *
 * @param obj
 * @return {Promise}
 * @private
 */
export default function(obj){
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
};
