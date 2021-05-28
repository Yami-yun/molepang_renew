import React, { useState } from 'react';
import 'css/default.css';
import 'css/comment/CommentBox.css';
import { useDispatch } from 'react-redux';
import { DELETE_COMMENT } from 'redux/action/types';
import { deleteComment } from 'redux/action/commentAction';
import CommentModalBox from 'comment/component/CommentModalBox';
import CommentReplyBox from 'comment/component/CommentReplyBox';
import { type_comment, type_reply_set } from 'redux/reducer/commentReducer';

// interface type_reply_set{
// }
// content: "test"
// create_date: "2021-05-27T11:09:21.348535+09:00"
// id: 1
// nickname: "test"
// reply_set: []
// update_date: "2021-05-27T11:09:21.348611+09:00"
// 코멘트 박스 컴포넌트
function CommentBox({nickname, create_date, content, id, reply_set}: type_comment){
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
        {isShowModal && <CommentModalBox type={modalType} setIsShowModal={setIsShowModal} id={id} comment={content} isReply={isReply}/>}
        <section className={'commentbox'}>
            <div className={'commentbox__first__line'}>
                <div>
                    <h2>{nickname}</h2>
                    <p>{create_date.slice(0, 10)}</p>
                </div>
                
                <div className={'commentbox__btn__list'}>
                    <button onClick={onModifyHandler}>수정</button>
                    <div>/</div>
                    <button onClick={()=>onDeleteHandler(id)}>삭제</button>
                    <button onClick={()=>onReplyHandler(id)}>답글 쓰기</button>
                </div>
            </div>

            <p>{content}</p>
            <section >
                {reply_set.map((value:type_reply_set, index:number) => (<CommentReplyBox key={index} {...value} />) )}
            </section>

        </section>
    </>
    );
}
export default CommentBox;