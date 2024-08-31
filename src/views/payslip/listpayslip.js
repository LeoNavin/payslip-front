import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import axios from 'axios'

// import { CHeader, CTable, CTableBody, CTableDataCell, CTableHead } from '@coreui/react/dist'
import { Link, useNavigate } from 'react-router-dom'

// import { isEmpty } from 'lodash'
import DataTable from 'react-data-table-component'
import Select from 'react-select'
import YearPicker from 'react-year-picker'
import '../../scss/style.scss'
// import DatePicker from 'react-datepicker'

// import YearInput from 'react-year-picker/lib/components/YearInput'
import { Base_Url } from 'src/service/Constant'
// import { YearPicker } from 'react-dropdown-date'

const PaySlipMonthandYear = () => {
  const navigate = useNavigate()
  const [state, setstate] = useState([])
  const [month, setMonth] = useState(null)
  const [selectedOption, setSelectedOption] = useState(null)
  const [selectedYear, setSelectedYear] = useState()
  const [values, setValues] = useState({})
  const [loading, setLoading] = useState(false)

  const [hidden, setHidden] = useState()

  const [update, setupdate] = useState([])

  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')

  const config = {
    headers: { Authorization: token },
  }

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login')
    }

    getMonthAndYear()

    // getMonthPayslipdata()
  }, [])

  const getMonthAndYear = () => {
    setLoading(true)
    // axios.get('http://192.168.1.141:8088/payslip/monthAndYear/getAllMonthandyear', config).then((res) => {
    axios.get(Base_Url + 'monthAndYear/getAllMonthandyear', config).then((res) => {
      setstate(res.data.monthandyear)
      setLoading(false)
    })
  }

  // const getMonthPayslipdata = () => {
  //   axios.get('http://192.168.1.141:8088/payslip/user/getAllPaySlipData', config).then((res) => {

  //     // setHidden(res.data.status)
  //   })
  // }

  const handleDelete = (id) => {
    setLoading(true)

    axios
      // .delete('http://192.168.1.141:8088/payslip/monthAndYear/deleteByMonandYearId?id=' + id, config)
      .delete(Base_Url + 'monthAndYear/deleteByMonandYearId?id=' + id, config)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          getMonthAndYear()
        }
      })
  }

  const handleChangeView = (id) => {
    setLoading(true)

    var values = { monthId: id.id, year: id.year, month: id.month.month }

    localStorage.setItem('month', values.month)
    localStorage.setItem('year', values.year)
    localStorage.setItem('id', values.monthId)
    if (role == 'ADMIN') {
      navigate('/monthAndYear/viewPaySlip', { state: values })
    } else {
      navigate('/monthAndYear/viewReportData', { state: values })
    }
  }

  const handleEdit = (id) => {
    setLoading(true)
    //monthId change => id                        this create monthId
    var values = { id: id.id, year: id.year, month: id.month.month, monthId: id.month.id }

    localStorage.setItem('month', values.month)

    localStorage.setItem('year', values.year)
    localStorage.setItem('id', values.id) //monthId

    localStorage.setItem('monthId', values.monthId)

    navigate('/monthAndYear/updateMonthAndYear', { state: values })
  }

  const handleChange = (id) => {
    axios
      // .get('http://192.168.1.141:8088/payslip/payslip/getAllPaySlipData?id=' + id, config)
      .get(Base_Url + 'payslip/getAllPaySlipData?id=' + id, config)
      .then((res) => {
        setHidden(res.data.status)
      })
  }

  const monthandYearUpdate = () => {}

  const handleChangeYear = (date) => {
    setSelectedYear(date)
  }

  if (loading) {
    return (
      <div className="app_content">
        <div className="loading">Loading&#8230;</div>
      </div>
    )
    // return <h1>Loading...</h1>
  }

  // const data = [state]

  const customStyles = {
    headCells: {
      style: {
        fontSize: '14px',
        // fontWeight: '501',
        fontWeight: 'bold',
        // textTransform: 'uppercase',
      },
    },
    cells: {
      style: {
        fontSize: '13px',
      },
    },
  }

  const columns = [
    {
      name: 'S.No',
      selector: (row, index) => index + 1,
      width: '80px',
    },
    {
      name: 'Month',
      selector: (row) => row.month.month,
      //   width: "200px",
      sortable: true,
    },
    {
      name: 'Year',
      selector: (row) => row.year,
      //   width: "200px",
      sortable: true,
    },

    {
      name: 'Action',
      selector: (row) => row.membership,
      right: false,

      cell: (row) => (
        <div className="d-flex justify-content-between">
          <div className="form_col-3 ml-1">
            <span className="custum-group-table">
              <button
                type="button"
                className="btn  btn-sm btn-info text-white"
                onClick={() => handleChangeView(row)}
              >
                <i className="bi bi-eye"></i>
              </button>
            </span>
          </div>
          {row.paySlipStatus && role === 'ADMIN' ? (
            <i
              type="button"
              className="bi-pencil-fill   btn-sm text-info"
              // onChange={handleChange(row.id)}
              onClick={() => handleEdit(row)}
              visibility={hidden ? 'true' : 'false'}
            ></i>
          ) : (
            ''
          )}

          <div className="form_col ml-1">
            <span className="custum-group-table">
              {/* {row.paySlipStatus && (
                      <i
                        type="button"
                        className="bi-trash-fill btn-danger  btn-sm text-white"
                        // onChange={handleChange(row.id)}
                        onClick={() => handleDelete(row.id)}
                        visibility={hidden ? 'true' : 'false'}
                      ></i>
                    )} */}

              {row.paySlipStatus && role === 'ADMIN' ? (
                <i
                  type="button"
                  className="bi-trash-fill btn-danger  btn-sm text-white"
                  // onChange={handleChange(row.id)}
                  onClick={() => handleDelete(row.id)}
                  visibility={hidden ? 'true' : 'false'}
                ></i>
              ) : (
                ''
              )}
            </span>
          </div>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      maxWidth: '600px',
    },
  ]

  if (month != null) {
    var val = month.map((values) => values)

    var options = []
    obj = {}

    for (var i = 0; i < val.length; i++) {
      var obj = {}
      obj['value'] = val[i].id
      obj['label'] = val[i].month
      options.push(obj)
    }
  }

  const showIcons = () => {
    if (role === 'ADMIN') {
      return (
        <div className="d-flex">
          {/* <div className="mr-2">
          <i className="bi bi-arrow-up-circle-fill" onClick={(e) => uploadPage(e)}></i>
        </div>
        <div className="mr-2">
          <i className="bi bi-arrow-down-circle-fill" onClick={(e) => templateDownload(e)}></i>
        </div> */}
          <Link to={'/monthAndYear/addPayslip'} className="back_icon">
            {/* <CIcon icon={cilUserPlus} style={{ marginLeft: 'end' }} /> */}
            <i className="bi-plus-circle-fill" aria-hidden="true" style={{ marginLeft: 'end' }}></i>
          </Link>
        </div>
      )
    } else {
      return null
    }
  }

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader className="custum_header">
              {role == 'ADMIN' ? (
                <strong className="d-flex justify-content-lg-between" style={{ width: '100%' }}>
                  Salary Slip Setup {showIcons()}
                </strong>
              ) : (
                <strong>Salary Slip</strong>
              )}
              {/* <PaySlipMonthandYear roleData={roleData} />               */}
            </CCardHeader>
            <CCardBody>
              <DataTable
                pagination
                columns={columns}
                // sortIcon={sortIcon}
                customStyles={customStyles}
                data={state}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <div
        className="modal fade"
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Update Month And Year
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <>
                <div className="row" style={{ marginTop: '10px' }}>
                  <div className="col"></div>
                  <div className="col-4" style={{ textAlign: 'center' }}>
                    <label> Select Month : </label>
                  </div>
                  <div className="col-4">
                    <Select
                      value={selectedOption}
                      // defaultValue={selectedOption}
                      onChange={setSelectedOption}
                      // value={monthAndYear.month}
                      // onChange={handleInputChange}

                      name="month"
                      options={options}
                    />
                    {/* <select value={selectedOption} >
                      <option selected hidden>-- select --</option>
                      {options?.map((options, index) => (
                        <option key={index} value={options?.value}>
                          {options?.label}
                        </option>
                      ))}
                    </select> */}
                  </div>
                  <div className="col-3"></div>
                </div>

                <div className="row" style={{ marginTop: '10px' }}>
                  <div className="col"></div>
                  <div className="col-4" style={{ textAlign: 'center' }}>
                    <label> Select Year : </label>
                  </div>
                  <div className="col-4">
                    <YearPicker
                      className="form-control w-100"
                      {...values.year}
                      onChange={(date) => handleChangeYear(date)}
                    />
                  </div>
                  <div className="col-3"></div>
                </div>
                <div className="row" style={{ marginTop: '10px' }}>
                  <div className="col-3"></div>
                  <div className="col-2" style={{ textAlign: 'center' }}>
                    {/* <label> Select Year : </label> */}
                  </div>
                  <div className="col-2">
                    {/* <span style={{ textAlign: 'center', color: 'red' }}>{error}</span> */}
                    <div className="col-5"></div>
                  </div>
                </div>
              </>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => monthandYearUpdate()}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PaySlipMonthandYear
