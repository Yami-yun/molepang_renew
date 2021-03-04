import React from 'react';
import 'css/default.css';
import 'css/game/GameResult.css';

import closeBtn from 'img/result/btn__close2.png';
import leftBtn from 'img/description/btn__left.png';
import rightBtn from 'img/description/btn__right.png';
import { useDispatch, useSelector } from 'react-redux';

import { 
    CHANGE_GAME_SCREEN,
} from 'redux/action/types';
import { useState } from 'react';

function GameRsult(){
    const dispatch = useDispatch();
    const score = useSelector((state:any) => state.game.score);

    const onScreenMoveHandler = (nScreen:number) => {
        dispatch({type:CHANGE_GAME_SCREEN, payload: nScreen});
    }

    // const onPagingHandler = (dir:string) => {
    //     if(page !== 2 && dir === "RIGHT"){
    //         setPage(page + 1);
    //         setDesImg(gameDes2);
    //     }else if(page !== 0 && dir === "LEFT"){
    //         setPage(page - 1);
    //         setDesImg(gameDes1);
    //     }
    // }

    const test = () => {
        let t = [];
        for(let i=0; i<15;i++){
            t.push(<p key={i}>허수아비</p>);
        }
        return t;
    }
    return (
    <section className={'game__result__layout'}>
        <div className={'game__score__board'}>
            {/* 게임 결과 보드 헤더 영역 */}
            <div className={'game__score__header'}>
                <h1>놀이 결과</h1>
                <button className={'board__close__btn'} onClick={()=>onScreenMoveHandler(0)}><img src={closeBtn} /></button>
            </div>

            {/* 게임 결과 보드 바디 영역 */}
            <div className={'game__score__body'}>

                {/* 게임 결과 보드 바디 */}
                <div className={'score__body__box'}>
                    <div className={'body__line'}></div>
                    <p>점수</p>
                    <p className={'score__txt'}>{score}</p>
                    <button onClick={()=>onScreenMoveHandler(2)}>다시하기</button>
                    <button>순위보기</button>
                </div>

                <div className={'score__body__box'}>
                    <div className={'word__box'}>
                        <div className={'word__box__header'}>
                            <div className={'box__header__txt'}>
                                <p style={{color:"#3B70C0"}}>맞힌</p><p> 단어</p>
                            </div>

                            <div className={'word__box__paging'}>
                                <button ><img src={leftBtn}/></button>
                                <div className={'page__num__box'}>
                                    <p> 1 </p>
                                    <div></div>
                                    <p> 2 </p>
                                </div>
                                <button ><img src={rightBtn}/></button>
                            </div>
                        </div>

                        <div className={'word__box__list'}>
                            {test()}
                        </div>
                    </div>

                    <div className={'blank'}></div>

                    <div className={'word__box'}>
                        <div className={'word__box__header'}>
                            <div className={'box__header__txt'}>
                                <p style={{color:"#D65A48"}}>틀린</p><p> 단어</p>
                            </div>

                            <div className={'word__box__paging'}>
                                <button ><img src={leftBtn}/></button>
                                <div className={'page__num__box'}>
                                    <p> 1 </p>
                                    <div></div>
                                    <p> 2 </p>
                                </div>
                                <button ><img src={rightBtn}/></button>
                            </div>
                        </div>

                        <div className={'word__box__list'}>
                            {test()}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </section>);
}
export default GameRsult;