import React, { useState } from 'react';
import 'css/default.css';
import 'css/comment/CommentBox.css';
import { ICommentData } from 'comment/component/CommentInterface';
import { useDispatch } from 'react-redux';
import { DELETE_COMMENT } from 'redux/action/types';
import { deleteComment } from 'redux/action/commentAction';
import CommentModalBox from 'comment/component/CommentModalBox';
import CommentReplyBox from 'comment/component/CommentReplyBox';


// 코멘트 박스 컴포넌트
function CommentBox({nick, date, comment, id}: ICommentData){
    const dispatch = useDispatch();
    const [isShowModal, setIsShowModal] = useState<boolean>(false);         // 모달 창이 화면에 보여지는 여부
    const [modalType, setModalType] = useState(0);             // 모달 타입을 결정하는 값 ,  0 : 삭제, 1 : 수정, 2 : 삭제
    const [isReply, setIsReply] = useState<boolean>(false);             // 모달 타입을 결정하는 값 ,  false : 삭제, true : 수정

    // 코멘트 수정 모달창 출력 핸들러
    const onModifyHandler = () => {
        setIsShowModal(true);
        setModalType(1);
        setIsReply(false);

    }

    // 코멘트 제거 모달창 출력 핸들러
    const onDeleteHandler = (id:number) => {
        setIsShowModal(true);
        setModalType(0);
        setIsReply(false);

    }

    const onReplyHandler = (id:number) => {
        setIsShowModal(true);
        setIsReply(true);
    }



    const replyDummy = () => {
        let tmp = [];
        for(let i = 0; i < 2; i++){
            tmp.push({
                nick:`ttt${i}`,
                date:"2020.01.01",
                comment:"aaaaaaaaaaaaaaaaaaaaa" + i.toString(),
                id: i,
            })
        }
        return tmp;
    }

    return (
    <>
        {isShowModal && <CommentModalBox type={modalType} setIsShowModal={setIsShowModal} id={id} comment={comment} isReply={isReply}/>}
        <section className={'commentbox'}>
            <div className={'commentbox__first__line'}>
                <div>
                    <h2>{nick}</h2>
                    <p>{date}</p>
                </div>
                
                <div className={'commentbox__btn__list'}>
                    <button onClick={onModifyHandler}>수정</button>
                    <div>/</div>
                    <button onClick={()=>onDeleteHandler(id)}>삭제</button>
                    <button onClick={()=>onReplyHandler(id)}>답글 쓰기</button>
                </div>
            </div>

            <p>{comment}</p>
            <section >
                {replyDummy().map((value, index) => (<CommentReplyBox {...value} />) )}
            </section>

        </section>
    </>
    );
}
export default CommentBox;