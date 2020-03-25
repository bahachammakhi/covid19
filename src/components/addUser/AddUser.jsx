import React, { useState } from 'react';
import { Form, Input, InputNumber, Button, notification, Select } from 'antd';

const AddUser = ({ SendRequest, erreur }) => {
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 12 },
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
  const onFinish = values => {
    SendRequest(values, 'add');
  };

  return (
    <div style={{ marginTop: '5%' }}>
      <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
        <Form.Item name={'username'} label="Username" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name={'name'} label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name={'email'} label="Email" rules={[{ type: 'email', required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name={'password'} label="password" rules={[{ required: true }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item
          name={'confirmPassword'}
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('The two passwords that you entered do not match!');
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item name={'role'} rules={[{ required: true }]} label="Role">
          <Select>
            <Select.Option value={'superAdmin'}>superAdmin</Select.Option>
            <Select.Option value={'user'}>user</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name={'language'} rules={[{ required: true }]} label="Language">
          <Select>
            <Select.Option value={'eng'}>English</Select.Option>
          </Select>
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
    </div>
  );
};

export default AddUser;
