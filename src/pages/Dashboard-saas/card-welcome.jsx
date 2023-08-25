import React, {useEffect, useState} from "react";
import {
  Col,
  Card,
  Row,
  Button,
  CardBody,
} from "reactstrap";
import { auth, db } from '../../helpers/firebase'
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy
} from 'firebase/firestore'
import moment from 'moment'

import PropTypes from "prop-types";
import profileImg from "../../assets/images/profile-img.png";
import EmployeeLoginModal from "./EmployeeLoginModal";
import { useSelector, useDispatch, connect } from 'react-redux'
import { getUsersData as onGetUsers } from '../../store/actions'
import LocationBasedLogin from "./LoginBasedLogin";
function CardWelcome({user}) {
  const [employee, setEmployee] = useState([])
  const [attendance, setAttendance] = useState([])
  const [modal, setModal] = useState(false);
  const [postalCode, setPostalCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const toggle = () => setModal(!modal);
  const dispatch = useDispatch()
  const [message, setMessage] = useState('');
  const [address, setAddress] = useState('')

  const predefinedLocations = ['L6T 3R5', 'L5M 4Z5', 'L5B 2C9', 'L1T 1X2']

  useEffect(() => {
    dispatch(onGetUsers())
  }, [dispatch])
  const attendanceCollectionRef = collection(db, 'attendance1')

  const getAttendance = async () => {
    const date = moment().format('DD-MM-YYYY')
    const attquery = query(attendanceCollectionRef,
      where('date', '==', date),
    )
      const data = await getDocs(attquery)
      const attData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      setAttendance(attData)
      }

  useEffect(() => {
    if (attendance.length > 0) {
      const employeeNames = Object.values(attendance[0]).map((att) => {
        if(att.store === user.store && att.employeeName){
          return att.employeeName
        }
      })
      const filtered = employeeNames.filter(function (el) {
        return el != null;
      });
      setEmployee(filtered)
    }
  }, [modal, attendance])
  console.log(employee)
    useEffect(() => {
      getAttendance()
      const unsubscribe = () => {
        getAttendance()
      }
      return unsubscribe
    }, [modal])
  console.log(employee)

const getPostalCode = async (latitude, longitude) => {
  try {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyDXpPRXcboTM2CVZaNmELQpLJoDBonHaLg`);
    const data = await response.json();
    const addressComponents = data.results[0].address_components;
    const current_address = data.results[0].formatted_address
    setAddress(current_address)
    const postalObj = addressComponents.find(component => component.types.includes("postal_code"));
    if (postalObj) {
      // console.log(postalObj.long_name)
      setPostalCode(postalObj.long_name);
      const currentPostalCode = postalObj.long_name;
      console.log(currentPostalCode)
      if (predefinedLocations.includes(currentPostalCode)) {
        console.log("Postal code matches one from the predefined list!");
        toggle()
      } else {
        setMessage('please try login only in the store!')
      }
    } else {
      alert("Postal code not found for this location!");
    }
  } catch (error) {
    alert("Error fetching postal code!");
  }
}

const handleClick = () => {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser.");
    return;
  }

  setLoading(true);
  navigator.geolocation.getCurrentPosition(position => {
    getPostalCode(position.coords.latitude, position.coords.longitude);
    setLoading(false);
  }, error => {
    alert("Unable to retrieve your location.");
    setLoading(false);
  });
}

const checkLocation = (lat, long) => {
  const found = predefinedLocations.some(location => location.lat === lat && location.long === long);

  if (found) {
    setMessage('You are at a predefined location!');
  } else {
    setMessage('You are not at any predefined location.');
  }
}

  return (
    <React.Fragment>
        <div >
          {message}
          {modal && ( 
            <EmployeeLoginModal toggle = {toggle} setEmployee = {setEmployee} address = {address} />
          )}
                <div className='text-primary d-flex align-items-center'>
                  {employee.map((att, key) => {
                    return <span key = {key}><span><i className="fas fa-user-check " /></span><span className='py-1 pe-3 ps-1'>{att}</span></span>
                  })}
                    <Button
                      onClick={handleClick}
                      className='float-end'
                      color='primary'
                    >
                    <i className='fas fa-user-plus font-size-16'></i>
                  </Button>
                  {/* <LocationBasedLogin toggle = {toggle} setEmployee = {setEmployee} /> */}
              </div>
        </div>
    </React.Fragment>
  )
}

//propTypes
CardWelcome.propTypes = {
  // employees: PropTypes.array,
  onEmployeeLoginModalToggle: PropTypes.func,
}

const mapStateToProps = (state) => {
  return {
    user: state.users.user,
    employees: state.users.employees || [],
  }
}

export default connect(mapStateToProps)(CardWelcome)
