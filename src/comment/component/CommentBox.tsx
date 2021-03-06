import React, { useState } from 'react';
import 'css/default.css';
import 'css/comment/CommentBox.css';
import { ICommentData } from 'comment/component/CommentInterface';
import { useDispatch } from 'react-redux';
import { DELETE_COMMENT } from 'redux/action/types';
import { deleteComment } from 'redux/action/commentAction';
import CommentModalBox from 'comment/component/CommentModalBox';


// 코멘트 박스 컴포넌트
function CommentBox({nick, date, comment, id}: ICommentData){
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
        {isShowModal && <CommentModalBox type={modalType} setIsShowModal={setIsShowModal} id={id} comment={comment}/>}
        <section className={'commentbox'}>
            <div className={'commentbox__first__line'}>
                <div>
                    <h2>{nick}</h2>
                    <p>{date}</p>
                </div>
                
                <div className={'commentbox__btn__list'}>
                    <button onClick={onModifyHandler}>수정</button> / 
                    <button onClick={()=>onDeleteHandler(id)}>삭제</button>
                    <button>댓글 쓰기</button>
                </div>
            </div>

            <p>{comment}</p>

        </section>
    </>
    );
}
export default CommentBox;