import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { deleteUsers, getAllUsers } from '../apis';

export const UsersList = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    getAllUsers().then((res) => setData(res));
  }, []);
  console.log('data', data.data);
  const handleDelete = async (id) => {
    try {
      debugger;
      deleteUsers(id).then((res) => console.log('dletedused', res));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Table striped bordered>
      <thead>
        <tr>
          <th>SL NO</th>
          <th>User Name</th>
          <th>Email</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data?.data?.Allusers?.map((user, index) => (
          <tr>
            <td key={index}>{index + 1}</td>

            <td>{user?.username}</td>
            <td>{user?.email}</td>
            <td
              style={{ display: 'flex', justifyContent: 'center', gap: '5px' }}>
              <Button variant='primary'>Edit</Button>
              <Button variant='danger' onClick={() => handleDelete(user?._id)}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
