export function dataFormat(data){
    var time=new Date(data);
    var y=time.getFullYear();
    var m=time.getMonth()+1;
    var d=time.getDate();
    var h=time.getHours();
    var mm=time.getMinutes();
    return y+'-'+m+'-'+d+' '+h+':'+mm
}