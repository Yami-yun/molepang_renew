import React from 'react';
import 'css/default.css';
import 'css/game/GameDescription.css';
import gameDes1 from 'img/description/game__des1.png';
import gameDes2 from 'img/description/game__des2.png';
import closeBtn from 'img/description/btn__close.png';
import leftBtn from 'img/description/btn__left.png';
import rightBtn from 'img/description/btn__right.png';
import { useDispatch } from 'react-redux';

import { 
    CHANGE_GAME_SCREEN,
} from 'redux/action/types';
import { useState } from 'react';

function GameDescription(){
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [desImg, setDesImg] = useState(gameDes1);
    const onScreenMoveHandler = (nScreen:number) => {
        dispatch({type:CHANGE_GAME_SCREEN, payload: nScreen});
    }

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
        <button onClick={()=>onScreenMoveHandler(0)} className={'des__close__btn'}><img src={closeBtn} /></button>
        <img src={desImg}/>

        {page === 2 && <button onClick={()=>onScreenMoveHandler(2)} className={'des__start__btn'}>놀이시작</button>}
        <div className={'des__page__box'}>
            <button onClick={()=>onPagingHandler("LEFT")}><img src={leftBtn}/></button>
            <div className={'page__num__box'}>
                <p> {page} </p>
                <div></div>
                <p> 2 </p>
            </div>
            <button onClick={()=>onPagingHandler("RIGHT")}><img src={rightBtn}/></button>
        </div>
    </section>);
}
export default GameDescription;