import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { useNavigate } from 'react-router-dom'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import { useForm } from 'react-hook-form'
import Moment from 'moment'
import Swal from 'sweetalert2'
import { Base_Url } from 'src/service/Constant'

const EditProfile = () => {
  const navigate = useNavigate()

  const [employee, setEmployee] = useState('')
  const [user, setUser] = useState('')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  const [information, setInformation] = useState()
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')

  const config = {
    headers: { Authorization: token },
  }

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm()

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login')
    }

    getUserProfile()
  }, [])

  async function getUserProfile() {
    setLoading(true)

    // await axios.get('http://192.168.1.141:8088/payslip/user/getUser', config).then((res) => {
    await axios.get(Base_Url + 'user/getUser', config).then((res) => {
      if (res.data.status) {
        setEmployee(res.data.user)
        res.data.user.doj = res.data.user.doj ? Moment(res.data.user.doj).format('yyyy-MM-DD') : Moment(new Date().toLocaleDateString()).format('yyyy-MM-DD')
        res.data.user.dateOfBirth = res.data.user.dateOfBirth ? Moment(res.data.user.dateOfBirth).format('yyyy-MM-DD') : Moment(new Date().toLocaleDateString()).format('yyyy-MM-DD')
        reset(res.data.user)
        setLoading(false)

      } else {
        setLoading(false)

        setError("User Details can't be find")
      }
    })
  }

  //   const handleInputChange = (event) => {
  //     const { name, value } = event.target
  //     // setUser({ ...employee, [name]: value })
  //     setUser((prevState) => ({ ...prevState, [name]: value }))
  //   }

  //   const profileUpdateApi = async (e) => {
  //     // Test Get DATA
  //     try {
  //       e.preventDefault()
  //       let data = {
  //         firstname: employee.firstname,
  //         lastname: employee.lastname,
  //         uan: employee.uan,
  //         doj: employee.doj,
  //         phoneNumber: employee.phoneNumber,
  //         email: employee.email,
  //         designation: employee.designation,
  //         gender: employee.gender,
  //         bankName: employee.bankName,
  //         bankAccountNumber: employee.bankAccountNumber,
  //       }

  //       setLoading(true)
  //       //   if (
  //       //     employee.associateId &&
  //       //     employee.phoneNumber &&
  //       //     employee.firstname &&
  //       //     employee.lastname &&
  //       //     employee.email &&
  //       //     employee.username &&
  //       //     employee.password
  //       //   ) {
  //       await axios
  //         //   .post('http://192.168.1.141:8088/payslip/user/profileUpdate', user, config)
  //         .then((res) => {
  //

  //           if (res.data.status === true) {
  //             //   Swal.fire({
  //             //     position: 'top-end',
  //             //     icon: 'success',
  //             //     title: 'Employee data saved successfully',
  //             //     showConfirmButton: false,
  //             //     timer: 1500,
  //             //   })
  //             navigate('/employee')
  //           } else {
  //             //   Swal.fire({
  //             //     title: 'Error!',
  //             //     text: 'Do you want to continue',
  //             //     icon: 'error',
  //             //     confirmButtonText: 'ok',
  //             //   })
  //             setError(res.data.information.description)

  //             //   navigate('/employee/addEmployee')
  //           }
  //         })
  //       //   } else {
  //       //     // Swal.fire({
  //       //     //   title: 'Error!',
  //       //     //   text: 'Insert the Values',
  //       //     //   icon: 'error',
  //       //     //   confirmButtonText: 'ok',
  //       //     // })
  //       //    setError("Can't allow null values")
  //       //   }
  //     } catch (err) {
  //     } finally {
  //       setLoading(false)
  //     }
  //   }

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
    navigate('/profile')
  }

  const onsubmit = async (data) => {
    var doj = data.doj ? data.doj : ''
    try {
      let userData = {
        id: data.id,
        associateId: data.associateId,
        firstname: data.firstname,        
        dateOfBirth: data.dateOfBirth,
        uan: data.uan,
        doj: doj,
        unit: data.unit,
        phoneNumber: data.phoneNumber,
        email: data.email,
        designation: data.designation,
        gender: data.gender,
        bankName: data.bankName,
        bankAccountNumber: data.bankAccountNumber,
      }

      setLoading(true)

      await axios
        // .post('http://192.168.1.141:8088/payslip/user/profileUpdate', userData, config)
        .post(Base_Url + 'user/profileUpdate', userData, config)
        .then((res) => {
          if (res.data.status === true) {
            Swal.fire({
              toast: true,
              position: 'top-end',
              icon: 'success',
              title: 'Successfully Updated',
              showConfirmButton: false,
              timer: 1500,
            })
            {
              role == 'ADMIN' ? navigate('/profile') : navigate('/profile')
            }
          } else {
            //   Swal.fire({
            //     title: 'Error!',
            //     text: 'Do you want to continue',
            //     icon: 'error',
            //     confirmButtonText: 'ok',
            //   })
            if (res?.data) {
              setLoading(false)
              if (res?.data.messages) {
                setError(res?.data?.messages)
                setInformation('')
              } else {
                setInformation(res.data.information.description)
                setError([])
              }
            }
            // data.messages
            //   navigate('/employee/addEmployee')
          }
        })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader className="custum_header ">
            <div className="mr-2 back_icon">
              <i className="bi bi-arrow-left-circle-fill" onClick={(e) => back(e)}></i>
            </div>
            {<strong style={{ fontSize: '18px' }}>Update Profile</strong>}{' '}
            <div className="d-flex "></div>
          </CCardHeader>
          <CCardBody>
            <form onSubmit={handleSubmit(onsubmit)}>
              <div className="row " style={{ paddingLeft: '10px', paddingRight: '10px' }}>
                <div className="col-lg-4">
                  <div className="form-group">
                    <label>
                      <b> Associate Id </b>{' '}
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="associateId"
                      {...register('associateId')}
                      required
                      disabled
                    />
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="form-group">
                    <label>
                      <b> Associate Name</b>{' '}
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="firstname"
                      {...register('firstname')}
                      required
                    />
                  </div>
                </div>               

                <div className="col-lg-4">
                  <div className="form-group">
                    <label> Date Of Birth </label>

                    <input
                      className="form-control"
                      type="date"
                      name="dateOfBirth"
                      format="DD-MM-YYYY"
                      {...register('dateOfBirth')}
                      // required
                    />
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="form-group">
                    <label>
                      <b> E-Mail </b>{' '}
                    </label>
                    <input
                      className="form-control"
                      type="email"
                      name="email"
                      {...register('email')}
                      required
                    />
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="form-group">
                    <label>
                      <b> Contact No </b>
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="phoneNumber"
                      {...register('phoneNumber')}
                      // required
                    />
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="form-group">
                    <label>
                      <b> UAN </b>
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="uan"
                      {...register('uan')}
                      // required
                    />
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="form-group">
                    <label>
                      <b> Designation </b>{' '}
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="designation"
                      {...register('designation')}
                      // required
                    />
                  </div>
                </div>

                <div className="col-lg-4">
                  <div className="form-group">
                    <label>
                      <b> Gender </b>
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="gender"
                      {...register('gender')}
                      // required
                    />
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="form-group">
                    <label>
                      <b> Unit </b>{' '}
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="unit"
                      {...register('unit')}
                      // required
                    />
                  </div>
                </div>

                <div className="col-lg-4">
                  <div className="form-group">
                    <label>
                      <b> Date Of Joining </b>
                    </label>
                    <input
                      className="form-control"
                      type="date"
                      name="doj"
                      {...register('doj')}
                      // required
                    />
                  </div>
                </div>

                <div className="col-lg-4">
                  <div className="form-group">
                    <label>
                      <b> Bank Name</b>{' '}
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="bankName"
                      {...register('bankName')}
                      // required
                    />
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="form-group">
                    <label>
                      <b> Bank Account Number </b>{' '}
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="bankAccountNumber"
                      {...register('bankAccountNumber')}
                      // required
                    />
                  </div>
                </div>
              </div>

              {/* <div className="row">
                <div className="d-flex justify-content-center">
                  <span style={{ textAlign: 'center', color: 'red', fontWeight: 'bold' }}>
                    {error}
                  </span>
                </div>
              </div> */}
              <div className="row" style={{ padding: '10px' }}>
                <div className="col-4"></div>
                <div className="col-4">
                  <span style={{ textAlign: 'left', color: 'red' }}>
                    {information ? information : ''}
                    {error?.map((val, index) => (
                      <div key={index}>
                        {index + 1 + '.  '}
                        {val}
                      </div>
                    ))}
                  </span>
                </div>
                <div className="col"></div>
              </div>

              <div className="row" style={{ padding: '10px' }}>
                <div className="d-flex justify-content-center">
                  <button className="btn  btn-info " style={{ color: 'white' }}>
                    Update {employee.firstname ? employee.firstname : ''} Profile
                  </button>
                </div>
              </div>
            </form>
            {/* <form onSubmit={handleSubmit(onsubmit)}>
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
                    {...register('associateId')}
                    required
                    disabled
                  />
                </div>
                <div className="col-4"></div>
              </div>
              <div className="row" style={{ marginTop: '10px' }}>
                <div className="col-3"></div>
                <div className="col-1" style={{ textAlign: 'right' }}>
                  <label> First Name : </label>
                </div>
                <div className="col-4">
                  <input
                    className="form-control"
                    type="text"
                    name="firstname"
                    {...register('firstname')}
                    required
                  />
                </div>
                <div className="col-4"></div>
              </div>
              <div className="row" style={{ marginTop: '10px' }}>
                <div className="col-3"></div>
                <div className="col-1" style={{ textAlign: 'right' }}>
                  <label> Last Name : </label>
                </div>
                <div className="col-4">
                  <input
                    className="form-control"
                    type="text"
                    name="lastname"
                    {...register('lastname')}
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
                    {...register('email')}
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
                    {...register('phoneNumber')}
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
                    {...register('uan')}
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
                    {...register('designation')}
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
                    {...register('gender')}
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
                    {...register('unit')}
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
                    {...register('doj')}
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
                    {...register('bankName')}
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
                    {...register('bankAccountNumber')}
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
                  <button type="submit" className="btn  btn-info btn-block">
                    Update {employee.firstname ? employee.firstname : ''} Profile
                  </button>
                </div>
                <div className="col"></div>
              </div>
            </form> */}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default EditProfile
