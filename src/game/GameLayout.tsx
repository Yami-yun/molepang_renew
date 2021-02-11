import React from 'react';
import 'css/default.css';
import 'css/game/Game.css';
import GameMenu from 'game/component/GameMenu';



function GameLayout(){
    return (
        <article className={'game__layout'}>
            <GameMenu/>
        </article>
    );
}
export default GameLayout;
