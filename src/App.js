import React, { Component, Suspense } from 'react'
import { BrowserRouter, HashRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import './scss/style.scss'
import './scss/employee.scss'

const loading = (
  <div className="app_content align-content-center">
  <div className="loading">Loading&#8230;</div>
</div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const OTPValidation = React.lazy(() => import('./views/OTPValidation/OTPValidate'))

const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const ForgetPassword = React.lazy(() => import('./views/pages/login/forgotpassword'))

const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

function App() {
  // const authToken = localStorage.getItem('token')
  // const role = localStorage.getItem('role')

  
  
  


  return (

    <HashRouter>
      <Suspense fallback={loading}>
        <Routes>
          <Route exact path="/" name="Login Page" element={<Login />} />
          <Route path="/login" name="Login Page" element={<Login />} />
          <Route path="/register" name="Register Page" element={<Register />} />
          <Route path="/forgetpassword" name="Forget Password" element={<ForgetPassword />} />

          <Route path="/404" name="Page 404" element={<Page404 />} />
          <Route path="/500" name="Page 500" element={<Page500 />} />
          <Route path="/otpValidation" name="OTPValidation" element={<OTPValidation />} />

          {/* <Route path="/" render={(!authToken === undefined) ? <Navigate to="/employee" /> : <DefaultLayout />}/> */}
          {/* <Route path="/" render={(props) => (!authToken === undefined ? <Navigate to="/login" /> : <DefaultLayout {...props} />)} /> */}
          <Route path="*" name="Employee" element={ <DefaultLayout />} /> 
         {/* { authToken ? <Route path="*" name="Employee" element={ <DefaultLayout />} /> :     <Route path="/login" name="Login Page" element={<Login />} />} */}
        </Routes>
      </Suspense>
    </HashRouter>
  )
}

export default App
