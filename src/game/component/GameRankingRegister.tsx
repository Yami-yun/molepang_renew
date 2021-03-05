import React from 'react';
import 'css/default.css';
import 'css/game/GameRankingRegister.css';

import closeBtn from 'img/result/btn__close2.png';
import { useDispatch, useSelector } from 'react-redux';

import {
    SET_USER_NICK,
    CHANGE_GAME_SCREEN,
} from 'redux/action/types';
import { useState } from 'react';


function GameRankingRegister(){
    const dispatch = useDispatch();
    // const result = useSelector((state:any) => state.game.gameResult);

    const [nick, setNick] = useState("");
    const [err, setErr] = useState(false);
    
    // console.log(result);

    const onScreenMoveHandler = (nScreen:number) => {
        dispatch({type:CHANGE_GAME_SCREEN, payload: nScreen});
    }

    const onRegisterNickHandler = () => {
        if(nick.length <= 7) {
            setErr(true);
            return;
        }
        dispatch({type:SET_USER_NICK, payload: nick});
        onScreenMoveHandler(6);
    }


    return (
    <section className={'game__register__layout'}>
        <div className={'game__register__board'}>
            <p>"별명을 등록해야 내 순위를 볼 수 있어요!"</p>
            <input defaultValue={""} onChange={(e:any)=>{setNick(e.target.value)}}/>
            {err && <p>* 별명은 7글자 이내로 입력해주세요.</p>}
            <button onClick={()=>{onRegisterNickHandler()} }>등록하기</button>
            
        </div>

    </section>);
}
export default GameRankingRegister;