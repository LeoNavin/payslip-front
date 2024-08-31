import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from 'axios'

// import { CHeader, CTable, CTableBody, CTableDataCell, CTableHead } from '@coreui/react/dist'
import { cibGmail, cilUserPlus } from '@coreui/icons'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import DataTable from 'react-data-table-component'
import { isInteger } from 'lodash'
import { Number } from 'core-js'
import { number } from 'prop-types'
import { Base_Url } from 'src/service/Constant'
import moment from 'moment'

const ViewReportData = () => {
  const location = useLocation()

  const navigate = useNavigate()
  const [state, setstate] = useState([])
  const [paySlip, setPaySlip] = useState()

  const [monthData, setmonthData] = useState()
  const [yearData, setyearData] = useState()

  const [idData, setidData] = useState()
  const [loading, setLoading] = useState(false)

  const [update, setupdate] = useState([])
  const [error, setError] = useState()

  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')

  const config = {
    headers: { Authorization: token },
  }

  localStorage.setItem('monandYear', location?.state)

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login')
    }
    if (role == 'ADMIN') {
      getMonthandYear()
    } else {
      getUserPaySlipList()
    }
  }, [])

  const getMonthandYear = () => {
    setLoading(true)

    const monthvalue = localStorage?.getItem('month')
    const yearvalue = localStorage?.getItem('year')
    const idValue = localStorage?.getItem('id')
    setmonthData(monthvalue)
    setyearData(yearvalue)
    setidData(idValue)

    if (location?.state?.paySlipId) {
      var paySlipId = location?.state?.paySlipId
      var monthAndYearId1 = location?.state?.monthAndYearId
    }
    const monthAndYearId = Number(monthAndYearId1)

    axios
      .get(
        // 'http://192.168.1.141:8088/payslip/payslip/getEmployeePaySlipReportData?monthAndYearID=' +
        Base_Url +
          'payslip/getEmployeePaySlipReportData?monthAndYearID=' +
          monthAndYearId +
          '&' +
          'paySlipId=' +
          paySlipId,
        config,
      )
      .then((res) => {
        if (res.data.status) {
          if (res.data.paySlipsView) {
            setLoading(false)

            setPaySlip(res.data.paySlipsView)
          } else {
            setLoading(false)

            setError(res.data.information.description)
          }
        } else {
          setLoading(false)

          setError(res.data.information.description)
        }
      })
  }

  const getUserPaySlipList = () => {
    const monthvalue = localStorage?.getItem('month')
    const yearvalue = localStorage?.getItem('year')
    const idValue = localStorage?.getItem('id')
    setmonthData(monthvalue)
    setyearData(yearvalue)
    setidData(idValue)

    setLoading(true)
    var id = localStorage.getItem('id')

    axios
      // .get('http://192.168.1.141:8088/payslip/payslip/getAllPaySlip?id=' + id, config)
      .get(Base_Url + 'payslip/getAllPaySlip?id=' + id, config)
      .then((res) => {

        if (res.data.status) {
          if (res.data.paySlipsView) {
            
            res.data.paySlipsView.user.doj = moment(res.data.paySlipsView.user.doj).format('DD-MM-YYYY')

            setPaySlip(res.data.paySlipsView)
            setLoading(false)
          } else {
            setError(res.data.information.description)
            setLoading(false)
          }
        } else {
          setLoading(false)

          setstate([])
        }
      })
      .catch((error) => {
        setLoading(false)
      })
    setError('')
  }

  const back = () => {
    setLoading(true)
    if (role == 'ADMIN') {
      navigate('/monthAndYear/viewPaySlip')
    } else {
      navigate('/monthAndYear')
    }
  }

  if (loading) {
    return (
      <div className="app_content">
        <div className="loading">Loading&#8230;</div>
      </div>
    )
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <div className="custum_header">
              <div className="mr-2 d-flex align-items-center">
                <i className="bi bi-arrow-left-circle-fill  back_icon" onClick={(e) => back(e)}></i>
                <div className="ml-4">
                  <strong style={{ fontSize: '16px' }}>
                    Salary Details For - {paySlip?.user?.firstname}
                  </strong>
                </div>
              </div>

              <div className="mr-5">
                <strong style={{ fontSize: '16px' }}>
                  {monthData} - {yearData}
                </strong>
              </div>
              <div>
                <strong style={{ fontSize: '16px' }}>
                  Net Salary - &#8377; {paySlip?.netPay ? paySlip?.netPay : '0.0'}{' '}
                </strong>{' '}
              </div>
            </div>

            {/* <div className="d-flex "></div> */}
          </CCardHeader>
          <CCardBody>
            <div className="row">
              {/* table _1 */}
              <div className="col-xl-4 col-sm-12 col-lg-6 viewReportData_table">
                <table className="table table-borderless">
                  <tbody>
                    <tr>
                      <th>Associate Id {/* <span className="float-end"> :</span> */}</th>
                      <td>
                        {' '}
                        <label className="mb-0">
                          {paySlip?.user?.associateId ? paySlip?.user?.associateId : '-'}
                        </label>
                      </td>
                    </tr>
                    
                    <tr>
                      <th>Designation {/* <span className="float-end"> :</span> */}</th>
                      <td>
                        {' '}
                        <label className="mb-0">
                          {paySlip?.user.designation ? paySlip?.user.designation : '-'}
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <th>Unit {/* <span className="float-end"> :</span> */}</th>
                      <td>
                        {' '}
                        <label className="mb-0">
                          {paySlip?.user.unit ? paySlip?.user.unit : '-'}
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <th> DOJ {/* <span className="float-end"> :</span> */}</th>
                      <td>
                        {' '}
                        <label className="mb-0">
                          {paySlip?.user.doj ? paySlip?.user.doj : '-'}
                        </label>
                      </td>
                    </tr>

                    <tr>
                      <th>UAN {/* <span className="float-end"> :</span> */}</th>
                      <td>
                        {' '}
                        <label className="mb-0">
                          {paySlip?.user.uan ? paySlip?.user.uan : '-'}
                        </label>
                      </td>
                    </tr>

                    <tr>
                      <th>Bank A/C {/* <span className="float-end"> :</span> */}</th>
                      <td>
                        {' '}
                        <label className="mb-0">
                          {paySlip?.user.bankAccountNumber ? paySlip?.user.bankAccountNumber : '-'}
                        </label>
                      </td>
                    </tr>

                    <tr>
                      <th>City Allowance {/* <span className="float-end"> :</span> */}</th>
                      <td>
                        {' '}
                        <label className="mb-0">
                          {paySlip?.cityAllowance ? paySlip?.cityAllowance : '-'}
                        </label>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* table _2 */}
              <div className="col-xl-4 col-sm-12 col-lg-6 viewReportData_table">
                <table className="table table-borderless">
                  <tbody>
                    <tr>
                      <th>Basic Pay {/* <span className="float-end"> :</span> */}</th>
                      <td>
                        {' '}
                        <label className="mb-0">{paySlip?.basic ? paySlip?.basic : '-'}</label>
                      </td>
                    </tr>
                    <tr>
                      <th>House Allowance {/* <span className="float-end"> :</span> */}</th>
                      <td>
                        {' '}
                        <label className="mb-0">{paySlip?.hRA ? paySlip?.hRA : '-'}</label>
                      </td>
                    </tr>

                    <tr>
                      <th>Leave Travel Allowance {/* <span className="float-end"> :</span> */}</th>
                      <td>
                        {' '}
                        <label className="mb-0">{paySlip?.lTA ? paySlip?.lTA : '-'}</label>
                      </td>
                    </tr>

                    <tr>
                      <th>Medical All {/* <span className="float-end"> :</span> */}</th>
                      <td>
                        {' '}
                        <label className="mb-0">
                          {paySlip?.medicalAll ? paySlip?.medicalAll : '-'}
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <th>Conveyance Allowance {/* <span className="float-end"> :</span> */}</th>
                      <td>
                        {' '}
                        <label className="mb-0">
                          {paySlip?.conveyance ? paySlip?.conveyance : '-'}
                        </label>
                      </td>
                    </tr>

                    <tr>
                      <th>Special Pay {/* <span className="float-end"> :</span> */}</th>
                      <td>
                        {' '}
                        <label className="mb-0">
                          {paySlip?.splAllow ? paySlip?.splAllow : '-'}
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <th>Insurance {/* <span className="float-end"> :</span> */}</th>
                      <td>
                        {' '}
                        <label className="mb-0">
                          {paySlip?.insurance ? paySlip?.insurance : '-'}
                        </label>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* table _3 */}
              <div className="col-xl-4 col-sm-12 col-lg-6 viewReportData_table">
                <table className="table table-borderless">
                  <tbody>
                    <tr>
                      <th> Loss Of Pay {/* <span className="float-end"> :</span> */}</th>
                      <td>
                        {' '}
                        <label className="mb-0">{paySlip?.lop ? paySlip?.lop : '-'}</label>
                      </td>
                    </tr>
                    <tr>
                      <th>PF Contribution {/* <span className="float-end"> :</span> */}</th>
                      <td>
                        {' '}
                        <label className="mb-0">{paySlip?.pf ? paySlip?.pf : '-'}</label>
                      </td>
                    </tr>
                    <tr>
                      <th>TDS {/* <span className="float-end"> :</span> */}</th>
                      <td>
                        {' '}
                        <label className="mb-0">{paySlip?.tDS ? paySlip?.tDS : '-'}</label>
                      </td>
                    </tr>
                    <tr>
                      <th>Mess Payment {/* <span className="float-end"> :</span> */}</th>
                      <td>
                        {' '}
                        <label className="mb-0">{paySlip?.mess ? paySlip?.mess : '-'}</label>
                      </td>
                    </tr>
                    <tr>
                      <th>Hostel Payment {/* <span className="float-end"> :</span> */}</th>
                      <td>
                        {' '}
                        <label className="mb-0">{paySlip?.hostel ? paySlip?.hostel : '-'}</label>
                      </td>
                    </tr>
                    <tr>
                      <th>Staff Benefit Fund {/* <span className="float-end"> :</span> */}</th>
                      <td>
                        {' '}
                        <label className="mb-0">{paySlip?.sBF ? paySlip?.sBF : '-'}</label>
                      </td>
                    </tr>
                    <tr>
                      <th>Salary Advance {/* <span className="float-end"> :</span> */}</th>
                      <td>
                        {' '}
                        <label className="mb-0">
                          {paySlip?.advanceLoan ? paySlip?.advanceLoan : '-'}
                        </label>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            {/* <div className="row" >
              <div className="col-6 offset-2">
                <div className="row">
                  <div className="col-3" style={{fontSize:'14px' }}>
                    <b>Employee Id</b>
                  </div>
                  <div className="col-1" style={{ textAlign: 'left' }}>
                    :
                  </div>
                  <div className="col-3" style={{ textAlign: 'left' }}>
                    {paySlip?.user?.associateId}
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-3" style={{fontSize:'14px'}}>
                  <b>  Employee Name</b>
                  </div>
                  <div className="col-1" style={{ textAlign: 'left' }}>
                    :
                  </div>
                  <div className="col-3" style={{ textAlign: 'left' }}>
                    {paySlip?.user?.firstname} {paySlip?.user?.lastname}
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-3" style={{ fontSize:'14px'}}>
                  <b> LTA</b>
                  </div>
                  <div className="col-1" style={{ textAlign: 'left' }}>
                    :
                  </div>
                  <div className="col-3" style={{ textAlign: 'left' }}>
                    {paySlip?.lTA}
                  </div>
                </div>
                <br />

                <div className="row">
                  <div className="col-3" style={{ fontSize:'14px' }}>
                  <b> Conveyance</b>
                  </div>
                  <div className="col-1" >
                    :
                  </div>
                  <div className="col-3" >
                    {paySlip?.conveyance}
                  </div>
                </div>

                <br />

                <div className="row">
                  <div className="col-3" style={{ fontSize:'14px' }}>
                  <b> LOP</b>
                  </div>
                  <div className="col-1" >
                    :
                  </div>
                  <div className="col-3" >
                    {paySlip?.lop}
                  </div>
                </div>

                <br />

                <div className="row">
                  <div className="col-3" style={{ fontSize:'14px' }}>
                  <b> TDS </b>
                  </div>
                  <div className="col-1" >
                    :
                  </div>
                  <div className="col-3" >
                    {paySlip?.tDS}
                  </div>
                </div>
              </div>

              <div className="col-4">
                <div className="row">
                  <div className="col-3" style={{ fontSize:'14px' }}>
                  <b>Basic</b>
                  </div>
                  <div className="col-1" >
                    :
                  </div>
                  <div className="col-3" >
                    {paySlip?.basic}
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-3" style={{fontSize:'14px' }}>
                  <b> HRA</b>
                  </div>
                  <div className="col-1" >
                    :
                  </div>
                  <div className="col-3">
                    {paySlip?.hRA}
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-3" style={{ fontSize:'14px'}}>
                  <b> Medical All</b>
                  </div>
                  <div className="col-1">
                    :
                  </div>
                  <div className="col-3" >
                    {paySlip?.medicalAll}
                  </div>
                </div>

                <br />
                <div className="row">
                  <div className="col-3" style={{ fontSize:'14px'}}>
                  <b> Spl allow</b>
                  </div>
                  <div className="col-1" >
                    :
                  </div>
                  <div className="col-3">
                    {paySlip?.splAllow}
                  </div>
                </div>

                <br />
                <div className="row">
                  <div className="col-3" style={{fontSize:'14px'}}>
                  <b>PF</b>
                  </div>
                  <div className="col-1" >
                    :
                  </div>
                  <div className="col-3" >
                    {paySlip?.pf}
                  </div>
                </div>

                <br />
                <div className="row">
                  <div className="col-3" style={{ fontSize:'14px' }}>
                  <b>Mess</b>
                  </div>
                  <div className="col-1" >
                    :
                  </div>
                  <div className="col-3" >
                    {paySlip?.mess}
                  </div>
                </div>
              </div>
              </div> 


              
              {/* 
              <div className="col-4 ">
                <div className="row">
                  <div className="col-4" style={{ textAlign: 'left' }}>
                  Hostel
                  </div>
                  <div className="col-1" style={{ textAlign: 'left' }}>
                    :
                  </div>
                  <div className="col-3" style={{ textAlign: 'left' }}>
                    {paySlip?.hostel}
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-4" style={{ textAlign: 'left' }}>
                  SBF
                  </div>
                  <div className="col-1" style={{ textAlign: 'left' }}>
                    :
                  </div>
                  <div className="col-3" style={{ textAlign: 'left' }}>
                    {paySlip?.sBF}
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-4" style={{ textAlign: 'left' }}>
                  Advance/Loan                  </div>
                  <div className="col-1" style={{ textAlign: 'left' }}>
                    :
                  </div>
                  <div className="col-3" style={{ textAlign: 'left' }}>
                    {paySlip?.advanceLoan}
                  </div>
                </div>

                <br />
                <div className="row">
                  <div className="col-4" style={{ textAlign: 'left' }}>
                  Insurance                  </div>
                  <div className="col-1" style={{ textAlign: 'left' }}>
                    :
                  </div>
                  <div className="col-3" style={{ textAlign: 'left' }}>
                    {paySlip?.insurance}
                  </div>
                </div>

                <br />
                <div className="row">
                  <div className="col-4" style={{ textAlign: 'left' }}>
                  CTC
                  </div>
                  <div className="col-1" style={{ textAlign: 'left' }}>
                    :
                  </div>
                  <div className="col-3" style={{ textAlign: 'left' }}>
                    {paySlip?.cTC}
                  </div>
                </div>

                <br />
                <div className="row">
                  <div className="col-4" style={{ textAlign: 'left' }}>
                  Total deduction
                  </div>
                  <div className="col-1" style={{ textAlign: 'left' }}>
                    :
                  </div>
                  <div className="col-3" style={{ textAlign: 'left' }}>
                    {paySlip?.totalDeduction}
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-4" style={{ textAlign: 'left',fontWeight:'bold' }}>
                  Net Pay
                  </div>
                  <div className="col-1" style={{ textAlign: 'left' }}>
                    :
                  </div>
                  <div className="col-3" style={{ textAlign: 'left',fontWeight:'bold'  }}>
                    {paySlip?.netPay}
                  </div>
                </div>
              </div> */}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ViewReportData
