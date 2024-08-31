import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  CNavGroup,
  CNavItem,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarToggler,
} from '@coreui/react'

import { AppSidebarNav } from './AppSidebarNav'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import navigation from '../_nav'
import { CImage } from '@coreui/react/dist'
import { useState } from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilAccountLogout,
  cilBlurCircular,
  cilCreditCard,
  cilFile,
  cilGroup,
  cilMoney,
  cilSettings,
  cilUser,
} from '@coreui/icons'
import _nav from '../_nav'

const AppSidebar = () => {
  const [state, setstate] = useState(false)
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  const role = localStorage.getItem('role')

  var __nav = [
    {
      component: CNavItem,
      name: 'Employee',
      to: '/employee',
      icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
    },

    {
      component: CNavGroup,
      name: 'Salary Slip',
      to: '/monthAndYear',
      icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
      items: [
        {
          component: CNavItem,
          name: 'Setup',
          to: '/monthAndYear',
          icon: <CIcon icon={cilBlurCircular} customClassName="nav-icon" />,
        },
        {
          component: CNavItem,
          name: 'Download',
          to: '/downloadReport',
          icon: <CIcon icon={cilFile} customClassName="nav-icon" />,
        },
      ],
    },
    {
      component: CNavGroup,
      name: 'Settings',
      to: '/profile',
      icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
      items: [
        {
          component: CNavItem,
          name: 'Profile',
          to: '/profile',
          icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
        },
        {
          component: CNavItem,
          name: 'Change Password',
          to: '/changePassword',
          icon: <CIcon icon={cilCreditCard} customClassName="nav-icon" />,
        },
      ],
    },
    {
      component: CNavItem,
      name: 'Logout',
      to: '/login',
      icon: <CIcon icon={cilAccountLogout} customClassName="nav-icon" />,
    },
  ]

  var nav = [
    // {
    //   component: CNavItem,
    //   name: 'Employee',
    //   to: '/employee',
    //   icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
    // },

    {
      component: CNavGroup,
      name: 'Salary Slip ',
      to: '/monthAndYear',
      icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
      items: [
        {
          component: CNavItem,
          name: 'View',
          to: '/monthAndYear',
          icon: <CIcon icon={cilBlurCircular} customClassName="nav-icon" />,
        },
        {
          component: CNavItem,
          name: 'Download',
          to: '/report',
          icon: <CIcon icon={cilFile} customClassName="nav-icon" />,
        },
      ],
    },
    // {
    //   component: CNavGroup,
    //   name: 'Payment',
    //   to: '/monthAndYear',
    //   icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
    //   items: [
    //     {
    //       component: CNavItem,
    //       name: 'Setup',
    //       to: '/monthAndYear',
    //       icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    //     },
    //     {
    //       component: CNavItem,
    //       name: 'Report',
    //       to: '/monthAndYear/report',
    //       icon: <CIcon icon={cilCreditCard} customClassName="nav-icon" />,
    //     },
    //   ],
    // },
    {
      component: CNavGroup,
      name: 'Settings',
      to: '/profile',
      icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
      items: [
        {
          component: CNavItem,
          name: 'Profile',
          to: '/profile',
          icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
        },
        {
          component: CNavItem,
          name: 'Change Password',
          to: '/changePassword',
          icon: <CIcon icon={cilCreditCard} customClassName="nav-icon" />,
        },
      ],
    },
    {
      component: CNavItem,
      name: 'Logout',
      to: '/login',
      icon: <CIcon icon={cilAccountLogout} customClassName="nav-icon" />,
    },
  ]

  return (
    <CSidebar
      className="custum_bg_color"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <CImage
          src="https://boscosofttech.com/public/frontend/img/logo/bosco-logo.png"
          style={{ height: '25px', width: '200px', objectFit: 'contain' }}
        />
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          {role === 'ADMIN' ? <AppSidebarNav items={__nav} /> : <AppSidebarNav items={nav} />}
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
      />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
