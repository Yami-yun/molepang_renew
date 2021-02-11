import React, {useState} from 'react';
import 'css/default.css';
import 'css/comment/CommentForm.css';
import { useDispatch, useSelector } from 'react-redux';
import {ADD_COMMENT} from 'redux/action/types';


function CommentForm(){
    const [nick, setNick] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [comment, setComment] = useState<string>("");
    const dispatch = useDispatch();




    const onCommentAddHandler = (e:any) => {
        e.preventDefault();

        let time = new Date();
        let mon = time.getMonth()+1 < 10 ? `0${time.getMonth()+1}` : `${time.getMonth()+1}`;
        let d = time.getDate() < 10 ? `0${time.getDate()}` : `${time.getDate()}`;
        let h = time.getHours() < 10 ? `0${time.getHours()}` : `${time.getHours()}`;
        let min = time.getMinutes() < 10 ? `0${time.getMinutes()}` : `${time.getMinutes()}`;
        
        let date = `${time.getFullYear()}.${mon}.${d} ${h}:${min}`;

        const data = {
            nick,
            password,
            comment,
            date,
        }

        // 데이터 저장
        dispatch({type: ADD_COMMENT, result: data});

        setNick("");
        setComment("");
        setPassword("");

    }
    return (
    <section>
        <form className={'comment__form'}>
            <div className={'first__form__line'}>
                <div>
                    <input placeholder={'닉네임'} value={nick} onChange={(e)=>setNick(e.target.value)}/>
                    <input placeholder={'비밀번호'} value={password} type="password" onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <button type="submit" onClick={(e)=>onCommentAddHandler(e)}>등록하기</button>
            </div>
            <textarea placeholder={'모두 한글 두더지 팡 놀이에 대한 자유로운 생각을 나눠 보세요.'} value={comment} onChange={(e)=>setComment(e.target.value)}></textarea>
        </form>


        
    </section>);
}
export default CommentForm;