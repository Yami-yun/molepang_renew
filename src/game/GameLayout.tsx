import React, { useEffect } from 'react';
import 'css/default.css';
import 'css/game/Game.css';
import GameMenu from 'game/component/GameMenu';
import GamePlay from 'game/component/GamePlay';
import { useSelector } from 'react-redux';
import GameDescription from 'game/component/GameDescription';
import GameResult from 'game/component/GameResult';
import GameRankingRegister from 'game/component/GameRankingRegister';
import GameRankging from 'game/component/GameRankging';
import GamePreRankging from 'game/component/GamePreRankging';
import { useRef } from 'react';


// 게임 레이아웃 화면제어 컴포넌트
function GameLayout(){
    const screen = useSelector((state:any) => state.game.gamescreen);
    const screenRender = () => {
        switch(screen){
            case 0:
                return <GameMenu />;
                
            case 1:
                return <GameDescription />;
            case 2:
                return <GamePlay />
            case 3:
                return <GameMenu />;
            case 4:
                return <GameResult />;
            case 5:
                return <GameRankingRegister />;
            case 6:
                return <GameRankging />;
            case 7:
                return <GamePreRankging />;
            default:
                return <GamePreRankging />;

        }
        

    }
    return (
        <article className={"game__layout"}>
            {screenRender()}

        </article>
    );
}
export default GameLayout;
