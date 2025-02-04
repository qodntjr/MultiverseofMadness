// Player
let flightShootDelayCount = 0;
let flightBombDelayCount = 0;
let countShoot = 0;
let flight;
const PLAYER_SHOOT_DELAY = 30;
let playerHPImage;
let playerDamageImage;
let playerBombImage;
// Boss
var bossLevel;
let bossBird = [];
let bossHelicopter;
let bossSun;
const tutorialLevel = -1;
const bossBirdLevel = 0;
const bossHelicopterLevel = 1;
const bossSunLevel = 2;
//Background
let leftForestArray = [];
let rightForestArray = [];
let forestimg;
let treeimg;
let leftCloudArray = [];
let midCloudArray = [];
let rightCloudArray = [];
let skyeimg;
let space = [];
let spaceimg;
const CLOUD_POSY_LIMIT = 1000;
// Item
let countItemEffectTime = -1;
let enemyStop = false;
const ITEM_SPEED_UP = 0;
const ITEM_DAMAGE_UP = 1;
const ITEM_BULLET_STOP = 2;
const ITEM_GET_BOMB = 3;
const ITEM_GET_LIFE = 4;
// Game
let mode;
let score = 0;
let time = 0;
let remaintime = 10
let continueFramecount = 0;
let isGameOver = false;
let isGameoverSoundPlayed = false;
let isGameWinSoundPlayed = false;
const SPACEBAR = 32;
const MODE_GAME_TITLE = 0;
const MODE_IN_GAME = 1;
const MODE_RANKING_BOARD = 2;
const MODE_GAME_WIN = 3;
const MODE_INPUT_PLAYERNAME = 4;
const ENEMY_DIE = 0;
const ENEMY_SURVIVE = 1;
// Image
let titleBackground;
let buttonEmptyImage;
let buttonQuitImage;
let buttonStartImage;
let buttonTitleImage;
let buttonRankingBoardImage;
let textGameOverImage;
let textScoreImage;
let textTitleImage;
let textUserNameImage;
let textVictoryImage;
let sandClockImage;
let swordImage;
let speedUpImage;
// Title
let titleState = 0;
// BossImage
let birdPoseAImage;
let birdPoseBImage;
let helicopterImage;
let helicopterPropellerImage;
let sunPoseAImage;
let sunPoseBImage;
let yellowMeteoImage;
let redMeteoImage;
// Font
let font;
// RankingBoard
let rankingRegistration = false;
let refreshRankingBoard = false;
let rankingList = [];
let skipRankingCount = 0;
let nextRankingPrintCount = 0;
let connectionStatus;
let nickname = "";
let nicknameTemp = [];
// Sound
let lazerSound;
let birdSound;
let helicopterSound;
let radarSound;
let backgroundBossSunSound;
let fireBallSound;
let paperDieSound;
let countSound;
let selectSound;
let gameWinSound;
let explosionSound;
let tearingSound;

