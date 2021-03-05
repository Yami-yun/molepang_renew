import React, { useEffect } from 'react';
import 'css/default.css';
import 'css/game/GameRankging.css';
import closeBtn from 'img/description/btn__close.png';

import { useDispatch, useSelector } from 'react-redux';

import {
    SET_USER_NICK,
    CHANGE_GAME_SCREEN,
} from 'redux/action/types';
import { useState } from 'react';
import { getTopTenRank, getTotalRank } from 'redux/action/gameAction';


function GameRankging(){
    const dispatch = useDispatch();

    const onScreenMoveHandler = (nScreen:number) => {
        dispatch({type:CHANGE_GAME_SCREEN, payload: nScreen});
    }

    

    const topTenRankList = useSelector((state:any) => state.game.topTenRank);
    const totalRankList = useSelector((state:any) => state.game.totalRank);

    const [rankDataList, setRankDataList] = useState<any>(totalRankList);
    const [isTopTenRank, setIsTopTenRank] = useState(false);
    // console.log(rankList);

    useEffect(() => {
        let getTopTenRankApi = getTopTenRank();
        getTopTenRankApi(dispatch);

        let getTotalRankApi = getTotalRank();
        getTotalRankApi(dispatch);
        setRankDataList(topTenRankList);
    }, [])

    const rankTabSelect = (select:string) => {
        if(select === "TOTAL"){
            setIsTopTenRank(false);
            setRankDataList(totalRankList);
        }else{
            setIsTopTenRank(true);
            setRankDataList(topTenRankList);
        }
    }


    return (
    <section className={'game__ranking__layout'}>
        <button onClick={()=>onScreenMoveHandler(0)} className={'close__btn'}><img src={closeBtn} /></button>
        <div className={'game__ranking__header'}>
            <button onClick={()=>rankTabSelect("TOTAL")}>전체순위</button>
            <button onClick={()=>rankTabSelect("TEN")} >순위 10</button>
            
        </div>
        <div className={'game__ranking__list'}>
            {rankDataList.map((value:any, index:number)=>
                <div key={index} className={'game__ranking__box'}>
                    <p>{value.nRank}</p>
                    <p>{value.nick}</p>
                    <p>{value.score}</p>
                    <p>{value.date}</p>
                </div>
            )}
        </div>


    </section>);
}
export default GameRankging;