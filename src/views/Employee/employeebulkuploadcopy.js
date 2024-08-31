import React, { useState } from 'react'
import axios from 'axios'

import { useNavigate } from 'react-router-dom'
import { Base_Url } from 'src/service/Constant'

const EmployeeBulkUpload = () => {
  const navigate = useNavigate()

  const [file, setFile] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

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
    // const url = 'http://192.168.1.141:8088/payslip/employeeBulkUpload/uploadBulkEmployee'
    const url = Base_Url+'employeeBulkUpload/uploadBulkEmployee'
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
      setLoading(false)

      if(response.data.status){
        navigate('/employee')
      }else{
        setError(response.data.message)
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

  return (
    <>
      <div className="d-flex align-items-top justify-content-center min vh-100  ">
        <div className="card" style={{ width: '100%', height: '100%' }}>
          <div className="card-header" style={{ backgroundColor: '#19334D' }}>
            <h3 style={{ textAlign: 'center', color: '#ffffff' }}>Employee Bulk Upload</h3>
          </div>
          <div className="row" style={{ marginTop: '10px' }}>
            <div className="col-2"></div>
            <div className="col-2" style={{ textAlign: 'center' }}>
              <label>Employee Upload :</label>
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
              <button className="btn  btn-info btn-block" onClick={(e) => fileUpload(e)}>
                Upload Employee
              </button>
            </div>
            <div className="col"></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EmployeeBulkUpload
