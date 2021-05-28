import React, {useState} from 'react';
import 'css/default.css';
import 'css/comment/CommentForm.css';
import { useDispatch, useSelector } from 'react-redux';
import {ADD_COMMENT} from 'redux/action/types';
import moment from 'moment';
import { ICommentRequestData } from 'comment/component/CommentInterface';
import { addComment } from 'redux/action/commentAction';

// 코멘트 입력 폼
function CommentForm(){
    const [nickname, setNickname] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const dispatch = useDispatch();

    // 코멘트 추가 핸들러
    const onCommentAddHandler = (e:any) => {
        e.preventDefault();

        if(nickname === "") return alert("닉네임을 입력해주세요");
        if(content === "") return alert("내용을 입력해주세요");
        if(password === "") return alert("비밀 번호를 입력해주세요");
        
        let date = moment().format("YYYY.MM.DD hh:mm")
        const data = new FormData();
        data.append('nickname', nickname);
        data.append('password', password);
        data.append('content', content);
        // const data:ICommentRequestData = {
        //     nickname,
        //     password,
        //     content,
        // }

        const tmp = addComment(data);
        tmp(dispatch);
        // 데이터 저장
        // dispatch({type: ADD_COMMENT, payload: data});

        setNickname("");
        setContent("");
        setPassword("");
    }
    return (
    <section>
        <form className={'comment__form'}>
            <div className={'first__form__line'}>
                <div>
                    <input placeholder={'닉네임'} value={nickname} onChange={(e)=>setNickname(e.target.value)}/>
                    <input placeholder={'비밀번호'} value={password} type="password" onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <button type="submit" onClick={(e)=>onCommentAddHandler(e)}>등록하기</button>
            </div>
            <textarea placeholder={'모두 한글 두더지 팡 놀이에 대한 자유로운 생각을 나눠 보세요.'} value={content} onChange={(e)=>setContent(e.target.value)}></textarea>
        </form>


        
    </section>);
}
export default CommentForm;