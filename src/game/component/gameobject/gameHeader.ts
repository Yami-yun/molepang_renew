
import {initGameSetValue as gameSetValue} from "../gameSetting";
import progressBar from "img/progress_bar.png";
import scoreBoard from "img/score_board.png";

class GameHeader {

    gameContext: any;
    headerData: {
        position: {x:number, y: number}; width: number; height: number;
        score: number; time: {m:string, s:string, total:number};
    };
    progressBar: HTMLImageElement;
    scoreBoard: HTMLImageElement;
    countChange:boolean;
    curCount:number;

    constructor(x: number, y: number, w: number, h: number, gameContext: any) {
        this.progressBar = new Image();
        this.progressBar.src = progressBar;

        this.scoreBoard = new Image();
        this.scoreBoard.src = scoreBoard;

        this.countChange = false;
        this.curCount = 0;
        this.gameContext = gameContext;

        let _min = Math.floor(gameSetValue.GAME_TIME/60);
        let min = _min < 10 ? `0${_min}` : `${_min}`;

        let _sec = gameSetValue.GAME_TIME%60;
        let sec = _sec < 10 ? `0${_sec}` : `${_sec}`;

        this.headerData = {
            position: {x, y},
            width: w,
            height: h,
            score: 0,
            time: {
                m:`${min}`,
                s:`${sec}`,
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

        
        if(gameState === 1 || gameState === 0 || gameState === 4){
            console.log(`isChange : ${this.countChange} curCount : ${this.curCount + 60} count : ${count}`);
            if(this.headerData.time.total <= 0){
                return true;
            }

            if(!this.countChange){
                this.curCount = count;
                this.countChange = true;
            }
            
            if(this.countChange && this.curCount + 60 < count){
                this.countTime();
                this.countChange = false;
            }

        }
    }

    // 게임 헤더 랜더 함수
    render(gameState:number) {

        // 점수 txt
        this.gameContext.font = "30px Jua"; //폰트의 크기, 글꼴체 지정      
        this.gameContext.fillStyle = "#3E2D23"; //색상지정
        this.gameContext.fillText(
            '점수 :',
            32,
            40 + this.headerData.position.y,
        );

        // 점수 배경 이미지
        this.gameContext.drawImage(
            this.scoreBoard,
            114,
            8 +  this.headerData.position.y,
            156,
            42);
        

        // 점수 number
        this.gameContext.font = "bold 36px Jua"; //폰트의 크기, 글꼴체 지정 
        this.gameContext.fillText(
            this.headerData.score,
            177,
            42 + this.headerData.position.y,
        );

        // 시간
        this.gameContext.font = "bold 40px Jua"; //폰트의 크기, 글꼴체 지정      
        this.gameContext.fillStyle = "#007EA5"; //색상지정
        this.gameContext.fillText(
            `${this.headerData.time.m} : ${this.headerData.time.s}`,
            300,
            44 + this.headerData.position.y,
        );

        // 게임 진행 프로그래스바
        this.gameContext.drawImage(
            this.progressBar,
            467,
            10 +  this.headerData.position.y,
            460,
            42);

        this.gameContext.fillStyle = "#00C0FF";
        this.gameContext.fillRect(472, 15 + this.headerData.position.y, 450 * this.headerData.time.total / gameSetValue.GAME_TIME, 31.7);

    }
};

export default GameHeader;