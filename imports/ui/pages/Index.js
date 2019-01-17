import React from 'react';
import { Row, Col } from 'react-bootstrap';

import AllDocumentsList from '../components/AllDocumentsList';

const Index = () => (
  <div className="Index">
    <Row>
      <Col xs={ 12 }>
        <div className="page-header clearfix">
          <h4 className="pull-left">ร้านค้าชุมชน</h4>
        </div>
        <AllDocumentsList />
      </Col>
    </Row>
  </div>
);

export default Index;
