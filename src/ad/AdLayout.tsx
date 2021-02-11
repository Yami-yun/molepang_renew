import React from 'react';
import 'css/default.css';
import 'css/ad/AdLayout.css';

interface IAdLayout{
    text:string,
}

function AdLayout({text}:IAdLayout){
    return (
    <article className={'ad__layout'}>
        {text}
    </article>
    );
}
export default AdLayout;