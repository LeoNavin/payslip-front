import React, { useState } from 'react'
import axios from 'axios'

import { useLocation, useNavigate } from 'react-router-dom'
import { Base_Url } from 'src/service/Constant'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import { useEffect } from 'react'

const ProfileImageUpload = () => {
  const navigate = useNavigate()
  const location = useLocation();

  const [file, setFile] = useState()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState()
  const [errors, setErrors] = useState()

  const token = localStorage.getItem('token')

  const config = {
    headers: { Authorization: token },
  }

  useEffect(() => {



    loadingChanges()
  }, [])

  function loadingChanges() {
    setLoading(false)
  }

  function handleChange(event) {
    setFile(event.target.files[0])
  }

  function fileUpload(event) {
    setLoading(true)
    event.preventDefault()
    // const url = 'http://192.168.1.141:8088/payslip/employeeBulkUpload/uploadBulkEmployee'
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

      if (response.data.status) {

        // if(response.data.status){
          navigate('/employee')
        // }
     
      } else {
        setError(response.data.information.description)
        setErrors(response.data.messages)
      }
    })
  }

  //   const fileUpload = async (e) => {
  //     // Test Get DATA
  //     try {
  //       e.preventDefault()
  //       setLoading(true)
  //         await axios
  //           .post('http://192.168.1.141:8088/payslip/employeeBulkUpload/uploadBulkEmployee', config)
  //           .then((res) => {
  //
  //             if (res.data.status === true) {
  //               //   Swal.fire({
  //               //     position: 'top-end',
  //               //     icon: 'success',
  //               //     title: 'Employee data saved successfully',
  //               //     showConfirmButton: false,
  //               //     timer: 1500,
  //               //   })
  //               navigate('/employee')
  //             } else {
  //               //   Swal.fire({
  //               //     title: 'Error!',
  //               //     text: 'Do you want to continue',
  //               //     icon: 'error',
  //               //     confirmButtonText: 'ok',
  //               //   })
  //               setError(res.data.information.description)

  //               navigate('/employee/addEmployee')
  //             }
  //           })

  //     } catch (err) {
  //     } finally {
  //       setLoading(false)
  //     }
  //   }

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

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader className="custum_header ">
            <div className="mr-2 back_icon">
              <i className="bi bi-arrow-left-circle-fill" onClick={(e) => back(e)}></i>
            </div>
            <strong style={{ fontSize: '18px' }}>Profile Upload </strong>{' '}
            <div className="d-flex ">{/* {showIcons()} */}</div>
          </CCardHeader>
          <CCardBody>
            <>
              <div className="row" style={{ marginTop: '10px' }}>
                <div className="col-2"></div>
                <div className="col-2" style={{ textAlign: 'center' }}>
                  {/* <label>Profile </label> */}
                </div>
                <div className="col-4">
                  <input className="form-control" type="file" onChange={handleChange} required />
                </div>
                <div className="col-4">
                  {' '}
                  <button
                    style={{ color: 'white' }}
                    className="btn  btn-info "
                    onClick={(e) => fileUpload(e)}
                  >
                    Upload Profile
                  </button>
                </div>
              </div>

              {/* <div className="row" style={{ padding: '10px' }}>
                <div className="col-4"></div>
                <div className="col-5">
                  <span style={{ textAlign: 'left', color: 'red' }}>
                    {errors?.map((val, index) => (
                      <div key={index}>
                        {index + 1 + '.  '}
                        {val}
                      </div>
                    ))}
                  </span>
                  <span style={{ textAlign: 'left', color: 'red' }}>{error}</span>
                </div>
                <div className="col"></div>
              </div> */}

              {/* <div className="row" style={{ padding: '10px' }}>
                <div className="col-4"></div>
                <div className="col-4">
                  <button
                    style={{ color: 'white' }}
                    className="btn  btn-info btn-block"
                    onClick={(e) => fileUpload(e)}
                  >
                    Upload Employee
                  </button>
                </div>
                <div className="col"></div>
              </div> */}
            </>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ProfileImageUpload
