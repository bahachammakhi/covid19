import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Button, Select } from 'antd';
import { governorates } from '../../utils/governorates';
import SelectPositonMap from '../maps/react-glMap/selectPositionMap/SelectPositionMap';

const UpdateSuspect = ({ data, SendRequest, erreur, braclets }) => {
  const [form] = Form.useForm();

  const [address, changeAdress] = useState();
  const [position, changePosition] = useState();
  const [inital, setInitial] = useState({
    user: {
      name: data.name,
      email: data.email,
      age: data.age,
      cin: data.cin,
      governorate: data.adressInfo.governorate,
      phone: data.phone,
      ray: data.ray,
      adress: data.adressInfo.adress,
      bracelet: data.bracelet,
    },
  });
  useEffect(() => {
    setInitial({
      user: {
        name: data.name,
        email: data.email,
        age: data.age,
        cin: data.cin,
        governorate: data.adressInfo.governorate,
        phone: data.phone,
        ray: data.ray,
        adress: data.adressInfo.adress,
        bracelet: data.bracelet,
      },
    });
  }, []);

  const handleLocationChange = (position, braclets, address) => {
    changeAdress(address);
    changePosition(position);
  };

  const intialpos = {
    positon: {
      lat: data.adressInfo.latitude,
      lng: data.adressInfo.longitude,
    },
    address: data.adressInfo.adress,
  };
  const onFinish = values => {
    SendRequest(values, position, address, 'update');
  };

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 },
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
    <>
      {' '}
      <Form
        form={form}
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
        initialValues={inital}
      >
        <Form.Item value={data.name} name={['user', 'name']} label="Name" rules={[{ required: true }]}>
          <Input value={data.name} />
        </Form.Item>
        <Form.Item name={['user', 'email']} label="Email" rules={[{ type: 'email', required: true }]}>
          <Input value={data.email} />
        </Form.Item>
        <Form.Item
          name={['user', 'age']}
          label="Age"
          rules={[{ type: 'number', min: 1, max: 130, required: true }]}
        >
          <InputNumber value={data.age} />
        </Form.Item>
        <Form.Item name={['user', 'cin']} label="CIN" rules={[{ min: 8, required: true }]}>
          <Input value={data.cin} />
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
          <Select>{options} </Select>
        </Form.Item>
        <Form.Item name={['user', 'adress']} rules={[{ required: true }]} label="Address">
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 1, span: 23 }}>
          <span>{data.adressInfo.adress}</span>
          <SelectPositonMap handleLocationChange={handleLocationChange} initialState={intialpos} />
        </Form.Item>
        <Form.Item style={{ color: 'red' }} wrapperCol={{ offset: 4 }}>
          {/* {calls.addSuspect?.error?.errors?.message || calls.addSuspect?.error?.error} */}
          {erreur}
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
          <Button
            onClick={() => {
              // form.setFieldsValue(['name'], ['test']);
              // console.log('valid', form.isFieldsTouched());
            }}
            type="primary"
            htmlType="submit"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default UpdateSuspect;
