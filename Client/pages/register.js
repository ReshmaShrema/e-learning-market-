import React,{useState} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { SyncOutlined } from '@ant-design/icons';

const Register = () => {
    
    const[name,setName]=useState('');
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const[loading,setLoading]=useState(false);

    const nameChangeHandler=(event)=>{
        setName(event.target.value);
    }
    const emailChangeHandler=(event)=>{
        setEmail(event.target.value);
    }
    const passwordChangeHandler=(event)=>{
        setPassword(event.target.value);
    }
    const handleSubmit=async (event)=>{
        event.preventDefault();
        //console.table({name,email,password})
        try{
            setLoading(true);
//const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API}/register`, {
const { data } = await axios.post(`/api/register`, {
    name,
    email,
    password,
});
        toast.success('Registration Successfull Please Login');
        setLoading(false)
        //console.log('Register dat ghhga',data)
        }catch(err){
            setLoading(false);
            toast.error(err.response.data)
        }
        

    }
    return (
        <>
            <h1 className="jumbotron">Register</h1>
            <div className="container col-md-4 offset-md-4 pb-5">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="form-control mb-4 p-4"
                        value={name}
                        onChange={nameChangeHandler}
                        placeholder="Enter Name"
                        required
                    />
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
                    <button className="btn col-12 btn-primary" type="submit" disabled={!name || !email || !password ||loading}>{loading?<SyncOutlined spin/>:"Submit"}
</button>
                </form>
            </div>
        </>
    );
};
export default Register;
