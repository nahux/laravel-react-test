import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const ListDrivers = () => {

  const endpoint = 'http://localhost:3001/api';

  const [drivers, setDrivers] = useState([]);
  useEffect( () => {
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
    <div>
      <div className=''>
        <Link to="/add" className='btn btn-success btn-lg mt-2 mb-2 text-white'>+ Driver</Link>
      </div>

      {/* Drivers Table */}
      <table className='table table-striped'>
        <thead className='bg-primary text-white'>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Birth Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          { drivers.map((driver) => (
            <tr key={driver.id}>
              <td>{driver.first_name}</td>
              <td>{driver.last_name}</td>
              <td>{driver.birth_date}</td>
              <td>
                <Link to={`/edit/${driver.id}`} className='btn btn-warning'>Edit</Link>
                <button onClick={() => deleteDriver(driver.id)} className='btn btn-danger'>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ListDrivers