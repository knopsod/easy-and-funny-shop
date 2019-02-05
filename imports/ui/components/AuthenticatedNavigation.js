import React from 'react';
import { browserHistory } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';

const handleLogout = () => Meteor.logout(() => browserHistory.push('/login'));

const userName = () => {
  const user = Meteor.user();
  const name = user && user.profile ? user.profile.name : '';
  return user ? `${name.first} ${name.last}` : '';
};

const AuthenticatedNavigation = () => (
  <div>
    <Nav>
      <LinkContainer to="/documents">
        <NavItem eventKey={ 2 } href="/documents">บริหารการขาย</NavItem>
      </LinkContainer>
      <LinkContainer to="/members">
        <NavItem eventKey={ 4 } href="/members">สมาชิก</NavItem>
      </LinkContainer>
      <LinkContainer to="/opensource">
        <NavItem eventKey={ 5 } href="/opensource">โอเพ่นซอร์ส</NavItem>
      </LinkContainer>
    </Nav>
    <Nav pullRight>
      <NavDropdown eventKey={ 3 } title={ userName() } id="basic-nav-dropdown">
        <MenuItem eventKey={ 3.1 } onClick={ handleLogout }>ออกจากระบบ</MenuItem>
      </NavDropdown>
    </Nav>
  </div>
);

export default AuthenticatedNavigation;
