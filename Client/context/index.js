import axios from "axios";

const { createContext, useReducer, useEffect } = require("react");
//create initial state
const initialState = {
    user:null
}
// create context
const Context =createContext();
//create reducer 
const rootReducer =(state,action)=>{
    switch(action.type){
        case 'LOGIN':
            return {...state,user:action.payload}
        case 'LOGOUT':
            return {...state,user:null}
        default:
            return state;
    } 
};
//create provider
const Provider=({children})=>{
    const [state,dispatch]=useReducer(rootReducer,initialState);
    useEffect(()=>{
        dispatch({
            type:"LOGIN",
            payload:JSON.parse(window.localStorage.getItem('user'))
        })
    },[])

    axios.interceptors.response.use(
        function(response){
            //any status code that lie within the range of 2xx cause this function to trigger
            return response;
        },
        function (error){
            //any status code that falls outside the range of 2xx cause this function to trigger
            let res = error.response;
            if(res.status===401 && res.config&&!res.config.__isRetryRequest){
                return new Promise((resolve,reject)=>{
                    axios.get('/api/logout').then((data)=>{
                        console.log('/401 error>logout');
                        dispatch({type:'LOGOUT'});
                        window.localStorage.removeItem('user');
                        Router.push('/login')
                    }).catch((err)=>{
                        console.log('AXIOS INTERCEPTORS ERR',err);
                        reject(error);
                    });
                })
            }
        }
    )
    return(
        <Context.Provider value={{state,dispatch}}>{children}</Context.Provider>
    );
};
export {Context,Provider};