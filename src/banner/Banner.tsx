import React from 'react';
import 'css/default.css';
import 'css/banner/Banner.css';

function Banner(){
    let test1 = 3;
    let test2 = test1;
    test2 = 5;
    console.log(test1);
    return (
    <article className={'banner'}>누누 컴퍼니 링크 연결된 배너가 들어가는 곳</article>);
}
export default Banner;