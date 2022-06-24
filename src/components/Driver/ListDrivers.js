import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { DriverContext } from './DriverContext';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './Drivers.css'

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
      <div className='driver-list'>
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
                  <Popup
                    trigger={<button className='action-button'><i className="bi bi-trash"></i></button>}
                    position="right center"
                    modal
                  >
                    {close => (
                      <div className='content'>
                        <p>Are you sure you want to delete the driver {driver.givenName} {driver.familyName}?</p>
                        <button onClick={() => deleteDriver(driver.driverId)} className='btn btn-dark'>Yes</button>
                        <button onClick={() => close()} className='btn btn-dark ms-2'>Cancel</button>
                      </div>
                    )}
                  </Popup>

                </td>
              </tr>
            )) : null}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ListDrivers