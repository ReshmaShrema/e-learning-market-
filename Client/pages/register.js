import React,{useState} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Register = () => {
    const[name,setName]=useState('');
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');

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
const {data} = await axios.post(`http://localhost:8000/api/register`,{
            name,email,password
        });
        toast.success('Registration Successfull Please Login');
        //console.log('Register dat ghhga',data)
        }catch(err){
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
                    <button className="btn col-12 btn-primary" type="submit">
                        Register
                    </button>
                </form>
            </div>
        </>
    );
};
export default Register;
