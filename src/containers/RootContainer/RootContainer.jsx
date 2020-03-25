import React from 'react';
import { Switch, Route } from 'react-router-dom';
import DefaultLayout from '../../components/layout/DefaultLayout/DefaultLayout';
import AntLayout from '../../components/layout/DefaultLayout/AntLayout';
import HomeContainer from '../homecontainer/HomeContainer';
import LoginContainer from '../loginContainer/LoginContainer';
import AddSuspectContainer from '../addSuspectContainer/AddSuspectContainer';
import SuspectsContainer from '../suspectsContainer/SuspectsContainer';
import BracletContainer from '../bracletsContainer/BracletContainer';
import UserContainer from '../usersContainer/UsersContainer';
import { Result, Button } from 'antd';

const RootContainer = () => {
  return (
    <Switch>
      <AntLayout exact path="/" component={HomeContainer} />
      <Route exact path="/login" component={LoginContainer} />
      <AntLayout path="/suspects" component={SuspectsContainer} />
      <AntLayout path="/braclets" component={BracletContainer} />
      <AntLayout path="/users" component={UserContainer} />
      <Route
        path="*"
        render={props => (
          <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={
              <Button type="primary" onClick={() => props.history.push('/')}>
                Back Home
              </Button>
            }
          />
        )}
      />
    </Switch>
  );
};

export default RootContainer;
