import React, { useState, useEffect } from 'react';
import { fetchUsers } from '../api';
import AddUserPopup from './AddUserPopup';
import "./Table.css";

const Table = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null); 

  useEffect(() => {
    // Load user data from local storage when component mounts
    const storedUsers = JSON.parse(localStorage.getItem('userData'));
    if (storedUsers) {
      setUsers(storedUsers);
    }
  }, []);

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
    setEditUser(null); 
  };

  const handleSubmit = (formData) => {
    if (editUser !== null) {
      // If editing an existing user, update the user data
      setUsers(prevUsers => {
        const updatedUsers = [...prevUsers];
        updatedUsers[editUser.index] = formData;
        // Save updated user data to local storage
        localStorage.setItem('userData', JSON.stringify(updatedUsers));
        return updatedUsers;
      });
    } else {
      // If adding a new user, add the new user data
      setUsers(prevUsers => {
        const updatedUsers = [...prevUsers, formData];
        // Save updated user data to local storage
        localStorage.setItem('userData', JSON.stringify(updatedUsers));
        return updatedUsers;
      });
    }
    setIsFormOpen(false); 
  };
  
  const handleEdit = (index) => {
    const userToEdit = users[index];
    setEditUser({ ...userToEdit, index });
    setIsFormOpen(true);
  };
  
  return (
    <div className="grid-container">
      <button className="addButton" onClick={toggleForm}>+</button> 
      <div className="grid-card">
        <AddUserPopup
          isOpen={isFormOpen}
          onClose={toggleForm}
          onSubmit={handleSubmit}
          editUser={editUser}
        />
      </div>
      <div className="grid-card table-container">
        <table className="table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Status</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>{user.status}</td>
                <td>
                  <button onClick={() => handleEdit(index)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
