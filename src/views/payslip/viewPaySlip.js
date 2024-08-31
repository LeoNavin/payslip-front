import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from 'axios'

// import { CHeader, CTable, CTableBody, CTableDataCell, CTableHead } from '@coreui/react/dist'
import { cilUserPlus } from '@coreui/icons'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import DataTable from 'react-data-table-component'
import { isInteger } from 'lodash'
import { Number } from 'core-js'
import { Base_Url } from 'src/service/Constant'

const ViewPaySlip = () => {
  const location = useLocation()

  const navigate = useNavigate()
  const [state, setstate] = useState([])
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

  const config1 = {
    headers: { Authorization: token },
    responseType: 'blob',
  }

  localStorage.setItem('monandYear', location?.state)

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login')
    }

    getMonthandYear()
    getUserPaySlipList()

  }, [])

  const getMonthandYear = () => {
    // if (location?.state?.month) {
    //   var month = location?.state?.month
    //   var year = location?.state?.year
    //   var id = location?.state?.monthId
    // }
    // localStorage.setItem('month', month)
    // localStorage.setItem('year', year)
    // localStorage.setItem('id', id)

    const monthvalue = localStorage?.getItem('month')
    const yearvalue = localStorage?.getItem('year')
    const idValue = localStorage?.getItem('id')
    setmonthData(monthvalue)
    setyearData(yearvalue)
    setidData(idValue)
  }

  const getUserPaySlipList = () => {
    setLoading(true)
    var id = localStorage.getItem('id')

    axios
      // .get('http://192.168.1.141:8088/payslip/payslip/getAllPaySlip?id=' + id, config)
      .get(Base_Url + 'payslip/getAllPaySlip?id=' + id, config)
      .then((res) => {
        if (res.data.status) {
          if (res.data.paySlips) {
            setstate(res.data.paySlips)
            setLoading(false)

          } else {
            setError(res.data.information.description)
            setLoading(false)

          }
        } else {
          setLoading(false)

          setstate([])
        }
      }).catch((error)=>{
        setLoading(false)
      })
    setError('')
  }

  const handleDelete = (id) => {
    axios
      // .delete('http://192.168.1.141:8088/payslip/user/deleteByUserId?id=' + id, config)
      .delete(Base_Url + 'payslip/deleteByPayslipId?id=' + id, config)
      .then((res) => {
        setLoading(true)

        if (res.data.status) {
          getUserPaySlipList()
        }
      })
  }

  const handleEdit = (id) => {
    axios
      // .delete('http://192.168.1.141:8088/payslip/user/deleteByUserId?id=' + id, config)
      .delete(Base_Url + 'user/deleteByUserId?id=' + id, config)
      .then((res) => {
        if (res.data.status) {
          getUserPaySlipList()
        }
      })
    setupdate()
  }

  const templateDownload = (e) => {
    setLoading(true)
    axios
      .get(
        // 'http://192.168.1.141:8088/payslip/payslipBulkUpload/exportEmployeePaySlipTemplate',
        Base_Url + 'payslipBulkUpload/exportEmployeePaySlipTemplate?id='+idData,
        config1
      )
      .then((res) => {
        // if (res.data.status) {
        //   setLoading(false)
        //   var filepath = res.data.file
        //   window.open(filepath)

        const href = URL.createObjectURL(res.data)

        var today = new Date()
        var filename = res.headers.pragma
        // create "a" HTML element with href to file & click
        const link = document.createElement('a')
        link.href = href
        link.target = '_blank'
        link.setAttribute(
          'download',
          filename,
          // 'Boscosoft PaySlip ' + username + today.getTime() + '.pdf',
        ) //or any other extension
        document.body.appendChild(link)
        link.click()

        // if (res.data.status) {
        //   var filepath = res.data.file
        //   window.open(filepath)
        //   getUserPaySlipList()
        setLoading(false)
        navigate('/monthAndYear/viewPaySlip')
        // }
      })
  }

  const uploadPage = () => {
    setLoading(true)
    var value = { id: idData, month: monthData, year: yearData }
    navigate('/monthAndYear/bulkupload', { state: idData })
  }

  const back = () => {
    setLoading(true)
    navigate('/monthAndYear')
  }

  if (loading) {
    return (
      <div className="app_content align-content-center">
        <div className="loading">Loading&#8230;</div>
      </div>
    )
    // return <h1>Loading...</h1>
  }

  const customStyles = {
    headCells: {
      style: {
        // fontSize: '14px',
        fontWeight: '501',
        // textTransform: 'uppercase',
      },
    },
    cells: {
      style: {
        fontSize: '13px',
      },
    },
  }

  if (role) {
    var columns = []
  }

  const handleChangeView = (id, idData) => {
    var values = { paySlipId: id, monthAndYearId: idData }

    setLoading(true)
    navigate('/monthAndYear/viewReportData', { state: values })
  }

  //ADMIN
  // if (role === 'ADMIN') {
  columns = [
    {
      name: 'Associate Id',
      selector: (row) => row.user.associateId,
      // width: "200px",
      sortable: true,
    },

    {
      name: 'Associate Name',
      selector: (row) => row.user.firstname,
      // width: "200px",
      sortable: true,
    },
    {
      name: 'Total Gross ',
      selector: (row) => row.grossEarning,
      // width: "200px",
      sortable: true,
    },

    {
      name: 'Total Deduction',
      selector: (row) => row.totalDeduction,
      // width: "200px",
      sortable: true,
    },
    {
      name: 'Net Salary',
      selector: (row) => row.netPay,
      // width: "200px",
      sortable: true,
    },
    {
      name: 'Action',
      selector: (row) => row.membership,
      right: false,
      cell: (row) => (
        <>
          <div className="d-flex justify-content-between">
            {
              <>
                <div className="form_col-3 ml-1">
                  <span className="custum-group-table">
                    {/* <button
                        type="button"
                        className="btn  btn-sm text-info"
                        onClick={() => handleEdit(row.id)}
                      >
                        <i className="bi-pencil-fill"></i>
                      </button> */}
                    <button
                      type="button"
                      className="btn  btn-sm btn-info text-white"
                      onClick={() => handleChangeView(row.id, idData)}
                    >
                      <i className="bi bi-eye"></i>
                    </button>
                  </span>
                </div>

                <div className="form_col ml-1">
                  {row.deleteStatus && role === 'ADMIN' ? (
                    <span className="custum-group-table">
                      <button
                        type="button"
                        className="btn btn-sm text-info btn-outline-danger"
                        onClick={() => handleDelete(row.id)}
                      >
                        <i className="bi-trash-fill"></i>
                      </button>
                    </span>
                  ) : (
                    ''
                  )}
                </div>
              </>
            }
          </div>
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      maxWidth: '600px',
    },
  ]
  // }
  //EMPLOYEE
  // if (role === 'EMPLOYEE') {
  //   columns = [
  //     {
  //       name: 'Associate Id',
  //       selector: (row) => row.user.associateId,
  //       // width: "200px",
  //       sortable: true,
  //     },

  //     {
  //       name: 'Basic',
  //       selector: (row) => row.basic,
  //       // width: "200px",
  //       sortable: true,
  //     },
  //     {
  //       name: 'Gross',
  //       selector: (row) => row.gross,
  //       // width: "200px",
  //       sortable: true,
  //     },

  //     {
  //       name: 'Total Deduction',
  //       selector: (row) => row.totalDeduction,
  //       // width: "200px",
  //       sortable: true,
  //     },
  //     {
  //       name: 'Net Pay',
  //       selector: (row) => row.netPay,
  //       // width: "200px",
  //       sortable: true,
  //     },
  //     {
  //       name: 'Action',
  //       selector: (row) => row.membership,
  //       right: false,
  //       cell: (row) => (
  //         <>
  //           <div className="d-flex justify-content-between">
  //             {
  //               <>
  //                 <div className="form_col-3 ml-1">
  //                   <span className="custum-group-table">
  //                     {/* <button
  //                       type="button"
  //                       className="btn  btn-sm text-info"
  //                       onClick={() => handleEdit(row.id)}
  //                     >
  //                       <i className="bi-pencil-fill"></i>
  //                     </button> */}
  //                     <button
  //                       type="button"
  //                       className="btn  btn-sm btn-info text-white"
  //                       onClick={() => handleChangeView(row.id, idData)}
  //                     >
  //                       <i className="bi bi-eye"></i>
  //                     </button>
  //                   </span>
  //                 </div>

  //                 {/* <div className="form_col ml-1">
  //                   <span className="custum-group-table">
  //                     <button
  //                       type="button"
  //                       className="btn  btn-sm text-info"
  //                       onClick={() => handleDelete(row.id)}
  //                     >
  //                       <i className="bi-trash-fill"></i>
  //                     </button>
  //                   </span>
  //                 </div> */}
  //               </>
  //             }
  //           </div>
  //         </>
  //       ),
  //       ignoreRowClick: true,
  //       allowOverflow: true,
  //       button: true,
  //       maxWidth: '600px',
  //     },
  //   ]
  // }

  const showIcons = () => {
    if (role === 'ADMIN') {
      return (
        //    <div className="d-flex">
        //     <div className="mr-2">
        //       <i className="bi bi-cloud-upload-fill text-danger" onClick={(e) => uploadPage(e)}></i>
        //     </div>
        //     <div className="mr-2">
        //       <i
        //         className="bi bi-cloud-download-fill text-success"
        //         onClick={(e) => templateDownload(e)}
        //       ></i>
        //     </div>
        //  </div>
        <div className="d-flex ">
          <button className="mr-2  btn btn-info btn-sm text-white ">
            <i className="bi bi-cloud-upload-fill " onClick={(e) => uploadPage(e)} title="Upload">
              {' '}
              Upload
            </i>
          </button>
          <button className="mr-2 btn btn-success btn-sm text-white ">
            <i
              className="bi bi-cloud-download-fill  "
              onClick={(e) => templateDownload(e)}
              title="Download"
            >
              {' '}
              Download
            </i>
          </button>

          {/* <div>
            <Link className="mr-2 btn btn-primary btn-sm text-white " to={'/employee/addEmployee'}>
            <i>  <CIcon icon={cilUserPlus} style={{ marginLeft: 'end' }} /> Add</i> 
            </Link>
          </div> */}
        </div>
      )
    } else {
      return null
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader className="custum_header">
            <div className="mr-2 back_icon">
              <i className="bi bi-arrow-left-circle-fill" onClick={(e) => back(e)}></i>
            </div>
            <strong>
              Salary Details - {monthData} - {yearData}
            </strong>{' '}
            <div className="d-flex ">
              {/* <>
                <div className="mr-2">
                  <i className="bi bi-arrow-up-circle-fill" onClick={(e) => uploadPage(e)}></i>
                </div>
                <div className="mr-2">
                  <i
                    className="bi bi-arrow-down-circle-fill"
                    onClick={(e) => templateDownload(e)}
                  ></i>
                </div>
              </> */}
              {showIcons()}
            </div>
          </CCardHeader>
          <CCardBody>
            <DataTable pagination columns={columns} customStyles={customStyles} data={state} />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ViewPaySlip
