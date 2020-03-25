import React, { useState } from 'react';
import { ListGroup } from 'reactstrap';
// import classes from './sidenav.module.scss';

import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar';
import InfectedCard from './InfectedCard';
import InfectedDetails from '../InfectDetails/InfectedDetails';
import faker from 'faker';
const InfectedList = () => {
  const [modal, setModal] = useState(false);

  const [data, setData] = useState({});

  const toggle = () => setModal(!modal);
  const array = ['f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f'];
  const lists = array.map((el, i) => {
    let status = i % 2 === 0 ? true : false;
    let src = faker.image.avatar();
    let card = faker.helpers.createCard();

    return (
      <div
        onClick={() => {
          setData(card);
          toggle();
        }}
        key={i}
      >
        <InfectedCard name={card.name} src={src} status={status} />
      </div>
    );
  });
  return (
    <>
      <PerfectScrollbar style={{ maxHeight: '60vh', marginRight: '10%' }}>
        <ListGroup>{lists}</ListGroup>

        <InfectedDetails toggle={toggle} modal={modal} data={data} />
      </PerfectScrollbar>
    </>
  );
};

export default InfectedList;
