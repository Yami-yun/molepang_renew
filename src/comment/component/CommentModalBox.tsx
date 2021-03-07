import React, { useState } from 'react';

import { checkPassword, deleteComment, modifyComment } from 'redux/action/commentAction';
import exitBtnImg from 'img/comment__modal__exit__btn.png';

import 'css/default.css';
import 'css/comment/CommentModalBox.css';
import { useDispatch } from 'react-redux';


function CommentModalBox({type, setIsShowModal, id, comment}:any){

    // false : 삭제, true : 수정
    const [modalType, setModalType] = useState<boolean>(type);
    const [screen, setScreen] = useState<number>(0);
    const [password, setPassword] = useState<string>("");
    const [modifiedComment, setModifiedComment] = useState<string>(comment);
    const dispatch = useDispatch();

    const onPasswordCheckHandler = () => {
        const checkPasswordAPI = checkPassword(password);
        checkPasswordAPI(dispatch).then(
            (reason)=>{
                if(reason){
                    if(modalType){
                        // 수정 type && 비밀번호 일치할 경우
                        setScreen(1);
                    }else{
                        // 삭제 type && 비밀번호 일치할 경우
                        const deleteCommentApi = deleteComment(id);
                        deleteCommentApi(dispatch);
                        setIsShowModal(false);
                    }
                }else{
                    //비밀번호가 일치하지 않다면
                    setScreen(3);
                }
            })
        
    }
    const onModifyCommentHandler = () => {

        const modifyCommentAPI = modifyComment({id, text: modifiedComment});
        modifyCommentAPI(dispatch).then(
            response => {
                if(response){
                    setIsShowModal(false);
                }
            }
        );
    }

    return (
        <div className={'comment__modal__background'}>
            <article className={'comment__modal__layout'}>
                <img onClick={()=>setIsShowModal(false)} className={'comment__exit__btn'} src={exitBtnImg}/>
                <div className={'comment__modal__header'}>댓글 수정 &nbsp;&nbsp;|&nbsp;&nbsp; 삭제</div>

                {/* 비밀번호 확인 모달 창 */}
                {screen === 0 && 
                <>
                    <div className={'method__btn__list'}>
                        <div onClick={()=>setModalType(true)} className={(modalType ? 'method__btn__selected' : 'method__btn')}>수정</div>
                        <div className={'method__btn__bar'}></div>
                        <div onClick={()=>setModalType(false)} className={(!modalType ? 'method__btn__selected' : 'method__btn')}>삭제</div>
                    </div>
                    <p className={'pw__input__desc'}>댓글 작성 시 입력한 비밀번호를 입력해주세요</p>
                    <input type={'password'} maxLength={7} onChange={(e:any)=>setPassword(e.target.value)} />
                    <button onClick={()=>setIsShowModal(false)} className={'btn__cancel'}>취소</button>
                    <button onClick={onPasswordCheckHandler} className={'btn__ok'}>확인</button>
                </>}

                {/* 비밀 번호 확인 완료 => 댓글 수정 */}
                {screen === 1 && 
                <>
                    <p className={'comment__modal__id'}>누누</p>
                    
                    <textarea defaultValue={modifiedComment} onChange={(e)=>{setModifiedComment(e.target.value)}}></textarea>
                    <div className={'btn__list'}>
                        <button onClick={()=>setIsShowModal(false)} className={'btn__cancel'}>취소</button>
                        <button className={'btn__ok'} onClick={()=>onModifyCommentHandler()}>확인</button>
                    </div>
                
                </>
                }

                {/* 비밀 번호 확인 완료 => 답글 쓰기 */}
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
                {/* 비밀 번호 불일치 일때 모달 창
                */}
                {screen === 3 && 
                <>
                    <p className={'error__title'}>댓글을 수정할 수 없습니다</p>
                    <p>비밀번호를 다시 확인해주세요</p>
                    <button onClick={()=>setScreen(0)}>뒤로 가기</button>
                </>
                }
            </article>
        </div>
    
    );
}
export default CommentModalBox;