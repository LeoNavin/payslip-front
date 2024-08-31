import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
 
  return (
    <CFooter >
      {/* <div>
        <a href="https://coreui.io" target="_blank" rel="noopener noreferrer">
          CoreUI
        </a>
        <span className="ms-1">&copy; 2022 creativeLabs.</span>
      </div> */}
      <div className="mx-auto">
        <span className="me-1"> ©{new Date().getFullYear()}. Powered by</span>
        <a href="https://www.boscosofttech.com/" style={{textDecoration:'none'}}>Boscosoft Technologies</a> | All Rights Reserved.
      </div>
    </CFooter>
  )
}


export default React.memo(AppFooter)
