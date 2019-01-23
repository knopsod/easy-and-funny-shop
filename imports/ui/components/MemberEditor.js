/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, FormControl, Button, Checkbox } from 'react-bootstrap';
import documentEditor from '../../modules/member-editor.js';
import { Meteor } from 'meteor/meteor';

export default class DocumentEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shown: !props.doc || (props.doc && props.doc.shown),
    };

    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    documentEditor({ component: this });
    setTimeout(() => { document.querySelector('[name="title"]').focus(); }, 0);
  }
  onChange(event) {
    this.setState({
      shown: event.target.checked,
    });
  }
  render() {
    const { doc } = this.props;
    const { shown } = this.state;
    return (<form
      ref={ form => (this.documentEditorForm = form) }
      onSubmit={ event => event.preventDefault() }
    >
      <FormGroup>
        <ControlLabel>หมายเลข</ControlLabel>
        <FormControl
          type="number"
          name="title"
          defaultValue={ doc && doc.title }
        />
      </FormGroup>
      <FormGroup>
        <ControlLabel>ชื่อ-นามสกุล</ControlLabel>
        <FormControl
          name="body"
          defaultValue={ doc && doc.body }
        />
      </FormGroup>
      <FormGroup>
        <ControlLabel>สถานะ</ControlLabel>
        <Checkbox name="shown" checked={shown}
          onChange={this.onChange}>{ shown ? 'แสดง' : 'ซ่อน' }</Checkbox>
      </FormGroup>
      <Button type="submit" bsStyle="success" disabled={ doc && Meteor.userId() !== doc.userId }>
        { doc && doc._id ? 'บันทึก' : 'สร้างใหม่' }
      </Button>
    </form>);
  }
}

DocumentEditor.propTypes = {
  doc: PropTypes.object,
};
