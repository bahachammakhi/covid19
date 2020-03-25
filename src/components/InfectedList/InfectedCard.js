import React from 'react';

import { ListGroupItem } from 'reactstrap';

const InfectedCard = ({ name, src, status }) => {
  return (
    <ListGroupItem
      className="justify-content-between"
      style={{ backgroundColor: '#ddd5d0', cursor: 'pointer' }}
    >
      <i className={`fa fa-circle mr-1 ${status ? 'text-success' : 'text-danger'}`}></i>
      <img alt={name} src={src} className="img-thumbnail w-25 rounded-circle  " />
      <span className="">{name}</span>
    </ListGroupItem>
  );
};

export default InfectedCard;
