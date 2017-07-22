/**
 * Created by Administrator on 2017/3/4.
 */

var dom = document.getElementById("clock");
var ctx = dom.getContext("2d");
var width = ctx.canvas.width;
var height = ctx.canvas.height;
var r = width / 2;
var rem = width / 200;
 console.log(r);
 console.log(rem);

//  绘制背景
function drawBackground() {
//保存当前环境的状态
    ctx.save();
//  重新定义起点
    ctx.translate(r,r);
//  起始一条路径
    ctx.beginPath();
    ctx.lineWidth = 10 * rem;
//  绘制一个圆
    ctx.arc(0,0,r- ctx.lineWidth / 2,0,2 * Math.PI,false);
//  实际绘制内容
    ctx.stroke();
//  定义时间数组
    var hourNumbers = [3,4,5,6,7,8,9,10,11,12,1,2];
//  调整字体与位置
    ctx.font = 18 * rem + 'px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
//  遍历数组转成弧度
    hourNumbers.forEach(function (number,i) {
        var rad = 2 * Math.PI / 12 * i;
//  将弧度转换成坐标
        var x = Math.cos(rad) * (r - 30 * rem);
        var y = Math.sin(rad) * (r - 30 * rem);
        ctx.fillText(number,x,y);
    });
//  绘制时间点
    for(var i = 0; i < 60; i++){
        var rad = 2 * Math.PI / 60 * i;
        var x = Math.cos(rad) * (r - 18 * rem);
        var y = Math.sin(rad) * (r - 18 * rem);
//  重置当前路径,不然会被前面的覆盖
        ctx.beginPath();
        if(i % 5 === 0){
            ctx.fillStyle = '#000000';
            ctx.arc(x,y,2 * rem,0,2 * Math.PI,false);
        }else{
            ctx.fillStyle = '#cccccc';
            ctx.arc(x,y,2 * rem,0,2 * Math.PI,false);
        }
//  填充当前路径
        ctx.fill();
    }

}

//  绘制时针
function drawHour(hour,minute) {
    //保存当前环境的状态
    ctx.save();
    //  重置当前路径,不然会被前面的覆盖
    ctx.beginPath();
    //时针指向位置
    var rad = 2 * Math.PI / 12 * hour;
    var m_rad = 2 * Math.PI / 12 / 60 * minute;
    //旋转时针
    ctx.rotate(rad+m_rad);
    //时针宽度
    ctx.lineWidth = 8 * rem;
    //时针首尾端点样式
    ctx.lineCap = 'round';
    //起始位置坐标
    ctx.moveTo(0,10 * rem);
    ctx.lineTo(0,-r / 2);
    //绘制
    ctx.stroke();
    //返回之前保存过的路径状态
    ctx.restore();
}

//  绘制分针
function drawMinute(minute) {
    //保存当前环境的状态
    ctx.save();
    //  重置当前路径,不然会被前面的覆盖
    ctx.beginPath();
    //分针指向位置
    var rad = 2 * Math.PI / 60 * minute;
    //旋转分针
    ctx.rotate(rad);
    //分针宽度
    ctx.lineWidth = 4 * rem;
    //分针首尾端点样式
    ctx.lineCap = 'round';
    //起始位置坐标
    ctx.moveTo(0,10 * rem);
    ctx.lineTo(0,-r + 30 * rem);
    //绘制
    ctx.stroke();
    //返回之前保存过的路径状态
    ctx.restore();
}

//  绘制秒针
function drawSecond(second) {
    //保存当前环境的状态
    ctx.save();
    //  重置当前路径,不然会被前面的覆盖
    ctx.beginPath();
    ctx.fillStyle = '#c14543';
    //秒针指向位置
    var rad = 2 * Math.PI / 60 * second;
    //旋转秒针
    ctx.rotate(rad);
    //起始位置坐标，尾部大，指尖小
    ctx.moveTo(-2 * rem,20 * rem);
    ctx.lineTo(2 * rem,20 * rem);
    ctx.lineTo(1,-r + 18 * rem);
    ctx.lineTo(-1,-r + 18 * rem);
    //绘制
    ctx.fill();
    //返回之前保存过的路径状态
    ctx.restore();
	console.log(second);
}

//  绘制时分秒针固定点
function drawDot() {
    //  重置当前路径,不然会被前面的覆盖
    ctx.beginPath();
    ctx.fillStyle = '#ffffff';
    ctx.arc(0,0,3 * rem,0,2*Math.PI,false);
    ctx.fill();
}

//  调用绘制函数
function draw() {
//清除之前绘制的内容，否则出现重叠
    ctx.clearRect(0,0,width,height);
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    drawBackground();
    drawHour(hour,minute);
    drawMinute(minute);
    drawSecond(second);
    drawDot();
//返回之前保存过的路径状态
    ctx.restore();
}

//调用时间循环,这个循环方式有个缺点;
//就是中间过程代码变多时，间隔时间受到影响
setInterval(draw,1000);

/* *
 思路整理：
 1、定位坐标原点
 2、绘制外圆背景
 3、绘制指示坐标点
 4、绘制指示数字
 5、绘制各个指针
 6、根据时间变化角度不同，实现指针转到
 7、优化调整尺寸
 * */