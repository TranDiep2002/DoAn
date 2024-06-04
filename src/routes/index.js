// All components mapping with path for internal routes

import { lazy } from 'react'

const DSSinhVien = lazy(() => import('../page/DSSinhVien'))



const routes = [
  {
    path: '/dssinhvien', // the url
    component: DSSinhVien, // view rendered
  }
]

export default routes
