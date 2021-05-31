
import {initGameSetValue as gameSetValue} from "../gameSetting";


import speechBubleImg from 'img/speech__buble.png'


class Ani{
    _ani: any[];
    initIteration: number;
    iteration: number;
    path:string;
    nImg:number;
    curIndex: number;
    gameContext: any;
    nextAni: string;
    curAni:string;

    constructor(path: string, nImg: number, iteration:number, curAni:string ,nextAni:string, gameContext:any){
        this._ani = [];                             // animation 프레임 이미지 리스트
        this.initIteration = iteration;             // 반복 횟수 초기값
        this.iteration = iteration;                 // 반복 횟수
        this.path = path;                           // 애니메이션 이미지 루트 경로
        this.nImg = nImg;                           // 프레임 이미지 수
        this.curIndex = 0;                          // 애니메이션 play 시, 현재 프레임
        this.nextAni = nextAni;                     // 현재 애니메이션에 설정된 만큼 횟수 실행 완료시, 다음으로 실행할 애니메이션 상태
        this.curAni = curAni;                       // 현재 애니메이션 상태
        this.gameContext = gameContext;             

        // animation 프레임 이미지 리스트에 이미지 넣기
        for(let i=1; i<=7; i++){
            let imgName = "";
            if(i < 10) imgName = `0${i}`;
            else imgName = i.toString();

            let tmp = new Image();
            tmp.src = `${path}${imgName}.png`;
            this._ani.push(tmp);
        }
    }

    // 애니메이션 초기화 (=반복 횟수 초기화)
    init(){
        this.iteration = this.initIteration;
    }

    // 애니메이션 재생 ( = 화면에 랜더링)
    play(x:number, y:number, width:number, height:number){

        // 재생 중
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
            // 재생 완료 시 => 다음 애니메이션 상태 반환
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
    moleDead2Ani: Ani;
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
    };
    scorePositionData:{
        x:number, y:number
    }
    gameState:number;

    constructor(x: number, y: number, w: number, h: number, id: number, gameContext: any) {
        this.gameContext = gameContext;
        this.gameState = 0;

        // 말풍선 이미지
        this.speechBubbleImg = new Image();
        this.speechBubbleImg.src = speechBubleImg;
        this.speechBubbleData = {
            imgDistance: {x:16, y:-8},
            txtDistance: {x:50, y:17},
        };
        this.scorePositionData = {
            x:40, y:0
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
        
        const randomMole = Math.floor(Math.random()*3 + 1);

        // 애니메이션 상태
        this.aniState = "INIT";
        this.moleInitAni = new Ani(`./ani/mole${randomMole}/init/`, 7, 1, "INIT", "IDLE", this.gameContext);
        this.moleIdleAni = new Ani(`./ani/mole${randomMole}/idle/`, 6, -1, "IDLE", "IDLE",this.gameContext);
        this.moleHitAni = new Ani(`./ani/mole${randomMole}/hit/`, 3, 1, "HIT", "DEAD",this.gameContext);
        this.moleDeadAni = new Ani(`./ani/mole${randomMole}/dead/`, 1, 1, "DEAD", "DEAD2",this.gameContext);
        this.moleDead2Ani = new Ani(`./ani/mole${randomMole}/dead2/`, 1, -1, "DEAD2", "DEAD2",this.gameContext);
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
        else if (this.moleData.problem.length === 3){
            this.speechBubbleData.txtDistance.x = 42;
        }else{
            this.speechBubbleData.txtDistance.x = 35;
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
        this.moleDead2Ani.init();
    }

    // 애니메이션 상태 설정
    setAniState(aniState:string){
        this.initAni();
        this.aniState = aniState;
    }

    // 두저지 정보 업데이트 함수
    update({gameState, isGame, problem, mousePos, isAnswer}
        :{gameState:number, isGame?:boolean, problem?:string, mousePos?:{x:number, y:number}, isAnswer?:boolean}) {

        this.gameState= gameState;
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

                // 이펙트 점수
                this.gameContext.font = "26px Jua";
                // this.gameContext.fillStyle = "rgba(0, 0, 0, 1)";
                this.gameContext.fillStyle = "#ffffff";
                this.gameContext.strokeStyle = "#333333"; //색상지정
                this.gameContext.lineWidth = 5; //색상지정

                let getScore = "";
                if(data.isAnswer){
                    getScore = `+${data.problem.length * 10}`
                }else{
                    getScore = `-${data.problem.length * 5}`
                }

                this.gameContext.strokeText(
                    getScore,
                    data.position.x + this.scorePositionData.x,
                    data.position.y + this.scorePositionData.y
                );

                this.gameContext.fillText(
                    getScore,
                    data.position.x + this.scorePositionData.x,
                    data.position.y + this.scorePositionData.y,
                );

            }

            if(this.aniState === "DEAD"){
                this.aniState = this.moleDeadAni.play(data.position.x, data.position.y, data.width, data.height);
            }

            if(this.aniState === "DEAD2"){
                this.aniState = this.moleDead2Ani.play(data.position.x, data.position.y, data.width, data.height);
            }
            
                // Render speech bubble Img
            if(this.aniState === "IDLE" && this.gameState !== 2){
                this.gameContext.drawImage(
                    this.speechBubbleImg,
                    data.position.x + this.speechBubbleData.imgDistance.x,
                    data.position.y + this.speechBubbleData.imgDistance.y,
                    100,
                    50);

                this.gameContext.font = "20px Jua";
                this.gameContext.fillStyle = "rgba(0, 0, 0, 1)";
                this.gameContext.fillText(
                    this.moleData["problem"],
                    // "ㄱㅁㄷ",
                    // data.position.x + 42,
                    data.position.x + this.speechBubbleData.txtDistance.x,
                    data.position.y + this.speechBubbleData.txtDistance.y
                );
            }
        }
    }
};

export default Mole;