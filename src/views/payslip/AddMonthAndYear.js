import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { useNavigate } from 'react-router-dom'
import Select from 'react-select'
import YearPicker from 'react-year-picker'
import '../../scss/style.scss'
import { get } from 'lodash'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import { Base_Url } from 'src/service/Constant'
import DatePicker from 'react-multi-date-picker'

const PaySlip = () => {
  const navigate = useNavigate()

  const [month, setMonth] = useState(null)
  const [monthAndYear, setMonthAndYear] = useState({})
  const [selectedOption, setSelectedOption] = useState()
  const [error, setError] = useState(null)

  const [selectedYear, setSelectedYear] = useState(null)

  const [loading, setLoading] = useState(false)
  // const [value, setValue] = useState(new Date().getFullYear())
  const [value, setValue] = useState()

  const token = localStorage.getItem('token')

  const config = {
    headers: { Authorization: token },
  }

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login')
    }
    setLoading(true)

    // axios.get('http://192.168.1.141:8088/payslip/user/getAllMonth', config).then((res) => {
    axios.get(Base_Url + 'user/getAllMonth', config).then((res) => {
      setMonth(res.data.month)
      setLoading(false)
    })
  }, [])

  const handleChange = (date) => {
    setSelectedYear(date)
  }

  const save = (e) => {
    // if (selectedOption && selectedYear) {
    const monthValue = selectedOption.value

    //*** $$$$$ Old i am using year picker $$$$$$ *****
    // var year = selectedYear
    //Newly Changing year picker
    var year = value
    var id = monthValue

    var monthAndYear = { monthId: id, year: year }

    setLoading(true)
    axios
      // .post('http://192.168.1.141:8088/payslip/monthAndYear/monthandyearsave', monthAndYear, config)
      .post(Base_Url + 'monthAndYear/monthandyearsave', monthAndYear, config)
      .then((res) => {
        if (res.data.status) {
          setLoading(true)
          navigate('/monthAndYear')
        } else {
          setLoading(false)
          setError(res.data.information.description)
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

  if (month != null) {
    const val = month.map((values) => values)

    var options = []
    obj = {}

    for (var i = 0; i < val.length; i++) {
      var obj = {}
      obj['value'] = val[i].id
      obj['label'] = val[i].month
      options.push(obj)
    }

    const back = () => {
      setLoading(true)
      navigate('/monthAndYear')
    }
    return (
      <>
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader className="custum_header ">
                <div className="mr-2 back_icon">
                  <i className="bi bi-arrow-left-circle-fill" onClick={(e) => back(e)}></i>
                </div>
                <strong>Add Month And Year</strong>{' '}
                <div className="d-flex ">{/* {showIcons()} */}</div>
              </CCardHeader>
              <CCardBody>
                <>
                  <div className=" mx-auto col-xl-6 col-lg-7 col-md-12">
                    <div className="row" style={{ marginTop: '10px' }}>
                      <div className="col-lg-5">
                        <label> Select Month </label>
                      </div>
                      <div className="col-lg-7">
                        <Select
                          defaultValue={selectedOption}
                          onChange={setSelectedOption}
                          name="month"
                          options={options}
                        />
                      </div>
                    </div>

                    <div className="row" style={{ marginTop: '10px' }}>
                      <div className="col-lg-5">
                        <label> Select Year </label>
                      </div>
                      <div className="col-lg-7">
                        {/* <YearPicker
                          className="form-control w-100"
                          name="year"
                          onChange={(e) => handleChange(e)}
                        /> */}
                        <DatePicker
                          onlyYearPicker
                          value={new Date(value, 1, 1)}
                          onChange={(year) => {
                            setValue(year.year)
                          }}
                        />
                      </div>
                    </div>
                    <div className="row" style={{ marginTop: '10px' }}>
                      <div className="col-lg-6 offset-4 mt-2 mb-2">
                        <span style={{ color: 'red' }}>{error}</span>
                      </div>
                    </div>

                    <div className="d-flex justify-content-center">
                      <button
                        className="btn col-lg-4 btn-info btn-block"
                        style={{ color: 'white' }}
                        onClick={() => save()}
                        disabled={selectedOption!=null && value !=null ? false:true}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </>
    )
  }
}

export default PaySlip
