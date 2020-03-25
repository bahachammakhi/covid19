import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Button, DatePicker, notification } from 'antd';

const UpdateBraclet = ({ data, SendRequest, erreur }) => {
  const [inital, setInitial] = useState({
    braclet: {
      ref: data.ref,
      activationDate: data.activationDate,
      batteryLevel: data.batteryLevel,
    },
  });
  useEffect(() => {
    setInitial({
      braclet: {
        ref: data.ref,
        activationDate: data.activationDate,
        batteryLevel: data.batteryLevel,
      },
    });
  }, []);
  console.log('data', data);
  const onFinish = values => {
    SendRequest(values, 'update');
  };
  const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 15 },
  };
  const validateMessages = {
    required: 'This field is required!',
    types: {
      email: 'Not a validate email!',
      number: 'Not a validate number!',
    },
    number: {
      range: 'Must be between ${min} and ${max}',
    },
  };
  return (
    <Form
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      validateMessages={validateMessages}
      initialValues={inital}
    >
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
      <Form.Item name={['braclet', 'activationDate']} label="Activation Date" rules={[{ required: true }]}>
        {' '}
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
export default UpdateBraclet;
