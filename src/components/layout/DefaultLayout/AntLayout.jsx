import React, { useState, useRef, useEffect } from 'react';
import loginActions from '../../../redux/loginRequest/LoginRequestRedux';
import refreshActions from '../../../redux/loginRequest/RefreshRequestRedux';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Route } from 'react-router-dom';
import classes from './layout.module.scss';
import { Layout, PageHeader } from 'antd';

import HeaderComp from './Header/Header';
import Sidenav from '../../SideNav/Sidenav';
const { Header, Content, Footer, Sider } = Layout;
const DefaultLayout = ({ ...props }) => {
  const redux = useSelector(state => state);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({});
  const [fetching, setFetching] = useState();
  const history = useHistory();

  useEffect(() => {
    if (!redux?.login?.response?.token) history.push('/login');
    if (redux?.login?.response) setUserData(redux.login.response);
    try {
      console.log('bug');
      axios.interceptors.request.use(
        config => {
          setFetching(true);
          return config;
        },
        error => {
          setFetching(false);
          return Promise.reject(error);
        }
      );
      axios.interceptors.response.use(
        response => {
          if (response.status === 401) {
            logout();
            history.push('/login');
          }
          setFetching(false);
          return response;
        },
        error => {
          if (error.response.status === 401) {
            dispatch(refreshActions.refreshRequest({ refreshToken: localStorage.getItem('refreshToken') }));
          }
          const err = Promise.resolve(error);
          setFetching(false);
          err.then(e => {
            setFetching(false);
          });
          return Promise.reject(error);
        }
      );
    } catch (err) {
      setFetching(false);
    }
  }, []);

  const logout = () => {
    dispatch(loginActions.logout());
    history.push('/login');
  };
  const handlePush = key => {
    history.push(key);
  };

  return (
    <Layout>
      <Sider
        breakpoint="md"
        collapsedWidth="0"
        onBreakpoint={broken => {}}
        onCollapse={(collapsed, type) => {}}
        theme="light"
        width="300px"
        className={classes.boxshadow}
      >
        <span className={classes.title}>stay at home</span>
        <Sidenav user={userData} logout={logout} />
      </Sider>

      <Layout>
        <Header style={{ backgroundColor: 'white' }}>
          <HeaderComp location={history.location} handlePush={handlePush} />
        </Header>

        <Content style={{ margin: history.location.pathname === '/' ? '12px 12px 0' : '24px 16px 0' }}>
          {history.location.pathname === '/' ? (
            <></>
          ) : (
            <PageHeader
              className="site-page-header"
              title={
                <span style={{ textTransform: 'capitalize' }}>
                  {history.location.pathname.split('/').filter(i => i)}
                </span>
              }
              subTitle={history.location.pathname}
            />
          )}
          ,
          <div
            className="site-layout-background"
            style={{ margin: history.location.pathname === '/' ? '0' : '24px 16px 0' }}
          >
            <Route {...props} />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
