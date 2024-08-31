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

const Report = () => {
  const navigate = useNavigate()
  const [report, setReport] = useState('')
  const [month, setMonth] = useState(null)
  const [selectedOption, setSelectedOption] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const token = localStorage.getItem('token')
  const username = localStorage.getItem('username')

  const config = {
    headers: { Authorization: token },
    responseType: 'blob',
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

    if (report != null) {
      setLoading(true)
      axios
        // .get('http://192.168.1.141:8088/payslip/exportpdf?pagecount=' + report, config)
        .get(Base_Url + 'exportpdf?pagecount=' + report + '&userId=' + 0, config)
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
      setError("Month id can't be null")
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
                  <label className="col-sm-3"></label>
                  <div className="col-sm-7">
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
                  </div>
                  <div className=" col-sm-2">
                    <button
                      className="btn btn-success"
                      style={{ color: 'white' }}
                      type="button"
                      onClick={handleSubmit}
                      disabled={report == '' ? true : false}
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

export default Report
