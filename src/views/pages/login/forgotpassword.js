import axios from 'axios'
import React, { useState, Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import { Base_Url } from 'src/service/Constant'

const ForgetPassword = () => {
  const navigate = useNavigate()
  const Swal = require('sweetalert2')
  const [user, setUser] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setUser({ ...user, [name]: value })
  }

  // Test Get DATA
  function emailValidation(email) {
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    if (!email || regex.test(email) === false) {
      return false
    }
    return true
  }
  const emailSendendApi = (e) => {
    e.preventDefault()
    

    let data = {
      email: user.email,
    }

    if (emailValidation(data.email)) {
      // setLoading(true)

      // axios.post('http://192.168.1.141:8088/payslip/user/forgotpassword', data).then((res) => {
      axios.post(Base_Url+'user/forgotpassword', data).then((res) => {
      

        if (res.data.status) {
          // setLoading(false)
          Swal.fire({
            toast:true,
            position: 'top-end',
            icon: 'success',
            title: 'Password sended your mail please check.',
            showConfirmButton: false,
            timer: 1500,
          })
          navigate('/login')
        } else {
          setError(res?.data?.information?.description)
          // setLoading(false)
          //   Swal.fire({
          //     title: "Error!",
          //     text: "User email can't exit",
          //     icon: "error",
          //     confirmButtonText: "ok",
          //   });
          navigate('/forgetpassword')
        }

        if (loading) {
          return <h1 style={{ textAlign: 'center' }}>Loading...</h1>
        }
      })
    }else{
      setError('Please enter valid email...')
    }
  }

  const back = () => {
    navigate('/login')
  }
  // if (loading) {
  //   // return <h1>Loading...</h1>
  //   return (
  //     <div className="app_content">
  //       <div className="loading">Loading&#8230;</div>
  //     </div>
  //   )
  // }
  return (
    <Fragment>
      <div className="d-flex align-items-center justify-content-center min vh-100 ">
        <div className="col-5">
          <div className="card" style={{ alignContent: 'center' }}>
            <div className="card-header" >
              <h3 style={{ textAlign: 'center', color: 'black' }}>Forgot Password</h3>
            </div>
            <div className="card-body">
              <div className="row" style={{ marginTop: '10px' }}>
                <div className="col" style={{ textAlign: 'center' }}>
                  <label> Enter your registered email ID </label>
                </div>
              </div>

              <div className="row" style={{ marginTop: '10px' }}>
                <div
                  className="col"
                  style={{ textAlign: 'center', paddingLeft: '100px', paddingRight: '100px' }}
                >
                  <input
                    className="form-control"
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="row" style={{ marginTop: '10px' }}>
                <div
                  className="col"
                  style={{ textAlign: 'center', fontWeight: 'bold', color: 'red' }}
                >
                  {error}
                </div>
              </div>

              <div
                className="row"
                style={{ paddingLeft: '90px', paddingRight: '90px', paddingTop: '10px' }}
              >
                <div className="col">
                  <button
                    className="btn btn-primary btn-block"
                    style={{
                      textDecoration: 'none',
                      color: '#ffffff',
                      marginTop: '5px',
                    }}
                    onClick={(e) => back(e)}
                  >
                    Back
                  </button>
                </div>
                <div className="col">
                  <button
                    type="button"
                    className="btn btn-info btn-block"
                    style={{
                      textDecoration: 'none',
                      color: '#ffffff',
                      marginTop: '5px',
                    }}
                    onClick={(e) => emailSendendApi(e)}
                  >
                    Send
                  </button>
                </div>
              </div>
              {/* <div className="row" style={{ padding: '10px' }}>
                <div className="col-7"></div>
                <div className="col-5"></div>

                <div className="col"></div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default ForgetPassword
