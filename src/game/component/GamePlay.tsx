import { useEffect, useRef } from "react";
import Mole from './gameobject/mole';
import {initGameSetValue as gameSetValue} from "./gameSetting";
import Board from "game/component/gameobject/board";
import GameHeader from "game/component/gameobject/gameHeader";
import Background from "game/component/gameobject/background";
import { useDispatch, useSelector } from "react-redux";
import { CHANGE_GAME_SCREEN, SET_GAME_RESULT } from "redux/action/types";

import 'css/default.css';
import 'css/game/GamePlay.css';
import { getProblem } from "redux/action/gameAction";
import { IGameData } from "redux/reducer/gameReducer";

// const gameStageData = [
//     {
//         stage: 1,
//         consonant: "ㄱㅁㅎ",
//         problem: ["곰마하", "곤마히", "가만히"],
//         answer: 2,
//     },
//     {
//         stage: 2,
//         consonant: "ㄱㅂ",
//         problem: ["기빈", "가방", "구번", "고본"],
//         answer: 1,
//     },

//     {
//         stage: 3,
//         consonant: "ㄲ",
//         problem: ["낄", "꼴", "꿀", "깡"],
//         answer: 2,
//     },
//     {
//         stage: 4,
//         consonant: "ㄱㄹㄱ",
//         problem: ["기러기", "곰돌이", "팽팽이", "흰둥이"],
//         answer: 0,
//     },
//     {
//         stage: 3,
//         consonant: "ㅅㅅㅅ",
//         problem: ["샤사샥", "솔방울", "숭실대", "뭘봐요"],
//         answer: 0,
//     },

// ];

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

