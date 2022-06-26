import { doc, getDoc, setDoc } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { db } from '../../firebase';
import Loading from '../Common/Loading';

const EditDriver = () => {

  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [givenName, setGivenName] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const { id } = useParams();

  const navigate = useNavigate();

  const getDriver = async (driverId) => {
    setNotFound(false);
    const docRef = doc(db, "driver", driverId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const driver = docSnap.data();
      setGivenName(driver.givenName);
      setFamilyName(driver.familyName);
      setDateOfBirth(driver.dateOfBirth);
    } else {
      setNotFound(true);
    }
    setLoading(false);
  }

  useEffect(() => {
    getDriver(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])




  const submitForm = async (e) => {
    e.preventDefault();
    const editedDriver = {
      driverId: id,
      givenName: givenName,
      familyName: familyName,
      dateOfBirth: dateOfBirth
    };
    // Add a new document in collection "cities"
    await setDoc(doc(db, "driver", editedDriver.driverId), editedDriver);
    navigate('/driver/list');
  }
  return (
    <div className='mt-2'>
      <Link to="/driver/list" className='btn btn-dark mt-2 mb-2'><i className="bi bi-arrow-left"></i></Link>
      <div className='container'>
        <h3> Edit Driver</h3>
        {loading && <Loading />}
        {notFound && <div className='alert alert-danger mt-4'>Driver not found</div>} 
        {!loading && !notFound && (
          <form onSubmit={submitForm}>
            {/* First Name */}
            <div className='mb-3'>
              <label className='form-label' htmlFor="givenName">First Name</label>
              <input value={givenName} onChange={(e) => setGivenName(e.target.value)} name="givenName" type="text" className='form-control' required/>
            </div>
            {/* Last Name */}
            <div className='mb-3'>
              <label className='form-label' htmlFor="familyName">Last Name</label>
              <input value={familyName} onChange={(e) => setFamilyName(e.target.value)} name="familyName" type="text" className='form-control' required/>
            </div>
            {/* First Name */}
            <div className='mb-3'>
              <label className='form-label' htmlFor="dateOfBirth">Birth Date</label>
              <input value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} name="dateOfBirth" type="date" className='form-control' required/>
            </div>

            <button type="submit" className='btn btn-dark'>Edit Driver</button>
          </form>
        )}
      </div>
    </div>
  )
}

export default EditDriver