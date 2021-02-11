import React, { useState } from 'react';
import 'css/default.css';
import 'css/comment/CommentHeader.css';
import { useSelector } from 'react-redux';

function CommentHeader(){
    const data = useSelector((state:any)=>state.comment.comment);
    const [isShare, setIsShare] = useState<boolean>(false);
    return (
    <section className={'comment__header__layout'}>
        <div >
            <h1>댓글</h1>
            <p className={'comment__count'}>( {data.length} )</p>
        </div>
        <button onClick={()=>setIsShare(true)} className={'commment__share__btn'}>공유하기</button>

        {/* 공유하기 기능 레이아웃 */}
        {isShare && <article className={'comment__share__layout'}>
            <button onClick={()=>setIsShare(false)} className={'share__exit__btn'}>×</button>
            <h2>SNS 공유하기</h2>
            <p>모두 한글 두더지 팡!을 공유해 보세요</p>
            <div className={'share__btn__list'}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <button className={'url__copy__btn'}>URL 복사</button>
            <hr/>
        </article>}
        
    </section>);
}
export default CommentHeader;