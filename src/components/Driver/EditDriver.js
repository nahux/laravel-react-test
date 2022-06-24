import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { DriverContext } from './DriverContext';

const EditDriver = () => {

  const [drivers, setDrivers] = useContext(DriverContext);
  const [givenName, setGivenName] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [driverIndex, setDriverIndex] = useState(null);
  const { id } = useParams();

  const navigate = useNavigate();

  const getDriver = async (driverId) => {
    const driverToEditIndex = (drivers.findIndex((driver) => {
      return driver.driverId === driverId;
    }));
    const driverToEdit = drivers[driverToEditIndex];
    setDriverIndex(driverToEditIndex);
    setGivenName(driverToEdit.givenName);
    setFamilyName(driverToEdit.familyName);
    setDateOfBirth(driverToEdit.dateOfBirth);
  }

  useEffect(() => {
    getDriver(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])




  const submitForm = async (e) => {
    e.preventDefault();
    let newDrivers = [...drivers];
    newDrivers[driverIndex] = {
      ...newDrivers[driverIndex],
      givenName: givenName,
      familyName: familyName,
      dateOfBirth: dateOfBirth
    };
    await setDrivers(newDrivers);
    navigate('/driver/list');
  }
  return (
    <div className='mt-2'>
      <Link to="/driver/list" className='btn btn-dark mt-2 mb-2'><i className="bi bi-arrow-left"></i></Link>
      <div className='container'>
        <h3> Edit Driver</h3>
        <form onSubmit={submitForm}>
          {/* First Name */}
          <div className='mb-3'>
            <label className='form-label' htmlFor="givenName">First Name</label>
            <input value={givenName} onChange={(e) => setGivenName(e.target.value)} name="givenName" type="text" className='form-control' />
          </div>
          {/* Last Name */}
          <div className='mb-3'>
            <label className='form-label' htmlFor="familyName">Last Name</label>
            <input value={familyName} onChange={(e) => setFamilyName(e.target.value)} name="familyName" type="text" className='form-control' />
          </div>
          {/* First Name */}
          <div className='mb-3'>
            <label className='form-label' htmlFor="dateOfBirth">Birth Date</label>
            <input value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} name="dateOfBirth" type="date" className='form-control' />
          </div>

          <button type="submit" className='btn btn-dark'>Edit Driver</button>
        </form>
      </div>
    </div>
  )
}

export default EditDriver