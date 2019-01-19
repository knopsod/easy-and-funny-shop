import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Bert } from 'meteor/themeteorchef:bert';
import moment from 'moment';
import { Button, FormGroup, FormControl } from 'react-bootstrap';
import { upsertSold, removeSold } from '../../api/solds/methods';

class MemberSoldItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

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

  saveSold(memberId, docId, soldDate) {
    const { amount } = this.state;
    const sold = {
      docId,
      memberId,
      createdAt: moment().toISOString(true).substring(0, 19),
      soldDate,
      amount: parseInt(amount, 10),
      cancelled: false,
    };

    upsertSold.call(sold, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Added', 'success');
        this.setState({ amount: '' });
      }
    });
  }

  cancelSold(solds) {
    const reversed = solds.reverse();
    const found = reversed.find(function(element) {
      return !element.cancelled;
    });

    console.log(found);

    const sold = {
      ...found,
      cancelled: true,
    };

    upsertSold.call(sold, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Added', 'success');
      }
    });
  }

  onChange(event) {
    this.setState({ amount: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const { memberId, docId, soldDate } = this.props;
    this.saveSold(memberId, docId, soldDate);
  }

  render() {
    const { title, body, solds, memberId, docId, soldDate } = this.props;
    const { amount } = this.state;
    return (
      <tr>
        <td style={{ width: 80, verticalAlign: 'middle' }}>{ `${title}. ${body}` }</td>
        <td style={{ width: 100 }}>
          <form onSubmit={this.onSubmit}>
            <FormControl type="number" name="amount" value={amount} 
              onChange={this.onChange} />
          </form>
        </td>
        <td>
          <Button bsStyle="success" 
            onClick={() => this.saveSold(memberId, docId, soldDate)} disabled={!amount}>+</Button>
        </td>
        <td style={{ verticalAlign: 'middle' }}>{this.renderSumText(solds)}</td>
        <td>
          <Button bsStyle="danger" 
            onClick={() => this.cancelSold(solds)} 
            disabled={!(solds.filter(sold => !sold.cancelled).length)}>-</Button>
        </td>
      </tr>
    );
  }
}

MemberSoldItem.propTypes = {
  title: PropTypes.number,
  body: PropTypes.string,
  solds: PropTypes.array,
  memberId: PropTypes.string,
  docId: PropTypes.string,
  soldDate: PropTypes.string,
};

export default MemberSoldItem;