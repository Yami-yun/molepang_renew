import React, { useEffect, useState } from 'react';

import { addReplyComment, checkPassword, deleteComment, getComment, modifyComment } from 'redux/action/commentAction';
import exitBtnImg from 'img/comment__modal__exit__btn.png';

import 'css/default.css';
import 'css/comment/CommentModalBox.css';
import { useDispatch, useSelector } from 'react-redux';
import { ICommentData } from 'redux/reducer/commentReducer';

interface ICommentModalBox{
    type:number,
    setIsShowModal:(value: React.SetStateAction<boolean>) => void,
    id:number,
    content:string,
    nickname:string,
    isReply:boolean,
}

function CommentModalBox({p_id, type, setIsShowModal, id, content, nickname, isReply}:any){

    // false : 삭제, true : 수정
    const [modalType, setModalType] = useState<boolean>(type);
    const [screen, setScreen] = useState<number>(0);
    const [replyNickname, setReplyNickname] = useState<string>("");
    const [replyContent, setReplyContent] = useState<string>("");

    const [password, setPassword] = useState<string>("");
    const [modifiedComment, setModifiedComment] = useState<string>(content);
    const dispatch = useDispatch();
    const page:ICommentData["page"] = useSelector((state:any)=>state.comment.page);
    

    useEffect(() => {
        if(isReply) setScreen(2);

    }, [])

    // 비밀번호 체크 핸들러 > 일치 > 타입에 따른 수정 & 삭제 스탭으로 넘어감
    const onPasswordCheckHandler = () => {
        // const checkPasswordAPI = checkPassword({id, nickname, password});
        checkPassword({p_id, id, nickname, password}).then(
            (res)=>{
                if(res?.data === 204){
                    if(modalType){
                        // 수정 type && 비밀번호 일치할 경우 => 수정 모달창으로 넘어감
                        setScreen(1);
                    }else{
                        // 삭제 type && 비밀번호 일치할 경우
                        const deleteCommentApi = deleteComment({p_id, id, nickname, password});
                        deleteCommentApi(dispatch);
                        setIsShowModal(false);

                        let getCommentApi = getComment(1);
                        getCommentApi(dispatch);
                    }
                }else{
                    //비밀번호가 일치하지 않다면
                    setScreen(3);
                }
            })
        
    }

    // 댓글 수정 핸들러
    const onModifyCommentHandler = () => {
        const modifyCommentAPI = modifyComment({p_id, id, nickname, password, content: modifiedComment});
        modifyCommentAPI(dispatch).then(
            response => {
                if(response){
                    setIsShowModal(false);

                    let getCommentApi = getComment(page.cur);
                    getCommentApi(dispatch);
                }else{
                    alert("잘못된 요청입니다.");
                    setIsShowModal(false);
                }
            }
        );
    }

    // 답글 쓰기
    const onAddReplyCommentHandler = () => {
        if(replyNickname.length > 8) return alert("별명은 7글자 이하로 입력해야 합니다.");
        if(password.length > 8) return alert("비밀번호는 7글자 이하로 입력해야 합니다.");
        if(replyContent.length > 120) return alert("댓글은 7글자 이하로 입력해야 합니다.");

        const addReplyCommentAPI = addReplyComment(id, {nickname: replyNickname, password, content: replyContent});
        addReplyCommentAPI(dispatch).then(
            response => {
                if(response){
                    setIsShowModal(false);
                }else{
                    alert("잘못된 요청입니다.");
                    setIsShowModal(false);
                }
            }
        );
    }

    return (
        <div className={'comment__modal__background'}>
            <article className={'comment__modal__layout'}>
                <img onClick={()=>setIsShowModal(false)} className={'comment__exit__btn'} src={exitBtnImg}/>
                {screen !== 2 && <div className={'comment__modal__header'}>댓글 수정 &nbsp;&nbsp;|&nbsp;&nbsp; 삭제</div>}
                {screen === 2 && <div className={'comment__modal__header'}>댓글 쓰기</div>}


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
                    <p className={'comment__modal__id'}>{nickname}</p>
                    
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
                        <input maxLength={7} onChange={(e:any)=>setReplyNickname(e.target.value)} placeholder={'별명'}/>
                        <input type={'password'} maxLength={7} onChange={(e:any)=>setPassword(e.target.value)} onClick={()=>setScreen(2)} placeholder={'비밀번호'}/>
                    </div>
                    
                    <textarea onChange={(e)=>{setReplyContent(e.target.value)}} placeholder={`인터넷은 우리가 함께 만들어가는 소중한 공간입니다. 댓글 작성 시 타인에 대한 배려와 책임을 담아주세요.`}></textarea>
                    <div className={'btn__list'}>
                        <button >취소</button>
                        <button onClick={onAddReplyCommentHandler}>확인</button>
                    </div>
                </>
                }
                {/* 비밀 번호 불일치 일때 모달 창
                */}
                {screen === 3 && 
                <>
                    <p className={'error__title'}>댓글을 수정할 수 없습니다</p>
                    <p>비밀번호를 다시 확인해주세요</p>
                    <button className={'btn__ok'} onClick={()=>setScreen(0)}>뒤로 가기</button>
                </>
                }
            </article>
        </div>
    
    );
}
export default CommentModalBox;