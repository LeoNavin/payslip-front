import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { useNavigate } from 'react-router-dom'
import Select from 'react-select'
import YearPicker from 'react-year-picker'
import '../../scss/style.scss'
import { get } from 'lodash'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import { Base_Url } from 'src/service/Constant'
import { useForm } from 'react-hook-form'
import DatePicker from 'react-multi-date-picker'

const UpdateMonthAndYear = () => {
  const navigate = useNavigate()

  const [month, setMonth] = useState(null)
  const [monthAndYear, setMonthAndYear] = useState({})
  const [error, setError] = useState(null)

  const [information, setInformation] = useState()

  const [loading, setLoading] = useState(false)
  const idValue = localStorage?.getItem('id')
  const monthId = localStorage.getItem('monthId')

  const monthvalue = localStorage?.getItem('month')
  var obj = {}
  obj['value'] = Number(monthId)
  obj['label'] = monthvalue
  var selectMonth = obj
  const yearvalue = localStorage?.getItem('year')
  var year = Number(yearvalue)
  

  const [selectedOption, setSelectedOption] = useState(selectMonth)
  const [selectedYear, setSelectedYear] = useState(year)
  
  const [value, setValue] = useState(year)

  const token = localStorage.getItem('token')

  const config = {
    headers: { Authorization: token },
  }

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm()

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login')
    }
    getAllMonth()
    // getMonthAndYear()
    // handleChange(year)
  }, [])

  async function getAllMonth() {
    // await axios.get(Base_Url + 'user/getAllMonth', config).then((res) => {
    //   if (res.data.status) {
    //     // setEmployee(res.data.user)
    //     res.data.user.doj = moment(res.data.user.doj).format('YYYY-MM-DD')
    //     reset(res.data.user)
    //   } else {
    //     setError("User Details can't be find")
    //   }
    // })
    setLoading(true)
    axios.get(Base_Url + 'user/getAllMonth', config).then((res) => {
      if (res.data.status) {
        // var values = { id: idValue, year: yearvalue, month: monthvalue }
        // reset(values)
        setMonth(res.data.month)
        setSelectedYear(year)
        setLoading(false)
      }
    })
  }

  function getMonthAndYear() {
    const idValue = localStorage?.getItem('id')

    axios.get(Base_Url + 'monthAndYear/getMonthById?id=' + idValue, config).then((res) => {
      
      if (res.data.status) {
        var values = { year: res.data.monandYear.year, month: res.data.monandYear.month.month }
        reset(values)
      }
    })
  }

  const handleChange = (date) => {
    

    setSelectedYear(date)
  }

  const save = (e) => {
    // if (selectedOption && selectedYear) {
    const monthValue = selectedOption.value

    var year = value
    var monthId = monthValue
    var id=localStorage.getItem('id') //monthId


    var monthAndYear = {id:id, monthId: monthId, year: year }

    
    
    setLoading(true)
    axios.post(Base_Url + 'monthAndYear/monthandyearsave', monthAndYear, config)
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

    // const changeFruit = (newFruit) => {
    //   setCurrentFruit(newFruit)
    // }

    return (
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader className="custum_header ">
              <div className="mr-2 back_icon">
                <i className="bi bi-arrow-left-circle-fill" onClick={(e) => back(e)}></i>
              </div>
              {<strong style={{ fontSize: '18px' }}>Update Month And Year</strong>}{' '}
              <div className="d-flex "></div>
            </CCardHeader>
            <CCardBody>
              <form onSubmit={handleSubmit(onsubmit)}>
                <>
                  <div className=" mx-auto col-xl-6 col-lg-7 col-md-12">
                    <div className="row" style={{ marginTop: '10px' }}>
                      <div className="col-lg-5">
                        <label> Select Month </label>
                      </div>
                      <div className="col-lg-7 ">
                        <Select
                          defaultValue={selectedOption}
                          onChange={setSelectedOption}
                          name="month"
                          options={options}
                        />
                        {/* <select
                          className="form-control"
                          onChange={(event) => console.log('e', event.target.value)}
                          value={selectMonth?.value}
                        >
                          {options.map((s) => (
                            <option key={s.value} value={s.value}>
                              {s.label}{' '}
                            </option>
                          ))}
                        </select> */}
                      </div>
                    </div>

                    <div className="row" style={{ marginTop: '10px' }}>
                      <div className="col-lg-5">
                        <label> Select Year </label>
                      </div>
                      <div className="col-lg-7 ">
                        {/* <YearPicker
                          className="form-control w-100 yearpicker"
                          name="year"
                          onChange={()=>handleChange()}
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
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </>
              </form>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    )
  }
}

export default UpdateMonthAndYear
