import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { DriverContext } from './DriverContext';

const AddDriver = () => {

  const [drivers, setDrivers] = useContext(DriverContext);
  const [givenName, setGivenName] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');

  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();
    const newDriver = {
      driverId: givenName + '_' + familyName,
      givenName: givenName,
      familyName: familyName,
      dateOfBirth: dateOfBirth
    };
    let newDrivers = [...drivers];
    newDrivers.push(newDriver);
    await setDrivers(newDrivers);
    navigate('/driver/list');
  }
  return (
    <div className='mt-2'>
      <Link to="/driver/list" className='btn btn-dark mt-2 mb-2'><i className="bi bi-arrow-left"></i></Link>
      <div className='container'>
        <h3>Add a New Driver</h3>
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

          <button type="submit" className='btn btn-dark'>Add</button>
        </form>
      </div>
    </div>
  )
}

export default AddDriver