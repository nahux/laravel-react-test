import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const endpoint = 'http://localhost:3001/api/driver';

const AddDriver = () => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setbirthDate] = useState('');
  const { id } = useParams();

  const navigate = useNavigate();

  const getDriver = async (driverId) => {
    const response = await axios.get(`${endpoint}/${driverId}`).catch(function (error) {
      console.log(error.toJSON());
      navigate('/');
    });
    setFirstName(response.data.first_name);
    setLastName(response.data.last_name);
    setbirthDate(response.data.birth_date);
  }

  useEffect(() => {
    getDriver(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])




  const submitForm = async (e) => {
    e.preventDefault();
    await axios.put(`${endpoint}/${id}`, {
      first_name: firstName,
      last_name: lastName,
      birth_date: birthDate
    });
    navigate('/');
  }
  return (
    <div className='mt-4'>
      <h3> Edit Driver</h3>
      <div className='container'>
        <form onSubmit={submitForm}>
          {/* First Name */}
          <div className='mb-3'>
            <label className='form-label' htmlFor="firstName">First Name</label>
            <input value={firstName} onChange={(e) => setFirstName(e.target.value)} name="firstName" type="text" className='form-control' />
          </div>
          {/* Last Name */}
          <div className='mb-3'>
            <label className='form-label' htmlFor="lastName">Last Name</label>
            <input value={lastName} onChange={(e) => setLastName(e.target.value)} name="lastName" type="text" className='form-control' />
          </div>
          {/* First Name */}
          <div className='mb-3'>
            <label className='form-label' htmlFor="birthDate">Birth Date</label>
            <input value={birthDate} onChange={(e) => setbirthDate(e.target.value)} name="birthDate" type="date" className='form-control' />
          </div>

          <button type="submit" className='btn btn-primary'>Edit Driver</button>
        </form>
      </div>
    </div>
  )
}

export default AddDriver