function preload() {
    /* 리소스 로드 */
    // Background Resource
    skyeimg = loadImage('resources/skye.png');
    forestimg = loadImage('resources/forest.png');
    treeimg = loadImage('resources/tree1.png');
    spaceimg = loadImage('resources/space.png');
    titleBackground = loadImage('resources/bg.png');
    //-----------------------------------------------------------------------------------------------------------------
    // UI Resource
    buttonEmptyImage = loadImage('resources/bt_empty.png');
    buttonQuitImage = loadImage('resources/bt_quit.png');
    buttonStartImage = loadImage('resources/bt_start.png');
    buttonTitleImage = loadImage('resources/bt_totitle.png');
    buttonRankingBoardImage = loadImage('resources/bt_ranking.png');
    textGameOverImage = loadImage('resources/tex_gameover.png');
    textScoreImage = loadImage('resources/tex_score.png');
    textTitleImage = loadImage('resources/tex_title.png');
    textUserNameImage = loadImage('resources/tex_username.png');
    textVictoryImage = loadImage('resources/tex_victory.png');
    //-----------------------------------------------------------------------------------------------------------------
    // Player Resource
    playerHPImage = loadImage('resources/hp.png');
    playerDamageImage = loadImage('resources/damage.png');
    playerBombImage = loadImage('resources/boom.png');
    //-----------------------------------------------------------------------------------------------------------------
    // Item Resource
    sandClockImage = loadImage('resources/sandclock.png');
    swordImage = loadImage('resources/sword.png');
    speedUpImage = loadImage('resources/hermes.png');
    //-----------------------------------------------------------------------------------------------------------------
    // Boss Resource
    birdPoseAImage = loadImage('resources/bird1.png');
    birdPoseBImage = loadImage('resources/bird2.png');
    helicopterImage = loadImage('resources/helicopter.png');
    helicopterPropellerImage = loadImage('resources/helicopterpropeller.png');
    sunPoseAImage = loadImage('resources/sun1.png');
    sunPoseBImage = loadImage('resources/sun2.png');
    yellowMeteoImage = loadImage('resources/yellowmeteo.png');
    redMeteoImage = loadImage('resources/redmeteo.png');
    //-----------------------------------------------------------------------------------------------------------------
    // Font Resource
    font = loadFont('resources/DungGeunMo.ttf');
    //-----------------------------------------------------------------------------------------------------------------
    // Sound Resource
    lazerSound = loadSound('https://211.114.29.234:8000/resources/laser.wav');
    birdSound = loadSound('https://211.114.29.234:8000/resources/bird.mp3');
    helicopterSound = loadSound('https://211.114.29.234:8000/resources/helicopter.wav');
    radarSound = loadSound('https://211.114.29.234:8000/resources/radar.wav');
    backgroundBossSunSound = loadSound('https://211.114.29.234:8000/resources/noise.wav');
    fireBallSound = loadSound('https://211.114.29.234:8000/resources/fireball.wav');
    paperDieSound = loadSound('https://211.114.29.234:8000/resources/paper.wav');
    countSound = loadSound('https://211.114.29.234:8000/resources/count.mp3');
    selectSound = loadSound('https://211.114.29.234:8000/resources/select.mp3');
    gameWinSound = loadSound('https://211.114.29.234:8000/resources/gamewin.wav');
    explosionSound = loadSound('https://211.114.29.234:8000/resources/explosion.ogg');
    tearingSound = loadSound('https://211.114.29.234:8000/resources/tearing.wav');
}

function setup() {
    mode = MODE_INPUT_PLAYERNAME; //initialy the game has not started
    background(127);
    createCanvas(800, 800, WEBGL);
    noStroke();
    flight = new Flight();
    bossLevel = tutorialLevel;
    let itemVector = createVector(4, 3);
    item = new PlayerItem(itemVector, true);

    //새 보스 배경
    for (let i = 0; i < 65; i++) {
        // 왼쪽 숲 생성
        leftForestArray[i] = new BackgroundForest(createVector(70, 90), -2000 + 40 * i, createVector(-400, -600), 36);
        // 오른쪽 숲 생성
        rightForestArray[i] = new BackgroundForest(createVector(-180, -200), -2000 + 40 * i, createVector(-700, -900), 24);
    }

    //비행기 보스 배경
    for (let i = 0; i < 10; i++) {
        // 왼쪽 구름
        leftCloudArray[i] = new BackgroundCloud(createVector(60, 190), createVector(-400, -550), 8);
        leftCloudArray[i].setTranslate();
        // 가운데 구름
        midCloudArray[i] = new BackgroundCloud(createVector(-250, 0), createVector(-300, -500), 8);
        // 오른쪽 구름
        rightCloudArray[i] = new BackgroundCloud(createVector(0, 100), createVector(-400, -500), 3);
        rightCloudArray[i].setTranslate();
    }

    //썬 보스 배경
    for (let i = 0; i < 10; i++) {
        space[i] = new BackgroundSpace();
    }
}


