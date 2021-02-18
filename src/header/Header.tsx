import React from 'react';
import 'css/default.css';
import 'css/header/Header.css';

import mainTitleImg from 'img/main__title.png';

function Header(){
    return (
    <>
        
        <header className={'header'}>
            <img src={mainTitleImg} />
        </header>
    </>);
}
export default Header;