import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Popup from 'reactjs-popup';
import { db } from '../../firebase';
import { collection, query, getDocs, orderBy, coll, deleteDoc, doc } from "firebase/firestore";
import 'reactjs-popup/dist/index.css';
import './Drivers.css'
import Loading from '../Common/Loading';

const ListDrivers = () => {
  const [driverList, setDriverList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const driversRef = collection(db, "driver");

  const getDriversData = async () => {
    setError('');
    try {
      const dbDrivers = [];
      const querySnapshot = await getDocs(query(driversRef, orderBy('familyName')));
      querySnapshot.forEach((doc) => {
        let driver = doc.data();
        driver.dateOfBirthFormatted = new Date(driver.dateOfBirth.seconds * 1000 + driver.dateOfBirth.nanoseconds / 1000000).toLocaleDateString()
        dbDrivers.push(driver);
      });
      setDriverList(dbDrivers);
    } catch (responseError) {
      setError('Failed to get drivers: ' + responseError);
    }
    setLoading(false);
  }

  useEffect(() => {
    getDriversData();
  }, [])


  const deleteDriver = async (id) => {
    await deleteDoc(doc(db, "driver", id.toString()));
    setLoading(true);
    getDriversData();
  }

  return (
    <div className='mt-2'>
      <Link to="/driver/add" className='btn btn-dark mt-2 mb-2'>+ Driver</Link>

      {error ? (<div className='alert alert-danger'> {error} </div>) : null}
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
            {(!loading && driverList) ? driverList.map((driver) => (
              <tr key={driver.driverId}>
                <td>{driver.givenName}</td>
                <td>{driver.familyName}</td>
                <td>{driver.dateOfBirthFormatted}</td>
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
        {loading && <Loading />}
      </div>
    </div>
  )
}

export default ListDrivers