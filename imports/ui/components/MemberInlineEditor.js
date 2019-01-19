import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { FormControl, Button } from 'react-bootstrap';
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
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onSubmit(event) {
    event.preventDefault();
    const upsert = { 
      _id: this.state._id, 
      title: parseInt(this.state.title, 10), 
      body: this.state.body,
      userId: this.state.userId,
    };

    upsertMember.call(upsert, (error, response) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Added', 'success');
      }
    });
  }

  onClick(event) {
    const upsert = { 
      _id: this.state._id, 
      title: parseInt(this.state.title, 10), 
      body: this.state.body,
      userId: this.state.userId,
    };

    upsertMember.call(upsert, (error, response) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Added', 'success');
      }
    });
  }

  render() {
    const { _id, body, title } = this.state;
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
        <td><Button bsStyle="primary" onClick={this.onClick}>บันทึก</Button></td>
      </tr>
    )
  }
}

MemberInlineEditor.propTypes = {
  _id: PropTypes.string,
  title: PropTypes.number,
  body: PropTypes.string,
  userId: PropTypes.string,
}

export default MemberInlineEditor;
