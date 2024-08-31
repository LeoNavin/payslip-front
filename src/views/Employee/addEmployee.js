import React, { useState } from 'react'
import axios from 'axios'

import { useNavigate } from 'react-router-dom'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import { Base_Url } from 'src/service/Constant'
import DatePicker from 'react-multi-date-picker'
import { format } from 'date-fns'
import { useEffect } from 'react'

const AddEmployee = () => {
  const navigate = useNavigate()

  const [employee, setEmployee] = useState('')
  const [startDate, setStartDate] = useState()
  const [dateOfBirth, setDateOfBirth] = useState()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState()

  const [isValid, setIsValid] = useState(true)

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setEmployee({ ...employee, [name]: value })
  }

  const handleEmailChange = (event) => {
    var email = event.target.value
    setIsValid(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(event.target.value))
    setEmployee({ ...employee, email: email })
  }

  useEffect(() => {
    loadingChanges()
  }, [])

  function loadingChanges() {
    setLoading(false)
  }

  const handleDate = (date) => {
    var dojDate = format(new Date(date.year, date.month.number - 1, date.day), 'yyyy-MM-dd')

    setEmployee({ ...employee, doj: dojDate })
  }

  const handleDateofBirth = (date) => {
    var dateOfBirthDate = format(new Date(date.year, date.month.number - 1, date.day), 'yyyy-MM-dd')

    setEmployee({ ...employee, dateOfBirth: dateOfBirthDate })
  }

  const token = localStorage.getItem('token')

  const config = {
    headers: { Authorization: token },
  }

  // if(admingetUserId){

  //   axios
  //   // .get('http://192.168.1.141:8088/payslip/user/getAllUser?id=' + id, config)
  //   .get('http://192.168.1.141:8088/payslip/user/getUserById?id=' + admingetUserId, config)
  //   .then((res) => {

  //     if (res.data.status) {
  //       // getUserList()
  //     }
  //   })
  // }

  const SaveApi = async (e) => {
    // Test Get DATA
    try {
      e.preventDefault()
      setLoading(true)

      // setEmployee({ ...employee, ['doj']: dojDate })
      // employee.doj = dojDate;

      if (isValid) {
        if (
          employee.associateId &&
          employee.phoneNumber &&
          employee.firstname &&
          employee.email &&
          employee.gender &&
          employee.password
        ) {
          await axios
            // .post('http://192.168.1.141:8088/payslip/user/save', employee, config)
            .post(Base_Url + 'user/save', employee, config)
            .then((res) => {
              if (res.data.status === true) {
                //   Swal.fire({
                //     position: 'top-end',
                //     icon: 'success',
                //     title: 'Employee data saved successfully',
                //     showConfirmButton: false,
                //     timer: 1500,
                //   })
                navigate('/employee')
              } else {
                //   Swal.fire({
                //     title: 'Error!',
                //     text: 'Do you want to continue',
                //     icon: 'error',
                //     confirmButtonText: 'ok',
                //   })
                setError(res.data.information.description)

                navigate('/employee/addEmployee')
              }
            })
        } else {
          // Swal.fire({
          //   toast:true,
          //   title: 'Error!',
          //   text: 'Insert the Values',
          //   icon: 'error',
          //   confirmButtonText: 'ok',
          // })
          var msg = 'Can not be empty'
          setError(msg)

          // navigate('/employee/addEmployee')
        }
      } else {
        var msg = 'Invalid E-Mail'
        setError(msg)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    // return <h1>Loading...</h1>
    return (
      <div className="app_content">
        <div className="loading">Loading&#8230;</div>
      </div>
    )
  }

  const back = () => {
    setLoading(true)
    navigate('/employee')
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader className="custum_header ">
            <div className="mr-2 back_icon">
              <i className="bi bi-arrow-left-circle-fill" onClick={(e) => back(e)}></i>
            </div>
            <strong>Add Employee</strong> <div className="d-flex ">{/* {showIcons()} */}</div>
          </CCardHeader>
          <CCardBody>
            <div className="row " style={{ paddingLeft: '10px', paddingRight: '10px' }}>
              <div className="col-lg-4">
                <div className="form-group">
                  <label>
                    {' '}
                    Associate Id <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="associateId"
                    value={employee.associateId}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="col-lg-4">
                <div className="form-group">
                  <label>
                    {' '}
                    Associate Name <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="firstname"
                    value={employee.firstname}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
             

              <div className="col-lg-4">
                <div className="form-group">
                  <label>
                    {' '}
                    Date Of Birth <span style={{ color: 'red' }}>*</span>
                  </label>
                  {/* <input
                    className="form-control"
                    type="date"
                    name="doj"
                    format="DD-MM-YYYY"
                    value={employee.doj}
                    onChange={handleInputChange}
                    required
                  /> */}

                  <DatePicker
                    selected={dateOfBirth}
                    format="DD-MM-YYYY"
                    onChange={(date) => handleDateofBirth(date)}
                  />
                </div>
              </div>
              <div className="col-lg-4">
                <div className="form-group">
                  <label>
                    {' '}
                    Password <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    className="form-control"
                    type="password"
                    name="password"
                    value={employee.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="col-lg-4">
                <div className="form-group">
                  <label>
                    {' '}
                    E-Mail <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    className="form-control"
                    type="email"
                    name="email"
                    value={employee.email}
                    onChange={handleEmailChange}
                    required
                  />
                </div>
              </div>
              <div className="col-lg-4">
                <div className="form-group">
                  <label>
                    {' '}
                    Contact No <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="phoneNumber"
                    value={employee.phoneNumber}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="col-lg-4">
                <div className="form-group">
                  <label> UAN </label>
                  <input
                    className="form-control"
                    type="text"
                    name="uan"
                    value={employee.uan}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-lg-4">
                <div className="form-group">
                  <label>
                    {' '}
                    Designation <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="designation"
                    value={employee.designation}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="col-lg-4">
                <div className="form-group">
                  <label>
                    {' '}
                    Gender <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="gender"
                    value={employee.gender}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="col-lg-4">
                <div className="form-group">
                  <label>
                    {' '}
                    Unit <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="unit"
                    value={employee.unit}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="col-lg-4">
                <div className="form-group">
                  <label>
                    {' '}
                    Date Of Joining <span style={{ color: 'red' }}>*</span>
                  </label>
                  {/* <input
                    className="form-control"
                    type="date"
                    name="doj"
                    format="DD-MM-YYYY"
                    value={employee.doj}
                    onChange={handleInputChange}
                    required
                  /> */}

                  <DatePicker
                    selected={startDate}
                    format="DD-MM-YYYY"
                    onChange={(date) => handleDate(date)}
                  />
                </div>
              </div>

              <div className="col-lg-4">
                <div className="form-group">
                  <label> Bank Name </label>
                  <input
                    className="form-control"
                    type="text"
                    name="bankName"
                    value={employee.bankName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-lg-4">
                <div className="form-group">
                  <label> Bank Account Number </label>
                  <input
                    className="form-control"
                    type="text"
                    name="bankAccountNumber"
                    value={employee.bankAccountNumber}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* <div className="col-lg-4">
                <div className="form-group">
                  <label> Username </label>
                  <input
                    className="form-control"
                    type="text"
                    name="username"
                    value={employee.username}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div> */}
            </div>

            <div className="col-lg-12" style={{ textAlign: 'center', color: 'red' }}>
              {/* <span>{error}</span> */}
              <span>{!isValid ? <div>Invalid email address</div> : error}</span>
            </div>

            <div className="row" style={{ padding: '10px' }}>
              <div className="d-flex justify-content-center">
                <button
                  className="btn  btn-info "
                  style={{ color: 'white' }}
                  onClick={(e) => SaveApi(e)}
                  disabled={
                    employee.associateId &&
                    employee.phoneNumber &&
                    employee.firstname &&
                    employee.email &&
                    employee.gender &&
                    employee.password &&
                    isValid
                      ? false
                      : true
                  }
                >
                  Save Employee
                </button>
              </div>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AddEmployee