function draw() {
    clear();
    translate(0, 0, 100);
    /* 닉네임 입력 */
    if (mode == MODE_INPUT_PLAYERNAME) {
        push();
        textFont(font);
        background(250);
        fill(0);
        textSize(40);
        text('Input Nickname', -120, -200);
        textSize(80);
        textAlign(CENTER);
        text(nickname, 0, -100);
        pop();
    }
    /* 타이틀 */
    if (mode == MODE_GAME_TITLE) {
        image(titleBackground, -width / 2, -height / 2, width, height);
        push();
        fill(255, 0, 0);
        if (titleState == 0) rect(-100, 50, 200, 50);
        if (titleState == 1) rect(-100, 120, 200, 50);
        if (titleState == 2) rect(-100, 190, 200, 50);
        pop();
        image(textTitleImage, -100, -200, 200, 200);
        image(buttonStartImage, -100, 50, 200, 50);
        image(buttonRankingBoardImage, -100, 120, 200, 50);
        image(buttonQuitImage, -100, 190, 200, 50);
        score = 0;
        time = 0;
        bossLevel = tutorialLevel;
    }

    /* 게임 승리 */
    if (mode == MODE_GAME_WIN) {
        background(255)
        textFont(font);
        if (rankingRegistration == false) {
            score += bossLevel * 10000;
            rankingRegistration = true;
        }
        drawGameWin();
    }

    if (mode == MODE_RANKING_BOARD) {
        image(titleBackground, -width / 2, -height / 2, width, height);
        drawRankingBoard();
    }

    /* 인 게임 */
    if (mode == MODE_IN_GAME) {
        score++;
        time++;
        background(80, 188, 223);
        if (bossLevel == tutorialLevel){
            drawTutorial();
        }
        if (bossLevel == bossBirdLevel) {
            /* bossBird배열 중 하나 이상이 살아 있을 시 */
            if (bossBird[0].state == ENEMY_SURVIVE || bossBird[1].state == ENEMY_SURVIVE || bossBird[2].state == ENEMY_SURVIVE) {
                drawForestBackground();
                for (let i = 0; i < 3; i++) {
                    /* bossBird[i]가 살아 있을 시 */
                    if (bossBird[i].state == ENEMY_SURVIVE) {
                        bossBird[i].behavior(flight.x, flight.y);
                        bossBird[i].display(flight.x, flight.y);
                        flight.flightHitBox(bossBird[i], 20, 60);
                        bossBird[i].displayBossHP(-300 + 190 * i, -340, 160, 40);
                    }
                }
            } else {
                drawForestBackground();
                if(isGameWinSoundPlayed == false) {
                    gameWinSound.play();
                    isGameWinSoundPlayed = true;
                }
                if(!gameWinSound.isPlaying()) {
                    isGameWinSoundPlayed = false;
                    birdSound.stop();
                    bossLevel = bossHelicopterLevel;
                    flight = new Flight();
                    bossHelicopter = new BossHelicopter(0, -200, 1, 20, 100, helicopterImage, helicopterPropellerImage);
                    enemyStop = false;
                }
            }
        }

        if (bossLevel == bossHelicopterLevel) {
            /* bossHelicopter가 살아 있을 시 */
            if (bossHelicopter.state == ENEMY_SURVIVE) {
                drawSkyBackground();
                bossHelicopter.behavior();
                bossHelicopter.display();
                flight.flightHitBox(bossHelicopter, 40, 60);
                if (flightBombDelayCount < 0) {
                    for (let j = 0; j < 200; j += 2) {
                        bossHelicopter.patternBulletObject[j].display();
                        bossHelicopter.patternBulletObject[j + 1].display();
                        flight.flightHitBox(bossHelicopter.patternBulletObject[j], 4, 60);
                    }
                    bossHelicopter.patternMissileObject[0].display();
                    bossHelicopter.patternMissileObject[1].display();
                    flight.flightHitBox(bossHelicopter.patternMissileObject[0], 4, 60);
                    flight.flightHitBox(bossHelicopter.patternMissileObject[1], 4, 60);
                }
                else{
                    for (let i = 0; i < 200; i++) {
                        bossHelicopter.patternBulletObject[i].y = 1000;
                    }
                    bossHelicopter.patternMissileObject[0].y = 1000;
                    bossHelicopter.patternMissileObject[1].y = 1000;
                }
                bossHelicopter.displayBossHP(-300, -340, 590, 40);
            } else {
                drawSkyBackground();
                if(isGameWinSoundPlayed == false) {
                    gameWinSound.play();
                    isGameWinSoundPlayed = true;
                }
                if(!gameWinSound.isPlaying()) {
                    isGameWinSoundPlayed = false;
                    helicopterSound.stop();
                    radarSound.stop();
                    bossLevel = bossSunLevel;
                    flight = new Flight();
                    bossSun = new BossSun(0, -400, 1, 100, 600, sunPoseAImage, sunPoseBImage);
                    enemyStop = false;
                }
            }
        }

        if (bossLevel == bossSunLevel) {
            /* bossSun이 살아 있을 시 */
            if (bossSun.state == ENEMY_SURVIVE) {
                drawSpaceBackground();
                bossSun.behavior(flight.x, flight.y);
                bossSun.display();
                flight.flightHitBox(bossSun, 20, 60);
                if(flightBombDelayCount < 0) {
                    for (let i = 0; i < 200; i++) {
                        bossSun.patternAObject[i].display();
                        flight.flightHitBox(bossSun.patternAObject[i], 20, 60);
                    }
                    for (let i = 0; i < 50; i++) {
                        bossSun.patternBLeftObject[i].display();
                        bossSun.patternBRightObject[i].display();
                        flight.flightHitBox(bossSun.patternBLeftObject[i], 20, 60);
                        flight.flightHitBox(bossSun.patternBRightObject[i], 20, 60);
                    }
                }
                else{
                    for(let i = 0; i < 200; i++) {
                        bossSun.patternAObject[i].y = 1000;
                    }
                    for(let i = 0; i < 50; i++){
                        bossSun.patternBLeftObject[i].y = 1000;
                        bossSun.patternBRightObject[i].y = 1000;
                    }
                }
                bossSun.displayBossHP(-300, -340, 590, 40);
            } else {
                drawSpaceBackground();
                if(isGameWinSoundPlayed == false) {
                    gameWinSound.play();
                    isGameWinSoundPlayed = true;
                }
                if(!gameWinSound.isPlaying()) {
                    isGameWinSoundPlayed = false;
                    fireBallSound.stop();
                    backgroundBossSunSound.stop();
                    mode = MODE_GAME_WIN;
                }
            }
        }

        /* 비행기 */
        if (flight.isFlightDead()) {
            drawGameOver();
        }
        if(flight.state == true) {
            flight.display();
        }
        flight.displayStat(-300, 300, 160, 40, flight.life, playerHPImage);
        flight.displayStat(-110, 300, 160, 40, flight.damage, playerDamageImage);
        flight.displayStat(80, 300, 160, 40, flight.bombNumber, playerBombImage);

        /* 비행기 총알 출력 */
        for (let i = 0; i < 10; i++) {
            flight.bullet[i].move();
            flight.bullet[i].display();
            if (bossLevel == bossBirdLevel) {
                for (let j = 0; j < 3; j++) {
                    bossBird[j].hitBox(flight.bullet[i], flight.damage);
                }
            }
            if (bossLevel == bossHelicopterLevel) {
                bossHelicopter.hitBox(flight.bullet[i], flight.damage);
            }
            if (bossLevel == bossSunLevel) {
                bossSun.hitBox(flight.bullet[i], flight.damage);
            }
        }

        /* 비행기와 아이템 상호작용 */
        switch (item.itemListener(flight.x, flight.y)) {
            case ITEM_SPEED_UP:
                flight.speed = 5;
                break;
            case ITEM_DAMAGE_UP:
                if (flight.damage < 5) {
                    flight.damage += 1;
                }
                break;
            case ITEM_BULLET_STOP:
                enemyStop = true;
                break;
            case ITEM_GET_BOMB:
                if(flight.bombNumber < 5) {
                    flight.bombNumber += 1;
                }
                break;
            case ITEM_GET_LIFE:
                if(flight.life < 5) {
                    flight.life += 1;
                }
        }

        /* 아이템 출력 및 아이템 효과 시간 측정 리스너 */
        item.displayPlayerItem();
        checkItemEffectListener();

        /* delay 감소 */
        flight.flightShootDelayCount--;
        flightBombDelayCount--;
        flight.hitDelay--;
    }
}

