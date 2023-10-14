// JavaScript source code
//获取VEDIO
var screen = document.getElementById("screen");
function playCourse(time) {
    //重置当前播放时间
    screen.currentTime = time;
    //继续播放视频
    screen.play();
}
document.write("<script src='../index.js'></script>");