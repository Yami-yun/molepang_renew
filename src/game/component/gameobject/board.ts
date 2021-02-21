import circle from "img/circle.png";
import cross from "img/cross.png";

interface IBoardText{
    position: number[],
    width: number,
    height: number,
    isNext: boolean,
    consonant: string,
    answer: string,
    isCorrectAnswer: boolean,
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
        this.circleImg = new Image();
        this.circleImg.src = circle;

        this.crossImg = new Image();
        this.crossImg.src = cross;

        this.boardTextData = {
            position: [x, y],
            width: w,
            height: h,
            isNext: false,
            consonant: "",          // text on board
            answer: "",
            isCorrectAnswer: false,
        };
    }

    init() {
    }

    setBoardTextPositionX() {
        if (this.boardTextData["consonant"].length == 1) {
            this.boardTextData["position"][0] = 455;
        }
        else if (this.boardTextData["consonant"].length == 2) {
            this.boardTextData["position"][0] = 420;
        }
        else {
            this.boardTextData["position"][0] = 385;
        }
    }

    setBoardData({consonant, problem, answer}:{consonant:string, problem:string, answer:number}) {
        this.boardTextData["consonant"] = consonant;
        this.boardTextData["answer"] = problem[answer];
    }

    // Set board text
    setConsonant(consonant:string) {
        this.boardTextData["consonant"] = consonant;
    }

    update({gameState, boardStageData, isCorrectAnswer}:
        {gameState:number, boardStageData?:any, isCorrectAnswer?:boolean}) {

        // set board data on init state
        if (gameState === 0) {
            // 문제 저장
            this.setBoardData(boardStageData);
            // console.log(boardStageData);
            this.setBoardTextPositionX();
        }


        if (gameState === 2) {
            this.setConsonant("");
            if(isCorrectAnswer) this.boardTextData.isCorrectAnswer = isCorrectAnswer;
            console.log(this.boardTextData.isCorrectAnswer);

        }

        if (gameState === 3) {
            this.setConsonant(this.boardTextData.answer);
        }

        if (gameState === 4) {
            
        }


        if(gameState === 5){
            this.setConsonant("끝");
        }

    }

    render(gameState:number) {
        if (gameState !== 2) {
            let addX = 0;
            if (gameState === 5) {
                addX = 70;
            }
            
            this.gameContext.font = "80px Jua"; //폰트의 크기, 글꼴체 지정      
            this.gameContext.fillStyle = "rgba(0, 0, 0, 0.7)"; //색상지정
            this.gameContext.fillText(
                this.boardTextData["consonant"],
                this.boardTextData["position"][0] + addX,
                this.boardTextData["position"][1]
            );
        }
        else {
            let correctImg = this.boardTextData["isCorrectAnswer"] ? this.circleImg : this.crossImg;
            this.gameContext.drawImage(
                correctImg,
                420,
                135,
                130,
                130);
        }

    }
};

export default Board;