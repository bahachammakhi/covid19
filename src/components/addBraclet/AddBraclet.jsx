import React from 'react';
import { Form, Input, InputNumber, Button, DatePicker } from 'antd';

const AddBraclet = ({ SendRequest, erreur }) => {
  console.log('erreur', erreur);
  const onFinish = values => {
    SendRequest(values, 'add');
    // console.log('values', values);
  };
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 15 },
  };
  const validateMessages = {
    required: 'This field is required!',
    types: {
      email: 'Not a validate email!',
      number: 'Not a validate number!',
      date: 'Please put a date',
    },
    number: {
      range: 'Must be between ${min} and ${max}',
    },
  };
  return (
    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
      <Form.Item name={['braclet', 'ref']} label="Referance" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name={['braclet', 'batteryLevel']}
        label="Battery level"
        rules={[{ type: 'number', min: 0, max: 100, required: true }]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        name={['braclet', 'activationDate']}
        label="Activation Date"
        rules={[{ type: 'object', required: true }]}
      >
        <DatePicker format="YYYY-MM-DD HH" />
      </Form.Item>
      <Form.Item style={{ color: 'red' }} wrapperCol={{ offset: 4 }}>
        {/* {calls.addSuspect?.error?.errors?.message || calls.addSuspect?.error?.error} */}
        {erreur}
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default AddBraclet;
