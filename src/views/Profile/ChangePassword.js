import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { useNavigate } from 'react-router-dom'
import Select from 'react-select'
import '../../scss/style.scss'
import { get } from 'lodash'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import { Base_Url } from 'src/service/Constant'

const ChangePassword = () => {
  const navigate = useNavigate()

  const [month, setMonth] = useState(null)
  const [monthAndYear, setMonthAndYear] = useState({})
  const [selectedOption, setSelectedOption] = useState(null)
  const [error, setError] = useState(null)
  const [type, setType] = useState(false)
  const [type1, setType1] = useState(false)

  const [selectedYear, setSelectedYear] = useState(null)

  const [loading, setLoading] = useState(false)

  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')

  const config = {
    headers: { Authorization: token },
  }


  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login')
    }
  }, [])

  const {
    register,
    getValues,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm()

  if (loading) {
    return (
      <div className="app_content">
        <div className="loading">Loading&#8230;</div>
      </div>
    )
    // return <h1>Loading...</h1>
  }

  const back = () => {
    setLoading(true)
    navigate('/employee')
  }

  const onsubmit = async (data) => {
    try {
      let userData = {
        oldPassword: data.oldPassword,
        confirmPassword: data.confirmPassword,
      }

      setLoading(true)

      await axios
        // .post('http://192.168.1.141:8088/payslip/user/changePassowrd', userData, config)
        .post(Base_Url + 'user/changePassowrd', userData, config)
        .then((res) => {
          if (res.data.status) {
            Swal.fire({
              toast: true,
              position: 'top-end',
              icon: 'success',
              title: 'Password Successfully Updated',
              showConfirmButton: false,
              timer: 1500,
            })
            role == 'ADMIN' ? navigate('/employee') : navigate('/monthAndYear')
          } else {
            setError(res.data.information.description)
          }
        })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader className="custum_header ">
              <div className="mr-2 back_icon">
                {/* <i className="bi bi-arrow-left-circle-fill" onClick={(e) => back(e)}></i> */}
              </div>
              <strong style={{ fontSize: '20px' }}>Change Password</strong>{' '}
              <div className="d-flex ">{/* {showIcons()} */}</div>
            </CCardHeader>
            <CCardBody>
              <div className="mx-auto col-xl-8 col-lg-10 col-md-12">
                <form onSubmit={handleSubmit(onsubmit)}>
                  {/* {errors.confirmPassword?.type === 'validate' && (
                    <div  style={{ color:"red",fontWeight:"bold",textAlign:'center',marginTop:'8px' }}>Confirm password is mismatch</div>
                  )} */}
                  <div className="row mb-3">
                    <div className="col-lg-4">
                      <label>
                        {' '}
                        <b>Old Password</b>{' '}
                      </label>
                    </div>
                    <div className="col-lg-8 ">
                      <input
                        className="form-control"
                        type="text"
                        name="password"
                        placeholder="Old Password "
                        //   value={employee.associateId}
                        //   onChange={handleInputChange}
                        {...register('oldPassword')}
                        required
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-lg-4">
                      <label>
                        <b> New Password </b>{' '}
                      </label>
                    </div>
                    <div className="col-lg-8 d-flex align-items-center">
                      <input
                        type={type ? 'text' : 'password'}
                        className="custum-control form-control"
                        placeholder="New Password "
                        required
                        {...register('newpassword', {
                          required: true,
                          // pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                        })}
                        aria-invalid={errors.newpassword ? 'true' : 'false'}
                      />

                      <div className="input-group-btn">
                        <button
                          type="button"
                          className="btn btn-outline-primary"
                          onClick={() => {
                            setType(!type)
                          }}
                        >
                          {type ? (
                            <i className="bi bi-eye-slash"></i>
                          ) : (
                            <i className="bi bi-eye"></i>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-lg-4 d-flex">
                      <label>
                        <b> Confirm New Password </b>{' '}
                      </label>
                    </div>
                    <div className="col-lg-8 d-flex align-items-center">
                      <input
                        type={type1 ? 'text' : 'password'}
                        className="custum-control form-control"
                        placeholder="Confirm New Password "
                        required
                        {...register('confirmPassword', {
                          required: true,
                          validate: (value) => value === getValues('newpassword'),
                        })}
                      ></input>
                      <div className="input-group-btn">
                        <button
                          type="button"
                          className="btn btn-outline-primary"
                          onClick={() => {
                            setType1(!type1)
                          }}
                        >
                          {type1 ? (
                            <i className="bi bi-eye-slash"></i>
                          ) : (
                            <i className="bi bi-eye"></i>
                          )}
                        </button>
                      </div>
                    </div>
                    {/* {errors.confirmPassword?.type === 'required' && (
                    <div className="text_danger"> Confirm Password is required</div>
                  )} */}
                    {errors.confirmPassword?.type === 'validate' && (
                      <div
                        style={{
                          color: 'red',
                          fontWeight: 'bold',
                          textAlign: 'center',
                          marginTop: '8px',
                        }}
                      >
                        Confirm password is mismatch
                      </div>
                    )}
                  </div>

                  <div
                    style={{
                      color: 'red',
                      fontWeight: 'bold',
                      textAlign: 'center',
                      marginTop: '8px',
                    }}
                  >
                    {error}
                  </div>

                  <div className="text-center  d-flex justify-content-center w-100">
                    <button type="submit" className="btn col-lg-3 btn-info btn-block text-white">
                      Change Password
                    </button>
                  </div>
                </form>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default ChangePassword
