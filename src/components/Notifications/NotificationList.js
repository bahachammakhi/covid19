import React from 'react';
import faker from 'faker';
import { List } from 'antd';
import Notification from './Notification';

const NotificationList = ({ data }) => {
  const lists = data.map((el, index) => {
    let test = faker.helpers.contextualCard();
    let status = index % 2 === 0 ? 'success' : 'negative';
    let time = faker.date.future().toString();
    let text = test.company.bs;
    return <Notification key={index} message={text} time={time} status={status} />;
  });
  return (
    <List itemLayout="vertical" size="large">
      {lists}
    </List>
  );
};

export default NotificationList;
