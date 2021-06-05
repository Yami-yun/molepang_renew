import React, { useEffect, useRef } from 'react';
import 'css/default.css';
import 'css/game/GameMenu.css';
import btn1 from 'img/menu/game__menu__button1.png';
import btn2 from 'img/menu/game__menu__button2.png';
import btn3 from 'img/menu/game__menu__button3.png';
import pole from 'img/menu/phy_01.png';

import { useDispatch } from 'react-redux';
import { CHANGE_GAME_SCREEN } from 'redux/action/types';
import mole1 from "menu/01.png";
import mole2 from "menu/02.png";
import { getProblem, getTopTenRank } from 'redux/action/gameAction';



// 게임 초기 메뉴 컴포넌트
function GameMenu(){
    const dispatch = useDispatch();
    const onGameScreenHandler = (nScreen:number) => {
        dispatch({type:CHANGE_GAME_SCREEN, payload:nScreen});
    }
    const ref = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        let getTopTenRankApi = getTopTenRank();
        getTopTenRankApi(dispatch);
        
    }, [])

    const isFirtAniMole = useRef(true);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    let context:any = null;
    let count = 0;
    let isFirstImg = 0;

    
    const _mole1 = new Image();
    _mole1.src = "menu/01.png";

    const _mole2 = new Image();
    _mole2.src = "menu/02.png";

    const _mole3 = new Image();
    _mole3.src = "menu/03.png";

    const _mole4 = new Image();
    _mole4.src = "menu/04.png";

    const _mole5 = new Image();
    _mole5.src = "menu/05.png";

    const _mole6 = new Image();
    _mole6.src = "menu/06.png";

    const _mole7 = new Image();
    _mole7.src = "menu/07.png";

    const background = new Image();
    background.src = "menu/menu_background.png";

    const cloud1 = new Image();
    cloud1.src = "menu/cloud1.png";

    let cloudx = [50, 280, 750, 550, 920];

    const test = () => {
        count += 1;
    
        context.clearRect(0, 0, 228, 448);
        context.drawImage(
            background,
            0,
            0,
            920,
            600);

        context.drawImage(
            cloud1,
            cloudx[0],
            56,
            161,
            65);

        context.drawImage(
            cloud1,
            cloudx[1],
            156,
            129,
            52);

        context.drawImage(
            cloud1,
            cloudx[2],
            156,
            161,
            65);

        context.drawImage(
            cloud1,
            cloudx[3],
            76,
            113,
            45);

        context.drawImage(
            cloud1,
            cloudx[4],
            33,
            177,
            71);


        const first_delay = 15;
        if(isFirtAniMole.current){
            if(Math.floor(isFirstImg / first_delay) === 0 ){
                context.drawImage(
                    _mole1,
                    554,
                    156,
                    210,
                    420);
            }else if(Math.floor(isFirstImg / first_delay) === 1 ){
                context.drawImage(
                    _mole2,
                    554,
                    156,
                    210,
                    420);
            }else if(Math.floor(isFirstImg / first_delay) === 2 ){
                context.drawImage(
                    _mole3,
                    554,
                    156,
                    210,
                    420);
            }else if(Math.floor(isFirstImg / first_delay) === 3 ){
                context.drawImage(
                    _mole4,
                    554,
                    156,
                    210,
                    420);
            }else if(Math.floor(isFirstImg / first_delay) === 4 ){
                context.drawImage(
                    _mole5,
                    554,
                    156,
                    210,
                    420);
            }else{
                isFirtAniMole.current = false;
            }
            
        }
        
        if(!isFirtAniMole.current){
            if(isFirstImg % 60 < 30){
                context.drawImage(
                    _mole6,
                    554,
                    156,
                    210,
                    420);
            }else{
                context.drawImage(
                    _mole7,
                    554,
                    146,
                    210,
                    430);
            }
        }

        count= 0;
        isFirstImg += 1;

        cloudx.forEach((value:number, index:number)=>{
            cloudx[index] -= 1;
            if(cloudx[index] < - 161){
                cloudx[index] = 1100;
            }
        })
        
        return window.requestAnimationFrame(test);
    }
    
    useEffect(() => {
        // if(canvasRef) canvas = canvasRef.current;
        if(canvasRef.current) context = canvasRef.current.getContext('2d');
        let t = window.requestAnimationFrame(test);

        return () => {
            cancelAnimationFrame(t);
        }
    }, [])

    return (
        <>
    <section className={'game__menu__layout'}>
        {/* 게임 설명, 게임 시작, 랭킹 보기 버튼 */}
        <img className={'game__menu__pole'} src={pole} alt="pole"/>
        <button onClick={()=>{
            onGameScreenHandler(1);
            console.log("test");
            ref.current?.play();
            }} className={'game__menu__button'}><img src={btn1}/></button>
        <button onClick={()=>{
            onGameScreenHandler(2);
            let getProblemApi = getProblem();
            getProblemApi(dispatch);
            }} className={'game__menu__button'}><img src={btn2}/></button>
        <button onClick={()=>{onGameScreenHandler(7)}} className={'game__menu__button'}><img src={btn3}/></button>

        <canvas ref={canvasRef} width={920} height={600} className={'game__menu__mole'}></canvas>
    </section>
            <audio ref={ref} controls>
            <source src="/sound/background__music.mp3" type="audio/mp3" />
        </audio>
        </>
    );
}
export default GameMenu;