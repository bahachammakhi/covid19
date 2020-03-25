import React, { useState, useEffect } from 'react';
import { Row, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const MediaPic = ({ user, logout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);
  return (
    <div>
      {/* <img alt={user.name} src={randomName} className="img-thumbnail rounded-circle row ml-3 mt-3" /> */}
      <Row>
        <span className=" font-weight-bold h5 text-center mt-3 ml-3 row">{user.name}</span>
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle nav>
            <i className="fas fa-sort-down text-dark ml-3 h5"></i>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem className="text-muted h6">Profile</DropdownItem>
            <DropdownItem className="text-muted h6">Bar Action</DropdownItem>

            <DropdownItem divider />
            <DropdownItem
              onClick={() => {
                logout();
              }}
              className="text-muted h6"
            >
              <i className="fas fa-sign-out-alt mr-3 "></i>Sign out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Row>
      <span className="font-weight-lighter h6 ml-4 text-muted mb-3">Just some tests</span>
    </div>
  );
};
export default MediaPic;
