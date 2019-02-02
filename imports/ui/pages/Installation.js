import React from 'react';
import { Link } from 'react-router';
import { Row, Col, Button } from 'react-bootstrap';

const Installation = () => (
  <div className="Installation">
    <Row>
      <Col xs={ 12 }>
        <div className="page-header clearfix">
          <h4 className="pull-left">การติดตั้ง</h4>
        </div>
        <a href="https://github.com/knopsod/easy-and-funny-shop"
          target="_blank">
          https://github.com/knopsod/easy-and-funny-shop</a>
      </Col>
    </Row>
  </div>
);

export default Installation;
