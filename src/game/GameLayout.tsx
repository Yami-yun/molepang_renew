import React from 'react';
import 'css/default.css';
import 'css/game/Game.css';
import GameMenu from 'game/component/GameMenu';
import GameModal from 'game/component/GameModal';
import GamePlay from 'game/component/GamePlay';



function GameLayout(){
    return (
        <article className={'game__layout'}>
            {/* <GameMenu/> */}
            {/* <GameModal></GameModal> */}
            <GamePlay />
        </article>
    );
}
export default GameLayout;
