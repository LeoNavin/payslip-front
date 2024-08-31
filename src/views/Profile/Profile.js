import React, { useState } from 'react'
import axios from 'axios'

import { Link, useNavigate } from 'react-router-dom'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import { useEffect } from 'react'
import { cilUserPlus, cilPencil } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { Base_Url } from 'src/service/Constant'
import { format } from 'date-fns'
import moment from 'moment'
import { logo } from 'src/assets/brand/logo'

const Profile = () => {
  const navigate = useNavigate()
  const [file, setFile] = useState()
  const [employee, setEmployee] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  const [errors, setErrors] = useState()
  const [filesize, setFilesize] = useState()

  const [imageSize, setImageSize] = useState(null)

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
        // res.data.user.doj = Moment(res.data.user.doj).format('YYYY-MM-DD')
        setLoading(false)

        res.data.user.doj = moment(res.data.user.doj).format('DD-MM-YYYY')
        res.data.user.dateOfBirth = moment(res.data.user.dateOfBirth).format('DD-MM-YYYY')

        setEmployee(res.data.user)
      }
      {
        setLoading(false)

        setError("User Details can't be find")
      }
    })
  }

  function handleChange(event) {
    setFile(event.target.files[0])
  }

  function fileUpload(event) {
    setLoading(true)
    event.preventDefault()

    // if (file.size <= 5242880) {
      const url = Base_Url + 'user/changeProfile'
      const formData = new FormData()
      formData.append('file', file)
      // formData.append('fileName', file.name)
      const config = {
        headers: {
          Authorization: token,
          'content-type': 'multipart/form-data',
        },
      }
      axios.post(url, formData, config).then((response) => {
        setLoading(false)
        //  console.log('response',response);

        if (response.data.status) {
          window.location.reload()
          // if(response.data.status){
          navigate('/employee')
          // }
        } else {
          setError(response.data.information.description)
          setErrors(response.data.messages)
        }
      })
    // } else {
    //   setLoading(false)
    //   setFilesize('Your Profile Image Size must be less than or equals to 5 MB.')
    // }
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setEmployee({ ...employee, [name]: value })
  }

  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')

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
        //   title: 'Error!',
        //   text: 'Insert the Values',
        //   icon: 'error',
        //   confirmButtonText: 'ok',
        // })
        navigate('/employee/addEmployee')
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

  //previous use this
  // const showIcons = () => {
  //   return (
  //     // <view>
  //     <div className="d-flex ">
  //       <div>
  //         <Link to={'/profile/editProfile'}>
  //           <i className="bi bi-pencil-square" style={{ fontSize: '24px' }}></i>
  //         </Link>
  //       </div>
  //     </div>
  //     // </view>
  //   )
  // }

  const showIcons = () => {
    return (
      // <view>
      <div className="d-flex ">
        <div>
          {role == 'ADMIN' ? (
            <Link to={'/profile/editProfile'}>
              <i className="bi bi-pencil-square" style={{ fontSize: '24px' }}></i>
            </Link>
          ) : (
            ''
          )}
        </div>
      </div>
      // </view>
    )
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4" style={{ width: '100%', height: '100%' }}>
          <CCardHeader className="custum_header ">
            <div className="mr-2 back_icon">
              {/* <i className="bi bi-arrow-left-circle-fill" onClick={(e) => back(e)}></i> */}
            </div>
            <strong style={{ fontSize: '18px' }}>Profile </strong>{' '}
            <div className="d-flex "> {showIcons()}</div>
          </CCardHeader>
          <CCardBody>
            <div className="row">
              {/* table _1 */}
              <div className="col-xl-4 col-sm-12 col-lg-6 profile_table">
                <table className="table table-borderless">
                  <tbody>
                    <tr>
                      <th>Associate Id {/* <span className="float-end"> :</span> */}</th>
                      <td>
                        {' '}
                        <label className="mb-0">
                          {employee.associateId ? employee.associateId : '-'}
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        Associate Name
                        {/* <span className="float-end"> :</span> */}
                      </th>
                      <td>
                        {' '}
                        <label className="mb-0">
                          {employee.firstname ? employee.firstname : '-'}
                        </label>
                      </td>
                    </tr>

                    <tr>
                      <th> D.O.B {/* <span className="float-end"> :</span> */}</th>
                      <td>
                        {' '}
                        <label className="mb-0">
                          {employee.dateOfBirth
                            ? employee.dateOfBirth !== 'Invalid date'
                              ? employee.dateOfBirth
                              : '-'
                            : '-'}
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <th>E-Mail {/* <span className="float-end"> :</span> */}</th>
                      <td>
                        {' '}
                        <label className="mb-0">{employee.email ? employee.email : '-'}</label>
                      </td>
                    </tr>
                    <tr>
                      <th>Unit {/* <span className="float-end"> :</span> */}</th>
                      <td>
                        {' '}
                        <label className="mb-0">{employee.unit ? employee.unit : '-'}</label>
                      </td>
                    </tr>
                    <tr>
                      <th>Date Of Joining {/* <span className="float-end"> :</span> */}</th>
                      <td>
                        {' '}
                        <label className="mb-0">
                          {employee.doj
                            ? employee.doj !== 'Invalid date'
                              ? employee.doj
                              : '-'
                            : '-'}
                        </label>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* table _2 */}
              <div className="col-xl-4 col-sm-12 col-lg-6 profile_table">
                <table className="table table-borderless">
                  <tbody>
                    <tr>
                      <th>Contact No {/* <span className="float-end"> :</span> */}</th>
                      <td>
                        {' '}
                        <label className="mb-0">
                          {employee.phoneNumber ? employee.phoneNumber : '-'}
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <th>UAN {/* <span className="float-end"> :</span> */}</th>
                      <td>
                        {' '}
                        <label className="mb-0">{employee.uan ? employee.uan : '-'}</label>
                      </td>
                    </tr>
                    <tr>
                      <th>Designation {/* <span className="float-end"> :</span> */}</th>
                      <td>
                        {' '}
                        <label className="mb-0">
                          {employee.designation ? employee.designation : '-'}
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <th>Gender {/* <span className="float-end"> :</span> */}</th>
                      <td>
                        {' '}
                        <label className="mb-0">{employee.gender ? employee.gender : '-'}</label>
                      </td>
                    </tr>
                    <tr>
                      <th>Bank Name {/* <span className="float-end"> :</span> */}</th>
                      <td>
                        {' '}
                        <label className="mb-0">
                          {employee.bankName ? employee.bankName : '-'}
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <th>Bank Account Number {/* <span className="float-end"> :</span> */}</th>
                      <td>
                        {' '}
                        <label className="mb-0">
                          {employee.bankAccountNumber ? employee.bankAccountNumber : '-'}
                        </label>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* table _3 */}
              <div className="col-xl-4 col-sm-12 col-lg-6 ">
                <div className="profile_edit_part ">
                  <img
                    src={employee.profilePath}
                    className="profile_img img-circle img-thumbnail"
                  />

                  <button
                    className="btn btn-primary"
                    data-toggle="modal"
                    data-target="#exampleModal"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      fill="currentColor"
                      className="bi bi-pencil-square"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                      <path
                        fillRule="evenodd"
                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                      />
                    </svg>
                    <span className="ml-1 mb-1"> Edit</span>
                  </button>
                </div>
              </div>

              <div
                className="modal fade"
                id="exampleModal"
                tabIndex={-1}
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        Profile Update
                      </h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">×</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <div className="row d-flex align-items-center" style={{ marginTop: '10px' }}>
                        <div className="col-4"> Choose Profile</div>

                        <div className="col-8">
                          <input
                            className="form-control"
                            type="file"
                            onChange={handleChange}
                            required
                          />
                        </div>
                        {/* <button
                    style={{ color: 'white' }}
                    className="btn  btn-info "
                  >
                    Upload Profile
                  </button> */}
                        <div className="col-12 mt-2">
                          <span style={{ textAlligen: 'center', color: 'red', fontWeight: 'bold' }}>
                            {' '}
                            {filesize}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-dismiss="modal">
                        Close
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={(e) => fileUpload(e)}
                        disabled={file != null ? false : true}
                      >
                        Update Profile
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/** This is new table design created above this is also after design this is hide */}
            {/* <div className="row" style={{ marginTop: '10px', paddingLeft: '20px' }}>
              <div className="col" style={{ textAlign: 'right', fontWeight: 'bold' }}>
                <label> Associate Id : </label>
              </div>
              <div className="col">
                <label>{employee.associateId ? employee.associateId : ''}</label>
              </div>
              <div className="col" style={{ textAlign: 'right', fontWeight: 'bold' }}>
                <label>First Name : </label>
              </div>
              <div className="col">
                <label>{employee.firstname ? employee.firstname : ''}</label>
              </div>
              <div className="col" style={{ textAlign: 'right', fontWeight: 'bold' }}>
                <label>Last Name : </label>
              </div>
              <div className="col" style={{ alignItems: 'left' }}>
                <label>{employee.lastname ? employee.lastname : ''}</label>
              </div>
            </div>

            <div className="row" style={{ marginTop: '10px', paddingLeft: '20px' }}>
              <div className="col" style={{ textAlign: 'right', fontWeight: 'bold' }}>
                <label>E-Mail : </label>
              </div>
              <div className="col">
                <label>{employee.email ? employee.email : ''}</label>
              </div>
              <div className="col" style={{ textAlign: 'right', fontWeight: 'bold' }}>
                <label>Contact No : </label>
              </div>
              <div className="col">
                <label>{employee.phoneNumber ? employee.phoneNumber : ''}</label>
              </div>
              <div className="col" style={{ textAlign: 'right', fontWeight: 'bold' }}>
                <label>UAN :</label>
              </div>
              <div className="col" style={{ alignItems: 'left' }}>
                <label>{employee.uan ? employee.uan : ''}</label>
              </div>
            </div>

            <div className="row" style={{ marginTop: '10px', paddingLeft: '20px' }}>
              <div className="col" style={{ textAlign: 'right', fontWeight: 'bold' }}>
                <label>Designation :</label>
              </div>
              <div className="col">
                <label>{employee.designation ? employee.designation : ''}</label>
              </div>
              <div className="col" style={{ textAlign: 'right', fontWeight: 'bold' }}>
                <label>Gender : </label>
              </div>
              <div className="col">
                <label>{employee.gender ? employee.gender : ''}</label>
              </div>
              <div className="col" style={{ textAlign: 'right', fontWeight: 'bold' }}>
                <label>Unit :</label>
              </div>
              <div className="col" style={{ alignItems: 'left' }}>
                <label>{employee.unit ? employee.unit : ''}</label>
              </div>
            </div>

            <div className="row" style={{ marginTop: '10px', paddingLeft: '20px' }}>
              <div className="col" style={{ textAlign: 'right', fontWeight: 'bold' }}>
                <label>Date Of Joining :</label>
              </div>
              <div className="col">
                <label>{employee.doj ? employee.doj : ''}</label>
              </div>
              <div className="col" style={{ textAlign: 'right', fontWeight: 'bold' }}>
                <label>Bank Name :</label>
              </div>
              <div className="col">
                <label>{employee.bankName ? employee.bankName : ''}</label>
              </div>
              <div className="col" style={{ textAlign: 'right', fontWeight: 'bold' }}>
                <label>Bank Account Number :</label>
              </div>
              <div className="col" style={{ alignItems: 'left' }}>
                <label>{employee.bankAccountNumber ? employee.bankAccountNumber : ''}</label>
              </div>
            </div> */}

            {/*  this is already hided *\}
            {/* 
            <div className="row" style={{ marginTop: '10px', paddingLeft: '20px' }}>
              <div className="col-1">
                <label> Associate Id : </label>
              </div>
              <div className="col-2">
                <label>{employee.associateId ? employee.associateId : ''}</label>
              </div>
              <div className="col-1">
                <label>First Name : </label>
              </div>
              <div className="col-2">
                <label>{employee.firstname ? employee.firstname : ''}</label>
              </div>
              <div className="col-1">
                <label>Last Name : </label>
              </div>
              <div className="col-2">
                <label>{employee.lastname ? employee.lastname : ''}</label>
              </div>
              <div className="col-1">
                <label>E-Mail : </label>
              </div>
              <div className="col-2">
                <label>{employee.email ? employee.email : ''}</label>
              </div>
            </div>

            <div className="row" style={{ marginTop: '10px', paddingLeft: '20px' }}>
              <div className="col-1">
                <label> Contact No : </label>
              </div>
              <div className="col-2">
                <label>{employee.phoneNumber ? employee.phoneNumber : ''}</label>
              </div>
              <div className="col-1">
                <label>UAN :</label>
              </div>
              <div className="col-2">
                <label>{employee.uan ? employee.uan : ''}</label>
              </div>
              <div className="col-1">
                <label>Designation : </label>
              </div>
              <div className="col-2" style={{ alignItems: 'left' }}>
                <label>{employee.designation ? employee.designation : ''}</label>
              </div>
              <div className="col-1">
                <label>Gender : </label>
              </div>
              <div className="col-2">
                <label>{employee.gender ? employee.gender : ''}</label>
              </div>
            </div>

            <div className="row" style={{ marginTop: '10px', paddingLeft: '20px' }}>
              <div className="col-1">
                <label> Unit : </label>
              </div>
              <div className="col-2">
                <label>{employee.unit ? employee.unit : ''}</label>
              </div>
              <div className="col-1">
                <label>Date Of Joining :</label>
              </div>
              <div className="col-2">
                <label>{employee.doj ? employee.doj : ''}</label>
              </div>
              <div className="col-1">
                <label>Bank Name : </label>
              </div>
              <div className="col-2" style={{ alignItems: 'left' }}>
                <label>{employee.bankName ? employee.bankName : ''}</label>
              </div>
              <div className="col-1">
                <label>Bank Account Number : </label>
              </div>
              <div className="col-2">
                <label>{employee.bankAccountNumber ? employee.bankAccountNumber : ''}</label>
              </div>
            </div> */}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Profile
