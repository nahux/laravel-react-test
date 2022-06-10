import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './Drivers.css'

const ListDrivers = () => {

  const endpoint = 'http://localhost:3001/api';

  const [drivers, setDrivers] = useState([]);
  useEffect(() => {
    getDrivers();
  }, []);

  const getDrivers = async () => {
    const response = await axios.get(`${endpoint}/driver`);
    setDrivers(response.data);
  }

  const deleteDriver = async (id) => {
    await axios.delete(`${endpoint}/driver/${id}`);
    getDrivers();
  }

  return (
    <div className='mt-2'>
      <Link to="/driver/add" className='btn btn-dark mt-2 mb-2'>+ Driver</Link>

      {/* Drivers Table */}
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Birth Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((driver) => (
            <tr key={driver.id}>
              <td>{driver.first_name}</td>
              <td>{driver.last_name}</td>
              <td>{driver.birth_date}</td>
              <td>
                <Link to={`/driver/edit/${driver.id}`} className='action-button me-2'><i className="bi bi-pencil"></i></Link>
                <button onClick={() => deleteDriver(driver.id)} className='action-button'><i className="bi bi-trash"></i></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ListDrivers