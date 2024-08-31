import React, { useEffect, useState } from 'react'
import { CAvatar, CDropdown, CDropdownDivider, CDropdownItem, CDropdownMenu, CDropdownToggle, CNavItem } from '@coreui/react'
import axios from 'axios'

import donbosco from './../../assets/images/avatars/don-bosco.jpg'
import user from './../../assets/images/avatars/user1.jpg'

import { Link, NavLink, useNavigate } from 'react-router-dom'
import moment from 'moment'
import { Base_Url } from 'src/service/Constant'
import CIcon from '@coreui/icons-react'
import { cilCreditCard, cilLockLocked, cilUser } from '@coreui/icons'

const AppHeaderDropdown = () => {


  const [employee, setEmployee] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')

  const config = {
    headers: { Authorization: token },
  }
  useEffect(() => {
    getUserProfile()
  }, [])


  async function getUserProfile() {
    setLoading(true)
    // await axios.get('http://192.168.1.141:8088/payslip/user/getUser', config).then((res) => {
    await axios.get(Base_Url + 'user/getUser', config).then((res) => {
      if (res.data.status) {
        // res.data.user.doj = Moment(res.data.user.doj).format('YYYY-MM-DD')
        setLoading(false)

        res.data.user.doj = moment(res.data.user.doj).format('DD-MM-YYYY')
        res.data.user.dateOfBirth = moment(res.data.user.dateOfBirth).format('DD-MM-YYYY')

        // setUser(res.data.user.profilePath)

        setEmployee(res.data.user)
        // userdata.profilePath=res.data.user.profilePath
      }
      {
        setLoading(false)

        setError("User Details can't be find")
      }
    })
  }



  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
      <Link >
            <CAvatar src={employee.profilePath} size="md" className="avatar-img" />
            {/* <CAvatar src={user} size="md" className="avatar-img" /> */}

          </Link>
        {/* {role == 'ADMIN' ? (
          <Link to={'/profileImageUpload'}>
            <CAvatar src={employee.profilePath} size="md" className="avatar-img" />

          </Link>
        ) : (
          <Link to={'/profileImageUpload'}>
            <CAvatar src={user} size="md" />
          </Link>
        )} */}
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
     

        <CDropdownItem className='nav-items d-flex align-items-center' >
          <CIcon icon={cilUser} className="me-2" />
          <CNavItem to="/profile"  name='Profile' component={NavLink} style={{textDecoration:"none",color:'black'}} >Profile</CNavItem>
          
        </CDropdownItem>
        <CDropdownDivider />

        <CDropdownItem className='nav-items d-flex align-items-center'style={{textDecoration:"none",color:'black'}}>
          <CIcon icon={cilCreditCard} className="me-2" />
          <CNavItem to="/changePassword" name='Change Password' component={NavLink} style={{textDecoration:"none",color:'black'}}>Change Password</CNavItem>
          
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem className='nav-items d-flex align-items-center'>
          <CIcon icon={cilLockLocked} className="me-2" />
          <CNavItem to="/login" name='Logout'  component={NavLink} style={{textDecoration:"none",color:'black'}}>Logout</CNavItem>           
          
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
