import React from 'react';
import 'css/default.css';
import 'css/game/GameMenu.css';
import btn1 from 'img/menu/game__menu__button1.png';
import btn2 from 'img/menu/game__menu__button2.png';
import btn3 from 'img/menu/game__menu__button3.png';
import { useDispatch } from 'react-redux';
import { CHANGE_GAME_SCREEN } from 'redux/action/types';

function GameMenu(){
    const dispatch = useDispatch();
    const onGameScreenHandler = (nScreen:number) => {
        dispatch({type:CHANGE_GAME_SCREEN, payload:nScreen});
    }
    return (
    <section className={'game__menu__layout'}>

        <button onClick={()=>{onGameScreenHandler(1)}} className={'game__menu__button'}><img src={btn1}/></button>
        <button onClick={()=>{onGameScreenHandler(2)}} className={'game__menu__button'}><img src={btn2}/></button>
        <button onClick={()=>{onGameScreenHandler(3)}} className={'game__menu__button'}><img src={btn3}/></button>

        <div className={'game__menu__mole'}></div>
    </section>);
}
export default GameMenu;