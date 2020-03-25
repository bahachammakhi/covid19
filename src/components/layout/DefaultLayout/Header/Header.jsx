import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from 'reactstrap';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';

import { Menu } from 'antd';
import NotificationList from '../../../Notifications/NotificationList';
import classes from './header.module.scss';
const { SubMenu } = Menu;

const HeaderComp = ({ location, handlePush }) => {
  const [current, setCurrent] = useState(location.pathname);

  const handleClick = e => {
    setCurrent(e.key);
    handlePush(e.key);
  };
  const data = ['', '', '', '', ''];
  return (
    <Menu
      style={{ height: '65px', padding: '10px' }}
      onClick={handleClick}
      selectedKeys={[current]}
      mode="horizontal"
    >
      {/* <span className={classes.title}>stay at home</span> */}
      <Menu.Item key="/">
        <HomeOutlined />
        Home
      </Menu.Item>
      <Menu.Item key="/users">
        <UserOutlined />
        Users
      </Menu.Item>
      <Menu.Item key="/suspects">
        <UserOutlined />
        Suspects
      </Menu.Item>
      <Menu.Item key="/braclets">
        <UserOutlined />
        Braclets
      </Menu.Item>
      <SubMenu
        style={{ position: 'absolute', right: '5%', top: '2%' }}
        title={
          <div>
            <Badge color="info">{data.length}</Badge> <i className="fas fa-bell "></i>
          </div>
        }
      >
        <NotificationList data={data} />
      </SubMenu>
    </Menu>
  );
};

export default HeaderComp;
