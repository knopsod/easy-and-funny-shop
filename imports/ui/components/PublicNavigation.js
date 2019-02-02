import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem } from 'react-bootstrap';

const PublicNavigation = () => (
  <div>
    <Nav>
      <LinkContainer to="/installation">
        <NavItem eventKey={ 5 } href="/installation">การติดตั้ง</NavItem>
      </LinkContainer>
    </Nav>
    <Nav pullRight>
      <LinkContainer to="signup">
        <NavItem eventKey={ 1 } href="/signup">สมัครสมาชิก</NavItem>
      </LinkContainer>
      <LinkContainer to="login">
        <NavItem eventKey={ 2 } href="/login">เข้าสู่ระบบ</NavItem>
      </LinkContainer>
    </Nav>
  </div>
);

export default PublicNavigation;
