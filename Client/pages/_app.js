import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/reset.css';
import '../public/css/styles.css';
import TopNav from '../Components/TopNav';
// import ToastContainer  from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
function MyApp({Component,pageProps}){
    return (
        <>
        <ToastContainer position='top-center'/>
            <TopNav />
            <Component {...pageProps} />
        </>
    );
}
export default MyApp;