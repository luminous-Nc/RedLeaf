import * as fs from 'fs'

export function ifDirExists(path) {
    try{
        fs.accessSync(path,fs.F_OK);
    }catch(e){
        return false;
    }
    return true;
}

export function timestampToTime(timestamp) {
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    var D = (date.getDay() + 1 < 10 ? '0' + (date.getDay() + 1) : date.getDay() + 1) + ' '
    var h = (date.getHours() + 1 < 10 ? '0' + (date.getHours() + 1) : date.getHours() + 1) + ':'
    var m = (date.getMinutes() + 1 < 10 ? '0' + (date.getMinutes() + 1) : date.getMinutes() + 1) + ':'
    var s = (date.getSeconds() + 1 < 10 ? '0' + (date.getSeconds() + 1) : date.getSeconds() + 1) + ' '
    return Y + M + D + h + m + s;
}

export function fileSizeFilter(fileSize) {
    let kb = fileSize/1024
    if (kb<1) {
        return '1KB'
    }
    if (kb < 1024) {
        kb = kb.toFixed(2)
        return kb + 'KB'
    } else {
        let mb = Math.trunc(kb / 1024)
        if (mb < 1024) {
            return mb + 'MB'
        } else {
            let GB = (mb / 1024).toFixed(2)
            return GB + 'GB'
        }
    }
}


function copyDir(dirOld,dirNew){
    var p=new Promise(function(resolve, reject) {
        var i=0;
        fs.readdir(dirNew,function(err,list){
            list.forEach(item=>{
                console.log(item)
                if(item=="old"){
                    reject("文件夹已存在");
                    i=i+1;
                }
            });
            if(i==0){
                fs.mkdir(path.join(dirNew,"old"),function(err){
                    resolve("创建文件夹成功！");
                    dirNew=path.join(dirNew,"old");
                    walkDir(dirOld,dirNew);
                });
            }
        });


        function walkDir(dirOld,dirNew){
            var list=fs.readdirSync(dirOld);
            list.forEach(function(item){
                if(fs.statSync(path.join(dirOld,item)).isDirectory()){
                    fs.mkdirSync(path.join(dirNew,item));
                    walkDir(path.join(dirOld,item),path.join(dirNew,item));
                }else{
                    fs.copyFile(path.join(dirOld,item),path.join(dirNew,item),function(err){
                        console.log(err);
                    });
                }
            });
        }
    });
    return p;
}
//
// copyDir(Old,New)
//     .then(function(rs){
//         console.log(rs);
//     })
//     .catch(function(rj){
//         console.log(rj);
//     });




