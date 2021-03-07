import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import 'css/default.css';
import 'css/comment/CommentHeader.css';

import faceShareBtnImg from 'img/face__share__btn.png';
import kakaoShareBtnImg from 'img/kakao__share__btn.png';
import twiShareBtnImg from 'img/twi__share__btn.png';


function CommentHeader(){
    const data = useSelector((state:any)=>state.comment.commentList);
    const [isShare, setIsShare] = useState<boolean>(false);
    return (
    <section className={'comment__header__layout'}>
        <div >
            <h1>댓글</h1>
            <p className={'comment__count'}>( {data.length} )</p>
        </div>
        <button onClick={()=>setIsShare(true)} className={'commment__share__btn'}>공유하기</button>

        {/* 공유하기 기능 레이아웃 */}
        {isShare && <div className={'comment__share__background'}>
            <article className={'comment__share__layout'}>
                <button onClick={()=>setIsShare(false)} className={'share__exit__btn'}>×</button>
                <h1>SNS 공유하기</h1>
                <p>모두 한글 두더지 팡!을 공유해 보세요</p>
                <div className={'share__btn__list'}>
                    <img src={faceShareBtnImg}/>
                    <img src={kakaoShareBtnImg}/>
                    <img src={twiShareBtnImg}/>
                </div>
                <button className={'url__copy__btn'}>URL 복사</button>
                <hr/>
            </article>
        </div>}
        
    </section>);
}
export default CommentHeader;