import React, { useRef, useState } from 'react';
import 'css/default.css';
import 'css/game/Game.css';
import GameMenu from 'game/component/GameMenu';
import GameModal from 'game/component/GameModal';
import GamePlay from 'game/component/GamePlay';
import { useSelector } from 'react-redux';
import GameDescription from 'game/component/GameDescription';
import GameResult from 'game/component/GameResult';
import GameRankingRegister from 'game/component/GameRankingRegister';
import GameRankging from 'game/component/GameRankging';


function GameLayout(){
    const screen = useSelector((state:any) => state.game.gamescreen);
    // let screen = 6;

    const screenRender = () => {
        switch(screen){
            case 0:
                return <GameMenu />;
                
            case 1:
                return <GameDescription />;
            case 2:
                return <GamePlay />;
            case 3:
                return <GameMenu />;
            case 4:
                return <GameResult />;
            case 5:
                return <GameRankingRegister />;
            default:
                return <GameRankging />;

        }
        

    }
    return (
        <article className={"game__layout"}>
            {screenRender()}
            {/* <GameMenu /> */}
            {/* <GamePlay /> */}

        </article>
    );
}
export default GameLayout;
