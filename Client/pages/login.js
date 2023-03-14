import React, { useContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { SyncOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { Context } from '../context';
import {useRouter} from 'next/router';
const Login= () => {


    //global state
    const {state,dispatch}=useContext(Context)
    console.log(state)
   
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    //router
const router=useRouter();

    const emailChangeHandler = (event) => {
        setEmail(event.target.value);
    };
    const passwordChangeHandler = (event) => {
        setPassword(event.target.value);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        //console.table({name,email,password})
        try {
            setLoading(true);
            
            const { data } = await axios.post(`/api/login`, {
              
                email,
                password,
            });
            console.log(data)
           dispatch({type:'LOGIN',payload:data})
           window.localStorage.setItem('user',JSON.stringify(data));
           //router
           router.push('/');
            setLoading(false);
         
        } catch (err) {
            setLoading(false);
            toast.error(err.response.data);
        }
    };
    return (
        <>
            <h1 className="jumbotron">Login</h1>
            <div className="container col-md-4 offset-md-4 pb-5">
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        className="form-control mb-4 p-4"
                        value={email}
                        onChange={emailChangeHandler}
                        placeholder="Enter Email"
                        required
                    />
                    <input
                        type="password"
                        className="form-control mb-4 p-4"
                        value={password}
                        onChange={passwordChangeHandler}
                        placeholder="Enter Password"
                        required
                    />
                    <button
                        className="btn col-12 btn-primary"
                        type="submit"
                        disabled={!email || !password || loading}
                    >
                        {loading ? <SyncOutlined spin /> : 'Submit'}
                    </button>
                </form>
                <p className="text-center p-2">
                    Not Yet Register?<Link href="/register">Register</Link>
                </p>
            </div>
        </>
    );
};
export default Login;
