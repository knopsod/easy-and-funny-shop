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
        <ControlLabel>ข้อมูลปีการขาย</ControlLabel>
        <FormControl
          type="text"
          name="title"
          defaultValue={ doc && doc.title }
          placeholder="ตัวอย่าง : การขายสินค้าร้านค้าชุมชน ปี 2600 บ้านอยู่เจริญ ต.อยู่สุข โดย นายจอห์น โด"
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
        { doc && doc._id ? 'บันทึกปีการขาย' : 'สร้างปีการขายใหม่' }
      </Button>
    </form>);
  }
}

DocumentEditor.propTypes = {
  doc: PropTypes.object,
};
