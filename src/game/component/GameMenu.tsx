import React from 'react';
import 'css/default.css';
import 'css/game/GameMenu.css';

function GameMenu(){
    return (
    <section className={'game__menu__layout'}>
        <p className={'game__menu__title1'}>모두 한글</p>
        <p className={'game__menu__title2'}>두더지 팡!</p>
        <div className={'game__menu__bottom'}>
            <div className={'menu__bottom__left'}>
                <button>놀이 설명</button>
                <button>놀이 시작</button>
                <button>순위 보기</button>
            </div>
            <div className={'menu__bottom__right'}></div>

        </div>
    </section>);
}
export default GameMenu;