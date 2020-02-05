//Player Default Speeds--------------
var jumpSpeed = 30;
var runSpeed = 25;

//Variables--------------------------
var spriteW = 48;
var spriteH = 60;
var locX = 0;
var locY = 600 - spriteH;
var cycle = 0;
var direction = 1;
var jumping = false;
var spawnSpeed = 1100;
var points = 0;
var highScore = 0;
var coinX;
var coinY;
var playing = false;
var popUp = true;
var running = false;
var running2 = false;
var harder;
var missileCreator;
var hardMode = false;

//Canvas-----------------------------
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var canvas2 = document.getElementById('canvas2');
var context2 = canvas2.getContext('2d');
//Make lines-------------------------
setInterval(function () {
    "use strict";
    context2.fillStyle = "blue";
    context2.fillRect(0, 530, 600, 2);
    context2.fillRect(0, 460, 600, 2);
    context2.fillRect(0, 390, 600, 2);
    context2.fillRect(0, 320, 600, 2);
    context2.fillRect(0, 250, 600, 2);
    context2.fillRect(0, 180, 600, 2);
    context2.fillRect(0, 110, 600, 2);
}, 20);

//Images-----------------------------
var img = document.createElement('img');
img.src = 'playerBig.png';
var imgF = document.createElement('img');
imgF.src = 'playerBigFlip.png';

var missile = document.createElement('img');
missile.src = 'missile.png';
var missileF = document.createElement('img');
missileF.src = 'missileF.png';
var explosion = document.createElement('img');
explosion.src = 'explosion.png';

function resetImg(bImg) {
    "use strict";
    document.getElementById('canvas').style.backgroundImage = "url(" + bImg + ")";
    document.getElementById("changed").innerHTML = "Success, background changed to " + bImg + ".";
    
    setTimeout(function () {
        document.getElementById("changed").innerHTML = "";
    }, 1000);
}

//Basic Character Functions----------
function clear() {
    "use strict";
    context.clearRect(locX, locY, spriteW, spriteH);
}

function stand() {
    "use strict";
    clear();
    if (direction === 1) {
        context.drawImage(img,
                      //source rectangle
                      8 * spriteW, 0, spriteW, spriteH,
                      //destination rectagle
                      locX, locY, spriteW, spriteH
                    );
    } else {
        context.drawImage(imgF,
                      //source rectangle
                      432 - (8 * spriteW), 0, spriteW, spriteH,
                      //destination rectagle
                      locX, locY, spriteW, spriteH
                    );
    }
    cycle = 0;
}

img.addEventListener('load', function () {
    "use strict";
    stand();
});

//Coins------------------------------
function resetCoin() {
    "use strict";
    coinX = Math.random() * 520 + 30;
    coinY = Math.random() * 520 + 30;
    
    context2.fillStyle = 'yellow';
    context2.beginPath();
    context2.arc(coinX, coinY, 15, 0, 7);
    context2.fill();
}

function removeCoin() {
    "use strict";
    context2.clearRect(coinX - 30, coinY - 30, 60, 60);
    var coinWorth = (3100 - spawnSpeed) * 5;
    points += coinWorth;
    document.getElementById('coins').innerHTML = points;
    resetCoin();
    if (points > 100000) {
        if (hardMode === false) {
            hardMode = true;
            harder = setInterval(
                Fmissile,
                2000
            );
        }
    }
}

function checkCoin() {
    "use strict";
    if (locX >= coinX - 14 - spriteW && locX <= coinX + 15) {
        if (locY <= coinY + 13 && locY >= coinY - spriteH - 13) {
            removeCoin();
        }
    }
}

//Jumping/Falling--------------------
function goUp() {
    "use strict";
    clear();
    locY -= 10;
    context.clearRect(50, 120, spriteW, spriteH);
    if (direction === 1) {
        context.drawImage(img,
                      //source rectangle
                      9 * spriteW, 0, spriteW, spriteH,
                      //destination rectagle
                      locX, locY, spriteW, spriteH
            );
        checkCoin();
    } else {
        context.drawImage(imgF,
                      //source rectangle
                      432 - (9 * spriteW), 0, spriteW, spriteH,
                      //destination rectagle
                      locX, locY, spriteW, spriteH
            );
        checkCoin();
    }
}

