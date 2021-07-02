import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

import 'css/default.css';
import 'css/comment/CommentHeader.css';
import exitBtnImg from 'img/button_close.png';

import faceShareBtnImg from 'img/face__share__btn.png';
import kakaoShareBtnImg from 'img/kakao__share__btn.png';
import twiShareBtnImg from 'img/twi__share__btn.png';
import test from 'img/share/kakao_share_img.png'
import { ICommentData } from 'redux/reducer/commentReducer';


function CommentHeader(){
    const comment:ICommentData["commentData"] = useSelector((state:any)=>state.comment.commentData);
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
            // templateId :"56187",
            // requestUrl:`${process.env.REACT_APP_BASE_URL}`,
            
            content: {
                title: '모두 한글 두더지 팡 !',
                description: `모두 모두 농장 밭에 두더지가 나타났어요!! 두더지를 잡고, 한글 단어도 함께 공부해보세요:)`,
                imageUrl: 'https://github.com/Yami-yun/molepang_renew/blob/main/src/img/share/kakao_share_img.png?raw=true',
                // image_width:800,
                // image_height:800,
                link: {
                // mobileWebUrl: `http://localhost:3000/`,
                // webUrl:`http://localhost:3000/`
                mobileWebUrl: `${process.env.REACT_APP_BASE_URL}`,
                webUrl: `${process.env.REACT_APP_BASE_URL}`
                // mobileWebUrl: 'https://yami-yun.github.io/molepang_renew/',
                // webUrl: 'https://yami-yun.github.io/molepang_renew/'
                },
            },
            buttons: [
                {
                    title: '게임 하러 가기',
                    link: {
                        mobileWebUrl: `${process.env.REACT_APP_BASE_URL}`,
                        webUrl: `${process.env.REACT_APP_BASE_URL}`
                    },
                },
            ],

        });
    }

    const handleFacebookShare = () => {
        console.log("test");
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${process.env.REACT_APP_BASE_URL}`);
        // window.open('https://www.facebook.com/sharer/sharer.php?u=u=https%3A%2F%2Fyami-yun.github.io%2Fmolepang_renew%2F&amp;src=sdkpreparse');
    }

    const handleTwitterkShare = () => {
        // window.open(`https://www.twitter.com/intent/tweet?&url=${process.env.REACT_APP_BASE_URL}`);
        // window.open('https://www.twitter.com/intent/tweet?&url=https://yami-yun.github.io/molepang_renew/');
        // window.open("https://twitter.com/intent/tweet?text=" + sendText + "&url=" + sendUrl);
        window.open(`https://twitter.com/intent/tweet?&url=${process.env.REACT_APP_BASE_URL}`);
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
            <p className={'comment__count'}>( {comment.count} )</p>
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