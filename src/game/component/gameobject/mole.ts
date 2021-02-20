import mole from "img/mole.png";
// import speechBubble from "../../Img/exampleMark.png";
// import deadMole from "../../Img/deadMole.png";
import {initGameSetValue as gameSetValue} from "../gameSetting";

import speechBubleImg from'img/speech__buble.png'

class Mole {
    moleImg: HTMLImageElement;
    speechBubbleImg: HTMLImageElement;
    gameContext: any;
    moleData: {
        id: number; position: {x:number, y: number}; width: number; height: number;
        // 0 : no is Game  1 : answer, 2 : no answer
        isAnswer: boolean; problem: string; isGame: boolean; isClicked: boolean;
    };
    speechBubbleData:{
        imgDistance:{x:number, y:number},
        txtDistance:{x:number, y:number},
    }

    constructor(x: number, y: number, w: number, h: number, id: number, gameContext: any) {
        this.moleImg = new Image();
        this.moleImg.src = mole;
        this.speechBubbleImg = new Image();
        this.speechBubbleImg.src = speechBubleImg;

        this.gameContext = gameContext;
        this.moleData = {
            id: id,
            position: {x, y},
            width: w,
            height: h,
            // 0 : no is Game  1 : answer, 2 : no answer
            isAnswer: false,
            problem: "안단단",
            isGame: false,
            isClicked: false,
        };

        this.speechBubbleData = {
            imgDistance: {x:-10, y:-50},
            txtDistance: {x:25, y:-25},
        };
    }

    init() {
        this.moleData.problem = "";
        this.moleData.isAnswer = false;
        this.moleData.isGame = false;
        this.moleData.isClicked = false;

    }

    setSpeechBubbleTxtPositionX() {
        if (this.moleData.problem.length === 1) {
            this.speechBubbleData.txtDistance.x = 32;
        }
        else if (this.moleData.problem.length === 2) {
            this.speechBubbleData.txtDistance.x = 24;
        }
        else {
            this.speechBubbleData.txtDistance.x = 16;
        }
    }

    setIsGame(isGame:boolean){
        this.moleData.isGame = isGame;
    }

    setProblem(problem:string){
        this.moleData.problem = problem;
    }

    setIsAnswer(isAnswer:boolean){
        this.moleData.isAnswer = isAnswer;
    }

    update({gameState, isGame, problem, mousePos, isAnswer}
        :{gameState:number, isGame?:boolean, problem?:string, mousePos?:{x:number, y:number}, isAnswer?:boolean}) {

        if(gameState === 0){
            this.init();
            console.log("test222222");
            console.log(this.moleData.id, this.moleData.isGame);
            if(isGame) this.setIsGame(isGame);
            if(problem) {
                this.setProblem(problem);
                this.setSpeechBubbleTxtPositionX();
            }
            if(isAnswer) this.setIsAnswer(isAnswer);
            

        }
        
        if(gameState === 1){
            if(mousePos){
                let data = this.moleData;
                if(data.position.x < mousePos.x && data.position.y < mousePos.y &&
                data.position.x + data.width > mousePos.x && data.position.y + data.height > mousePos.y){
                    data.isClicked = true;
                    // console.log("-------------------------------------------")
                    // console.log(data.problem + " hit!");
                    // console.log("1. MOUSE : " + JSON.stringify(mousePos));
                    // console.log("2. IMG_F : " + data.isClicked);
                    // console.log("-------------------------------------------");

                    return data.isAnswer;
                }else{
                    console.log("-------------------------------------------")
                    // console.log("No hit!");
                    // console.log("1. MOUSE : " + JSON.stringify(mousePos));

                }
            }
        }else if(gameState === 2){

        }else{

        }
    }

    render() {
        if(this.moleData.isGame){
            const data = this.moleData;
            this.gameContext.drawImage(
                // this.moleData["isClicked"] ? this.deadMoleImg : this.moleImg,
                this.moleImg,
                data.position.x,
                data.position.y,
                data.width,
                data.height);

                // Render speech bubble Img
            this.gameContext.drawImage(
                this.speechBubbleImg,
                data.position.x + this.speechBubbleData.imgDistance.x,
                data.position.y + this.speechBubbleData.imgDistance.y,
                100,
                50);

            // Render speech buble text
            this.gameContext.font = "20px Jua";
            this.gameContext.fillStyle = "rgba(0, 0, 0, 1)";
            this.gameContext.fillText(
                this.moleData["problem"],
                data.position.x + this.speechBubbleData.txtDistance.x,
                data.position.y + this.speechBubbleData.txtDistance.y
            );
        }

    }
};

export default Mole;