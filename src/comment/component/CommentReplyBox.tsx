import React, { useState } from 'react';
import 'css/default.css';
import 'css/comment/CommentReplyBox.css';
import { ICommentData } from 'comment/component/CommentInterface';
import { useDispatch } from 'react-redux';
import { DELETE_COMMENT } from 'redux/action/types';
import { deleteComment } from 'redux/action/commentAction';
import CommentModalBox from 'comment/component/CommentModalBox';


// 코멘트 박스 컴포넌트
function CommentReplyBox({nick, date, comment, id}: ICommentData){
    const dispatch = useDispatch();
    const [isShowModal, setIsShowModal] = useState<boolean>(false);         // 모달 창이 화면에 보여지는 여부
    const [modalType, setModalType] = useState<boolean>(false);             // 모달 타입을 결정하는 값 ,  false : 삭제, true : 수정

    
    // 코멘트 수정 모달창 출력 핸들러
    const onModifyHandler = () => {
        setIsShowModal(true);
        setModalType(true);
    }

    // 코멘트 제거 모달창 출력 핸들러
    const onDeleteHandler = (id:number) => {
        setIsShowModal(true);
        setModalType(false);
    }


    return (
    <>
        {isShowModal && <CommentModalBox type={modalType} setIsShowModal={setIsShowModal} id={id} comment={comment} />}
        <section className={'commentreplybox'}>
            <div className={'commentreplybox__first__line'}>
                <div>
                    <h2>{nick}</h2>
                    <p>{date}</p>
                </div>
                
                <div className={'commentreplybox__btn__list'}>
                    <button onClick={onModifyHandler}>수정</button>
                    <div>/</div>
                    <button onClick={()=>onDeleteHandler(id)}>삭제</button>
                </div>
            </div>

            <p>{comment}</p>

        </section>
    </>
    );
}
export default CommentReplyBox;