import { Menu } from 'antd';
import Link from 'next/link';
import {
    AppstoreOutlined,
    LoginOutlined,
    UserAddOutlined,
} from '@ant-design/icons';
import { useEffect, useState } from 'react';

const { Item } = Menu;
const TopNav = () => {
    const[current,setCurrent]=useState();
    useEffect(() => {
        //window.location.pathname give the url
        //ensure it in browser
        console.log(window.location.pathname)
        typeof window !== 'undefined' && setCurrent(window.location.pathname);
    }, [typeof window !== 'undefined' && window.location.pathname]);

    return (
        <Menu mode="horizontal" selectedKeys={[current]}>
            <Item
                key="/"
                onClick={(e) => set(e.key)}
                icon={<AppstoreOutlined />}
            >
                <Link href="/" legacyBehavior>
                    <a>App</a>
                </Link>
            </Item>
            <Item
                onClick={(e) => set(e.key)}
                key="/login"
                icon={<LoginOutlined />}
            >
                <Link href="/login" legacyBehavior>
                    <a>Login</a>
                </Link>
            </Item>
            <Item
                onClick={(e) => set(e.key)}
                key="/register"
                icon={<UserAddOutlined />}
            >
                <Link href="/register" legacyBehavior>
                    <a>Register</a>
                </Link>
            </Item>
        </Menu>
    );
};
export default TopNav;
