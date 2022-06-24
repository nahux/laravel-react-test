import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import './Drivers.css'
import { DriverContext } from './DriverContext';

const ListDrivers = () => {
  const [drivers, setDrivers] = useContext(DriverContext);

  const deleteDriver = async (id) => {
    let newDrivers = drivers.filter(function (driver) {
      return driver.driverId !== id;
    });
    setDrivers(newDrivers);
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
            <th></th>
          </tr>
        </thead>
        <tbody>
          {drivers ? drivers.map((driver) => (
            <tr key={driver.driverId}>
              <td>{driver.givenName}</td>
              <td>{driver.familyName}</td>
              <td>{driver.dateOfBirth}</td>
              <td>
                <Link to={`/driver/edit/${driver.driverId}`} className='action-button me-2'><i className="bi bi-pencil"></i></Link>
                <button onClick={() => deleteDriver(driver.driverId)} className='action-button'><i className="bi bi-trash"></i></button>
              </td>
            </tr>
          )) : null}
        </tbody>
      </table>
    </div>
  )
}

export default ListDrivers