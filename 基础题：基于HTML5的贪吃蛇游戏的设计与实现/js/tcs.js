var time = 200;//刷新时间；
var t = 3;//蛇身长；
var snakeMap = [];//蛇的运动轨迹;
var w = 10;//蛇身单元大小；
var direction = 37;//方向代码：左37，上38，右39，下40；
//蛇的初始坐标
var x = 0;
var y = 0;
//食物初始化坐标
var foodX = 0;
var foodY = 0;
var score = 0;//当前分
var bestScore = 0;//历史最高分
//画布宽高
var width = 400;
var height = 400;
var other;
var flag = 0;
var c = document.getElementById("myCanvas");//根据ID找到指定画布
var ctx = c.getContext("2d");//2D context对象
var temp;
level();
showBestScore();
GameStart();
function level() {
    time = localStorage.getItem("time");
    temp = time;
    if (time == null)
        time = 200;
}
function showBestScore(){
    bestScore = localStorage.getItem("bestScore");
    if (bestScore == null)
        bestScore = 0;
    var best = document.getElementById("bestScore");
    best.innerHTML = bestScore;
}
function GameStart() {
    
    drawFood();
    //随机蛇头坐标
    x = Math.floor(Math.random() * width / w) * w;
    y = Math.floor(Math.random() * height / w) * w;
    //随机前进方向
    direction = 37 + Math.floor(Math.random() * 4);
    setInterval("gameRefresh()", time);
}
function gameRefresh() {
    snakeMap.push({
        'x': x,
        'y': y
    });
    drawSnake();  
    switch (other) {
        case 69:
            temp = 300; 
            break;
        case 78:
            temp = 200; 
            break;
        case 72:
            temp = 100; 
            break;
    }
    switch (direction) {
        case 37:
            x -= w;
            break;
        case 38:
            y -= w;
            break;
        case 39:
            x += w;
            break;
        case 40:
            y += w;
            break;
    }
    detectCollision();
    if (flag != 0) {
        if (time != temp) {
            localStorage.setItem("time", temp);
            other = 1;
        }
        if (score > bestScore) 
            localStorage.setItem("bestScore", score);
        if (flag == 2)
            alert("撞到蛇身，游戏失败！当前得分：" + score);
        else 
            alert("撞到了墙壁，游戏失败！当前得分：" + score);
        if (other==1) {
            switch (temp) {
                case 100:
                    alert("进入困难模式");
                    break;
                case 200:
                    alert("进入普通模式");
                    break;
                case 300:
                    alert("进入简单模式");
                    break;
            }
        }
        window.alert = function () { };
        window.location.reload();
    }
    if (foodX == x && foodY == y) {
        score += 10;
        //更新分数
        var currentScore = document.getElementById("currentScore");
        currentScore.innerHTML = score;
        drawFood();
        t++;
    }
}

    function drawSnake() {
        ctx.fillStyle = "lightblue";
        ctx.fillRect(x, y, w, w);
        if (snakeMap.length > t) {
            //清除尾部位置
            var lastBox = snakeMap.shift();
            ctx.clearRect(lastBox['x'], lastBox['y'], w, w);
        }
    }
    //按键监听
document.onkeydown = function (e) {
    if (e.keyCode == 69 || e.keyCode == 78 || e.keyCode == 72)
        other = e.keyCode;
    if ((direction != 39 && e.keyCode == 37) || (direction != 40 && e.keyCode == 38) || (direction != 37 && e.keyCode == 39) || (direction != 38 && e.keyCode == 40))
            direction = e.keyCode;
    }
    function detectCollision() {
        if (x > width || y > height || x < 0 || y < 0) {
            flag = 1;
        }
        for (var i = 0; i < snakeMap.length; i++) {
            if (snakeMap[i].x == x && snakeMap[i].y == y) {
                flag = 2;
            }
        }
        return 0;
    }
function drawFood() {
    foodX = Math.floor(Math.random() * width / w) * w;
    foodY = Math.floor(Math.random() * height / w) * w;
    //内部填充颜色
    ctx.fillStyle = "#FF0000";
    //绘制矩形
    ctx.fillRect(foodX, foodY, w, w);
}
document.write("<script src='../index.js'></script>");