function checkItemEffectListener() {
    /* 아이템 효과 시간 체크 함수 */
    if (countItemEffectTime == 0) {
        flight.resetStatus();
        countItemEffectTime = -1;
    } else if (countItemEffectTime > 0) {
        countItemEffectTime -= 1;
    }
}

function isAlpha(ch) {
    /* 입력된 단어가 영어인지 확인하는 함수 */
    return typeof ch === "string" && ch.length === 1
        && (ch >= "a" && ch <= "z" || ch >= "A" && ch <= "Z");
}

function keyPressed() {
    if (mode == MODE_INPUT_PLAYERNAME) {
        if (keyCode === ENTER || keyCode === BACKSPACE) {
            if (keyCode === BACKSPACE) {
                selectSound.setVolume(0.4);
                selectSound.play();
                shorten(nicknameTemp);
                nickname = "";
                for (let i = 0; i < nicknameTemp.length && nickname.length < 3; i++) {
                    nickname = nickname + nicknameTemp[i];
                }
            }
            if (keyCode === ENTER) {
                if (nickname.length == 0) {
                    nickname = "AAA";
                }
                mode = MODE_GAME_TITLE;
            }

        } else {
            if (isAlpha(key) && nicknameTemp.length < 3) {
                selectSound.setVolume(0.4);
                selectSound.play();
                append(nicknameTemp, key);
            }
            nickname = "";
            for (let i = 0; i < nicknameTemp.length && nickname.length < 3; i++) {
                nickname = nickname + nicknameTemp[i];
            }
        }
        keyCode = 0;
    }
    if (mode == MODE_GAME_TITLE) {
        if (keyCode === UP_ARROW) {
            titleState = (titleState + 2) % 3;
        }
        if (keyCode === DOWN_ARROW) {
            titleState = (titleState + 1) % 3;
        }
        if (keyCode === ENTER) {
            selectSound.setVolume(0.4);
            selectSound.play();
            if (titleState == 0) {
                mode = MODE_IN_GAME;
            }
            if (titleState == 1) {
                mode = MODE_RANKING_BOARD;
            }
            if (titleState == 2) {
                window.close();
            }
            keyCode = 0;
        }
    }
    if (mode == MODE_IN_GAME) {
        if (keyCode === ENTER) {
            if(bossLevel == tutorialLevel){
                bossLevel = bossBirdLevel;
                resetting();
            }
            else {
                selectSound.setVolume(0.4);
                selectSound.play();
                resetting();
            }
            keyCode = 0;
        }
        if (flight.state == false && keyCode == SPACEBAR){
            continueFramecount += 60;
        }
    }
    if (mode == MODE_RANKING_BOARD) {
        if (keyCode === ENTER) {
            selectSound.setVolume(0.4);
            selectSound.play();
            mode = MODE_GAME_TITLE;
            keyCode = 0;
        }
    }
    if (mode == MODE_GAME_WIN) {
        if (keyCode === ENTER) {
            selectSound.setVolume(0.4);
            selectSound.play();
            postRanking(nickname, score, time);
            mode = MODE_GAME_TITLE;
            rankingRegistration = false;
            keyCode = 0;
        }
    }
}

