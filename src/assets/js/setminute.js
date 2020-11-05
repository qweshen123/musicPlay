export function setminute(time){
    time = Number(time)
    // minute = parseInt(time/1000%60);
    let minutes = parseInt((time % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((time % (1000 * 60)) / 1000);
    if(seconds<10){
        seconds = '0' + seconds
    }
    return minutes + ':' + seconds;
} 

