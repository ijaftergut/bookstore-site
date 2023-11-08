import React, { useEffect, useRef, useState } from 'react'
import api from './api';
import { useNavigate } from 'react-router-dom';

const Admin = ({users, setUsers, products, setProducts, auth}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('')
  const navigate = useNavigate()
  const el = useRef();

  if (!auth.is_admin) return <p>Access Denied</p>

  return (
    <div>
      <h3>Users</h3>
      <ul>
        {
          users.map(user => {
            return <li key={user.id}>{user.username} 
            </li>
          })
        }
      </ul>
    </div>
  )
}

export default Admin;