/**
 * Created by WebSun on 2017/1/11.
 */

var Bg_width= 1024;
var Bg_height = 600;
Laya.init(Bg_width, Bg_height);  //  Laya 初始化背景舞台的大小

// 设置背景、舞台的垂直和水平对齐方式
Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;
Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL;
Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;

// 创建laya 对象,便于后面加载图片等
var background = new Laya.Sprite();
background.loadImage("linkgame_back.jpg");
background.cacheAsBitmap = true;
Laya.stage.addChild(background);
 
  
 
// 设置游戏标题,包括字体 大小 位置 等等
var title = new laya.display.Text();
var game_title = "歌词连歌名";
title.text = game_title;
title.font = "yahei";
title.italic = true;
title.fontSize = 60;
title.stroke = 4;
title.strokeColor = "black";
title.color = "skyblue";
title.pos(Bg_width/ 4 - title.width / 2, 40);
Laya.stage.addChild(title);
 
  



// 设置游戏开始的点击处(即开始按钮)
var  txt  = new  laya.display.Text();
txt.text = "点击此处开始游戏";
txt.font = "Arial";
txt.fontSize = 40;
txt.bold = true;
txt.pos(Bg_width- txt.width - 20, Bg_height - txt.height - 20);
Laya.stage.addChild(txt);
//注册鼠标点击事件
txt.on(Laya.Event.CLICK, this, function(e) {
switch (e.type) {
case Laya.Event.CLICK:
    console.log(1);
    gameStart();
    console.log(1);
break;
}
});
//注册鼠标移入移出事件,改善游戏观赏效果
txt.on(Laya.Event.MOUSE_OVER, this, function() {
    txt.color = "red";
})
txt.on(Laya.Event.MOUSE_OUT, this, function() {
    txt.color = "black";
})

// 定义全局变量timeCount errorCount, 用来计时和错误计数
var timeCount = 0;
var errorCount = 0;
//  游戏计数函数
function gameCounter() {
    txt.text  =  "用时 : " + timeCount + " 失误:" + errorCount;
    timeCount += 1;
    console.log(winCount);
}

/*设置24 个图片，图片又是按钮, 设置文字(即歌名 或歌词)用来进行匹配
    一个是card，用来放图片，输出得分( winCount - errorCount ) / timeCount。
    另一个数组是button，用来呈现文字，当按钮(也是图片)被点击时会变成红色，配错对会恢复黑色。
*/
var card = [];
var button = [];
var card_A, card_B;
var winCount = 0;     // 用来记录匹配正确的对数,匹配正确 +1, 错误则不变,知道+ 到12  游戏结束
 console.log(typeof card);

// 设置图片和按钮, 加载图片 设置样式 定位等等
// 24 张图片 以 8列 X 3行 放置
for (var i = 0; i < 8; i++) {
for (var j = 0; j < 3; j++) {
var index = 8 * j + i
card[index] = new Laya.Sprite();
Laya.stage.addChild(card[index]);
card[index].name = index;
card[index].graphics.drawRect(0, 0, 80, 120, null, "#000000", 2);
card[index].graphics.loadImage("linkgame_card.jpg");
card[index].size(80, 120);
card[index].pos(20 + 100 * i, 144 + 140 * j);
//    注册鼠标点击事件,进行判断匹配是否正确
card[index].on(Laya.Event.CLICK, this, function(e) {
    if (gameStatue == true) {         // gameStatue 在后面定义了,是一个布尔值,用来判断是否匹配当前点击的这对
        if ((card_A == -1) && (card_B == -1)) {
        card_A = e.target.name;
        button[card_A].color = "red";
    } else if ((card_A != -1) && (card_B == -1)) {
        card_B = e.target.name;
            // 游戏匹配准则,看所点击的两张图片内文字是否为同一首歌
            if ((name_A.indexOf(button[card_A].text) != -1)
                && (name_A.indexOf(button[card_A].text) == lrc_B.indexOf(button[card_B].text))
                || (name_A.indexOf(button[card_A].text) == -1)
                && (name_A.indexOf(button[card_B].text) == lrc_B.indexOf(button[card_A].text)))
        {
            button[card_A].color = "red";
            button[card_B].color = "red";
            winCount = winCount + 1;
        if (winCount == 12) {          // 只有当全部匹配正确, 即 12对 时候才结束游戏
         //游戏结束
        //console.log(2);
        Laya.timer.clear(this, gameCounter);
        var score =( winCount - errorCount ) / timeCount;
        txt.text = "游戏结束 得分 : " + score;    // 显示分数
        }
        } else {
        button[card_A].color = "black";           //  匹配错误的话图片文字则恢复黑色
        button[card_B].color = "black";
        errorCount += 1;
        }
        } else if ((card_A != -1) && (card_B != -1)) {
        card_A = e.target.name;
        card_B = -1;
        button[card_A].color = "red";              //  匹配正确的话则变为红色
        }
        }
        });

//    每个按钮在每张图片的定位
button[index] = new laya.display.Text();
Laya.stage.addChild(button[index]);
button[index].fontSize = 20;
button[index].pos(5 + 100 * i + 40 - 50 / 2, 150 + 140 * j + 60 - 50 / 2);
//button[index].pivot(20, 120);
}
}




// 游戏数据, 分别存放于两个数组内,分别是一一对应的歌名和歌词
// 这里本人存私心, 设置的全是周杰伦的歌曲,所以对于不是杰伦歌迷的玩家来说,的确很难
var name_A = ["七里香", "一路向北", "发如雪", "晴天", "蜗牛", "红尘客栈", "黑色毛衣", "告白气球",
    "明明就", "烟花易冷", "稻香","花海", "我不配", "青花瓷", "彩虹", "菊花台", "我的地盘",
    "枫", "轨迹", "东风破", "半岛铁盒", "安静", "开不了口", "龙卷风", "简单爱", "可爱女人",
    "霍元甲", "世界末日", "千里之外", "双节棍", "牛仔很忙"];
 
var lrc_B = ["麻雀", "细数惭愧", "狼牙月", "小黄花", "一步一步", "东篱下", "白色蜻蜓", "恋爱日记",
    "糖果罐", "伽蓝寺", "城堡","泪晕开", "这感觉", "天青色", "一种解药", "湖面成双", "听我的",
    "缓缓飘落", "微微笑", "琵琶弹奏", "铁盒的序", "远远离开", "没有你烦", "后知后觉", "简简单单","直升机",
    "霍家拳法", "另一种美", "无声黑白", "哼哼哈嘿", "不用麻烦"];
 
// 随机index, 用来随机每次刷新时候取的歌曲
var List_C= [];   // 定义的新数组用来存放12 个元素
for (var i = 0; i < name_A.length; i++) {
    List_C[i]= i;  // 取 A 数组的长度于 C
}

 
// 开始游戏
var gameStatue = false; // 定义布尔值flag
function gameStart() {
    if (!gameStatue) {
        gameStatue = true;
    //初始化随机下标数组, 以 List_C为索引
    List_C.sort(function() {
        return 0.5 - Math.random()
    })
    // 随机取12个歌名和12句歌词(是一一对应的)进行乱序放置
    var List_word = [];
    for (var i = 0; i < 12; i++) {
        List_word[i] = name_A[List_C[i]];
        List_word[i + 12] = lrc_B[List_C[i]];
    }
 
    List_word.sort(function() {
        return 0.5 - Math.random()
    })

     for (var i = 0; i < 24; i++) {
         button[i].text = List_word[i];
     }
//开始计时, 重复循环, 1s 为时间周期
    Laya.timer.loop(1000, this, gameCounter);
    }
}


