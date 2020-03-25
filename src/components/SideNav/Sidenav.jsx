import React from 'react';
import { Nav } from 'reactstrap';
import { Layout, Menu } from 'antd';
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar';
import classes from './sidenav.module.scss';
import MediaPic from '../MediaComponent/MediaPic';

import InfectedList from '../InfectedList/InfectedList';

const Sidenav = ({ logout, user }) => {
  return (
    <Menu style={{ padding: '5%' }} theme="light" mode="inline">
      <MediaPic logout={logout} user={user} />
      <div style={{ paddingTop: '5%' }}>
        <InfectedList />
      </div>
    </Menu>
  );
};

export default Sidenav;
