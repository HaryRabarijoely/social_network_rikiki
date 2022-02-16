import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Menu } from 'antd';
import { UsergroupAddOutlined, HomeOutlined, PoweroffOutlined, TeamOutlined } from '@ant-design/icons';
import Cookies from 'js-cookie';
import { logOut } from "../../store/userActions";


const Navbar = () => {
    const userToken = useSelector(state => state.token);
    const dispatch = useDispatch();
    let navbarItems;
    (userToken == null) ?
        navbarItems = <>
            <Menu.Item key="register" icon={<UsergroupAddOutlined />}>
                <Link to={`/register`}>S'inscrire</Link>
            </Menu.Item>
            <Menu.Item key="login" icon={<PoweroffOutlined />}>
                <Link to={`/login`}>Se connecter</Link>
            </Menu.Item>
        </>
        : navbarItems = <>
            <Menu.Item key="profile" icon={<TeamOutlined />}>
                <Link to={`profile`}>Mon profile</Link>
            </Menu.Item>
            <Menu.Item key="logout" icon={<PoweroffOutlined />}>
                <Link to={`/`} onClick={() => { dispatch(logOut()); Cookies.remove('token'); Cookies.remove('id'); Cookies.remove('isLoggedIn') }}>Se déconnecter</Link>
            </Menu.Item>
        </>
    return (
        <Menu mode="horizontal">
            <Menu.Item key="home" icon={<HomeOutlined />}>
                <Link to={`/`}>Accueil</Link>
            </Menu.Item>
            {navbarItems}
        </Menu>
    );
};

export default Navbar;