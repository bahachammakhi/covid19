import React, { useState } from 'react';
import { governorates } from '../../utils/governorates';
import { Form, Input, InputNumber, Button, notification, Select } from 'antd';
import SelectPositonMap from '../../components/maps/react-glMap/selectPositionMap/SelectPositionMap';

const AddSuspectContainer = ({ braclets, SendRequest, erreur }) => {
  const [address, changeAdress] = useState('');
  const [position, changePosition] = useState();
  const defaultPosition = {
    lat: 33.8869,
    lng: 9.5375,
  };
  const intialpos = {
    positon: defaultPosition,
    address: '',
  };
  console.log('braclets', braclets);
  const handleLocationChange = (position, address) => {
    console.log('test', address, position);
    changeAdress(address);
    changePosition(position);
  };

  const layout = {
    labelCol: { span: 4 },
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
    SendRequest(values, position, address, 'add');
  };
  const options = governorates.map((el, key) => {
    return (
      <Select.Option key={key} value={el}>
        {el}
      </Select.Option>
    );
  });
  const bracletsOptions = braclets.map((el, key) => {
    return (
      <Select.Option key={key} value={el._id}>
        {el.ref}
      </Select.Option>
    );
  });
  return (
    <div style={{ marginTop: '5%' }}>
      <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
        <Form.Item name={['user', 'name']} label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name={['user', 'email']} label="Email" rules={[{ type: 'email', required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name={['user', 'age']}
          label="Age"
          rules={[{ type: 'number', min: 1, max: 130, required: true }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item name={['user', 'cin']} label="CIN" rules={[{ min: 8, required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name={['user', 'phone']} label="Phone" rules={[{ min: 8, max: 8, required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name={['user', 'ray']}
          label="Rayon"
          rules={[{ type: 'number', min: 20, max: 200, required: false }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item name={['user', 'bracelet']} rules={[{ required: true }]} label="Braclet">
          <Select>{bracletsOptions}</Select>
        </Form.Item>
        <Form.Item name={['user', 'governorate']} rules={[{ required: true }]} label="Governorate">
          <Select>{options}</Select>
        </Form.Item>
        <Form.Item name={['user', 'adress']} rules={[{ required: true }]} label="Address">
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4 }}>
          <span>{address}</span>
          <SelectPositonMap handleLocationChange={handleLocationChange} initialState={intialpos} />
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

export default AddSuspectContainer;
