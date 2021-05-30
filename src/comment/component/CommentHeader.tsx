import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

import 'css/default.css';
import 'css/comment/CommentHeader.css';
import exitBtnImg from 'img/button_close.png';

import faceShareBtnImg from 'img/face__share__btn.png';
import kakaoShareBtnImg from 'img/kakao__share__btn.png';
import twiShareBtnImg from 'img/twi__share__btn.png';
import { ICommentData } from 'redux/reducer/commentReducer';


function CommentHeader(){
    const comment:ICommentData["commentData"] = useSelector((state:any)=>state.comment.commentData);
    console.log(comment);
    const [isShare, setIsShare] = useState<boolean>(false);
    const ref = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        //@ts-ignore
        window.Kakao.init('617011208cc7a0489481e2070e068221');
    }, [])

    const handleKakaoShare = () => {
        //@ts-ignore
        window.Kakao.Link.createDefaultButton({
            container: '#kakao-link-btn',
            objectType: 'feed',
            content: {
            title: 'Molepang',
            description: '재밌는 게임 한판?',
            imageUrl: 'http://mud-kage.kakao.co.kr/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png',
            link: {
                mobileWebUrl: 'http://localhost:3000/',
                webUrl: 'http://localhost:3000/'
            }
            },
        });
    }

    const handleFacebookShare = () => {
        window.open('https://www.facebook.com/sharer/sharer.php?u=http://localhost:3000/');
    }

    const handleTwitterkShare = () => {
        window.open('https://www.twitter.com/intent/tweet?&url=http://localhost:3000/');
    }

    const handleCopyURL = () => {
        ref.current?.select();
        document.execCommand("copy"); // 클립보드에 복사합니다.
        alert("URL이 클립보드에 복사되었습니다"); 
        ref.current?.blur(); // 선택된 것을 다시 선택안된것으로 바꿈니다.
    }

    return (
    <section className={'comment__header__layout'}>
        <div >
            <h1>댓글</h1>
            <p className={'comment__count'}>( {comment.comments.length} )</p>
        </div>
        <button onClick={()=>setIsShare(true)} className={'commment__share__btn'}>공유하기</button>

        {/* 공유하기 기능 레이아웃 */}
        {isShare && <div className={'comment__share__background'}>
            <article className={'comment__share__layout'}>
                <img onClick={()=>setIsShare(false)} className={'share__exit__btn'} src={exitBtnImg} alt="share_exit"/>

                <h1>SNS 공유하기</h1>
                <p>모두 한글 두더지 팡!을 공유해 보세요</p>

                <div className={'share__btn__list'}>
                    <a onClick={handleFacebookShare}>
                        <img src={faceShareBtnImg}/>
                    </a>
                    <a  id="kakao-link-btn" onClick={handleKakaoShare}>
                        <img src={kakaoShareBtnImg}/>
                    </a>
                    <a onClick={handleTwitterkShare}>
                        <img src={twiShareBtnImg}/>
                    </a>
                </div>

                <div className={'url__copy'}>
                    <input  ref={ref} defaultValue={window.document.location.href} />
                    <button onClick={()=>handleCopyURL()} className={'url__copy__btn'}>URL 복사</button>
                </div>
                <hr/>
            </article>
        </div>}
        
    </section>);
}
export default CommentHeader;