function goDown() {
    "use strict";
    clear();
    locY += 10;
    checkCoin();
    context.clearRect(50, 120, spriteW, spriteH);
    if (direction === 1) {
        context.drawImage(img,
                      //source rectangle
                      9 * spriteW, 0, spriteW, spriteH,
                      //destination rectagle
                      locX, locY, spriteW, spriteH
                    );
    } else {
        context.drawImage(imgF,
                      //source rectangle
                      432 - (9 * spriteW), 0, spriteW, spriteH,
                      //destination rectagle
                      locX, locY, spriteW, spriteH
                    );
    }
}

function drop() {
    "use strict";
    if (jumping === false) {
        if (locY !== 600 - spriteH) {
            jumping = true;
            clear();
            locY += 20;
            var setInter = setInterval(function () {
                if (locY === 600 - spriteH) {
                    stand();
                    clearInterval(setInter);
                    jumping = false;
                } else if (locY === 530 - spriteH) {
                    stand();
                    clearInterval(setInter);
                    jumping = false;
                } else if (locY === 460 - spriteH) {
                    stand();
                    clearInterval(setInter);
                    jumping = false;
                } else if (locY === 390 - spriteH) {
                    stand();
                    clearInterval(setInter);
                    jumping = false;
                } else if (locY === 320 - spriteH) {
                    stand();
                    clearInterval(setInter);
                    jumping = false;
                } else if (locY === 250 - spriteH) {
                    stand();
                    clearInterval(setInter);
                    jumping = false;
                } else if (locY === 180 - spriteH) {
                    stand();
                    clearInterval(setInter);
                    jumping = false;
                } else if (locY === 110 - spriteH) {
                    stand();
                    clearInterval(setInter);
                    jumping = false;
                } else {
                    goDown();
                }
                
            }, jumpSpeed + 20);
        }
    }
}

function jump() {
    "use strict";
    if (jumping === false) {
        jumping = true;
        var setInter = setInterval(function () { goUp(); }, jumpSpeed);
        setTimeout(function () {
            clearInterval(setInter);
            var setInter2 = setInterval(function () {  
                if (locY === 600 - spriteH) {
                    stand();
                    clearInterval(setInter2);
                    jumping = false;
                } else if (locY === 530 - spriteH) {
                    stand();
                    clearInterval(setInter2);
                    jumping = false;
                } else if (locY === 460 - spriteH) {
                    stand();
                    clearInterval(setInter2);
                    jumping = false;
                } else if (locY === 390 - spriteH) {
                    stand();
                    clearInterval(setInter2);
                    jumping = false;
                } else if (locY === 320 - spriteH) {
                    stand();
                    clearInterval(setInter2);
                    jumping = false;
                } else if (locY === 250 - spriteH) {
                    stand();
                    clearInterval(setInter2);
                    jumping = false;
                } else if (locY === 180 - spriteH) {
                    stand();
                    clearInterval(setInter2);
                    jumping = false;
                } else if (locY === 110 - spriteH) {
                    stand();
                    clearInterval(setInter2);
                    jumping = false;
                } else {
                    goDown(); 
                }
                
            }, jumpSpeed + 20);
        }, jumpSpeed  * 10);
    }
}

//Needed Game Functions--------------

function playAgain() {
    "use strict";
    hardMode = false;
    popUp = false;
    document.getElementById('popup').style.visibility = "hidden";
    document.getElementById('startPopup').style.visibility = "hidden";
    document.getElementById('newHighScore').style.visibility = "hidden";
    points = 0;
    context2.clearRect(coinX - 30, coinY - 30, 60, 60);
    resetCoin();
    document.getElementById('coins').innerHTML = points;
    missileCreator = setInterval(
        addMissile,
        spawnSpeed
    );
    context.clearRect(0, 0, 600, 600);
    locX = 0;
    locY = 600 - spriteH;
    context.drawImage(img,
                          //source rectangle
                          8 * spriteW, 0, spriteW, spriteH,
                          //destination rectagle
                          locX, locY, spriteW, spriteH
                         );
    playing = true;
}

function lose() {
    "use strict";
    clearInterval(harder);
    clearInterval(missileCreator);
    popup();
}

//Missiles---------------------------
function explode(xVal, yVal) {
    "use strict";
    context2.drawImage(explosion, xVal - 50, yVal - 40, 100, 100);
    setTimeout(function () {
        context2.clearRect(xVal - 50, yVal - 50, 200, 200);
        lose();
    }, 250);
    context2.clearRect(coinX - 30, coinY - 30, 60, 60);
    coinX = undefined;
    coinY = undefined;
}

function clearMissile(xVal, yVal) {
    "use strict";
    context.clearRect(xVal, yVal, 50, 20);
}

