import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { useLocation, useNavigate } from 'react-router-dom'
import { Base_Url } from 'src/service/Constant'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'

const EmployeeBulkUploadPaySlip = () => {
  const location = useLocation()

  const navigate = useNavigate()

  const [file, setFile] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  const [information, setInformation] = useState()

  const [monthData, setmonthData] = useState()
  const [yearData, setyearData] = useState()
  const [idData, setidData] = useState()

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login')
    }
    getMonthId()
  }, [])

  const getMonthId = () => {
    setLoading(true)
    const monthvalue = localStorage?.getItem('month')
    const yearvalue = localStorage?.getItem('year')
    const idValue = localStorage?.getItem('id')
    setmonthData(monthvalue)
    setyearData(yearvalue)
    setidData(idValue)
    setLoading(false)

  }


  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: token },
  }

  function handleChange(event) {
    setFile(event.target.files[0])
  }

  function fileUpload(event) {
    setLoading(true)
    event.preventDefault()
    // const url = 'http://192.168.1.141:8088/payslip/payslipBulkUpload/uploadBulkEmployeePaySlip?id=' + idData
    const url = Base_Url + 'payslipBulkUpload/uploadBulkEmployeePaySlip?id=' + idData
    const formData = new FormData()
    formData.append('file', file)
    formData.append('fileName', file.name)
    const config = {
      headers: {
        Authorization: token,
        'content-type': 'multipart/form-data',
      },
    }
    axios.post(url, formData, config).then((response) => {
   

      if (response?.data?.message) {
        setLoading(false)
        setError(response?.data?.message)
      }
      if (response?.data) {
        setLoading(false)
        if (response?.data.messages) {
          setError(response?.data?.messages)
          setInformation('')
        } else {
          setInformation(response?.data?.information?.description)
          setError([])
        }

        if (response?.data?.status) {
          setLoading(true)
          navigate('/monthAndYear/viewPaySlip')
        }
      }

      if (response?.data?.status) {
        setLoading(true)
        navigate('/monthAndYear/viewPaySlip')
      }
    })
  }

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
    navigate('/monthAndYear/viewPaySlip')
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader className="custum_header ">
            <div className="mr-2 back_icon">
              <i className="bi bi-arrow-left-circle-fill" onClick={(e) => back(e)}></i>
            </div>
            <strong style={{fontSize:'16px'}}>Salary Slip Bulk Upload - {monthData} - {yearData} </strong>{' '}
            <div className="d-flex ">{/* {showIcons()} */}</div>
          </CCardHeader>
          <CCardBody>
            <>
              {/* <div className="card-header" style={{ backgroundColor: '#19334D' }}>
            <h3 style={{ textAlign: 'center', color: '#ffffff' }}>PaySlip Bulk Upload </h3>
          </div> */}
              <div className="row" style={{ marginTop: '10px' }}>
                <div className="col-2"></div>
                <div className="col-2" style={{ textAlign: 'center' }}>
                  <label>Salary Details Upload </label>
                </div>
                <div className="col-4">
                  <input className="form-control" type="file" onChange={handleChange} required />
                </div>
                <div className="col-4"></div>
              </div>

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
                <div className="col-4"></div>
                <div className="col-4">
                  <button  style={{ color:'white' }}  className="btn  btn-info btn-block" onClick={(e) => fileUpload(e)}>
                    Upload Salary Slip
                  </button>
                </div>
                <div className="col"></div>
              </div>
            </>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default EmployeeBulkUploadPaySlip
