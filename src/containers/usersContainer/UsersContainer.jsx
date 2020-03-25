import React, { useEffect, useState } from 'react';
import { getUsers, updateUser, deleteUser, addUser } from '../../requests/requests';
import useApi from '../../hooks/useApi';
import moment from 'moment';
import { Table, Button, Drawer, notification, Modal } from 'antd';
import AddUser from '../../components/addUser/AddUser';
import UpdateUser from '../../components/updateUser/UpdateUser';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

const UsersContainer = () => {
  const { ...calls } = useApi({ getUsers, updateUser, deleteUser, addUser });
  const [data, setData] = useState([]);
  const [elementData, setElementData] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [erreur, setErreur] = useState('');
  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Language',
      dataIndex: 'language',
      key: 'language',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Added on ',
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
            setElementData(data);
            showConfirm(data);
          }}
          style={{ cursor: 'pointer' }}
        >
          <i className="fas fa-trash"></i>
        </h6>
      ),
    },
  ];

  function showConfirm(elementData) {
    confirm({
      title: 'Do you want to delete this Suspect?',
      icon: <ExclamationCircleOutlined />,
      content: 'When clicked the Delete button, this item will be deleted',
      okText: 'Delete',
      onOk() {
        calls.deleteUser.call(elementData._id);
      },
      onCancel() {},
    });
  }
  useEffect(() => {
    calls.getUsers.call();
  }, []);
  useEffect(() => {
    if (calls.getUsers?.success) {
      setData(calls.getUsers?.data?.data?.response);
    }
  }, [calls.getUsers?.success]);
  useEffect(() => {
    if (calls.updateUser.success) {
      notification.success({ message: 'User Updated successfully' });
      calls.getUsers.call();
      setErreur('');
      setOpenModal(false);
    }
    if (calls.updateUser.error) {
      setErreur(calls.updateUser?.error?.errors?.message || calls.updateUser?.error?.error);
    }
  }, [calls.updateUser.success, calls.updateUser.error]);
  useEffect(() => {
    if (calls.addUser.success) {
      notification.success({ message: 'User Added successfully' });
      setOpenAdd(false);
      setErreur('');
      calls.getUsers.call();
    }
    if (calls.addUser.error) {
      setErreur(calls.addUser?.error?.errors?.message || calls.addUser?.error?.error);
    }
  }, [calls.addUser.success, calls.addUser.error]);
  useEffect(() => {
    if (calls.deleteUser.success) {
      notification.success({ message: 'User Deleted successfully' });
      calls.getUsers.call();
    }
    if (calls.deleteUser.error) {
      notification.error({ message: 'Please try again !' });
    }
  }, [calls.deleteUser.success, calls.deleteUser.error]);

  const SendRequest = (values, type) => {
    if (values) {
      let obj = values;
      if (values.password === undefined || values.password === null || values.password == '') {
        delete obj.password;
        delete obj.confirmPassword;
      }
      console.log('values', obj);
      switch (type) {
        case 'update':
          calls.updateUser.call(obj, elementData._id);
          break;
        case 'add':
          calls.addUser.call(obj);
          break;
      }
    } else {
      setErreur('Map position is required !');
    }
  };
  return (
    <>
      {' '}
      <div>
        <div style={{ marginBottom: 16 }}>
          {' '}
          <Button type="primary" onClick={() => setOpenAdd(true)}>
            Add User
          </Button>
        </div>
        <Table scroll={{ x: true }} pagination={{ pageSize: '7' }} columns={columns} dataSource={data} />
        <Drawer
          title="Edit user"
          placement="right"
          closable={true}
          onClose={() => setOpenModal(!openModal)}
          visible={openModal}
          width={window.innerWidth > 768 ? '40vw' : '90vw'}
        >
          {openModal ? <UpdateUser erreur={erreur} SendRequest={SendRequest} data={elementData} /> : <></>}
        </Drawer>
        <Modal
          width={window.innerWidth > 768 ? '50vw' : '90vw'}
          title="Add User"
          visible={openAdd}
          footer={null}
          onCancel={() => setOpenAdd(false)}
        >
          <AddUser erreur={erreur} SendRequest={SendRequest} />
        </Modal>
      </div>
    </>
  );
};
export default UsersContainer;
