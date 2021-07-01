import React, { useState } from 'react';
import 'css/default.css';
import 'css/comment/CommentReplyBox.css';
import { useDispatch } from 'react-redux';
import { deleteComment } from 'redux/action/commentAction';
import CommentModalBox from 'comment/component/CommentModalBox';
import { type_reply_set } from 'redux/reducer/commentReducer';

type type_comment_reply_box = {
    reply_set:{
        content:string;
        create_date:string;
        id: number;
        nickname:string;
        update_date?:string;
    }
    p_id:number;

}
//{nickname, create_date, content, id, p_id}
// 코멘트 박스 컴포넌트
function CommentReplyBox(props:type_comment_reply_box){
    const dispatch = useDispatch();
    const [isShowModal, setIsShowModal] = useState<boolean>(false);         // 모달 창이 화면에 보여지는 여부
    const [modalType, setModalType] = useState<boolean>(false);             // 모달 타입을 결정하는 값 ,  false : 삭제, true : 수정

    
    // 코멘트 수정 모달창 출력 핸들러
    const onModifyHandler = () => {
        setIsShowModal(true);
        setModalType(true);
    }

    // 코멘트 제거 모달창 출력 핸들러
    const onDeleteHandler = () => {
        setModalType(false);
        setIsShowModal(true);
    }


    return (
    <>
        {isShowModal && <CommentModalBox nickname={props.reply_set.nickname} type={modalType} setIsShowModal={setIsShowModal} p_id={props.p_id}
        id={props.reply_set.id} content={props.reply_set.content} />}

        <section className={'commentreplybox'}>
            <div className={'commentreplybox__first__line'}>
                <div>
                    <h2>{props.reply_set.nickname}</h2>
                    <p>{props.reply_set.create_date.slice(0, 10) + ` ${props.reply_set.create_date.slice(11, 16)}`}</p>
                </div>
                
                <div className={'commentreplybox__btn__list'}>
                    <button onClick={onModifyHandler}>수정</button>
                    <div>/</div>
                    <button onClick={()=>onDeleteHandler()}>삭제</button>
                </div>
            </div>

            <p>{props.reply_set.content}</p>

        </section>
    </>
    );
}
export default CommentReplyBox;