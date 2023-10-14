//获取画布对象
var c = document.getElementById('myCanvas');
//获取2D的context对象
var ctx = c.getContext('2d');
//定义拼图小方块的边长
var w = 100;
//定义初始方块位置
var num = [[00, 01, 02], [10, 11, 12], [20, 21, 22]];
//声明拼图的图片素材来源
var img = new Image();
img.src = "image/pintu.jpg";
//当图片加载完毕时
img.onload = function () {
    //打乱拼图的位置
    generateNum();
    //在画布上的绘制拼图
    drawCanvas();
}
//打乱拼图的位置
function generateNum() {
    for (var i = 0; i < 50; i++) {
        var i1 = Math.round(Math.random() * 2);
        var j1 = Math.round(Math.random() * 2);
        var i2 = Math.round(Math.random() * 2);
        var j2 = Math.round(Math.random() * 2);
        var temp = num[i1][j1];
        num[i1][j1] = num[i2][j2];
        num[i2][j2] = temp;
    }
}
//绘制拼图
function drawCanvas() {
    //清空画布
    ctx.clearRect(0, 0, 300, 300);
    //使用双重for循环绘制3*3的拼图
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (num[i][j] != 22) {
                var row = parseInt(num[i][j] / 10);
                var col = num[i][j] % 10;
                ctx.drawImage(img, col * w, row * w, w, w, j * w, i * w, w, w);
            }
        }
    }
}
//监听鼠标单击事件
c.onmousedown = function(e){
    //获取画布边界
    var bound = c.getBoundingClientRect();
    //获取鼠标在画布上的坐标位置(x,y)
    var x = e.pageX - bound.left;
    var y = e.pageY - bound.top;
    //将x和y换算成几行几列
    var row = parseInt(y / 100);
    var col = parseInt(x / 100);
    //如果当前单机的不是空白区域
    if (num[row][col] != 22) {
        //移动单击的方块
        detectBox(row, col);
        //重新绘制画布
        drawCanvas();
        //检查游戏是否成功
        var isWin = checkWin();
        //如果游戏成功
        if (isWin) {
            //消除计时器
            clearInterval(timer);
            //绘制完整图片
            ctx.drawImage(img, 0, 0);
            //设置字体为serif,加粗68号字
            ctx.font = "bold 68px serif";
            //设置填充颜色为红色
            ctx.fillStyle = "red";
            //显示提示语句
            ctx.fillText("游戏成功！", 20, 150);
        }
    }
}
//移动单机的方块
function detectBox(i, j) {
    //如果单击的方块不在最上面一行
    if (i > 0) {
        //检测空白区域是否在当前方块的正上方
        if (num[i - 1][j] == 22) {
            //交换空白区域与当前方块的位置
            num[i - 1][j] = num[i][j];
            num[i][j] = 22;
            return;
        }
    }
    //如果单击的方块不在最下面一行
    if (i < 2) {
        //检测空白区域是否在当前方块的正下方
        if (num[i + 1][j] == 22) {
            //交换白色区域与当前方块的位置
            num[i + 1][j] = num[i][j];
            num[i][j] = 22;
            return;
        }
    }
    //如果单击的方块不在最左边一列
    if (j > 0) {
        //检测空白区域是否在当前方块的左边
        if (num[i][j - 1] == 22) {
            //交换白色区域与当前方块的位置
            num[i][j - 1] = num[i][j];
            num[i][j] = 22;
            return;
        }
    }
    //如果单击的方块不在最右边一列
    if (j < 2) {
        //检测空白区域是否在当前方块的右边
        if (num[i][j + 1] == 22) {
            //交换白色区域与当前方块的位置
            num[i][j + 1] = num[i][j];
            num[i][j] = 22;
            return;
        }
    }
}
//胜利的判断
function checkWin() {
    //使用双重for循环遍历整个数组
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            //如果有其中一块方块的位置不对
            if (num[i][j] != i * 10 + j) {
                return false;
            }
        }
    }
    //返回真
    return true;
}
var time = document.getElementById("time");
//初始化计时器的时、分、秒
var h = 0;
m = 0;
s = 0;

function getCurrentTime() {
    //将时、分、秒转换成整数以便进行自增或赋值
    s = parseInt(s);
    m = parseInt(m);
    h = parseInt(h);
    //每秒变量s先自增1
    s++;
    if (s == 60) {
        //如果秒已经达到60，则归0
        s = 0;
        //分钟自增
        m++;
    }
    if (m == 60) {
        m = 0;
        h++;
    }
    //修改时、分、秒的显示效果，保持2位数
    if (s < 10) s = "0" + s;
    if (m < 10) m = "0" + m;
    if (h < 10) h = "0" + h;
    //将当前计时的时间显示在页面上
    time.innerHTML = h + ":" + m + ":" + s;
}
//重新开始游戏
function restartGame() {
    //清除计时器
    clearInterval(timer);
    s = 0;
    m = 0;
    h = 0;
    //重新显示时间
    getCurrentTime();
    timer = setInterval("getCurrentTime()", 1000);
    //打乱拼图
    generateNum();
    //绘制
    drawCanvas();
}
//每隔1000毫秒（1s）刷新一次时间
var timer = setInterval("getCurrentTime()", 1000);
document.write("<script src='../index.js'></script>");