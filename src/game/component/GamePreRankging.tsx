import React, { useEffect } from 'react';
import 'css/default.css';
import 'css/game/GameRankging.css';
import closeBtn from 'img/description/btn__close.png';

import { useDispatch, useSelector } from 'react-redux';

import {
    SET_USER_NICK,
    CHANGE_GAME_SCREEN,
    GET_TOP_TEN_RANK,
} from 'redux/action/types';
import { useState } from 'react';
import { getTopTenRank } from 'redux/action/gameAction';
import { IGameData, total_rank } from 'redux/reducer/gameReducer';
// import noTopTenImg from '/';

// 게임 랭킹 화면 컴포넌트
function GamePreRankging(){
    const dispatch = useDispatch();

    const topTenRankList:IGameData["topTenRank"] = useSelector((state:any) => state.game.topTenRank);       // 탑 10 랭킹 정보

    const [rankDataList, setRankDataList] = useState<total_rank[]>(topTenRankList.data);           // 현재 랭킹 화면에 보여지는 랭킹 리스트 설정

    // 게임 화면 이동 핸들러
    const onScreenMoveHandler = (nScreen:number) => {
        dispatch({type:CHANGE_GAME_SCREEN, payload: nScreen});
    }

    useEffect(() => {
        let getTopTenRankApi = getTopTenRank();
        getTopTenRankApi(dispatch);
    }, [])

    useEffect(() => {
        setRankDataList(topTenRankList.data);

    }, [topTenRankList.data])

    return (
    <section className={'game__ranking__layout'}>
        <img onClick={()=>onScreenMoveHandler(0)} className={'pre_close__btn'} src={closeBtn} alt="t"/>

        {/* 랭킹 화면 헤더 ( 전체순위 버튼, 순위 10 버튼) */}
        <p> 순위 10 </p>

        {/* 랭킹 화면에서 현재 보여지는 랭킹 리스트 */}
        <div className={'game__ranking__list'}>
            {rankDataList.length > 5 ? rankDataList.map((value:any, index:number)=>
                <div key={index} className={'game__ranking__box'}>
                    <p>{index + 1}</p>
                    <p>{value.nickname}</p>
                    <p>{value.score}</p>
                    <p>{value.play_date.slice(0,10)}</p>
                </div>
            ) : <img src={"no_top_ten.png"}/>}
        </div>


    </section>);
}
export default GamePreRankging;