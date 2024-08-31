import React, { useState } from 'react'
import axios from 'axios'

import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormLabel,
  CHeader,
  CImage,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { Base_Url } from 'src/service/Constant'

const OTPValidation = () => {
  const navigate = useNavigate()

  const [otp, setOtp] = useState('')
  const [otpCheck, setOtpCheck] = useState(localStorage.getItem('otpCheck'))

  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(59)

  //   const [employee, setEmployee] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  const role = localStorage.getItem('role')

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1)
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval)
          localStorage.removeItem('otpCheck')
        } else {
          setSeconds(30)
          setMinutes(minutes - 1)
        }
      }
    }, 1000)

    if (!localStorage.getItem('otpCheck') || !otpCheck) {
      if (!localStorage.getItem('otpCheck')) {
        if (otpCheck === null || otpCheck === '') {
          navigate('/login')
        }
      }
    }

    return () => {
      clearInterval(interval)
    }
  }, [seconds])

  const clearState = (e) => {
    // delete location.state.otp
    localStorage.removeItem('otpCheck')
    e.preventDefault()
    setOtpCheck({ ...otpCheck })
  }

  

  // const handleInputChange = (e) => {
  //   const { otp, value } = e.target.value

  //   setOtp({ ...otp, [otp]: value })
  // }

  const handleInputChange = (event) => {
    if (event.target.value.length === 6) {
      var msg = ''
      setError(msg)
      const { name, value } = event.target
      setOtp({ ...otp, [name]: value })
    } else {
      var msg = 'OTP length is invalid'
      setError(msg)
    }
  }

  const token = localStorage.getItem('token')

  const config = {
    headers: { Authorization: token },
  }

  const OTPGenerate = async (e) => {
    setLoading(true)

    await axios
      // .get('http://192.168.1.141:8088/payslip/user/otpgenerate', config)
      .get(Base_Url + 'user/otpgenerate', config)
      .then((response) => {
       
        if (response.data.status === true) {
          setLoading(false)

          //   Swal.fire({
          //     position: 'top-end',
          //     icon: 'success',
          //     title: 'Employee data saved successfully',
          //     showConfirmButton: false,
          //     timer: 1500,
          //   })
          // clearState(e)
          setOtpCheck(response.data.otp)
          setSeconds(59)
          // localStorage.setItem('otpCheck', response.data.otp)
          // navigate('/otpValidation')
        } else {
          //   Swal.fire({
          //     title: 'Error!',
          //     text: 'Do you want to continue',
          //     icon: 'error',
          //     confirmButtonText: 'ok',
          //   })
          setError(response.data.information.description)

          // navigate('/employee/addEmployee')
        }
      })
  }
  const CheckOTP = (e) => {
    // const otpCheck = localStorage.getItem('otpCheck')

   

    if (otpCheck === otp.otp) {
      

      localStorage.removeItem('otpCheck')
      e.preventDefault()

      {
        role === 'ADMIN' ? navigate('/employee') : navigate('/monthAndYear')
      }
    } else {
      var msg = 'OTP is Invalid'
      setError(msg)
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
      <div className="bg-light d-flex flex-row align-items-center  vh-100">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={5}>
              <CCardGroup>
                <CCard className="p-4">
                  <CHeader>
                    <h4 style={{ textAlign: 'center', width: '100%' }}> Verification Code</h4>
                  </CHeader>
                  <CCardBody>
                    <CForm>
                      <CFormLabel style={{ textAlign: 'center', width: '100%' ,color:'red'}}>OTP sent your registered E-Mail</CFormLabel>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <i className="bi bi-three-dots"></i>
                        </CInputGroupText>
                        <CFormInput
                          type="number"
                          placeholder="Enter OTP"
                          name="otp"
                          value={otp.otpValue}
                          onChange={handleInputChange}
                          pattern="^\d(?=?[0-9])+$"
                          maxLength={6}
                        />
                      </CInputGroup>

                      <CRow>
                        <CCol>
                          <div className="d-flex justify-content-between">
                            {seconds > 0 || minutes > 0 ? (
                              <p>
                                Time Remaining:{' '}
                                <span style={{ color: 'red' }}>
                                  {minutes < 10 ? `0${minutes}` : minutes} :{' '}
                                  {seconds < 10 ? `0${seconds}` : seconds}
                                </span>
                              </p>
                            ) : (
                              <p>Did not recieve code?</p>
                            )}

                            <CButton
                              disabled={seconds > 0 || minutes > 0}
                              style={{
                                
                                color: seconds > 0 || minutes > 0 ?  '#DFE3E8' :'#DFE3E8',
                              }}
                              onClick={(e) => OTPGenerate(e)}
                            >
                              Resend OTP
                            </CButton>
                          </div>
                        </CCol>
                      </CRow>
                      <CRow>
                        <div style={{ color: 'red' }}>
                          <span>{error}</span>
                        </div>
                      </CRow>

                      <CRow>
                        <CCol style={{ textAlign: 'center', fontWeight: 'bold', color: 'white' }}>
                          <CButton style={{ textAlign: 'center', fontWeight: 'bold', color: 'white' }} className="px-5 btn btn-info mt-3" onClick={(e) => CheckOTP(e)}>
                            Submit
                          </CButton>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </>
  )
}

export default OTPValidation
