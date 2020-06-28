import React, { useState, useCallback } from 'react';  
import AppLayout from '../components/AppLayout';
import Head from 'next/head';
import{ Form, Input, Checkbox, Button } from 'antd';

// useCallback으로 감싸주는 이유
//함수컴포넌트가 스테이트가 바뀔때마다 전체가  통쨰로 재실행되면서 함수들이 새로 생성된다 !!
//그것이 뜻하는 바는 ? 함수를전달받은 자신컴포넌트들은 , 렌더링을 다시한다는것.
//함수도 객체기때문에 새로생성되면 다른객체가 되는데, 그러면 의도치 않은 리렌더링이 발생하기 때문에,
//자식컴포넌트에 전달하는 함수는 전부 useCallback으로 감싸줘야 한다.
const signup = () => { 
    const[passCheck , setPassCheck] = useState('');
    const[term, setTerm] = useState(false);
    const[passwordError, setPasswordError] = useState(false);
    const[termError, setTermError] = useState(false);

    // 커스텀 훅.
    const useInput = (initValue = null) =>{
        const [ value, setter] = useState(initValue);
        const handler = useCallback( (e) =>{
            setter(e.target.value);
        }, []);
        return [value, handler];
    }
 
    const[id, onChangeId] = useInput('');
    const[nick, onChangeNick] = useInput('');
    const[password, onChangePass] = useInput('');

    const onSubmit = useCallback( (e) => {
        e.preventDefault();
        console.log({id, nick, password, passCheck,term, });
        if(password!== passCheck){
            return setPasswordError(true);
        }
        if(!term){
            return setTermError(true);
        }
    },[ password, passCheck, term]); //함수내부에 쓰이는 State들을 dependency배열에 넣어준다.

    //props로 값을 전달 받을때, 하위요소에있는 놈이. 화면 전체가 리렌더링 되는 것을 막기 위해 useCallBack을 쓴다?

    //커스텀훅만들어서 더이상 안쓴다.
    // const onChangeId = (e) => {
    //     setId(e.target.value);
    // };
    // const onChangeNick = (e) => {
    //     setNick(e.target.value);
    // };
    // const onChangePass = (e) => {
    //     setPass(e.target.value);
    // };
    const onChangePassCheck = useCallback((e) => {
        setPasswordError(e.target.value !== password);
        setPassCheck(e.target.value);
    },[password]);
    const onChagneTerm = useCallback( (e) => {
        setTermError(false);
        setTerm(e.target.checked);
    },[]);
 
    return<>
        <Head>
            <title>node bird</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css"/>
        </Head>
        <AppLayout> 
            <Form onSubmit={onSubmit} stype={{padding:10}}>
                <div>
                    <label htmlFor="user-id">id</label>
                    <Input name="user-id" value={id} required onChange={onChangeId} />
                </div>
                <div>
                    <label htmlFor="user-nick">nickname</label>
                    <Input name="user-nick" value={nick} required onChange={onChangeNick} />
                </div>
                <div>
                    <label htmlFor="user-pass">password</label>
                    <Input name="user-pass" type="password" value={password} required onChange={onChangePass} />
                </div>
                <div>
                    <label htmlFor="user-pass-chk">confirm pass</label>
                    <Input name="user-pass-chk" type="password" value={passCheck} required onChange={onChangePassCheck} />
                    {passwordError && <div style={{color:'red'}}>비밀번호가 일치하지 않습니다.</div>}
                </div>
                <div>
                    <Checkbox name="user-term" value={term} onChange={onChagneTerm}>
                        블라블라 내용에 동의합니다.
                    </Checkbox>
                    { termError && <div style={{color:'red'}}>약관에 동의하셔야 합니다.</div>}
                </div>
                <div stype={{marginTop:10}}>
                    <Button type="primary" htmlType="submit">가입하기</Button>
                </div>
        </Form>
        </AppLayout> 
    </>
           
};

export default signup;