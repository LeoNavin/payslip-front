import React, { useState } from 'react'

import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CHeader,
  CImage,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react'
import { event } from 'jquery'
import { ClipLoader } from 'react-spinners'
import { Base_Url } from 'src/service/Constant'
import side_imge from '../../../assets/images/payroll_login.png'
const Login = () => {
  const navigate = useNavigate()

  const initialFormState = { username: '', password: '' }
  const [user, setUser] = useState(initialFormState)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  const [passwordType, setPasswordType] = useState(false)

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setUser({ ...user, [name]: value })
  }

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login')
    }
    localStorage.clear()
  }, [])

  if (loading) {
    // this.setLoading(true)
    // setTimeout(() => {
    //   this.setLoading(false)
    // }, 2000)
    return (
      <div className="app_content">
        <div className="loading">Loading&#8230;</div>
      </div>
    )
  }

  const loginApi = async (e) => {
    // Test Get DATA
    try {
      e.preventDefault()

      if (user.username && user.password) {
        const usersData = axios
          // .post('http://192.168.1.141:8088/payslip/user/login', user)
          .post(Base_Url + 'user/login', user)
          .then((res) => {
            setLoading(true)


            if (res.data.status === true) {

              localStorage.setItem('token', res.data.response.Authorization)
              localStorage.setItem('role', res.data.response.role)

              localStorage.setItem('username', res.data.response.username)

              localStorage.setItem('firstname', res.data.response.firstname)

              localStorage.setItem('userId', res.data.response.id)

              localStorage.setItem('userProfilePath', res.data.response.profilePath)

              const token = localStorage.getItem('token')

              const config = {
                headers: { Authorization: token },
              }
              // axios.get('http://192.168.1.141:8088/payslip/user/otpgenerate', config).then((res) => {
              axios.get(Base_Url + 'user/otpgenerate', config).then((res) => {
                if (res.data.status === true) {
                  setLoading(false)
                  // Swal.fire({
                  //   position: "top-end",
                  //   icon: "success",
                  //   title: "Your work has been saved",
                  //   showConfirmButton: false,
                  //   timer: 1500,
                  // });

                  var values = { otp: res.data.otp }
                  localStorage.setItem('otpCheck', res.data.otp)

                  navigate('/otpValidation', { state: values })
                  // navigate('/employee')
                } else {
                  setLoading(false)
                  var msg = 'Username & Password is invalid'
                  setError(msg)
                }
              })
            } else {
              setLoading(false)
              var msg = 'Username & Password is invalid'
              setError(msg)
            }
          })
        setLoading(false)
        var msg = ''
        setError(msg)
      } else {
        setLoading(false)
        var msg = 'Username & Password is Empty '
        setError(msg)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login_full_part">
      {/* <CContainer> */}
      <CRow className="g-0 login_full_part">
        <CCol className="side_img col-lg-7">
          {/* <img src={side_imge} alt="sideimage" className="login_side_img" /> */}
        </CCol>
        <CCol className="login_part col-lg-4">
          {/* <CCardGroup> */}
          <div className="d-flex align-items-center justify-content-center">
            <CCard className="p-4 border-0">
              <CHeader className="login d-flex justify-content-center">
                <CImage
                  src="https://boscosofttech.com/public/frontend/img/logo/bosco-logo.png"
                  style={{
                    height: '50px',
                    width: '300px',
                    objectFit: 'contain',
                    position: 'absolute',
                  }}
                />
              </CHeader>
              <CCardBody>
                <CForm>
                  <CRow>
                    <div style={{ textAlign: 'center', color: 'red' }}>
                      <span>{error}</span>
                    </div>
                  </CRow>
                  <br />
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Username"
                      autoComplete="username"
                      name="username"
                      value={user.username}
                      onChange={handleInputChange}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      // type="password"
                      // type={passwordType}
                      type={passwordType ? 'text' : 'password'}
                      placeholder="Password"
                      name="password"
                      value={user.password}
                      onChange={handleInputChange}
                      autoComplete="current-password"
                    />
                    <div className="input-group-btn">
                      <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={() => {
                          setPasswordType(!passwordType)
                        }}
                      >
                        {passwordType ? (
                          <i className="bi bi-eye-slash"></i>
                        ) : (
                          <i className="bi bi-eye"></i>
                        )}
                      </button>
                    </div>
                  </CInputGroup>

                  <CRow>
                    <CCol xs={6}>
                      <CButton color="primary" className="px-4" onClick={(e) => loginApi(e)}>
                        Login
                      </CButton>
                    </CCol>
                    <CCol xs={6} className="text-right">
                      <CButton
                        color="link"
                        className="px-0"
                        style={{ textDecoration: 'none', color: 'black', marginRight: '12px' }}
                      >
                        Forgot Password?
                        <Link style={{ textDecoration: 'none' }} to="/forgetPassword">
                          Click here
                        </Link>
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </div>
          {/* <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard> */}
          {/* </CCardGroup> */}
        </CCol>
      </CRow>
      {/* </CContainer> */}
    </div>
  )
}

export default Login
