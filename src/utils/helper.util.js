function getCurrentFormatedTime() {
    let currentDateTime = new Date();
    return currentDateTime.getFullYear() + '-' 
        + (currentDateTime.getMonth() + 1) + "-" 
        + currentDateTime.getDate() + " " 
        + currentDateTime.getHours() + ":" 
        + currentDateTime.getMinutes() + ":" 
        + currentDateTime.getSeconds();
}


module.exports = {
    getCurrentFormatedTime
}