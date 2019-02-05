import React from 'react';
import { Link } from 'react-router';
import { Row, Col, Button } from 'react-bootstrap';

const OpenSource = () => (
  <div className="OpenSource">
    <Row>
      <Col xs={ 12 }>
        <div className="page-header clearfix">
          <h4 className="pull-left">โอเพ่นซอร์ส</h4>
        </div>
        <a href="https://github.com/knopsod/easy-and-funny-shop"
          target="_blank">
          https://github.com/knopsod/easy-and-funny-shop</a>
      </Col>
    </Row>
  </div>
);

export default OpenSource;