function addMissile() {
    "use strict";
    context.fillStyle = "red";
    var num = Math.floor(Math.random() * 9 + 1);
    if (num > 8) {
        addMissile();
        addMissile();
    } else {
        
        if (num === 1) {
            var x1 = 600;
            var missile1 = setInterval(function () {
                if (x1 < -50) {
                    clearInterval(missile1);
                }
                if (x1 < locX + spriteW && x1 > locX - 50) {
                    if (555 > locY - 20 && 555 < locY + spriteH) {
                        clearMissile(x1, 555);
                        clearInterval(missile1);
                        explode(x1, 555);
                        return;
                    }
                }
                clearMissile(x1, 555);
                x1 -= 15;
                context.drawImage(missile, x1, 555, 50, 20);
            }, 20);
            
        } else if (num === 2) {
            var x2 = 600;
            
            var missile2 = setInterval(function () {
                if (x2 < -50) {
                    clearInterval(missile2);
                }
                if (x2 < locX + spriteW && x2 > locX - 50) {
                    if (490 > locY - 20 && 490 < locY + spriteH) {
                        clearMissile(x2, 490);
                        clearInterval(missile2);
                        explode(x2, 490);
                        return;
                    }
                }
                clearMissile(x2, 490);
                x2 -= 15;
                context.drawImage(missile, x2, 490, 50, 20);
            }, 20);
            
        } else if (num === 3) {
            var x3 = 600;
            
            var missile3 = setInterval(function () {
                if (x3 < -50) {
                    clearInterval(missile3);
                }
                if (x3 < locX + spriteW && x3 > locX - 50) {
                    if (420 > locY - 20 && 420 < locY + spriteH) {
                        clearMissile(x3, 420);
                        clearInterval(missile3);
                        explode(x3, 420);
                        return;
                    }
                }
                clearMissile(x3, 420);
                x3 -= 15;
                context.drawImage(missile, x3, 420, 50, 20);
            }, 20);
            
        } else if (num === 4) {
            var x4 = 600;
            
            var missile4 = setInterval(function () {
                if (x4 < -50) {
                    clearInterval(missile4);
                }
                if (x4 < locX + spriteW && x4 > locX - 50) {
                    if (350 > locY - 20 && 350 < locY + spriteH) {
                        clearMissile(x4, 350);
                        clearInterval(missile4);
                        explode(x4, 350);
                        return;
                    }
                }
                clearMissile(x4, 350);
                x4 -= 15;
                context.drawImage(missile, x4, 350, 50, 20);
            }, 20);
            
        } else if (num === 5) {
            var x5 = 600;
            
            var missile5 = setInterval(function () {
                if (x5 < -50) {
                    clearInterval(missile5);
                }
                if (x5 < locX + spriteW && x5 > locX - 50) {
                    if (280 > locY - 20 && 280 < locY + spriteH) {
                        clearMissile(x5, 280);
                        clearInterval(missile5);
                        explode(x5, 280);
                        return;
                    }
                }
                clearMissile(x5, 280);
                x5 -= 15;
                context.drawImage(missile, x5, 280, 50, 20);
            }, 20);
            
        } else if (num === 6) {
            var x6 = 600;
            
            var missile6 = setInterval(function () {
                if (x6 < -50) {
                    clearInterval(missile6);
                }
                if (x6 < locX + spriteW && x6 > locX - 50) {
                    if (210 > locY - 20 && 210 < locY + spriteH) {
                        clearMissile(x6, 210);
                        clearInterval(missile6);
                        explode(x6, 210);
                        return;
                    }
                }
                clearMissile(x6, 210);
                x6 -= 15;
                context.drawImage(missile, x6, 210, 50, 20);
            }, 20);
            
        } else if (num === 7) {
            var x7 = 600;
            
            var missile7 = setInterval(function () {
                if (x7 < -50) {
                    clearInterval(missile7);
                }
                if (x7 < locX + spriteW && x7 > locX - 50) {
                    if (140 > locY - 20 && 140 < locY + spriteH) {
                        clearMissile(x7, 140);
                        clearInterval(missile7);
                        explode(x7, 140);
                        return;
                    }
                }
                clearMissile(x7, 140);
                x7 -= 15;
                context.drawImage(missile, x7, 140, 50, 20);
            }, 20);
            
        } else if (num === 8) {
            var x8 = 600;
            
            var missile8 = setInterval(function () {
                if (x8 < -50) {
                    clearInterval(missile8);
                }
                if (x8 < locX + spriteW && x8 > locX - 50) {
                    if (70 > locY - 20 && 70 < locY + spriteH) {
                        clearMissile(x8, 70);
                        clearInterval(missile8);
                        explode(x8, 70);
                        return;
                    }
                }
                clearMissile(x8, 70);
                x8 -= 15;
                context.drawImage(missile, x8, 70, 50, 20);
            }, 20);
        }
    }
}