// 게임 플레이 화면 컴포넌트
function GamePlay(){

    const gameCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const backgroundMusicRef = useRef<HTMLAudioElement | null>(null);
    const readyMusicRef = useRef<HTMLAudioElement | null>(null);
    const startMusicRef = useRef<HTMLAudioElement | null>(null);
    const gameEndMusicRef = useRef<HTMLAudioElement | null>(null);
    const hammerMusicRef = useRef<HTMLAudioElement | null>(null);
    const incorrectMusicRef = useRef<HTMLAudioElement | null>(null);
    const correctMusicRef = useRef<HTMLAudioElement | null>(null);

    let gameCanvas:any = null;
    let gameContext:any = null;

    const dispatch = useDispatch();
    const gameStageData:IGameData["problemData"] = useSelector((state:any) => state.game.problemData);

    let count = 0;                      // 게임 프레임 count
    let frame = gameSetValue.GAME_FRAME;                     // 게임 프레임
    let curStage = 0;                   // 현재 스테이지
    let gameState = -1;                  // 한 스테이지 내의 게임 진행 단계
    let isCorrectAnswer = false;        // 정답 여부
    let correctWord:string[] = [];      // 맞은 단어 리스트
    let incorrectWord:string[] = [];    // 틀린 단어 리스트
    let answerNum = 0;                  // 현재 스테이지 정답 번호
    let problemList:string[] = [];      // 현재 스테이지 문제 리스트
    let delayStart = 0;                 // 딜레이 시작 카운트

    let moles: Mole[] = [];             // 두더지 객체 리스트
    let board:(Board | null) = null;
    let gameHeader:(GameHeader | null) = null;
    let background:(Background | null) = null;
    
    let gameScore = gameSetValue.GAME_SCORE;

    // 게임 컨트롤러
    const gameController = () => {
        
        if (count % frame === 0) {
            const moleNum = gameStageData.data[curStage]?.problem.length;

            if(gameHeader?.update(gameState,count, gameScore)){
                delayStart = count;
                // 시간이 다되어서 게임 오버
                console.log("GAME OVVER !!!!!!!!!!!!!!!!!!!");
                gameState = 5;
            }

            // 게임 초기 시작, 준비/ 시작 문구 출력 state
            if(gameState === -1){
                
                // 준비
                if(readyMusicRef.current) readyMusicRef.current.play();
                board?.update({gameState, count});

                // 시작
                if(delayStart + 100 < count){
                    if(startMusicRef.current) startMusicRef.current.play();
                    if(backgroundMusicRef.current) backgroundMusicRef.current.play();

                }
                // 1~2초 후에 게임 시작
                if(delayStart + 120 < count){
                    delayStart = count;
                    gameState = 0;
                }
            }
            
            // Stage Start state, 각 스테이지 관련된 문제 데이터를 두더지와 보드에 업데이트함
            if(gameState === 0){
                // 스타트 문구
                
                answerNum = gameStageData.data[curStage].answer;     // 현재 스테이지 정답 번호
                problemList = gameStageData.data[curStage].problem;  // 현재 스테이지 문제 리스트
                const curMoleList = setMoleIsGame(moleNum);     // 현재 스테이지 출현할 두더지 리스트

                // 보드 업데이트
                board?.update({gameState, boardStageData:gameStageData.data[curStage]});

                // 현재 스테이지에 출현하는 두더지 객체에게만 해당 스테이지 문제 데이터 전달
                curMoleList.forEach((value:number, index:number) => {
                    moles[value].update({gameState, isGame:true, problem:problemList[index], isAnswer:(answerNum === index)});
                });

                gameState += 1;

            }
            
            // 두더지 클릭 여부 확인 state
            else if(gameState === 1){
                // 유저가 클릭한 두더지 여부에 따른 정답 파악
                gameCanvas.addEventListener("click", function (e:any) {
                    let numStageClear:(boolean | undefined)[] = [];

                    if(hammerMusicRef.current) hammerMusicRef.current.play();

                    // 클릭한 두더지의 문제에 대한 정답 여부 받아오기
                    // 클릭하면 마우스 좌표와 해당 두더지 객체의 border 영역을 비교함
                    // border 내부에 클릭 시, 해당 두더지가 갖고 있는 정답 여부 반환
                    // ex) 클릭 => 9개 중 해당 스테이지 참가한 두더지의 클릭여부 확인 => 클릭한 두더지의 정답 데이터 반환 
                    // => [undefined, undefined, undefined, undefined, undefined, undefined, undefined, true, undefined]
                    moles.forEach((element:Mole) => {
                        numStageClear.push(element.update({ gameState: gameState, mousePos: { x: e.layerX, y: e.layerY } }));
                    })

                    // 리스트에 true가 있을 경우 => correct answer
                    if (numStageClear.includes(true)) {
                        gameState = 2;
                        isCorrectAnswer = true;
                        correctWord.push(problemList[answerNum]);
                        delayStart = count;
                        gameScore += 10 * problemList[answerNum].length;
                        numStageClear = [];
                        console.log("Yes!!!");

                        if(correctMusicRef.current) correctMusicRef.current.play();

                    }
                    // 리스트에 false가 있을 경우 => no correct answer
                    else if (numStageClear.includes(false)) {
                        gameState = 2;
                        isCorrectAnswer = false;
                        incorrectWord.push(problemList[answerNum]);
                        delayStart = count;
                        gameScore -= 5 * problemList[answerNum].length;
                        if(gameScore < 0) gameScore = 0;
                        numStageClear = [];
                        console.log("No!!!");

                        if(incorrectMusicRef.current) incorrectMusicRef.current.play();

                    }

                    // 두더지가 없는 공간 클릭 시, gameState =1 유지
    
                });
                
            }
            
            // 정답 여부 출력 state
            else if(gameState === 2){
                // 문제 정답여부를 칠판해 표시
                board?.update({gameState ,isCorrectAnswer});

                // 2초 후에 state 변경 ( = 정답 여부를 2초동안 화면에 표시)
                if(delayStart + 100 < count){
                    delayStart = count;
                    gameState = 3;
                }
            }
            
            // 문제 해설 출력 state
            else if(gameState === 3){
                board?.update({gameState});

                // 2초 후에 state 변경 ( = 정답 여부를 2초동안 화면에 표시)
                if(delayStart + 80 < count){
                    delayStart = count;
                    gameState = 4;
                }
            }
            
            // 다음 스테이지를 위한 초기화 state
            else if(gameState === 4){
                // 다음 스테이지,
                // moles data 초기화
                moles.forEach((element:Mole) => {
                    element.update({gameState});
                });
                board?.update({gameState});
                gameHeader?.initCount();
                count = 0;
                curStage+=1;
                gameState=0;

                if(!gameStageData.data[curStage]?.problem){
                    gameState= 5;
                }
            }
            
            // 시간 오버 문구 출력 및 결과 데이터 저장 state
            else if(gameState === 5){
                board?.update({gameState});
                if(backgroundMusicRef.current) {
                    backgroundMusicRef.current.pause();
                }
                
                if(gameEndMusicRef.current) gameEndMusicRef.current.play();
                
                if(delayStart + 50 < count){

                    
                    delayStart = count;
                    const data = {
                        score: gameScore,
                        correctWord,
                        incorrectWord,
                    }
                    dispatch({type:CHANGE_GAME_SCREEN, payload: 4});
                    dispatch({type:SET_GAME_RESULT, payload: data});
                    cancelAnimationFrame(ttt.current);
                    console.log("GAME END###########");
                    return;
                }
            }
    
        }
    
        // Create Render Area
        if (count % frame === 0) {
            gameContext.clearRect(0, 0, gameSetValue.GAME_W, gameSetValue.GAME_H);

            gameHeader?.render(gameState);
            background?.render();

            board?.render(gameState);

            moles.forEach((element:Mole) => {
                element.render();
            });

        }

        count += 1;
        return window.requestAnimationFrame(gameController);
    }

    // 두더지 객체 리스트에 생성
    const setInitMole = () => {
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
    };

    const ttt = useRef(0);

    useEffect(() => {
        // let music = new Audio("/sound/game__end__music.wav");
        let music = new Audio(`${process.env.PUBLIC_URL}/sound/background__music.mp3`);
        // music.loop = true;
        backgroundMusicRef.current = music;

        let ready_music = new Audio(`${process.env.PUBLIC_URL}/sound/ready__music.mp3`);
        readyMusicRef.current = ready_music;

        let start_music = new Audio(`${process.env.PUBLIC_URL}/sound/start__music.mp3`);
        startMusicRef.current = start_music;        

        let incorrect_music = new Audio(`${process.env.PUBLIC_URL}/sound/incorrect__music.mp3`);
        incorrectMusicRef.current = incorrect_music;

        let game__end_music = new Audio(`${process.env.PUBLIC_URL}/sound/game__end__music.wav`);
        gameEndMusicRef.current = game__end_music;

        let hammer__music = new Audio(`${process.env.PUBLIC_URL}/sound/hammer__music.mp3`);
        hammerMusicRef.current = hammer__music;

        let correct_music = new Audio(`${process.env.PUBLIC_URL}/sound/correct__music.mp3`);
        correctMusicRef.current = correct_music;

        return () => {
            cancelAnimationFrame(ttt.current);
            if(backgroundMusicRef.current) backgroundMusicRef.current.pause();
        }
    }, [])

    useEffect(() => {

        if(gameCanvasRef && !gameStageData.isloading && !gameStageData.err && gameStageData.data.length){
            gameCanvas = gameCanvasRef.current;
            gameContext = gameCanvas.getContext('2d');

            setInitMole();
            board = new Board(gameSetValue.BOARD_X, gameSetValue.BOARD_Y,
                gameSetValue.BOARD_WIDTH, gameSetValue.BOARD_HEIGHT, gameContext);

            gameHeader = new GameHeader(gameSetValue.GAME_SCREEN_HEADER_X, gameSetValue.GAME_SCREEN_HEADER_Y,
                gameSetValue.GAME_SCREEN_HEADER_WIDTH, gameSetValue.GAME_SCREEN_HEADER_HEIGHT, gameContext);

            background = new Background(32, 56, 864, 480, gameContext);
            ttt.current = window.requestAnimationFrame(gameController);
        }

    }, [gameStageData]);

    return (
        <>
    <canvas className={'ingame__screen'} ref={gameCanvasRef} width={gameSetValue.GAME_W} height={gameSetValue.GAME_H}></canvas>);
    
    </>)
}
export default GamePlay;