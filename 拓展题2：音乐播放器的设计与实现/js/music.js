// JavaScript source code
//获取音频对象
var music = document.getElementById("audio");
//获取音量调节进度条
var volume = document.getElementById("volume");
//获取音乐“播放/暂停”按钮
var toggleBtn = document.getElementById("toggleBtn");
//获得当前播放的音乐标签
var title = document.getElementById("title");
//音乐路径列表
var list = new Array("music/Serenade.mp3", "music/EndlessHorizon.mp3", "music/月光下的云海.mp3");
//音乐标题列表
var titleList = new Array("小夜曲", "无尽的地平线", "月光下的云海");
var i = 0;
//定义当前是第几首曲目
function toggleMusic() {
    if (music.paused) {
        music.play();
        toggleBtn.innerHTML = '<img src="image/pause.png" width="50" height="50" /> ';
    }
    else
    {
        music.pause();
        toggleBtn.innerHTML = '<img src="image/play.png" width="50" height="50" />';
    }
}
function setVolume() {
    music.volume = volume.value;
}
function nextMusic() {
    if (i == list.length - 1)
        i = 0;
    else
        i++;
    music.pause();
    music.src = list[i];
    title.innerHTML = titleList[i];
    music.play();
    toggleBtn.innerHTML = '<img src="image/pause.png" width="50" height="50" /> ';
}
function lastMusic() {
    if (i == 0)
        i = list.length - 1;
    else
        i--;
    music.pause();
    music.src = list[i];
    title.innerHTML = titleList[i];
    music.play();
    toggleBtn.innerHTML = '<img src="image/pause.png" width="50" height="50" /> ';
}
document.write("<script src='../index.js'></script>");