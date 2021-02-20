import { useEffect, useRef } from "react";
import Mole from './gameobject/mole';
import {initGameSetValue as gameSetValue} from "./gameSetting";
import background from "img/background.png"
import Board from "game/component/gameobject/board";

const gameStageData = [
    {
        stage: 1,
        consonant: "ㄱㅁㅎ",
        problem: ["곰마하", "곤마히", "가만히"],
        answer: 2,
    },
    {
        stage: 2,
        consonant: "ㄱㅂ",
        problem: ["기빈", "가방", "구번", "고본"],
        answer: 1,
    },

    {
        stage: 3,
        consonant: "ㄲ",
        problem: ["낄", "꼴", "꿀", "깡"],
        answer: 2,
    },
    {
        stage: 4,
        consonant: "ㄱㄹㄱ",
        problem: ["기러기", "곰돌이", "팽팽이", "흰둥이"],
        answer: 0,
    },
    {
        stage: 3,
        consonant: "ㅅㅅㅅ",
        problem: ["샤사샥", "솔방울", "숭실대", "뭘봐요"],
        answer: 0,
    },

];

// Any value is put in nine moles, and only a mole with a maximum value of three to four of them is selected and shown in the current round.
// 9개의 두더지에 임의 값을 넣고, 그 중 최대 값 3~ 4 개인 두더지만 뽑아서 현 스테이지에 보여준다. => 스테이지에 보여줄 두더지를 선정한다.
const setMoleIsGame = (moleNum:number) => {
    let randomValueList = [];        // Random value list of 1~9 mole for showing moles (보여질 두더지를 뽑기 위한 각 두더지의 랜덤값리스트) 
    const numMole = moleNum;        // Show Mole number (현 스테이지에 보여질 두더지 수)
    let isGameMoleList = [];         // show Mole id on current stage (현 스테이지에 보여질 두더지 id)

    let randomState = Math.floor(Math.random() * 2);    // 0 : x자로 두더지 생성 , 1 : +로 두더지 생성
    // set randomValueList 0 ~ 999
    for (let i = 0; i < 9; i++) {
        randomValueList.push(Math.floor(Math.random() * 1000));
    }

    // select top 3~4 mole
    let preMax = 1000;
    for (let r = 0; r < numMole; r++) {
        let max = 0;
        for (let n = 0 + randomState; n < 9; n += 2) {
            if (max < randomValueList[n] && randomValueList[n] < preMax) {
                max = randomValueList[n];
                isGameMoleList[r] = n;
            }
        }
        preMax = max;
    }

    return isGameMoleList;
}

function GamePlay(){

    const gameCanvasRef = useRef<HTMLCanvasElement | null>(null);
    let gameCanvas:any = null;
    let gameContext:any = null;
    let moles: Mole[] = [];
    let count = 0;
    let frame = 32;
    let curStage = 0;
    let gameState = 0;
    let isCorrectAnswer = false;
    let correctWord:string[] = [];
    let incorrectWord:string[] = [];
    let answerNum = 0;
    let problemList:string[] = [];
    // const count = useRef<number>(0);

    let board:(Board | null) = null;

    const gameController = () => {
        // Create Update(calculate & function) Area
        if (count % frame === 0) {
            const moleNum = gameStageData[curStage].problem.length;
            
            // Stage Start
            if(gameState === 0){
                // 스타트 문구
                
                answerNum = gameStageData[curStage].answer;     // 현재 스테이지 정답 번호
                problemList = gameStageData[curStage].problem;  // 현재 스테이지 문제 리스트
                const curMoleList = setMoleIsGame(moleNum);     // 현재 스테이지 출현할 두더지 리스트
                console.log(curMoleList);

                board?.update({gameState, boardStageData:gameStageData[curStage]});
                curMoleList.forEach((value:number, index:number) => {
                    moles[value].update({gameState, isGame:true, problem:problemList[index], isAnswer:(answerNum === index)});
                });

                gameState += 1;

            }
            
            else if(gameState === 1){
                // 문제 제출
                gameCanvas.addEventListener("click", function (e:any) {
                    let numStageClear:(boolean | undefined)[] = [];
                    moles.forEach((element:Mole) => {
                        // numStageClear = element.update({ gameState: gameState, mousePos: { x: e.layerX, y: e.layerY } });
                        numStageClear.push(element.update({ gameState: gameState, mousePos: { x: e.layerX, y: e.layerY } }));
                    })
                    // correct answer
                    if (numStageClear.includes(true)) {
                        
                        
                        gameState = 2;
                        isCorrectAnswer = true;
                        correctWord.push(problemList[answerNum]);
                        console.log("Yes!!!");
                    }
                    // no correct answer
                    else if (numStageClear.includes(false)) {
                        gameState = 2;
                        isCorrectAnswer = false;
                        incorrectWord.push(problemList[answerNum]);
                        console.log("No!!!");
                    }
    
                });
                
            }
            
            else if(gameState === 2){
                // 문제 정답여부
                console.log(isCorrectAnswer);
                board?.update({gameState ,isCorrectAnswer});

                

                setTimeout(()=>{
                    gameState = 0;
                    curStage += 1;
                },2000);
                

            }
            
            if(gameState === 3){
                // 게임 엔드
            }
    
        }
    
        // Create Render Area
        if (count % frame === 0) {
            gameContext.clearRect(0, 0, gameSetValue.GAME_W, gameSetValue.GAME_H);
    
            moles.forEach((element:Mole) => {
                // element.setIsGame(true);
                element.render();
            });

            if(board) board.render(gameState);

        }
    
        count += 1;
        return window.requestAnimationFrame(gameController);
    
    }

    

    const setInitMole = () => {

        // 207 , 74
        // (234,279) (442,279) (649,279)   - 207
        // (234,353) (442,353) (649,353)   - 207
        // (234,427) (442,427) (649,427)   - 207

        for (let y = 0; y < 3; y++) {
            for (let x = 0; x < 3; x++)

                moles.push(new Mole(
                    gameSetValue.FIRST_MOLE_X + gameSetValue.MOLE_INTERVAL_X * x,
                    gameSetValue.FIRST_MOLE_Y + gameSetValue.MOLE_INTERVAL_Y * y,
                    gameSetValue.MOLE_IMG_WIDTH,
                    gameSetValue.MOLE_IMG_HEIGHT,
                    x + 3 * y,
                    gameContext)
                );
        }

        // gBoardText = new BoardText(gameSetValue.BOARD_X, gameSetValue.BOARD_Y,
        //     gameSetValue.BOARD_WIDTH, gameSetValue.BOARD_HEIGHT, gameContext);
        // gameScreenHeader = new GameScreenHeader(gameContext);
    };

    useEffect(() => {
        if(gameCanvasRef) gameCanvas = gameCanvasRef.current;
        gameContext = gameCanvas.getContext('2d');

        setInitMole();
        board = new Board(gameSetValue.BOARD_X, gameSetValue.BOARD_Y,
            gameSetValue.BOARD_WIDTH, gameSetValue.BOARD_HEIGHT, gameContext);
        let t = window.requestAnimationFrame(gameController);
    })

    return (
    <canvas style={{backgroundImage:`url(${background})`}} ref={gameCanvasRef} width={960} height={600}>

    </canvas>);
}
export default GamePlay;