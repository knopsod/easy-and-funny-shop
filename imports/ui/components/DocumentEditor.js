/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, FormControl, Button, Checkbox } from 'react-bootstrap';
import documentEditor from '../../modules/document-editor.js';
import { Meteor } from 'meteor/meteor';

export default class DocumentEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shown: props.doc && props.doc.shown,
    };

    this.onCheck = this.onCheck.bind(this);
  }
  componentDidMount() {
    documentEditor({ component: this });
    setTimeout(() => { document.querySelector('[name="title"]').focus(); }, 0);
  }
  onCheck(event) {
    this.setState({
      ...this.state,
      shown: event.target.checked,
    })
  }
  render() {
    const { doc } = this.props;
    const { shown } = this.state;
    return (<form
      ref={ form => (this.documentEditorForm = form) }
      onSubmit={ event => event.preventDefault() }
    >
      <FormGroup>
        <ControlLabel>ปี (พ.ศ.)</ControlLabel>
        <FormControl
          type="number"
          name="year"
          defaultValue={ doc && doc.year }
        />
      </FormGroup>
      <FormGroup>
        <ControlLabel>ชื่อร้าน-ที่อยู่-ชื่อผู้ขาย</ControlLabel>
        <FormControl
          type="text"
          name="title"
          defaultValue={ doc && doc.title }
          placeholder="ตัวอย่าง : ร้านค้าชุมชน หมู่ 1 โดย (ชื่อผู้ขาย)"
        />
      </FormGroup>
      <FormGroup>
        <ControlLabel>รายละเอียดเพิ่มเติม</ControlLabel>
        <FormControl
          componentClass="textarea"
          name="body"
          defaultValue={ doc && doc.body }
          placeholder="ตัวอย่าง : รายชื่อกรรมการ ที่อยู่ เบอร์โทร ระเบียบสำคัญ แนวปฏิบัติ"
        />
      </FormGroup>
      <FormGroup>
        <ControlLabel>สถานะ</ControlLabel>
        <Checkbox name="shown" checked={shown}
          onChange={this.onCheck}>{ shown ? 'แสดง' : 'ซ่อน' }</Checkbox>
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
