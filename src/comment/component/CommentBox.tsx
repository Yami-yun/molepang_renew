import React, { useState } from 'react';
import 'css/default.css';
import 'css/comment/CommentBox.css';
import { ICommentData } from 'comment/component/CommentInterface';
import { useDispatch } from 'react-redux';
import { DELETE_COMMENT } from 'redux/action/types';
import { deleteComment } from 'redux/action/commentAction';
import CommentModalBox from 'comment/component/CommentModalBox';



function CommentBox({nick, date, comment, id}: ICommentData){
    const dispatch = useDispatch();
    const [isShowModal, setIsShowModal] = useState<boolean>(false);         // 모달 창이 화면에 보여지는 여부
    const [modalType, setModalType] = useState<boolean>(false);             // 모달 타입을 결정하는 값 ,  false : 삭제, true : 수정
    const onModifyHandler = () => {
        setIsShowModal(true);
        setModalType(true);
    }

    const onDeleteHandler = (id:number) => {
        setIsShowModal(true);
        setModalType(false);
        // const deleteCommentApi = deleteComment(id);
        // deleteCommentApi(dispatch);
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