import React, { useEffect } from 'react';
import 'css/default.css';
import 'css/game/GameTopThree.css';

import closeBtn from 'img/result/btn__close2.png';
import { useDispatch, useSelector } from 'react-redux';
import { CHANGE_GAME_SCREEN } from 'redux/action/types';

// 게임 랭킹 등록 화면 컴포넌트
function GameTopTree(){
    const dispatch = useDispatch();

    const onScreenMoveHandler = (nScreen:number) => {
        dispatch({type:CHANGE_GAME_SCREEN, payload: nScreen});
    }

    return (
    <section className={'game__topthree__layout'}>
        <div className={'game__topthree__board'}>
            <img src={'topthree__poong.png'}/>
            <p>1 위</p>
            <div className={'txt__line'}>
                <p>냠냠얌윤야미</p><p> 님 진심으로 축하드립니다.</p>
            </div>
            <button onClick={()=>onScreenMoveHandler(0)} className={'ok__btn'}>확인</button>

        </div>
    </section>);
}
export default GameTopTree;