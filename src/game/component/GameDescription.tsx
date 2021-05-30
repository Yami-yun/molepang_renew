import React from 'react';
import 'css/default.css';
import 'css/game/GameDescription.css';
import gameDes1 from 'img/description/game__des1.jpg';
import gameDes2 from 'img/description/game__des2.jpg';
import closeBtn from 'img/description/btn__close.png';
import leftBtn from 'img/description/btn__left.jpg';
import rightBtn from 'img/description/btn__right.jpg';
import { useDispatch } from 'react-redux';

import { 
    CHANGE_GAME_SCREEN,
} from 'redux/action/types';
import { useState } from 'react';
import { getProblem } from 'redux/action/gameAction';

// 게임 설명 창 화면 컴포넌트
function GameDescription(){
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [desImg, setDesImg] = useState(gameDes1);     // 게임 설명 이미지 설정

    // 칸바스 화면 이동 핸들러
    const onScreenMoveHandler = (nScreen:number) => {
        dispatch({type:CHANGE_GAME_SCREEN, payload: nScreen});
    }

    // 게임 설명 페이징 핸들러
    const onPagingHandler = (dir:string) => {
        if(page !== 2 && dir === "RIGHT"){
            setPage(page + 1);
            setDesImg(gameDes2);
        }else if(page !== 0 && dir === "LEFT"){
            setPage(page - 1);
            setDesImg(gameDes1);
        }
    }
    return (
    <section className={'game__des__layout'}>
        <img onClick={()=>onScreenMoveHandler(0)} className={'des__close__btn'} src={closeBtn} alt="t" />

        {/* 게임 설명 이미지 */}
        <img src={desImg}/>

        {page === 2 && <button onClick={()=>{
            onScreenMoveHandler(2);
            let getProblemApi = getProblem();
            getProblemApi(dispatch);
        }} className={'des__start__btn'}>놀이시작</button>}

        {/* 게임 설명 페이징 */}
        <div className={'des__page__box'}>
            <img onClick={()=>onPagingHandler("LEFT")} src={leftBtn} />
            {/* <div className={'page__num__box'}>
                <p> {page} </p>
                <div></div>
                <p> 2 </p>
            </div> */}
            <img onClick={()=>onPagingHandler("RIGHT")} src={rightBtn} />
        </div>
    </section>);
}
export default GameDescription;