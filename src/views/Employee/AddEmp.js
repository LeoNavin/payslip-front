import React, { useState } from 'react'
import axios from 'axios'

import { useNavigate } from 'react-router-dom'
import { Base_Url } from 'src/service/Constant'

const AddEmployee = () => {
  const navigate = useNavigate()

  const [employee, setEmployee] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setEmployee({ ...employee, [name]: value })
  }

  const token = localStorage.getItem('token')

  const config = {
    headers: { Authorization: token },
  }

  const SaveApi = async (e) => {
    // Test Get DATA
    try {
      e.preventDefault()
      setLoading(true)
      if (
        employee.associateId &&
        employee.phoneNumber &&
        employee.firstname &&
        employee.email &&
        employee.username &&
        employee.password
      ) {
        
        await axios
          // .post('http://192.168.1.141:8088/payslip/user/save', employee, config)
          .post(Base_Url+'user/save', employee, config)
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
        //   title: 'Error!',
        //   text: 'Insert the Values',
        //   icon: 'error',
        //   confirmButtonText: 'ok',
        // })
        navigate('/employee/addEmployee')
      }
    } catch (err) {
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
  return (
    <>
      <div className="d-flex align-items-top justify-content-center min vh-100  ">
        <div className="card" style={{ width: '100%', height: '100%' }}>
          <div className="card-header position-fixed " style={{ backgroundColor: '#19334D' }}>
            {/* <div className="card-header fixed-top  " style={{ backgroundColor: '#19334D' ,width:'100%',position: 'relative' ,width:'100%',position: 'relative'}}> */}
            <h3 style={{ textAlign: 'center', color: '#ffffff' }}>Add Employee</h3>
            <h3 style={{ textAlign: '', color: '#ffffff' }}>Add Employee</h3>
          </div>
          <div className="row" style={{ marginTop: '10px' }}>
            <div className="col-3"></div>
            <div className="col-1" style={{ textAlign: 'right' }}>
              <label> Associate Id : </label>
            </div>
            <div className="col-4">
              <input
                className="form-control"
                type="text"
                name="associateId"
                value={employee.associateId}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-4"></div>
          </div>
          <div className="row" style={{ marginTop: '10px' }}>
            <div className="col-3"></div>
            <div className="col-1" style={{ textAlign: 'right' }}>
              <label> Associate Name : </label>
            </div>
            <div className="col-4">
              <input
                className="form-control"
                type="text"
                name="firstname"
                value={employee.firstname}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-4"></div>
          </div>
        
          <div className="row" style={{ marginTop: '10px' }}>
            <div className="col-3"></div>
            <div className="col-1" style={{ textAlign: 'right' }}>
              <label> E-Mail : </label>
            </div>
            <div className="col-4">
              <input
                className="form-control"
                type="email"
                name="email"
                value={employee.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-4"></div>
          </div>
          <div className="row" style={{ marginTop: '10px' }}>
            <div className="col-3"></div>
            <div className="col-1" style={{ textAlign: 'right' }}>
              <label> Contact No : </label>
            </div>
            <div className="col-4">
              <input
                className="form-control"
                type="text"
                name="phoneNumber"
                value={employee.phoneNumber}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-4"></div>
          </div>

          <div className="row" style={{ marginTop: '10px' }}>
            <div className="col-3"></div>
            <div className="col-1" style={{ textAlign: 'right' }}>
              <label> UAN : </label>
            </div>
            <div className="col-4">
              <input
                className="form-control"
                type="text"
                name="uan"
                value={employee.uan}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-4"></div>
          </div>

          <div className="row" style={{ marginTop: '10px' }}>
            <div className="col-3"></div>
            <div className="col-1" style={{ textAlign: 'right' }}>
              <label> Designation : </label>
            </div>
            <div className="col-4">
              <input
                className="form-control"
                type="text"
                name="designation"
                value={employee.designation}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-4"></div>
          </div>

          <div className="row" style={{ marginTop: '10px' }}>
            <div className="col-3"></div>
            <div className="col-1" style={{ textAlign: 'right' }}>
              <label> Gender : </label>
            </div>
            <div className="col-4">
              <input
                className="form-control"
                type="text"
                name="gender"
                value={employee.gender}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-4"></div>
          </div>

          <div className="row" style={{ marginTop: '10px' }}>
            <div className="col-3"></div>
            <div className="col-1" style={{ textAlign: 'right' }}>
              <label> Unit : </label>
            </div>
            <div className="col-4">
              <input
                className="form-control"
                type="text"
                name="unit"
                value={employee.unit}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-4"></div>
          </div>

          <div className="row" style={{ marginTop: '10px' }}>
            <div className="col-2"></div>
            <div className="col-2" style={{ textAlign: 'right' }}>
              <label> Date Of Joining : </label>
            </div>
            <div className="col-4">
              <input
                className="form-control"
                type="date"
                name="doj"
                value={employee.doj}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-4"></div>
          </div>

          <div className="row" style={{ marginTop: '10px' }}>
            <div className="col-3"></div>
            <div className="col-1" style={{ textAlign: 'right' }}>
              <label> Bank Name : </label>
            </div>
            <div className="col-4">
              <input
                className="form-control"
                type="text"
                name="bankName"
                value={employee.bankName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-4"></div>
          </div>

          <div className="row" style={{ marginTop: '10px' }}>
            <div className="col-3"></div>
            <div className="col-1" style={{ textAlign: 'right' }}>
              <label> Bank Account Number : </label>
            </div>
            <div className="col-4">
              <input
                className="form-control"
                type="text"
                name="bankAccountNumber"
                value={employee.bankAccountNumber}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-4"></div>
          </div>

          <div className="row" style={{ marginTop: '10px' }}>
            <div className="col-3"></div>
            <div className="col-1" style={{ textAlign: 'right' }}>
              <label> Username : </label>
            </div>
            <div className="col-4">
              <input
                className="form-control"
                type="text"
                name="username"
                value={employee.username}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-4"></div>
          </div>
          <div className="row" style={{ marginTop: '10px' }}>
            <div className="col-3"></div>
            <div className="col-1" style={{ textAlign: 'right' }}>
              <label> Password : </label>
            </div>
            <div className="col-4">
              <input
                className="form-control"
                type="password"
                name="password"
                value={employee.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-4"></div>
          </div>

          <div className="row" style={{ padding: '10px' }}>
            <div className="col-4"></div>
            <div className="col-4">
              <span style={{ textAlign: 'center', color: 'red' }}>{error}</span>
            </div>
            <div className="col"></div>
          </div>

          <div className="row" style={{ padding: '10px' }}>
            <div className="col-4"></div>
            <div className="col-4">
              <button className="btn  btn-info btn-block" onClick={(e) => SaveApi(e)}>
                Save Employee
              </button>
            </div>
            <div className="col"></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddEmployee
