import React from 'react';
// import 'css/default.css';
import 'css/game/GameModal.css';

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