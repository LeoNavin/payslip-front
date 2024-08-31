import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from 'axios'

// import { CHeader, CTable, CTableBody, CTableDataCell, CTableHead } from '@coreui/react/dist'
import { cilUserPlus } from '@coreui/icons'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import DataTable from 'react-data-table-component'
import { Base_Url } from 'src/service/Constant'

const Employee = () => {
  const navigate = useNavigate()
  const [state, setstate] = useState([])
  const [loading, setLoading] = useState(true)
  const [update, setupdate] = useState([])
  const [error, setError] = useState()
  const [reload, setReload] = useState()

  const token = localStorage.getItem('token')

  const role = localStorage.getItem('role')

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
    localStorage.removeItem('otpCheck')
    getUserList()
  }, [])
  
    
 
  
  
  const getUserList = () => {
    // window.location.reload(false);
    
    setLoading(true)
    // axios.get('http://192.168.1.141:8088/payslip/user/getAllUser', config).then((res) => {
    axios.get(Base_Url + 'user/getAllUser', config).then((res) => {
      if (res.data.users) {
        setLoading(false)
        setstate(res.data.users)
      } else if (res.data.user) {
        setLoading(false)
        setstate(res.data.user)
      } else {
        // setError(res.data.information.description)
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

  const handleDelete = (id) => {
    // axios
    //   .delete('http://192.168.1.141:8088/payslip/user/deleteByUserId?id=' + id, config)
    axios
      // .delete('http://192.168.1.141:8088/payslip/user/deleteByUserId?id=' + id, config)
      .delete(Base_Url + 'user/deleteByUserId?id=' + id, config)
      .then((res) => {
        if (res.data.status) {
          getUserList()
        }
      })
  }

  const handleEdit = (id) => {
    localStorage.setItem('admingetUserId', id)

    // axios
    //   .get('http://192.168.1.141:8088/payslip/user/getUserById?id=' + id, config)
    //   .then((res) => {

    //     if (res.data.status) {
    //     }
    //   })

    var values = { id: id }

    setLoading(true)
    
    navigate('/employee/editEmployee', { state: values })
  }

  const templateDownload = (e) => {
    axios.get(
        // 'http://192.168.1.141:8088/payslip/employeeBulkUpload/exportEmployeeuploadTemplate',
        Base_Url + 'employeeBulkUpload/exportEmployeeuploadTemplate',
        config1,
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

        // clean up "a" element & remove ObjectURL
        // document.body.removeChild(link)
        // URL.revokeObjectURL(href)
        getUserList()
        navigate('/employee')

        // if (res.data.status) {
        //   setLoading(false)
        //   var filepath = res.data.file
        //   window.open(filepath)
        //   getUserList()
        //   navigate('/employee')
        // }
      })
  }

  const uploadPage = () => {
    setLoading(true)
    navigate('/employee/bulkupload')
  }

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

  var columns = []
  //ADMIN
  if (role === 'ADMIN') {
    columns = [
      // {
      //   name: 'S.No',
      //   selector: (row, index) => index + 1,
      //   width: '80px',
      // },
      {
        name: 'Associate Id',
        selector: (row) => row.associateId,
        // width: "200px",
        sortable: true,
      },
      {
        name: 'Associate Name',
        selector: (row) => row.firstname,
        // width: "200px",
        sortable: true,
      },
      {
        name: 'Email ID',
        selector: (row) => row.email,
        // width: "200px",
        sortable: true,
      },
      {
        name: 'Phone Number',
        selector: (row) => row.phoneNumber,
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
                  {role == 'ADMIN' ? (
                    <div className="form_col-3 ml-1">
                      <span className="custum-group-table">
                        <button
                          type="button"
                          className="btn  btn-sm text-info  btn-outline-info"
                          onClick={() => handleEdit(row.id)}
                        >
                          <i className="bi-pencil-fill"></i>
                        </button>
                      </span>
                    </div>
                  ) : (
                    ''
                  )}

                  <div className="form_col ml-1">
                    {row.deleteStatus ? (
                      <span className="custum-group-table">
                        <button
                          type="button"
                          className="btn  btn-sm text-info btn-outline-danger "
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
  }
  //EMPLOYEE
  if (role === 'EMPLOYEE') {
    columns = [
      // {
      //   name: 'S.No',
      //   selector: (row, index) => index + 1,
      //   width: '80px',
      // },
      {
        name: 'Associate Id',
        selector: (row) => row.associateId,
        // width: "200px",
        sortable: true,
      },
      {
        name: 'Associate Name',
        selector: (row) => row.firstname,
        // width: "200px",
        sortable: true,
      },
      {
        name: 'Email ID',
        selector: (row) => row.email,
        // width: "200px",
        sortable: true,
      },
      {
        name: 'Phone Number',
        selector: (row) => row.phoneNumber,
        // width: "200px",
        sortable: true,
      },
      // {
      //   name: 'Action',
      //   selector: (row) => row.membership,
      //   right: false,
      //   cell: (row) => (
      //     <>
      //       <div className="d-flex justify-content-between">
      //         {
      //           <>
      //             <div className="form_col-3 ml-1">
      //               <span className="custum-group-table">
      //                 <button
      //                   type="button"
      //                   className="btn  btn-sm text-info"
      //                   onClick={() => handleEdit(row.id)}
      //                 >
      //                   <i className="bi-pencil-fill"></i>
      //                 </button>
      //               </span>
      //             </div>

      //             <div className="form_col ml-1">
      //               <span className="custum-group-table">
      //                 <button
      //                   type="button"
      //                   className="btn  btn-sm text-info"
      //                   onClick={() => handleDelete(row.id)}
      //                 >
      //                   <i className="bi-trash-fill"></i>
      //                 </button>
      //               </span>
      //             </div>
      //           </>
      //         }
      //       </div>
      //     </>
      //   ),
      //   ignoreRowClick: true,
      //   allowOverflow: true,
      //   button: true,
      //   maxWidth: '600px',
      // },
    ]
  }

  const showIcons = () => {
    if (role === 'ADMIN') {
      return (
        // <view>
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

          <div>
            <Link className="mr-2 btn btn-primary btn-sm text-white " to={'/employee/addEmployee'}>
              <i>
                {' '}
                <CIcon icon={cilUserPlus} style={{ marginLeft: 'end' }} /> Add
              </i>
            </Link>
          </div>
        </div>
        // </view>
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
            <strong>Employee List</strong> {showIcons()}
          </CCardHeader>
          <CCardBody>
            <DataTable pagination columns={columns} customStyles={customStyles} data={state} />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Employee








// UsernamePasswordAuthenticationToken  customize three filed validation


// public class CustomAuthenticationToken extends UsernamePasswordAuthenticationToken {

//   private final String field1;
//   private final String field2;
//   private final String field3;

//   public CustomAuthenticationToken(String username, String password, String field1, String field2, String field3) {
//       super(username, password);
//       this.field1 = field1;
//       this.field2 = field2;
//       this.field3 = field3;
//   }

//   public String getField1() {
//       return field1;
//   }

//   public String getField2() {
//       return field2;
//   }

//   public String getField3() {
//       return field3;
//   }
// }


// CustomAuthenticationToken auth = new CustomAuthenticationToken("username", "password", "value1", "value2", "value3");
// Authentication result = authenticationManager.authenticate(auth);
