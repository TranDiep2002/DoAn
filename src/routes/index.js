// All components mapping with path for internal routes

import { Component, lazy } from 'react'


const DSSinhVien = lazy(() => import('../page/DSSinhVien'))
const DSGiangVien =lazy(() =>import('../page/DSGiangVien'))
const DangKyNhom = lazy(()=> import('../page/DangKyNhom'))
const NhomCuaBan = lazy(()=>import('../page/NhomCuaBan') )
const DanhSachNhom = lazy(()=>import('../page/DSNhom') )
const DanhSachBoMon = lazy(()=> import('../page/DanhSachBoMon'))
const danhsachChuyenMon = lazy(()=> import('../page/DSChuyenMon'))
const setNamHocHocKy = lazy(()=>import('../page/SetNamHocHocKy'))
const DSTaiKhoan = lazy(()=>import('../page/DSTaiKhoan'))
const routes = [
  {
    path: '/dssinhvien', // the url
    component: DSSinhVien, // view rendered
  },
  {
    path:'/dsgiangvien',
    component:DSGiangVien,
  },
  {
    path:'/dangkynhom',
    component:DangKyNhom,
  },
  {
    path:'/nhomcuaban',
    component:NhomCuaBan,
  },
  {
    path:'/danhsachnhom',
    component:DanhSachNhom
  },
  {
    path:'/danhsachbomon',
    component:DanhSachBoMon
  },
  {
    path:'/danhsachchuyenmon',
    component:danhsachChuyenMon
  },
  {
    path:'/setNamHoc',
    component:setNamHocHocKy
  },
  {
    path:'/dstaikhoan',
    component:DSTaiKhoan
  }
]

export default routes
