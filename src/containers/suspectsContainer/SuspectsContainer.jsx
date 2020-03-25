import React, { useEffect, useState } from 'react';
import { getSuspects, getBraclets, updateSuspect, deleteSuspect, addSuspect } from '../../requests/requests';
import useApi from '../../hooks/useApi';
import moment from 'moment';
import { Table, Button, Drawer, notification, Modal } from 'antd';
import UpdateSuspect from '../../components/updateSuspect/UpdateSuspect';
import AddSuspectContainer from '../addSuspectContainer/AddSuspectContainer';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

const SuspectsContainer = () => {
  const { ...calls } = useApi({ getSuspects, updateSuspect, deleteSuspect, addSuspect, getBraclets });
  const [data, setData] = useState([]);
  const [braclets, setBraclets] = useState([]);
  const [elementData, setElementData] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [erreur, setErreur] = useState('');
  console.log('suspects', data);
  const columns = [
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
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'CIN',
      dataIndex: 'cin',
      key: 'cin',
    },
    {
      title: 'Braclet',
      dataIndex: 'bracelet',
      key: 'bracelet',
    },
    {
      title: 'Zone',
      dataIndex: 'ray',
      key: 'ray',
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
        calls.deleteSuspect.call(elementData._id);
      },
      onCancel() {},
    });
  }
  useEffect(() => {
    calls.getSuspects.call();
    calls.getBraclets.call();
  }, []);
  useEffect(() => {
    if (calls.getSuspects?.success) {
      setData(calls.getSuspects?.data?.data?.response);
    }
    if (calls.getBraclets?.success) {
      setBraclets(calls.getBraclets?.data?.data?.response);
    }
  }, [calls.getSuspects?.success, calls.getBraclets.success]);
  useEffect(() => {
    if (calls.updateSuspect.success) {
      notification.success({ message: 'Suspect Updated successfully' });
      calls.getSuspects.call();
      setErreur('');
      setOpenModal(false);
    }
    if (calls.updateSuspect.error) {
      setErreur(calls.updateSuspect?.error?.errors?.message || calls.updateSuspect?.error?.error);
    }
  }, [calls.updateSuspect.success, calls.updateSuspect.error]);
  useEffect(() => {
    if (calls.addSuspect.success) {
      notification.success({ message: 'Suspect Added successfully' });
      setOpenAdd(false);
      setErreur('');
      calls.getSuspects.call();
    }
    if (calls.addSuspect.error) {
      setErreur(calls.addSuspect?.error?.errors?.message || calls.addSuspect?.error?.error);
    }
  }, [calls.addSuspect.success, calls.addSuspect.error]);
  useEffect(() => {
    if (calls.deleteSuspect.success) {
      notification.success({ message: 'Suspect Deleted successfully' });
      calls.getSuspects.call();
    }
    if (calls.deleteSuspect.error) {
      notification.error({ message: 'Please try again !' });
    }
  }, [calls.deleteSuspect.success, calls.deleteSuspect.error]);

  const SendRequest = (values, position, address, type) => {
    if ((values.user && position && address && type === 'add') || (values.user && type === 'update')) {
      let adressInfo = {
        longitude: position.lng,
        latitude: position.lat,
        adress: values.user.adress,
        governorate: values.user.governorate,
      };
      let obj = values.user;
      delete obj.governorate;
      delete obj.adress;
      obj.adressInfo = adressInfo;
      switch (type) {
        case 'update':
          calls.updateSuspect.call(obj, elementData._id);
          break;
        case 'add':
          calls.addSuspect.call(obj);
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
          {openModal ? (
            <UpdateSuspect braclets={braclets} erreur={erreur} SendRequest={SendRequest} data={elementData} />
          ) : (
            <></>
          )}
        </Drawer>
        <Modal
          width={window.innerWidth > 768 ? '50vw' : '90vw'}
          title="Add suspect"
          visible={openAdd}
          footer={null}
          onCancel={() => setOpenAdd(false)}
        >
          <AddSuspectContainer braclets={braclets} erreur={erreur} SendRequest={SendRequest} />
        </Modal>
      </div>
    </>
  );
};
export default SuspectsContainer;
