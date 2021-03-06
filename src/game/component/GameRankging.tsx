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
import GameTopTree from 'game/component/GameTopThree';
import { IGameData, total_rank } from 'redux/reducer/gameReducer';

// 게임 랭킹 화면 컴포넌트
function GameRankging(){
    const dispatch = useDispatch();

    // 게임 화면 이동 핸들러
    const onScreenMoveHandler = (nScreen:number) => {
        dispatch({type:CHANGE_GAME_SCREEN, payload: nScreen});
    }

    const topTenRankList:IGameData["topTenRank"] = useSelector((state:any) => state.game.topTenRank);       // 탑 10 랭킹 정보
    const totalRankList:IGameData["totalRank"] = useSelector((state:any) => state.game.totalRank);         // 전체 랭킹 정보
    const totalRankingCount:IGameData["totalRankingCount"] = useSelector((state:any) => state.game.totalRankingCount);         // 전체 랭킹 정보

    
    const userRank = useSelector((state:any) => state.game.userRank);         // 전체 랭킹 정보
    console.log(totalRankList);
    console.log(totalRankingCount);
    console.log(userRank);

    const [rankDataList, setRankDataList] = useState<total_rank[]>(totalRankList.data);           // 현재 랭킹 화면에 보여지는 랭킹 리스트 설정
    const [isTopTenRank, setIsTopTenRank] = useState(false);                        // 사용자가 현재 랭킹 화면으로 탑 10 화면을 선택했는지 여부

    const [firstTotalRank, setFirstTotalRank] = useState(1);                // ###API
    const [userIndex, setUserIndex] = useState(2);

    useEffect(() => {
        rankTabSelect("TOTAL");

    }, [])

    useEffect(() => {
        setRankDataList(totalRankList.data);
        rankTabSelect("TOTAL");

    }, [totalRankList.data])
    // 랭킹 탭 선택 함수
    const rankTabSelect = (select:string) => {
        
        if(select === "TOTAL"){
            
            setIsTopTenRank(false);
            // ###API
            if(userRank <= 3){
                setRankDataList([...totalRankList.data.slice(0, 5)]);
                setFirstTotalRank(1);
                setUserIndex(userRank-1);
                // ### 이부분 랭킹에 등록된 사용자 수도 같이 달라하기
            }else if(userRank > 3 && userRank < totalRankingCount - 1){
                console.log("MIDDLE INDEX");
                setRankDataList([...totalRankList.data]);
                setFirstTotalRank(userRank-2);
                setUserIndex(2);
            }else if(userRank >= totalRankingCount - 1){
                setRankDataList([...totalRankList.data.slice(totalRankList.data.length - 5)]);
                console.log("END INDEX");

                // setFirstTotalRank(totalRankList.data.length - 4);
                setFirstTotalRank(userRank - 3);
                console.log(userRank);
                console.log(totalRankingCount);

                if(userRank === totalRankingCount -1 ) setUserIndex(3);
                else setUserIndex(4);
            }

        }else{
            setIsTopTenRank(true);
            setRankDataList([...topTenRankList.data.slice(0, 10)]);
        }
    }

    
    // 선택된 버튼 스타일
    function selectedBtnStyle(isTop:boolean){
        const selectedBtnStyle = {
            backgroundColor: "#F4F4F4",
            color:"#402D21",
        }
        if(isTopTenRank === isTop) return selectedBtnStyle;

        return {};
    }

    return (
    <section className={'game__ranking__layout'}>
        {(userRank !== 0 && userRank < 4) ? <GameTopTree /> : <></>}
        <img onClick={()=>{onScreenMoveHandler(0); window.location.reload();}} className={'close__btn'} src={closeBtn} alt="t" />

        {/* 랭킹 화면 헤더 ( 전체순위 버튼, 순위 10 버튼) */}
        <div className={'game__ranking__header'}>
            <button style={selectedBtnStyle(false)} onClick={()=>rankTabSelect("TOTAL")}>전체순위</button>
            <button style={selectedBtnStyle(true)} onClick={()=>rankTabSelect("TEN")} >순위 10</button>
            
        </div>

        {/* 랭킹 화면에서 현재 보여지는 랭킹 리스트 */}
        <div className={'game__ranking__list' + (!isTopTenRank ? ' game__ranking__list__total' : '')}>
            {rankDataList.length ? rankDataList.map((value:any, index:number)=>
                <div key={index} className={'game__ranking__box'}>
                    <p className={(!isTopTenRank && index === userIndex) ? 'p__center': ""}>{!isTopTenRank ? value.ranking : index+ 1 }</p>
                    <p className={(!isTopTenRank && index === userIndex) ? 'p__center': ""}>{value.nickname}</p>
                    <p className={(!isTopTenRank && index === userIndex) ? 'p__center': ""}>{value.score}</p>
                    <p className={(!isTopTenRank && index === userIndex) ? 'p__center': ""}>{value.play_date.slice(0,10)}</p>
                </div>
            ) : <></>}
        </div>
    </section>);
}
export default GameRankging;