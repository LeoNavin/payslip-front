import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import axios from 'axios'
import fileDownload from 'js-file-download'

// import { CHeader, CTable, CTableBody, CTableDataCell, CTableHead } from '@coreui/react/dist'
import { Link, useNavigate } from 'react-router-dom'

import { isEmpty, replace } from 'lodash'
import DataTable from 'react-data-table-component'
import Select from 'react-select'
import '../../scss/style.scss'
import DatePicker from 'react-datepicker'
import $, { event } from 'jquery'

import YearInput from 'react-year-picker/lib/components/YearInput'
import { Button } from '@coreui/coreui'
import { Base_Url } from 'src/service/Constant'

const DownloadReport = () => {
  const navigate = useNavigate()
  const [report, setReport] = useState('')
  const [month, setMonth] = useState(null)

  const [usersList, setUsersList] = useState(null)

  const [selectedOption, setSelectedOption] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)
  const [selectedMonth, setSelectedMonth] = useState(null)

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const token = localStorage.getItem('token')
  const username = localStorage.getItem('username')

  const config = {
    headers: { Authorization: token },
  }

  const config1 = {
    headers: { Authorization: token },
    responseType: 'blob',
  }

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login')
    }
    setLoading(true)

    getUserList()
  }, [])



  const getUserList = () => {
    setLoading(true)

    // axios.get('http://192.168.1.141:8088/payslip/user/getAllUser', config).then((res) => {
    axios.get(Base_Url + 'user/getAllUser', config).then((res) => {
      if (res.data.users) {
        setLoading(false)
        // setstate(res.data.users)
        setMonth(res.data.users)
        setUsersList(res.data.users)
        setReport([
          { id: 1, name: 'Last One Month' },
          { id: 3, name: 'Last Three Month' },
          { id: 6, name: 'Last Six Month' },
          { id: 12, name: 'Last One Year' },
        ])
      } else if (res.data.user) {
        setLoading(false)
        // setstate(res.data.user)
        setMonth(res.data.user)
        setUsersList(res.data.user)
        setReport([
          { id: 1, name: 'Last One Month' },
          { id: 3, name: 'Last Three Month' },
        ])
      } else {
        // setError(res.data.information.description)
      }
    })
  }

  const handleChange = (e) => {
    const target = e.target
    if (target.checked) {
      setReport(target.value)
    }
  }

  // bg-light d-flex flex-row align-items-center  vh-100
  const handleSubmit = (e) => {
    // http://192.168.1.141:3000/payslip/report?report=1

  
    var userId = selectedOption.value
    var reportId = selectedMonth.value

    if (reportId != null && userId != null) {
      setLoading(true)
      axios
        // .get('http://192.168.1.141:8088/payslip/exportpdf?pagecount=' + report, config)
        // exportpdf?pagecount=3&=132
        .get(Base_Url + 'exportpdf?pagecount=' + reportId + '&userId=' + userId, config1)
        .then((res) => {
          if (res.data.size !== 0) {
            //*$$//$$//**this Methoed also working*
            // fileDownload(res.data, 'Boscosoft PaySlip ' + username + '.pdf')

            //this one is another Methoed
            setError('')

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

            // clean up "a" element & remove ObjectURL
            document.body.removeChild(link)
            URL.revokeObjectURL(href)
            setLoading(false)
          } else {
            setLoading(false)
            setError('Salary Slip not available')
          }
        })
    } else {
      setLoading(false)
      setError('Salary Slip not empty values')
    }
  }

  if (loading) {
    return (
      <div className="app_content">
        <div className="loading">Loading&#8230;</div>
      </div>
    )
    // return <h1>Loading...</h1>
  }

  if (usersList != null) {
    const val = usersList.map((values) => values)


    var options = []
    obj = {}

    for (var i = 0; i < val.length; i++) {
      var obj = {}
      obj['value'] = val[i].id
      obj['label'] = val[i].firstname
      options.push(obj)
    }

    const valMonth = report.map((values) => values)


    var optionsMonth = []

    for (var j = 0; j < valMonth.length; j++) {
      var obj1 = {}
      //   obj1['value'] = val[j].id1
      //   obj1['label'] = val[j].name1
      obj1['value'] = valMonth[j].id
      obj1['label'] = valMonth[j].name
      optionsMonth.push(obj1)
    }

    return (
      <>
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4" style={{ width: '100%', height: '775px' }}>
              <CCardHeader className="custum_header">
                <strong>Download Salary Slip</strong>
              </CCardHeader>
              <CCardBody>
                <form>
                  <div className="form-group row ">
                  
                    <div className="col-sm-3 xl-4 md-4  offset-2">
                      <Select
                        defaultValue={selectedOption}
                        onChange={setSelectedOption}
                        name="userId"
                        options={options}
                      />
                    </div>
                    <div className="col-sm-3 xl-4 md-4">
                      <Select
                        defaultValue={selectedMonth}
                        onChange={setSelectedMonth}
                        name="month"
                        options={optionsMonth}
                      />
                    </div>
                    {/* <div className="col-sm-3">
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="report"
                          id="inlineRadio1"
                          value="1"
                          onChange={handleChange}
                          checked={report == '1'}
                        />
                        <label className="form-check-label" htmlFor="inlineRadio1">
                          Last Month
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="report"
                          id="inlineRadio2"
                          value="3"
                          onChange={handleChange}
                          checked={report == '3'}
                        />
                        <label className="form-check-label" htmlFor="inlineRadio2">
                          Last Three Month
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="report"
                          id="inlineRadio3"
                          value="6"
                          onChange={handleChange}
                          checked={report == '6'}
                        />
                        <label className="form-check-label" htmlFor="inlineRadio3">
                          Last Six Month{' '}
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="report"
                          id="inlineRadio3"
                          value="12"
                          onChange={handleChange}
                          checked={report == '12'}
                        />
                        <label className="form-check-label" htmlFor="inlineRadio3">
                          Last One Year
                        </label>
                      </div>
                    </div> */}
                    <div className=" col-sm-3 xl-4 md-4">
                      <button
                        className="btn btn-success"
                        style={{ color: 'white' }}
                        type="button"
                        onClick={handleSubmit}
                        disabled={
                          (selectedOption == '' || selectedOption != null) &&
                          (selectedMonth == '' || selectedMonth != null)
                            ? false
                            : true
                        }
                      >
                        Download
                      </button>
                    </div>
                  </div>

                  <div className="form-group row ">
                    <label
                      className="col-lg-4 offset-3"
                      style={{ textAlign: 'center', fontWeight: 'bold', color: 'red' }}
                    >
                      {error}
                    </label>
                  </div>
                </form>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </>
    )
  }
}

export default DownloadReport
