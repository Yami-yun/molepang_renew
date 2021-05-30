import React, { useEffect, useState } from 'react';
import 'css/default.css';
import 'css/background/Background.css';

import weedImg from 'img/weed.png';

function Background(){
    const root = document.getElementById('root');
    const topHeight = 860;

    const [width, setWidth] = useState<number>(0);
    const [bottomHeight, setBottomHeight] = useState<number>(0);

    useEffect(() => {
        if(root) {
            setBottomHeight(root.scrollHeight - topHeight);
            setWidth(document.body.clientWidth - 40);
            console.log(document.body.scrollWidth);
        }
        
    }, [])

    return (
    <>
        <section className={"top__background__layout"}>
        </section>
        <section style={{height:`${bottomHeight}px`}} className={"bottom__background__layout"}>
            <img alt="zandi" src={weedImg}/>
            <img alt="zandi" src={weedImg}/>
            <img alt="zandi" src={weedImg}/>
            <img alt="zandi" src={weedImg}/>
            <img alt="zandi" src={weedImg}/>
            <img alt="zandi" src={weedImg}/>
            
            <img alt="zandi" src={weedImg}/>
            <img alt="zandi" src={weedImg}/>
            <img alt="zandi" src={weedImg}/>
            <img alt="zandi" src={weedImg}/>
            <img alt="zandi" src={weedImg}/>
            <img alt="zandi" src={weedImg}/>
        </section>
    </>
    
    );
}
export default Background;