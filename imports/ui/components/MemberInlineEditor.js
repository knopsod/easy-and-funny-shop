import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { FormControl, Button, Checkbox } from 'react-bootstrap';
import { Bert } from 'meteor/themeteorchef:bert';
import { upsertMember } from '../../api/members/methods.js';

class MemberInlineEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: props._id,
      title: props.title,
      body: props.body,
      userId: props.userId,
      shown: props.shown,
      changed: false,
    }

    this.onChange = this.onChange.bind(this);
    this.onCheck = this.onCheck.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onChange(event) {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
      changed: true,
    })
  }

  onCheck(event) {
    this.setState({
      ...this.state,
      shown: event.target.checked,
      changed: true,
    });
  }

  onSubmit(event) {
    event.preventDefault();
    const upsert = { 
      _id: this.state._id, 
      title: parseInt(this.state.title, 10), 
      body: this.state.body,
      userId: this.state.userId,
      shown: this.state.shown,
    };

    upsertMember.call(upsert, (error, response) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Member updated', 'success');
        this.setState({
          ...this.state,
          changed: false,
        });
      }
    });
  }

  onClick(event) {
    const upsert = { 
      _id: this.state._id, 
      title: parseInt(this.state.title, 10), 
      body: this.state.body,
      userId: this.state.userId,
      shown: this.state.shown,
    };

    upsertMember.call(upsert, (error, response) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Member updated', 'success');
        this.setState({
          ...this.state,
          changed: false,
        });
      }
    });
  }

  handleNav(_id){
    browserHistory.push(`/members/${_id}`);
  }

  render() {
    const { _id, body, title, shown, changed } = this.state;
    return (
      <tr>
        <td>
          <form onSubmit={this.onSubmit}>
            <FormControl name="title" type="number" value={title}
              onChange={this.onChange} />
          </form>
        </td>
        <td>
          <form onSubmit={this.onSubmit}>
            <FormControl name="body" type="text" value={body}
              onChange={this.onChange} />
          </form>
        </td>
        <td>
          <form onSubmit={this.onSubmit}>
            <Checkbox name="shown" checked={shown}
              onChange={this.onCheck}>{shown ? 'แสดง' : 'ซ่อน'}</Checkbox>
          </form>
        </td>
        <td><Button bsStyle="success" block disabled={!changed} onClick={this.onClick}>บันทึก</Button></td>
        <td><Button bsStyle="primary" block onClick={() => this.handleNav(_id)}>รายละเอียด</Button></td>
      </tr>
    )
  }
}

MemberInlineEditor.propTypes = {
  _id: PropTypes.string,
  title: PropTypes.number,
  body: PropTypes.string,
  userId: PropTypes.string,
  shown: PropTypes.bool,
}

export default MemberInlineEditor;
