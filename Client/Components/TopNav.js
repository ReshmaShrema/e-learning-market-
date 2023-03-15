import { Menu } from 'antd';
import Link from 'next/link';
import {
    AppstoreOutlined,
    LoginOutlined,
    UserAddOutlined,
    LogoutOutlined,
    CoffeeOutlined,
} from '@ant-design/icons';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../context';
import axios from 'axios';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';


const { Item,SubMenu } = Menu;
const TopNav = () => {
  
    const [current, setCurrent] = useState();
    const { state, dispatch } = useContext(Context); 
     const router = useRouter();
     const {user} = state;
    useEffect(() => {
        //window.location.pathname give the url
        //ensure it in browser
        console.log(window.location.pathname);
        typeof window !== 'undefined' && setCurrent(window.location.pathname);
    }, [typeof window !== 'undefined' && window.location.pathname]);
    const logout = async () => {
      const { data } = await axios.get(`/api/logout`)
        window.localStorage.removeItem('user');
        dispatch({
            type: 'LOGOUT',
        });
        console.log('ddf',data)
        toast.success(data.message);
        router.push('/login');
    };

    return (
        <Menu mode="horizontal" selectedKeys={[current]}>
            <Item
                key="/"
                onClick={(e) => setCurrent(e.key)}
                icon={<AppstoreOutlined />}
            >
                <Link href="/" legacyBehavior>
                    <a>App</a>
                </Link>
            </Item>
            {user === null && (
                <>
                    <Item
                        onClick={(e) => setCurrent(e.key)}
                        key="/login"
                        icon={<LoginOutlined />}
                    >
                        <Link href="/login" legacyBehavior>
                            <a>Login</a>
                        </Link>
                    </Item>
                    <Item
                        onClick={(e) => setCurrent(e.key)}
                        key="/register"
                        icon={<UserAddOutlined />}
                    >
                        <Link href="/register" legacyBehavior>
                            <a>Register</a>
                        </Link>
                    </Item>
                </>
            )}
            {user !== null && (
                // <SubMenu key='001'
                //     icon={CoffeeOutlined}
                //     title={user && user.name}
                //     className="ms-auto"
                // >
                <SubMenu icon={<CoffeeOutlined/>} title={user&&user.name} className='ms-auto'>
                    
                    <Item onClick={logout}>
                        <a>Logout</a>
                    </Item>
                </SubMenu>

                // </SubMenu>
            )}
        </Menu>
    );
};
export default TopNav;
