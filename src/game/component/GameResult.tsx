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


function WordBox({headerTxt, WORD_MAX_PAGE, wordList}:{headerTxt:string, WORD_MAX_PAGE:number, wordList:string[]}){
    const [page, setPage] = useState(0);


    console.log(wordList);

    const onPagingHandler = (dir:string) => {
        if(page !== WORD_MAX_PAGE && dir === "RIGHT"){
            setPage(page + 1);
        }else if(page !== 0 && dir === "LEFT"){
            setPage(page - 1);
        }
    }

    return(
        <div className={'word__box'}>

            {/* 단어 박스 헤더 */}
            <div className={'word__box__header'}>
                <div className={'box__header__txt'}>
                    <p style={headerTxt === "맞힌" ? {color:"#3B70C0"} : {color:"#D65A48"}}>{headerTxt}</p><p> 단어</p>
                </div>

                {(wordList.length > 15) && <div className={'word__box__paging'}>
                    <button onClick={()=>onPagingHandler('LEFT')}><img src={leftBtn}/></button>
                    <div className={'page__num__box'}>
                        <p> {page + 1} </p>
                        <div></div>
                        <p> {WORD_MAX_PAGE + 1} </p>
                    </div>
                    <button onClick={()=>onPagingHandler('RIGHT')}><img src={rightBtn}/></button>
                </div>}
            </div>

            {/* 유저가 플레이할 때 틀린 단어 혹은 맞은 단어 리스트 */}
            <div className={'word__box__list'}>
                {wordList.map((value:string, index:number)=>{
                    if(index < 15 * (page + 1) && index >= 15 * (page - 1)){
                        return <p key={index}>{value}</p>;
                    }
                })}
            </div>
        </div>
    );
}


function GameRsult(){
    const dispatch = useDispatch();
    const result = useSelector((state:any) => state.game.gameResult);

    const onScreenMoveHandler = (nScreen:number) => {
        dispatch({type:CHANGE_GAME_SCREEN, payload: nScreen});
    }

    // 맞힌 단어 리스트
    const correctWordData = {headerTxt:"맞힌", WORD_MAX_PAGE:Math.floor(result.correctWord.length / 15), wordList: result.correctWord};

    // 틀린 단어 리스트
    const incorrectWordData = {headerTxt:"틀린", WORD_MAX_PAGE:Math.floor(result.incorrectWord.length / 15), wordList: result.incorrectWord};

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
                    <p className={'score__txt'}>{result.score}</p>
                    <button onClick={()=>onScreenMoveHandler(2)}>다시하기</button>
                    <button onClick={()=>onScreenMoveHandler(5)}>순위보기</button>
                </div>

                <div className={'score__body__box'}>
                    <WordBox {...correctWordData} />
                    <div className={'blank'}></div>
                    <WordBox {...incorrectWordData}/>
                </div>
            </div>
        </div>

    </section>);
}
export default GameRsult;