function resetting() {
    mode = MODE_IN_GAME;
    continueFramecount = 0;
    isGameoverSoundPlayed = false;
    flight = new Flight();
    if (bossLevel == bossBirdLevel) {
        for (let i = 0; i < 3; i++) {
            bossBird[i] = new BossBird(0, -200, 1, 5, 80 + 30 * i, birdPoseAImage, birdPoseBImage);
        }
    }
    if (bossLevel == bossHelicopterLevel) {
        bossHelicopter = new BossHelicopter(0, -200, 1, 20, 100, helicopterImage, helicopterPropellerImage);
    }
    if (bossLevel == bossSunLevel) {
        bossSun = new BossSun(0, -400, 1, 100, 600, sunPoseAImage, sunPoseBImage);
    }

    for (let i = 0; i < 10; i++) {
        flight.bullet[i].x = 10000;
        flight.bullet[i].y = 0;
    }
}

function drawRankingBoard() {
    /* 랭킹 보드 출력 함수 */
    textFont(font);
    textSize(50);
    text("이름", -250, -200);
    text("점수", -45, -200);
    text("시간", 150, -200);

    if (nextRankingPrintCount > 10 * frameRate()) {
        // 출력 후 10초 경과시 10등 단위로 출력
        skipRankingCount += 10;
        nextRankingPrintCount = 0;
        refreshRankingBoard = false;
    }

    if (refreshRankingBoard != true) {
        // 랭킹을 DB로 부터 json 형태로 가지고 옴
        refreshRankingBoard = true;
        getRankingBoard(skipRankingCount);
    }

    for (let i = 0; i < rankingList.length; ++i) {
        // 닉네임, 점수, 시간별로 출력
        text(rankingList[i].nickname.slice(0, 3), -250, i * 45 - 140);
        text(rankingList[i].score, -50, i * 45 - 140);
        text(rankingList[i].time, 150, i * 45 - 140);
    }

    nextRankingPrintCount++;
}

