import React from 'react';
import classes from './notification.module.scss';
import classNames from 'classnames';
import { Row, Col, ListGroupItem } from 'reactstrap';

const Notification = ({ status, message, time }) => {
  return (
    <ListGroupItem className={classes.wrapper}>
      <Row className={classes.wrapper}>
        <Col md="3">
          <i
            className={status === 'success' ? 'fas fa-check-circle ' : 'fas fa-exclamation-circle'}
            style={{ fontSize: '30px', color: status === 'success' ? 'green' : 'red' }}
          ></i>
        </Col>
        <Col className="" md="9">
          <p className={classes.praragraph}>{message}</p>
          <span className={classNames(classes.time, 'text-muted')}>{time}</span>
        </Col>
      </Row>
    </ListGroupItem>
  );
};
export default Notification;
