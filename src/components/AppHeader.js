import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMenu } from '@coreui/icons'

import { AppHeaderDropdown } from './header/index'
import { logo } from 'src/assets/brand/logo'
import { CImage } from '@coreui/react/dist'
import { NavLink } from 'react-router-dom'

const AppHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)
  var role = localStorage.getItem('role')
  var firstname = localStorage.getItem('firstname')

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>

        <CHeaderNav className="d-flex justify-content-center">
          <CNavItem>
            <div className="header_header">Boscosoft Salary Slip</div>
          </CNavItem>
        </CHeaderNav>

        <CHeaderNav className="ms-3">
          <div className="d-flex">
            <div>
              <p className="mb-0  headerHight">{firstname }</p>

              <p className="mb-0">{role}</p>
            </div>
            <AppHeaderDropdown />
          </div>
        </CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
