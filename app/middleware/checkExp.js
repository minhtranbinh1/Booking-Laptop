module.exports = function(exp){
    let seconds = 1000;
    let d = new Date();
    let t= d.getTime();
    if (exp < Math.round(t / seconds)) {
        return true;
    } else{
        return false;
    }
}