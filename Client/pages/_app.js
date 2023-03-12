import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/reset.css';
import '../public/css/styles.css'
import TopNav from '../Components/TopNav';
function MyApp({Component,pageProps}){
    return (
        <>
            <TopNav />
            <Component {...pageProps} />
        </>
    );
}
export default MyApp;