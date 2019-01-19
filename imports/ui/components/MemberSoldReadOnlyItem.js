import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, FormGroup, FormControl } from 'react-bootstrap';

class MemberSoldReadOnlyItem extends Component {
  renderSumText(solds) {
    let sumText = '';
    let sum = 0;

    solds.forEach(function(sold, index) {
      sumText += index === 0 ? '=' : '+';
      sumText += sold.cancelled ? '<del style="color: red">' + sold.amount + '</del>' : sold.amount;
      sum += sold.cancelled ? 0 : sold.amount;
    });
    sumText = '<strong>' + sum + '</strong>' + sumText;

    return <div dangerouslySetInnerHTML={{ __html: sumText }} />;
  }

  render() {
    const { title, body, solds } = this.props;
    return (
      <tr>
        <td style={{ width: 80, verticalAlign: 'middle' }}>{ `${title}. ${body}` }</td>
        <td style={{ verticalAlign: 'middle' }}>{this.renderSumText(solds)}</td>
      </tr>
    );
  }
}

MemberSoldReadOnlyItem.propTypes = {
  title: PropTypes.number,
  body: PropTypes.string,
  solds: PropTypes.array,
  memberId: PropTypes.string,
  docId: PropTypes.string,
  soldDate: PropTypes.string,
};

export default MemberSoldReadOnlyItem;