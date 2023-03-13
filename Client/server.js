//custom server
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const next =require('next');
createProxyMiddleware;

//determin whether in production or development mode
const dev=process.env.NODE_ENV !=='production';
const app = next({dev});
const handle=app.getRequestHandler();

app.prepare().then(()=>{
    //setup proxy
    const server =express()
    if(dev){
        //anytime it hit /api,then this will create proxy middleware,and target the backend
server.use('/api',createProxyMiddleware({
    target:'http://localhost:8000',
    changeOrigin:true,
}))
    }
    //any request comming into the server,next js will handle further
    server.all('*',(req,res)=>{
        return handle(req,res);
    });
    server.listen(3000,(err)=>{
        if(err) throw err;
        console.log('Ready on localhost 8000')
    })
}).catch(err=>{
    console.log('Error',err);
})