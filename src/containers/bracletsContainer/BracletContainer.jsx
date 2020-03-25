import React, { useState, useEffect } from 'react';
import { getBraclets, deleteBraclet, addBraclet, updateBraclet } from '../../requests/requests';
import moment from 'moment';
import useApi from '../../hooks/useApi';
import { Table, Button, Drawer, Modal, notification } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import UpdateBraclet from '../../components/updateBraclet/UpdateBraclet';
import AddBraclet from '../../components/addBraclet/AddBraclet';
const { confirm } = Modal;

const BracletContainer = () => {
  const { ...calls } = useApi({ getBraclets, addBraclet, updateBraclet, deleteBraclet });
  const [data, setData] = useState([]);
  const [elementData, setElementData] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [erreur, setErreur] = useState('');

  const columns = [
    {
      title: 'Referance',
      dataIndex: 'ref',
      key: 'ref',
    },
    {
      title: 'Battery',
      dataIndex: 'batteryLevel',
      key: 'batteryLevel',
    },
    {
      title: 'Activation Date',
      dataIndex: 'activationDate',
      key: 'activationDate',
      render: data => <span>{moment(data.activationDate).format('MMMM Do YYYY, h:mm:ss a')}</span>,
    },
    {
      title: 'Activation Date',
      dataIndex: 'activationDate',
      key: 'activationDate',
      render: data => <span>{moment(data.activationDate).format('MMMM Do YYYY, h:mm:ss a')}</span>,
    },
    {
      title: 'Created on',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: data => <span>{moment(data.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</span>,
    },
    {
      title: 'Edit',
      key: 'edit',
      render: data => (
        <h6
          onClick={() => {
            setElementData(data);
            setOpenModal(true);
          }}
          style={{ cursor: 'pointer' }}
        >
          <i className="fas fa-edit"></i>
        </h6>
      ),
    },
    {
      title: 'Delete',
      key: 'delete',
      render: data => (
        <h6
          onClick={() => {
            console.log('data', data);
            showConfirm(data);
          }}
          style={{ cursor: 'pointer' }}
        >
          <i className="fas fa-trash"></i>
        </h6>
      ),
    },
  ];
  useEffect(() => {
    calls.getBraclets.call();
  }, []);
  useEffect(() => {
    if (calls.getBraclets?.success) {
      setData(calls.getBraclets?.data?.data?.response);
    }
  }, [calls.getBraclets?.success]);
  useEffect(() => {
    if (calls.updateBraclet.success) {
      notification.success({ message: 'Suspect Updated successfully' });
      calls.getBraclets.call();
      setErreur('');
      setOpenModal(false);
    }
    if (calls.updateBraclet.error) {
      setErreur(calls.updateBraclet?.error?.errors?.message || calls.updateBraclet?.error?.error);
    }
  }, [calls.updateBraclet.success, calls.updateBraclet.error]);

  useEffect(() => {
    console.log('calls', calls.addBraclet);
    if (calls.addBraclet.success) {
      notification.success({ message: 'Suspect Added successfully' });
      setOpenAdd(false);
      setErreur('');
      calls.getBraclets.call();
    }
    if (calls.addBraclet.error) {
      setErreur(calls.addBraclet?.error?.errors?.message || calls.addBraclet?.error?.error);
    }
  }, [calls.addBraclet.success, calls.addBraclet.error]);
  useEffect(() => {
    if (calls.deleteBraclet.success) {
      notification.success({ message: 'Suspect Deleted successfully' });
      calls.getBraclets.call();
    }
    if (calls.deleteBraclet.error) {
      notification.error({ message: 'Please try again !' });
    }
  }, [calls.deleteBraclet.success, calls.deleteBraclet.error]);

  const SendRequest = (values, type) => {
    if (values.braclet) {
      let obj = values.braclet;
      obj.activationDate = moment(values.braclet.activationDate._d).format('YYYY-MM-DD');
      switch (type) {
        case 'update':
          calls.updateBraclet.call(obj, elementData._id);
          break;
        case 'add':
          calls.addBraclet.call(obj);
          break;
      }
    }
  };
  function showConfirm(elementData) {
    confirm({
      title: 'Do you want to delete this Braclet?',
      icon: <ExclamationCircleOutlined />,
      content: 'When clicked the Delete button, this item will be deleted',
      okText: 'Delete',
      onOk() {
        calls.deleteBraclet.call(elementData._id);
      },
      onCancel() {},
    });
  }

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        {' '}
        <Button type="primary" onClick={() => setOpenAdd(true)}>
          Add suspect
        </Button>
      </div>
      <Table scroll={{ x: true }} pagination={{ pageSize: '7' }} columns={columns} dataSource={data} />
      <Drawer
        title="Edit suspect"
        placement="right"
        closable={true}
        onClose={() => setOpenModal(!openModal)}
        visible={openModal}
        width={window.innerWidth > 768 ? '40vw' : '90vw'}
      >
        {openModal ? <UpdateBraclet erreur={erreur} SendRequest={SendRequest} data={elementData} /> : <></>}
      </Drawer>
      <Modal
        width={window.innerWidth > 768 ? '50vw' : '90vw'}
        title="Add suspect"
        visible={openAdd}
        footer={null}
        onCancel={() => setOpenAdd(false)}
      >
        <AddBraclet erreur={erreur} SendRequest={SendRequest} />
      </Modal>
    </>
  );
};

export default BracletContainer;