function drawSkyBackground() {
    /* 비행기 보스 배경 출력 함수 */
    image(skyeimg, -300, -300);
    for (let i = 0; i < 10; i++) {
        leftCloudArray[i].display();
        midCloudArray[i].display();
        rightCloudArray[i].display();
    }
}

function drawForestBackground() {
    /* 새 보스 배경 출력 함수 */
    image(forestimg, -350, -350);
    for (let i = 0; i < 65; i++) {
        leftForestArray[i].display();
        rightForestArray[i].display();
    }
}

function drawSpaceBackground() {
    /* 썬 보스 배경 출력 함수 */
    push();
    translate(0, 0, -200);
    image(spaceimg, -550, -550, 1100, 1100);
    for (let i = 0; i < 10; i++) {
        space[i].display();
    }
    pop();
}

function drawGameWin() {
    /* 게임 이겼을 때 결과하면 출력 함수 */
    push();
    fill(0);
    textSize(60);
    text('Result', -100, -300);
    textSize(30);
    text('Nickname\t', -200, -200);
    text(nickname, -60, -200);
    text('Score\t', -200, -100);
    text(score, -60, -100);
    text('Time\t', -200, 0);
    text(time, -60, 0);
    pop();
}

function drawGameOver() {
    if(isGameoverSoundPlayed == false) {
        paperDieSound.play();
        isGameoverSoundPlayed = true;
    }
    textFont(font);
    isGameOver = true;
    if(continueFramecount%60 == 0){
        countSound.play();
    }
    continueFramecount++;
    if(isGameOver) {
        remaintime = floor(10 - continueFramecount/60);
        push();
        fill(255);
        textSize(100);
        text('CONTINUE?\t', -200, -100);
        text(remaintime, 0, 100);
        pop();
    }
    if(remaintime == 0){
        birdSound.stop();
        helicopterSound.stop();
        fireBallSound.stop();
        backgroundBossSunSound.stop();
        mode = MODE_GAME_TITLE;
    }
    isGameOver = false;
}

function drawTutorial(){
    textFont(font);
    image(titleBackground, -width / 2, -height / 2, width, height);
    push();
    stroke(0);
    strokeWeight(4);
    textSize(40);
    fill(255);
    rect(-215,65,50,50);
    rect(-215,115,50,50);
    rect(-265,115,50,50);
    rect(-165,115,50,50);
    rect(-65,115,200,50);
    rect(210,115,50,50);
    beginShape();
    vertex(245, -65);
    vertex(245, -115);
    vertex(305, -115);
    vertex(305, -15);
    vertex(185, -15);
    vertex(185, -65);
    endShape(CLOSE);
    fill(0);
    text('↑',-200,100);
    text('↓',-200,150);
    text('←',-250,150);
    text('→',-150,150);
    text('M O V E', -260, 200);
    text('S P A C E',-50,150);
    text('A T A C K',-50,200);
    text('B O O M',175,200);
    text('F',225,150);
    text('I T E M', -250, -280);
    image(speedUpImage, -265, -265, 50, 50);
    text(':SPEED+1', -200, -230);
    image(swordImage, -265, -215, 50, 50);
    text(':POWER+1', -200, -180);
    image(sandClockImage, -265, -165, 50, 50);
    text(':ENEMY STOP', -200, -130);
    image(playerBombImage, -265, -115, 50, 50);
    text(':BOMB+1', -200, -80);
    image(playerHPImage, -265, -65, 50, 50);
    text(':LIFE+1', -200, -30);
    text('ENTER', 200, -30);
    text('LIFE', -290, 290);
    text('POWER', -100, 290);
    text('BOMB', 90, 290);
    textSize(30);
    text('START LEVEL', 175, 10);
    text('RESTART LEVEL', 145, 30);
    pop();
}