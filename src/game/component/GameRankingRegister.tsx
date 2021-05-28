import React, { useEffect } from 'react';
import 'css/default.css';
import 'css/game/GameRankingRegister.css';

import closeBtn from 'img/result/btn__close2.png';
import { useDispatch, useSelector } from 'react-redux';

import {
    SET_USER_NICK,
    CHANGE_GAME_SCREEN,
} from 'redux/action/types';
import { useState } from 'react';
import { getTopTenRank, getTotalRank, registerRank } from 'redux/action/gameAction';

// 게임 랭킹 등록 화면 컴포넌트
function GameRankingRegister(){
    const dispatch = useDispatch();
    const result = useSelector((state:any) => state.game.gameResult);

    const [nickname, setNickname] = useState("");       // 유저 닉네임
    const [err, setErr] = useState(false);      // 7글자 이상 입력시 에러 문구 출력 여부

    const onScreenMoveHandler = (nScreen:number) => {
        dispatch({type:CHANGE_GAME_SCREEN, payload: nScreen});
    }

    const onRegisterNickHandler = () => {
        if(nickname.length > 7 || nickname.length === 0) {
            return;
        }
        // 유저 닉 reducer에 저장
        dispatch({type:SET_USER_NICK, payload: nickname});

        // 랭킹 데이터 등록 api 호출 함수
        let rigisterRankApi = registerRank({nickname, score: result.score.toString()});
        rigisterRankApi(dispatch);

        // onScreenMoveHandler(6);
    }

    const onChangeNickHandler = (e:any) => {
        setNickname(e.target.value);
        if(nickname.length >= 7 || nickname.length === 0) {
            setErr(true);
        }else{
            setErr(false);
        }
    }

    useEffect(() => {
        let getTopTenRankApi = getTopTenRank();
        getTopTenRankApi(dispatch);

        let getTotalRankApi = getTotalRank();
        getTotalRankApi(dispatch);
        
    });


    return (
    <section className={'game__register__layout'}>
        <div className={'game__register__board'}>
            <button onClick={()=>onScreenMoveHandler(0)} className={'close__btn'}><img src={closeBtn} /></button>

            <p>"별명을 등록해야 내 순위를 볼 수 있어요!"</p>
            <input value={nickname} onChange={(e:any)=>{onChangeNickHandler(e)}}/>
            <div></div>
            {err && <p>* 별명은 7글자 이내로 입력해주세요.</p>}
            <button className={'register__btn'} onClick={()=>{onRegisterNickHandler()} }>등록하기</button>
        </div>
    </section>);
}
export default GameRankingRegister;