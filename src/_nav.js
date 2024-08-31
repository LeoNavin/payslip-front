import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilAccountLogout, cilBlurCircular, cilCreditCard, cilFile, cilGroup, cilMoney, cilPuzzle, cilSettings, cilUser } from '@coreui/icons'
import { CNavGroup, CNavItem } from '@coreui/react'

const role = localStorage.getItem('role')

var _nav = []
// if (role === 'ADMIN') {
_nav = [
  {
    component: CNavItem,
    name: 'Associates',
    to: '/employee',
    icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
  },

  {
    component: CNavGroup,
    name: 'Payslip',
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
        name: 'Report',
        to: '/report',
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
// }

// if (role === 'EMPLOYEE') {
//   _nav = [
//     {
//       component: CNavGroup,
//       name: 'PaySlip',
//       to: '/payslip',
//       icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
//       items: [
//         // {
//         //   component: CNavItem,
//         //   name: 'Setup',
//         //   to: '/payslip',
//         // },
//         {
//           component: CNavItem,
//           name: 'Report',
//           to: '/payslip/report',
//         },
//       ],
//     },
//     {
//       component: CNavItem,
//       name: 'Logout',
//       to: '/login',
//       icon: <CIcon icon={cilAccountLogout} customClassName="nav-icon" />,
//     },
//   ]
// }
export default _nav
