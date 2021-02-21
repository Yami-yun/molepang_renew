
import {initGameSetValue as gameSetValue} from "../gameSetting";
import bar1 from "img/bar1.png";
import bar2 from "img/bar2.png";

class GameHeader {

    gameContext: any;
    headerData: {
        position: {x:number, y: number}; width: number; height: number;
        score: number; time: {m:string, s:string, total:number};
    };
    bar1: HTMLImageElement;
    bar2: HTMLImageElement;
    countChange:boolean;
    curCount:number;

    constructor(x: number, y: number, w: number, h: number, gameContext: any) {
        this.bar1 = new Image();
        this.bar1.src = bar1;

        this.bar2 = new Image();
        this.bar2.src = bar2;

        this.countChange = false;
        this.curCount = 0;
        this.gameContext = gameContext;
        this.headerData = {
            position: {x, y},
            width: w,
            height: h,
            score: 0,
            time: {
                m:'01',
                s:'30',
                total: gameSetValue.GAME_TIME,
            },
        };

    }

    // 게임 헤더 데이터 초기화 함수
    init() {
        this.headerData.score = 0;
        this.headerData.time = { m:'01', s:'30', total: gameSetValue.GAME_TIME };

    }

    setScore(score:number){
        this.headerData.score = score;
    }

    // setTime(time:number){
    //     this.headerData.time = time;
    // }

    countTime(){
        let s = Number(this.headerData.time.s);
        let m = Number(this.headerData.time.m);
        if(s > 0){
            if(s - 1 < 10){
                this.headerData.time.s = '0' + (s - 1).toString();
            }else{
                this.headerData.time.s = (s - 1).toString();
            }
        }else{
            this.headerData.time.s = '59';

            this.headerData.time.m = '0' + (m - 1).toString();

        }
        this.headerData.time.total--;
    }

    // 게임 헤더 정보 업데이트 함수
    update(gameState:number,count:number, gameScore:number){
        this.headerData.score = gameScore;
        if(gameState === 0){

        }
        
        if(gameState === 1 || gameState === 3){
            if(this.headerData.time.total <= 0){
                return true;
            }

            if(!this.countChange){
                this.curCount = count;
                this.countChange =true;
            }
            
            if(this.countChange && this.curCount + 160 < count){
                this.countTime();
            }

        }else if(gameState === 4){

        }else if(gameState === 5){

        }
    }

    // 게임 헤더 랜더 함수
    render(gameState:number) {

        // 점수 txt
        this.gameContext.font = "30px Jua"; //폰트의 크기, 글꼴체 지정      
        this.gameContext.fillStyle = "#3E2D23"; //색상지정
        this.gameContext.fillText(
            '점수 :',
            30,
            40,
        );

        // 점수 number
        this.gameContext.fillText(
            this.headerData.score,
            140,
            40,
        );

        // 시간
        this.gameContext.font = "bold 40px Jua"; //폰트의 크기, 글꼴체 지정      
        this.gameContext.fillStyle = "#007EA5"; //색상지정
        this.gameContext.fillText(
            `${this.headerData.time.m} : ${this.headerData.time.s}`,
            300,
            44,
        );

        

        this.gameContext.drawImage(
            this.bar2,
            458,
            7,
            450,
            50);

        this.gameContext.drawImage(
            this.bar1,
            458,
            8,
            447 * this.headerData.time.total / gameSetValue.GAME_TIME,
            48);

        // var rectX = 440;
        // var rectY = 20;
        // var rectWidth = 300;
        // var rectHeight = 50;
        // var cornerRadius = 60;


        // this.gameContext.lineJoin = "round";
        // this.gameContext.lineWidth = cornerRadius;
        // this.gameContext.beginPath();

        // this.gameContext.strokeStyle = '#333333'; // 선 색
        // this.gameContext.fillStyle = '#333333'; // 채운 사각형 색
        
        // this.gameContext.strokeRect(rectX+(cornerRadius/2), rectY+(cornerRadius/2), rectWidth-cornerRadius, rectHeight-cornerRadius);
        // // this.gameContext.fillRect(rectX+(cornerRadius/2), rectY+(cornerRadius/2), rectWidth-cornerRadius, rectHeight-cornerRadius);

    }
};

export default GameHeader;