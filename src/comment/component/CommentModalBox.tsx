import React, { useState } from 'react';
import 'css/default.css';
import 'css/comment/CommentModalBox.css';

function CommentModalBox(){
    const [screen, setScreen] = useState<number>(0);
    const onScreenHandler = () => {

    }

    return (
    <article className={'comment__modal__layout'}>
        <div className={'comment__modal__header'}>댓글 수정 &nbsp;&nbsp;|&nbsp;&nbsp; 삭제</div>
        {screen === 0 && 
        <>
            <div className={'method__txt__list'}>
                <div>수정</div>
                <div>삭제</div>
            </div>
            <p>댓글 작성 시 입력한 비밀번호를 입력해주세요</p>
            <input></input>
            <button >취소</button>
            <button onClick={()=>setScreen(1)}>확인</button>
        </>
        }
        {screen === 1 && 
        <>
            <p className={'comment__modal__id'}>누누</p>
            
            <textarea></textarea>
            <div className={'btn__list'}>
                <button >취소</button>
                <button onClick={()=>setScreen(2)}>확인</button>
            </div>
        
        </>
        }
        {screen === 2 && 
        <>
            <div className={'input__list'}>
                <input placeholder={'닉네임'}/>
                <input onClick={()=>setScreen(2)} placeholder={'비밀번호'}/>
            </div>
            
            <textarea placeholder={`인터넷은 우리가 함께 만들어가는 소중한 공간입니다.
댓글 작성 시 타인에 대한 배려와 책임을 담아주세요.`}></textarea>
            <div className={'btn__list'}>
                <button >취소</button>
                <button onClick={()=>setScreen(3)}>확인</button>
            </div>
        </>
        }
        {screen === 3 && 
        <>
            <p className={'error__title'}>댓글을 수정할 수 없습니다</p>
            <p>비밀번호를 다시 확인해주세요</p>
            <button onClick={()=>setScreen(0)}>뒤로 가기</button>
        </>
        }
    </article>);
}
export default CommentModalBox;