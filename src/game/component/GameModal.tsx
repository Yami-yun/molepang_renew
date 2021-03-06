import React from 'react';
// import 'css/default.css';
import 'css/game/GameModal.css';

// 게임 모달창
function GameModal({children}:any){
    return (
    <section className={'modal__layout'}>
        <div className={'modal__container'}>
            <button className={'modal__exit__btn'}>×</button>
            {children}
        </div>
        
    </section>);
}
export default GameModal;