function Fmissile() {
        var x1 = 0;
        var y1 = Math.random() * 520 + 30;
        var missile8 = setInterval(function () {
            if (x1 < -50) {
                clearInterval(missile8);
            }
            if (x1 < locX + spriteW && x1 > locX - 50) {
                if (y1 > locY - 20 && y1 < locY + spriteH) {
                    clearMissile(x1, y1);
                    clearInterval(missile8);
                    explode(x1, y1);
                    return;
                }
            }
            clearMissile(x1, y1);
            x1 += 15;
            context.drawImage(missileF, x1, y1, 50, 20);
        }, 20);  
}

//Running----------------------------
function run() {
    "use strict";
    var setInter = setInterval(function () {
        clear();
        if (locX > 600 - spriteW) {locX = 600 - spriteW; }
        if (locX < 0) {locX = 0; }
        if (jumping === false) {
            if (direction === 1) {
                locX += 10;
                context.drawImage(img,
                              //source rectangle
                              cycle * spriteW, 0, spriteW, spriteH,
                              //destination rectagle
                              locX, locY, spriteW, spriteH
                             );
                checkCoin();
            } else {
                locX -= 10;
                context.drawImage(imgF,
                              //source rectangle
                              432 - (cycle * spriteW), 0, spriteW, spriteH,
                              //destination rectagle
                              locX, locY, spriteW, spriteH
                             );
            }
            cycle = (cycle + 1) % 8;
            checkCoin();
        } else {
            if (direction === 1) {
                locX += 10;
                context.drawImage(img,
                              //source rectangle
                              9 * spriteW, 0, spriteW, spriteH,
                              //destination rectagle
                              locX, locY, spriteW, spriteH
                             );
                checkCoin();
            } else {
                locX -= 10;
                context.drawImage(imgF,
                              //source rectangle
                              432 - (9 * spriteW), 0, spriteW, spriteH,
                              //destination rectagle
                              locX, locY, spriteW, spriteH
                             );
                checkCoin();
            }
        }
        if (running === false && running2 === false) {
            clearInterval(setInter);
            stand();
        }
    }, runSpeed);
}

//KeyCodes---------------------------
document.addEventListener('keydown', function (e) {
    "use strict";
    if (e.keyCode === 39) {
        if (running !== true) {
            running = true;
            direction = 1;
            if (running2 !== true) {
               run(); 
            }
        }
    } else if (e.keyCode === 37) {
        if (running2 !== true) {
            running2 = true;
            direction = -1;
            if (running !== true) {
               run(); 
            }
        }
    } else if (e.keyCode === 38) {
        jump();
    } else if (e.keyCode === 40) {
        drop();
    }
});
document.addEventListener('keyup', function (e) {
    "use strict";
    if (e.keyCode === 13 || e.keyCode === 32) {
        if (popUp === true) {
          playAgain();  
        }
    } else if (e.keyCode === 39) {
        running = false;
        stand();
    } else if (e.keyCode === 37) {
        running2 = false;
        stand();
    }
});

//Difficulty-------------------------
function easy() {
    "use strict";
    if (playing === false) {
        if (spawnSpeed !== 3000) {
            spawnSpeed += 100;
            document.getElementById('speed').innerHTML = 3100 - spawnSpeed;
        }
    }
}

function hard() {
    "use strict";
    if (playing === false) {
        if (spawnSpeed !== 100) {
            spawnSpeed -= 100;
            document.getElementById('speed').innerHTML = 3100 - spawnSpeed;
        }
    }
}

//Popups and Gui---------------------
function popup() {
    "use strict";
    playing = false;
    popUp = true;
    document.getElementById('popup').style.visibility = "visible";
    document.getElementById('points').innerHTML = points;
    if (highScore < points) {
        highScore = points;
        document.getElementById('highScore').innerHTML = points;
        document.getElementById('newHighScore').style.visibility = "visible";
    }
}

function showBackgrounds() {
    document.getElementById("BackgroundPopUp").style.visibility = "visible";
}
function ExitPopup() {
    document.getElementById("BackgroundPopUp").style.visibility = "hidden";
}