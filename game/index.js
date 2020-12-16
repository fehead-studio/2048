var score, mostScore;
//用一个二维数组存放每个方块的值，留一定的空间以便方块移动
var c = [];
//初始化二维数组
for (var i = 0; i <= 5; i++) {
    c[i] = [];
    for (var j = 0; j <= 5; j++) {
        c[i][j] = 0;
    }
}
//开始按钮
function start() {
    controlButton(); //控制按钮可用性
    score = mostScore = 0; //初始化分数
    //开始时随机生成两块
    randomDemo();
    randomDemo();
}
//重新开始按钮
function newstart() {
    if (confirm("确定要重新开始游戏吗？") == true) {
        //将二维数组及当前分数清零
        for (var i = 0; i <= 5; i++) {
            c[i] = [];
            for (var j = 0; j <= 5; j++) {
                c[i][j] = 0;
                if (i > 0 && j > 0 && i < 5 && j < 5) {
                    document.querySelector("#cd-" + i + j).innerText = "";
                    document.querySelector("#cd-" + i + j).className = "n0";
                }
            }
        }
        score = 0;
        document.querySelector("#current-score").innerText = score;
        //重新随机生成两块
        randomDemo();
        randomDemo();
    }
}

//按钮控制方法
function controlButton() {
    var s1 = document.querySelector("#start");
    var ns = document.querySelector("#newstart");
    //禁用开始按钮
    s1.setAttribute("disabled", "disabled");
    s1.getElementsByClassName.color = "graytext";
    //解禁重新开始按钮
    ns.removeAttribute("disabled");
    ns.getElementsByClassName.color = "inherit";
}
//随机生成方块
function randomDemo() {
    var randomnum, i, j;
    //随机产生坐标
    i = Math.floor(Math.random() * 4) + 1;
    j = Math.floor(Math.random() * 4) + 1;
    //生成新的方块
    if (c[i][j] == 0) {
        randomnum = Math.random() < 0.75 ? 2 : 4;
        c[i][j] = randomnum;
        document.querySelector("#cd-" + i + j).innerText = randomnum;
        document.querySelector("#cd-" + i + j).className = "n" + randomnum;
        return true;
    } else {
        return randomDemo;
    }
}
//页面更新方法
function update() {
    for (var i = 1; i <= 4; i++) {
        for (var j = 1; j <= 4; j++) {
            var pre = document.querySelector("#cd-" + i + j);
            if (c[i][j] != 0) {
                pre.className = "n" + c[i][j];
                pre.innerText = c[i][j];
            } else {
                pre.className = "n0";
                pre.innerText = "";
            }
        }
    }
}
//判断是否可以左移
function canLeft() {
    for (var i = 1; i <= 4; i++) {
        if (c[i][2] + c[i][3] + c[i][4] != 0) {
            if (c[i][1] == 0)
                return true;
            else if (c[i][2] == 0)
                return true;
            else if (c[i][2] == c[i][1] ||
                c[i][2] == c[i][3] ||
                (c[i][4] != 0 && c[i][3] == c[i][4]) ||
                (c[i][3] == 0 && c[i][4]) != 0)
                return true;
        }
    }
    return false;
}
//判断是否可以右移
function canRight() {
    for (var i = 1; i <= 4; i++) {
        if (c[i][2] + c[i][3] + c[i][1] != 0) {
            if (c[i][4] == 0)
                return true;
            else if (c[i][3] == 0)
                return true;
            else if (c[i][3] == c[i][4] ||
                c[i][3] == c[i][2] ||
                (c[i][1] != 0 && c[i][1] == c[i][2]) ||
                (c[i][2] == 0 && c[i][1]) != 0)
                return true;
        }
    }
    return false;
}
//判断是否可以上移
function canUp() {
    for (var i = 1; i <= 4; i++) {
        if (c[2][i] + c[3][i] + c[4][i] != 0) {
            if (c[1][i] == 0)
                return true;
            else if (c[2][i] == 0)
                return true;
            else if (c[3][i] == 0 && c[4][i] != 0)
                return true;
            else if ((c[3][i] != 0 && c[3][i] == c[4][i]) ||
                c[3][i] == c[2][i] ||
                (c[1][i] == c[2][i]))
                return true;
        }
    }
    return false;
}
//判断是否可以下移
function canDown() {
    for (var i = 1; i <= 4; i++) {
        if (c[2][i] + c[3][i] + c[1][i] != 0) {
            if (c[4][i] == 0)
                return true;
            else if (c[3][i] == 0)
                return true;
            else if (c[2][i] == 0 && c[1][i] != 0)
                return true;
            else if ((c[1][i] != 0 && c[1][i] == c[2][i]) ||
                c[3][i] == c[2][i] ||
                (c[3][i] == c[4][i]))
                return true;
        }
    }
    return false;
}
//左移方法
function left() {
    var l = canLeft();
    for (var i = 1; i <= 4; i++) {
        //1.先将一行内的元素以0为界排列好，如2020排成2200
        for (var j = 4; j > 1; j--) {
            if (c[i][j - 1] == 0) {
                c[i][j - 1] += c[i][j];
                k = j;
                while (k < 5) {
                    c[i][k] = c[i][k + 1];
                    k++;
                }
            }
        }
        //2.合并相同且相邻的方块并更新数组
        for (var j = 1; j < 4; j++) {
            if (c[i][j] == c[i][j + 1] && c[i][j] != 0) {
                c[i][j] *= 2;
                switch (c[i][j]) {
                    case 512:
                        alert("恭喜您合并成512方块！");
                        break;
                    case 1024:
                        alert("恭喜您合并成1024方块！");
                        break;
                    case 2048:
                        alert("恭喜您合并成2048方块！");
                        break;
                    case 4096:
                        alert("恭喜您合并成4096方块！");
                        break;
                    case 8192:
                        alert("恭喜您合并成8192方块！");
                }
                score += c[i][j]; //更新分数
                document.getElementById("current-score").innerText = score;
                //判断是否破纪录
                if (score > mostScore) {
                    mostScore = score;
                    document.getElementById("most-score").innerText = score;
                }
                k = j + 1;
                //左移数组
                while (k < 5) {
                    c[i][k] = c[i][k + 1];
                    k++;
                }
            }
        }
    }
    update(); //更新界面
    //判断是否可以左移，能则生成方块
    if (l) randomDemo();
}
//右移方法
function right() {
    var r = canRight();
    for (var i = 1; i <= 4; i++) {
        //1.先将一行内的元素以0为界排列好，如2020排成0022
        for (var j = 1; j < 4; j++) {
            if (c[i][j + 1] == 0) {
                c[i][j + 1] += c[i][j];
                k = j;
                while (k > 0) {
                    c[i][k] = c[i][k - 1];
                    k--;
                }
            }
        }
        //2.合并相同且相邻的方块并更新数组
        for (var j = 4; j > 0; j--) {
            if (c[i][j] == c[i][j - 1] && c[i][j] != 0) {
                c[i][j] *= 2;
                switch (c[i][j]) {
                    case 512:
                        alert("恭喜您合并成512方块！");
                        break;
                    case 1024:
                        alert("恭喜您合并成1024方块！");
                        break;
                    case 2048:
                        alert("恭喜您合并成2048方块！");
                        break;
                    case 4096:
                        alert("恭喜您合并成4096方块！");
                        break;
                    case 8192:
                        alert("恭喜您合并成8192方块！");
                }
                score += c[i][j]; //更新分数
                document.getElementById("current-score").innerText = score;
                //判断是否破纪录
                if (score > mostScore) {
                    mostScore = score;
                    document.getElementById("most-score").innerText = score;
                }
                k = j - 1;
                //数组右移
                while (k > 0) {
                    c[i][k] = c[i][k - 1];
                    k--;
                }
            }
        }
    }
    update(); //更新界面
    //判断是否可以右移，能则生成方块
    if (r) randomDemo();
}
//上移方法
function up() {
    var u = canUp();
    for (var j = 1; j <= 4; j++) {
        //1.先将一列内的元素以0为界排列好，如2202排成2220
        for (var i = 4; i > 1; i--) {
            if (c[i - 1][j] == 0) {
                c[i - 1][j] += c[i][j];
                k = i;
                while (k < 5) {
                    c[k][j] = c[k + 1][j];
                    k++;
                }
            }
        }
        //2.合并相同且相邻的方块并更新数组
        for (var i = 1; i < 4; i++) {
            if (c[i][j] == c[i + 1][j] && c[i][j] != 0) {
                c[i][j] *= 2;
                switch (c[i][j]) {
                    case 512:
                        alert("恭喜您合并成512方块！");
                        break;
                    case 1024:
                        alert("恭喜您合并成1024方块！");
                        break;
                    case 2048:
                        alert("恭喜您合并成2048方块！");
                        break;
                    case 4096:
                        alert("恭喜您合并成4096方块！");
                        break;
                    case 8192:
                        alert("恭喜您合并成8192方块！");
                }
                score += c[i][j]; //更新分数
                document.getElementById("current-score").innerText = score;
                //判断是否破纪录
                if (score > mostScore) {
                    mostScore = score;
                    document.getElementById("most-score").innerText = score;
                }
                k = i + 1;
                //数组上移
                while (k < 5) {
                    c[k][j] = c[k + 1][j];
                    k++;
                }
            }
        }
    }
    update(); //更新界面
    //判断是否可以上移，能则生成方块
    if (u) randomDemo();
}
//下移方法
function down() {
    var d = canDown();
    for (var j = 1; j <= 4; j++) {
        //1.先将一列内的元素以0为界排列好，如2202排成0222
        for (var i = 1; i < 4; i++) {
            if (c[i + 1][j] == 0) {
                c[i + 1][j] = c[i][j];
                k = i;
                while (k > 0) {
                    c[k][j] = c[k - 1][j];
                    k--;
                }
            }
        }
        //2.合并相同且相邻的方块并更新数组
        for (var i = 4; i > 0; i--) {
            if (c[i][j] == c[i - 1][j] && c[i][j] != 0) {
                c[i][j] *= 2;
                switch (c[i][j]) {
                    case 512:
                        alert("恭喜您合并成512方块！");
                        break;
                    case 1024:
                        alert("恭喜您合并成1024方块！");
                        break;
                    case 2048:
                        alert("恭喜您合并成2048方块！");
                        break;
                    case 4096:
                        alert("恭喜您合并成4096方块！");
                        break;
                    case 8192:
                        alert("恭喜您合并成8192方块！");
                }
                score += c[i][j]; //更新分数
                document.getElementById("current-score").innerText = score;
                //判断是否破纪录
                if (score > mostScore) {
                    mostScore = score;
                    document.getElementById("most-score").innerText = score;
                }
                k = i - 1;
                //数组下移
                while (k > 0) {
                    c[k][j] = c[k - 1][j];
                    k--;
                }
            }
        }
    }
    update(); //更新界面
    //判断是否可以下移，能则生成方块
    if (d) randomDemo();
}
//判断游戏是否结束，即上下左右都不能移动
function over() {
    if ((!(canLeft() || canRight() || canUp() || canDown())) &&
        document.getElementById("start").disabled)
        alert("游戏结束，本局分数为" + score + ",游戏的最高分数为" + mostScore);
}
//监听键盘事件
window.addEventListener("keydown", function(e) {
    if (e.keyCode == 37) {
        e.preventDefault();
        left();
        over();
    }
    if (e.keyCode == 38) {
        e.preventDefault();
        up();
        over();
    }
    if (e.keyCode == 39) {
        e.preventDefault();
        right();
        over();
    }
    if (e.keyCode == 40) {
        e.preventDefault();
        down();
        over();
    }
});