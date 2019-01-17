import React from 'react';
import { Link } from 'react-router';
import { Row, Col, Button } from 'react-bootstrap';
import MembersList from '../components/MembersList';

const Members = () => (
  <div className="Members">
    <Row>
      <Col xs={ 12 }>
        <div className="page-header clearfix">
          <h4 className="pull-left">สมาชิก</h4>
          <Link to="/members/new">
            <Button
              bsStyle="success"
              className="pull-right"
            >สร้างสมาชิกใหม่</Button>
          </Link>
        </div>
        <MembersList />
      </Col>
    </Row>
  </div>
);

export default Members;
