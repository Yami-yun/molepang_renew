import React, { useEffect, useState } from 'react';
import 'css/default.css';
import 'css/background/Background.css';

import weedImg from 'img/weed.png';
import cloudImg from 'img/cloud.png';

const layoutWidth = document.body.offsetWidth- 250;

const cloudStyle = (index:number) => {
    const rsize = Math.floor(Math.random()*2 + 1);
    const rtop =  Math.floor(Math.random()*270 * (index/3+1));
    // const rleft =  Math.floor(Math.random()*layoutWidth/2 + layoutWidth/2*(index%2) );
    const rduration = Math.floor(Math.random()*10 + 15);
    return {
        top: `${20 + rtop}px`,
        left: `${-260}px`,
        width:`${130*rsize}px`,
        height:`${65*rsize}px`,
        zIndex: -3,
        animationName: 'acloud',
        animationDuration: `${rduration}s`,
        animationDelay: `${index}s`,
        animationTimingFunction: 'ease-in-out',
        animationIterationCount: 'infinite',
    }
};

function Background(){
    const root = document.getElementById('root');
    const topHeight = 860;

    const [width, setWidth] = useState<number>(0);
    const [bottomHeight, setBottomHeight] = useState<number>(0);

    useEffect(() => {
        if(root) {
            setBottomHeight(root.scrollHeight - topHeight);
            setWidth(document.body.clientWidth);
            console.log(document.body.scrollWidth);
        }
        
    }, [])
    
    const cloudRender = () => {
        const cloudCount = 10;
        let cloudList = [];
        for(let i = 0; i< cloudCount; i++){
            cloudList.push(<img key={i} src={cloudImg} style={cloudStyle(i)}/>);
        }
        return cloudList;
    }

    // 잡초 랜더 함수
    const seedRender = () => {
        // bottom list height가 동적으로 변하는 것을 감안하고 seed count도 동적으로 변하겧마
        const seedCount = Math.floor((bottomHeight)/300) * 2;

        let seedList = [];
        for(let i=0; i<seedCount;i++){

            // 잡초 랜덤 좌표에 생성 (반은 왼쪽, 반은 오른쪽, 중간 댓글 리스트에는 잡초를 생성하지 않는다.)
            const seedX = (i % 2 === 0) ? Math.floor(Math.random()*(width - 1100)/2)
        : Math.floor((Math.random()*(width - 1180)/2 + (width - 1100)/2) + 1000);
            
            seedList.push( <img key={i} style={{top:`${Math.floor(Math.random()*(bottomHeight-128))}px`, 
            left:`${seedX}px`}} src={weedImg}/>);
        }
        return seedList;
    }
    return (
    <>
        <section className={"top__background__layout"}>
            {/* {cloudRender()} */}
        </section>
        <section style={{height:`${bottomHeight}px`}} className={"bottom__background__layout"}>
            {
                width > 1400 && seedRender()
            }
            
        </section>
    </>
    
    );
}
export default Background;