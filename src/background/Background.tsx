import React from 'react';
import 'css/default.css';
import 'css/background/Background.css';

import weedImg from 'img/weed.png';
import cloudImg from 'img/cloud.png';

function Background(){
    const bottomBackgroundLayoutHeight = document.body.offsetHeight - 860;
    const layoutWidth = document.body.offsetWidth- 100;

    const seedCount = Math.floor(bottomBackgroundLayoutHeight/300) * 2;


    const seedX = Math.floor(Math.random()*2) ? Math.floor(Math.random()*(layoutWidth - 960)/2) : Math.floor((Math.random()*(layoutWidth - 960)/2 + (layoutWidth - 960)/2 + layoutWidth));
    console.log(seedX);

    // console.log(seedX);
    const seedRender = () => {
        let seedList = [];
        for(let i=0; i<seedCount;i++){
            
            seedList.push( <img key={i} style={{top:`${Math.floor(Math.random()*bottomBackgroundLayoutHeight)}px`, left:`${Math.floor(Math.random()*layoutWidth)}px`}} src={weedImg}/>);
        }
        return seedList;
    }
    return (
    <>
        <section className={"top__background__layout"}>
            <img src={cloudImg}/>
            <img src={cloudImg}/>
            <img src={cloudImg}/>
            <img src={cloudImg}/>
            <img src={cloudImg}/>
            <img src={cloudImg}/>
        </section>
        <section style={{height:`${bottomBackgroundLayoutHeight}px`}} className={"bottom__background__layout"}>
            {
                seedRender()
            }
            
        </section>
    </>
    
    );
}
export default Background;