import React, { useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Col, Container } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import useApi from '../../hooks/useApi';
import useForm from '../../hooks/useForm';
import loginActions from '../../redux/loginRequest/LoginRequestRedux';
import classNames from 'classnames';
import classes from './login.module.scss';
import { loginRequest } from '../../requests/requests';

const LoginContainer = () => {
  const { ...calls } = useApi({ loginRequest });

  const dispatch = useDispatch();
  const redux = useSelector(state => state);

  const initialState = {
    username: '',
    password: '',
  };
  const { handleChange, form, handleReset } = useForm({ initialState });
  const history = useHistory();
  useEffect(() => {
    if (redux?.login?.response?.token) history.push('/');
  }, [redux.login.loaded]);

  return (
    <div>
      <Container>
        <h1 className={classNames(classes.title, 'mt-5')}>Save tunisia</h1>
        <h2 className={classes.signin}>Sign In to Application</h2>
        <p className={classNames(classes.paragraph, 'text-muted mt-5')}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure voluptas aperiam odit, reiciendis
          dicta nihil.
        </p>
        <Form className="mb-3 mt-5 w-50 col-sm-12 col-md-6 offset-md-3 ">
          <FormGroup>
            <Label for="emailAdress">Email Adress</Label>
            <Input
              onChange={handleChange}
              type="text"
              name="username"
              id="emailAdress"
              placeholder="Enter email..."
              className="bg-white"
            />
            <FormText color="muted">We&amp;ll never share your email with anyone else.</FormText>
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              onChange={handleChange}
              type="password"
              name="password"
              id="password"
              placeholder="Password..."
              className="bg-white"
            />
          </FormGroup>
          {/* <FormGroup check>
            <div className="custom-checkbox custom-control custom-control-inline">
              <input type="checkbox" id="rememberPassword" class="custom-control-input" />
              <label class="custom-control-label" for="rememberPassword">
                Remember Password
              </label>
            </div>
          </FormGroup> */}
          <span style={{ color: 'red' }}>{redux.login?.response?.message}</span>
          <Button
            onClick={() => {
              dispatch(loginActions.loginRequest(form));
              // calls.loginRequest.call(form);
            }}
            color="primary mt-3"
            block
          >
            Sign in
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default LoginContainer;
