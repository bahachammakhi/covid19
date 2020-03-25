import React, { useState, useRef, useEffect } from 'react';
import useCurrentWitdh from '../../../hooks/useCurrentWidth';
import loginActions from '../../../redux/loginRequest/LoginRequestRedux';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Route } from 'react-router-dom';
import classes from './layout.module.scss';
import { Container, Row, Col } from 'reactstrap';
import Header from './Header/Header';
import Sidenav from '../../SideNav/Sidenav';

const DefaultLayout = ({ ...props }) => {
  const redux = useSelector(state => state);
  const dispatch = useDispatch();
  const [responsive, setResponsive] = useState(false);
  const [openside, setOpenside] = useState(false);
  const [userData, setUserData] = useState({});
  let width = useCurrentWitdh();
  const history = useHistory();
  // const width = useRef(window.innerWidth);
  useEffect(() => {
    if (window.innerWidth < 768) {
      setResponsive(true);
    } else {
      setResponsive(false);
    }
    window.current = window.innerWidth;
  }, [width]);
  useEffect(() => {
    if (!redux?.login?.response?.token) history.push('/login');
    if (redux?.login?.response) setUserData(redux.login.response);
  }, []);

  const logout = () => {
    dispatch(loginActions.logout());
    history.push('/login');
  };

  return (
    <Container fluid={true} className={classes.wrapper}>
      <Row>
        <Col
          className={classes.sidenav}
          md="3"
          xs={responsive && openside ? 10 : responsive ? 1 : 3}
          lg="3"
          xl="3"
          sm={responsive && openside ? 10 : responsive ? 1 : 3}
        >
          {' '}
          <Sidenav user={userData} logout={logout} />
        </Col>
        <Col
          className={classes.contentside}
          md="9"
          xs={responsive && openside ? 2 : responsive ? 11 : 9}
          lg="9"
          xl="9"
          sm="9"
        >
          <Row>
            {!responsive ? (
              <></>
            ) : (
              <Col
                style={{ height: '10vh', cursor: 'pointer' }}
                onClick={() => setOpenside(!openside)}
                xs={responsive && openside ? 12 : 2}
                sm={responsive && openside ? 12 : 2}
                lg="0"
              >
                <i className="fas fa-external-link-alt h5 mt-4 ml-3"></i>
              </Col>
            )}{' '}
            {responsive && openside ? (
              <> </>
            ) : (
              <Col xs="10" lg="12">
                <Header />
              </Col>
            )}
          </Row>

          <Route {...props} />
        </Col>
      </Row>
    </Container>
  );
};

export default DefaultLayout;
