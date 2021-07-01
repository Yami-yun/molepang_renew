import circle from "img/circle.png";
import cross from "img/cross.png";
import {initGameSetValue as setValue} from "../gameSetting";

interface IBoardText{
    position: number[],
    width: number,
    height: number,
    isNext: boolean,
    consonant: string,
    answer: string,
    isCorrectAnswer?: boolean,
    meaning:string,
}


interface IBoard{
    
    gameContext: any,
    boardTextData: IBoardText,
    render(gameState:number):void,

}

class Board implements IBoard{

    gameContext:any;
    boardTextData:IBoardText;
    circleImg: HTMLImageElement;
    crossImg: HTMLImageElement;
    
    constructor(x:number, y:number, w:number, h:number, gameContext:any) {
        this.gameContext = gameContext;
        this.circleImg = new Image();           // 동그라미 이미지
        this.circleImg.src = circle;

        this.crossImg = new Image();            // 엑스 이미지
        this.crossImg.src = cross;

        this.boardTextData = {
            position: [x, y],
            width: w,
            height: h,
            isNext: false,
            consonant: "",          // text on board
            answer: "",
            isCorrectAnswer: false,
            meaning: "",
        };
    }

    // 초기화 함수 => 추후 변경
    init() {

    }

    // 보드에 출력되는 글자수에 따른 위치 조정
    setBoardTextPositionX() {
        if (this.boardTextData["consonant"].length == 1) {
            this.boardTextData["position"][0] = 448;
        }
        else if (this.boardTextData["consonant"].length == 2) {
            this.boardTextData["position"][0] = 424;
        }
        else if (this.boardTextData["consonant"].length == 3) {
            this.boardTextData["position"][0] = 398;
        }
        else {
            this.boardTextData["position"][0] = 374;
        }
    }

    // 보드에 출력되는 스테이지 데이터 설정
    setBoardData({consonant, problem, answer, meaning}:{consonant:string, problem:string, answer:number, meaning:string}) {
        this.boardTextData["consonant"] = consonant;
        this.boardTextData["answer"] = problem[answer];
        this.boardTextData["meaning"] = meaning;


    }

    // Set board text
    setConsonant(consonant:string) {
        this.boardTextData["consonant"] = consonant;
    }

    update({gameState, boardStageData, isCorrectAnswer, count}:
        {gameState:number, boardStageData?:any, isCorrectAnswer?:boolean, count?:number}) {

        if(gameState === -1){
            this.boardTextData["position"][0] = 414;
            this.setConsonant("준 비");
            if(count && 80 < count){
                this.setConsonant("시 작");
            }
        }
        // 라운드 시작
        if (gameState === 0) {
            // 문제 저장
            this.setBoardData(boardStageData);
            this.setBoardTextPositionX();
        }

        // 정답 여부 표시
        if (gameState === 2) {
            this.setConsonant("");
            this.boardTextData.isCorrectAnswer = isCorrectAnswer;
        }

        // 문제에 대한 해설
        if (gameState === 3) {
            this.setConsonant(this.boardTextData.answer);
        }

        if (gameState === 4) {
            
        }


        else if(gameState === 5){
            this.setConsonant("끝");
        }

    }

    render(gameState:number) {

        // gamestate 2일 경우만 o , x 이미지 출력, 아니면 state에 따른 글자 출력
        // this.gameContext.font = "80px Jua"; //폰트의 크기, 글꼴체 지정      
        this.gameContext.font = "65px Jua"; //폰트의 크기, 글꼴체 지정      

        this.gameContext.strokeStyle = "#5F554D"; //색상지정
        this.gameContext.fillStyle = "#3E2D23"; //색상지정
        this.gameContext.lineWidth = 5; //색상지정

        if(gameState === 2) {
            let correctImg = this.boardTextData["isCorrectAnswer"] ? this.circleImg : this.crossImg;
            this.gameContext.drawImage(
                correctImg,
                setValue.BOARD_CIRCLE_CROSS_X,
                setValue.BOARD_CIRCLE_CROSS_Y,
                setValue.BOARD_CIRCLE_CROSS_WIDTH,
                setValue.BOARD_CIRCLE_CROSS_HEIGHT,);

        }else{
            let addX = 0;
            let addY = 0;
            // let endX = 
            if (gameState === 5) {
                addX = 0;
                this.boardTextData["position"][0] = 448;
            }else if(gameState === 3){
                addY =- 18;
            }
            
            this.gameContext.strokeText(this.boardTextData["consonant"], this.boardTextData["position"][0] + addX, this.boardTextData["position"][1] + addY);
            this.gameContext.fillText(
                this.boardTextData["consonant"],
                this.boardTextData["position"][0] + addX,
                this.boardTextData["position"][1] + addY,
            );

            // 46 글자만 하기
            if(gameState === 3){
                this.gameContext.font = "bold 18px Noto Sans"; //폰트의 크기, 글꼴체 지정      
                this.gameContext.fillText(
                    this.boardTextData["meaning"].slice(0, 24),
                    294 + addX,
                    this.boardTextData["position"][1] - addY,
                );

                this.gameContext.fillText(
                    this.boardTextData["meaning"].slice(24),
                    294 + addX,
                    this.boardTextData["position"][1] - 2 * addY + 6,
                );
            }
        }
        

    }
};

export default Board;