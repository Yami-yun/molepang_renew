import mole from "img/mole.png";
// import speechBubble from "../../Img/exampleMark.png";
// import deadMole from "../../Img/deadMole.png";
import {initGameSetValue as gameSetValue} from "../gameSetting";


import speechBubleImg from 'img/speech__buble.png'


class Ani{
    _ani: any[];
    initIteration: number;
    iteration: number;
    path:string;
    nImg:number;
    isPlay: boolean;
    curIndex: number;
    gameContext: any;
    nextAni: string;
    curAni:string;
    test2 : HTMLImageElement;

    constructor(path: string, nImg: number, iteration:number, curAni:string ,nextAni:string, gameContext:any){
        this._ani = [];
        this.initIteration = iteration;
        this.iteration = iteration;
        this.path = path;
        this.nImg = nImg; 
        this.isPlay = false;
        this.curIndex = 0;
        this.nextAni = nextAni;
        this.curAni = curAni;
        this.gameContext = gameContext;
        this.test2 = new Image();
        this.test2.src = '/img/ani/mole/03.png';
        // console.log(this.test2);

        for(let i=1; i<=7; i++){
            let imgName = "";
            if(i < 10) imgName = `0${i}`;
            else imgName = i.toString();

            let test = new Image();
            test.src = `${path}${imgName}.png`;
            this._ani.push(test);
        }

    }

    init(){
        this.iteration = this.initIteration;
    }

    play(x:number, y:number, width:number, height:number){
        if(this.iteration >= 1 || this.iteration === -1){
            this.gameContext.drawImage(
                // this.test2,
                this._ani[this.curIndex++],
                x,
                y,
                width,
                height);

            // 애니메이션이 한싸이클이 다 돌았다면
            if(this.nImg <= this.curIndex){
                if(this.iteration !== -1){
                    //무한 반복이 아닐때
                    this.iteration--;
                }
                this.curIndex = 0;
            }
            return this.curAni;
        }else{
            return this.nextAni;
        }
        
    }

    set index(_index:number){
        this.curIndex = _index;
    }

    get length(){
        return this.ani.length;
    }

    get ani(){
        return this._ani;
    }
    
}


class Mole {

    moleInitAni: Ani;
    moleIdleAni: Ani;
    moleHitAni: Ani;
    moleDeadAni: Ani;
    aniState: string;

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
        this.gameContext = gameContext;

        this.speechBubbleImg = new Image();
        this.speechBubbleImg.src = speechBubleImg;
        this.speechBubbleData = {
            imgDistance: {x:16, y:-8},
            txtDistance: {x:50, y:17},
        };
        
        this.moleData = {
            id: id,
            position: {x, y},
            width: w,
            height: h,
            // 0 : no is Game  1 : answer, 2 : no answer
            isAnswer: false,
            problem: "안단",
            isGame: false,
            isClicked: false,
        };

        this.aniState = "INIT";
        this.moleInitAni = new Ani('/ani/mole/init/', 7, 1, "INIT", "IDLE", this.gameContext);
        this.moleIdleAni = new Ani('/ani/mole/idle/', 6, -1, "IDLE", "IDLE",this.gameContext);
        this.moleHitAni = new Ani('/ani/mole/hit/', 3, 1, "HIT", "DEAD",this.gameContext);
        this.moleDeadAni = new Ani('/ani/mole/dead/', 1, -1, "DEAD", "DEAD",this.gameContext);
    }

    // 두더지 데이터 초기화 함수
    init() {
        this.moleData.problem = "";
        this.moleData.isAnswer = false;
        this.moleData.isGame = false;
        this.moleData.isClicked = false;
        this.setAniState("INIT");
    }

    // 두더지 머리 위 말풍선 단어 따른 배치 설정 함수
    setSpeechBubbleTxtPositionX() {
        if (this.moleData.problem.length === 1) {
            this.speechBubbleData.txtDistance.x = 57;
        }
        else if (this.moleData.problem.length === 2) {
            this.speechBubbleData.txtDistance.x = 50;
        }
        else {
            this.speechBubbleData.txtDistance.x = 43;
        }
    }

    // 현재 라운드 두더지가 보여질지 여부
    setIsGame(isGame:boolean){
        this.moleData.isGame = isGame;
    }

    // 두더지 말풍선 설정
    setProblem(problem:string){
        this.moleData.problem = problem;
    }

    // 두더지 정답 여부 설정
    setIsAnswer(isAnswer:boolean){
        this.moleData.isAnswer = isAnswer;
    }

    // 애니메이션 기본값 초기화
    initAni(){
        this.moleInitAni.init();
        this.moleIdleAni.init();
        this.moleHitAni.init();
        this.moleDeadAni.init();
    }

    // 애니메이션 상태 설정
    setAniState(aniState:string){
        this.initAni();
        this.aniState = aniState;
    }

    // 두저지 정보 업데이트 함수
    update({gameState, isGame, problem, mousePos, isAnswer}
        :{gameState:number, isGame?:boolean, problem?:string, mousePos?:{x:number, y:number}, isAnswer?:boolean}) {
            
        // 라운드 시작
        if(gameState === 0){
            this.init();

            if(isGame) this.setIsGame(isGame);
            if(problem) {
                this.setProblem(problem);
                this.setSpeechBubbleTxtPositionX();
            }
            if(isAnswer) this.setIsAnswer(isAnswer);
        }
        
        if(gameState === 1){
            // 문제 푸는 중, 마우스 클릭 여부 확인
            if(mousePos){
                let data = this.moleData;

                // 마우스가 두더지 객체를 클릭했을 때, 해당 두더지 정답 정보 반환
                if(this.moleData.isGame && data.position.x < mousePos.x && data.position.y < mousePos.y &&
                data.position.x + data.width > mousePos.x && data.position.y + data.height > mousePos.y){
                    data.isClicked = true;
                    this.setAniState("HIT");

                    return data.isAnswer;
                }else{

                }
            }

        }else if(gameState === 4){
            // 다음 스테이지, 문제 초기화
            this.init();

        }else if(gameState === 5){
            // 게임 END
        }
    }


    // 두더지 랜더 함수
    render() {
        if(this.moleData.isGame){

            const data = this.moleData;

            if(this.aniState === "INIT"){
                this.aniState = this.moleInitAni.play(data.position.x, data.position.y, data.width, data.height);
            }
            
            if(this.aniState === "IDLE"){
                this.aniState = this.moleIdleAni.play(data.position.x, data.position.y, data.width, data.height);
            }
            
            if(this.aniState === "HIT"){
                this.aniState = this.moleHitAni.play(data.position.x, data.position.y, data.width, data.height);
            }

            if(this.aniState === "DEAD"){
                this.aniState = this.moleDeadAni.play(data.position.x, data.position.y, data.width, data.height);
            }
            
                // Render speech bubble Img
            if(this.aniState !== "INIT"){
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
    }
};

export default Mole;