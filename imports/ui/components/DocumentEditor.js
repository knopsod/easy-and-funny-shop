/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import documentEditor from '../../modules/document-editor.js';
import { Meteor } from 'meteor/meteor';

export default class DocumentEditor extends React.Component {
  componentDidMount() {
    documentEditor({ component: this });
    setTimeout(() => { document.querySelector('[name="title"]').focus(); }, 0);
  }

  render() {
    const { doc } = this.props;
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
        <ControlLabel>ข้อมูลการขาย</ControlLabel>
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
      <Button type="submit" bsStyle="success" disabled={ doc && Meteor.userId() !== doc.userId }>
        { doc && doc._id ? 'บันทึก' : 'สร้างใหม่' }
      </Button>
    </form>);
  }
}

DocumentEditor.propTypes = {
  doc: PropTypes.object,
};
