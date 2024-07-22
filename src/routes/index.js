// All components mapping with path for internal routes

import { Component, lazy } from 'react'
import PhanCongGVChamDC from '../nopDeCuong/phanCongGVCham'


const DSSinhVien = lazy(() => import('../page/DSSinhVien'))
const DSGiangVien =lazy(() =>import('../page/DSGiangVien'))
const DangKyNhom = lazy(()=> import('../page/DangKyNhom'))
const NhomCuaBan = lazy(()=>import('../page/NhomCuaBan') )
const DanhSachNhom = lazy(()=>import('../page/DSNhom') )
const DanhSachBoMon = lazy(()=> import('../page/DanhSachBoMon'))
const danhsachChuyenMon = lazy(()=> import('../page/DSChuyenMon'))
const setNamHocHocKy = lazy(()=>import('../page/SetNamHocHocKy'))
const DSTaiKhoan = lazy(()=>import('../page/DSTaiKhoan'))
const DSNhomGiaoVu =  lazy(()=>import('../page/DSNhomGiaoVu'))
const SinhVienNopDC = lazy(()=>import('../page/SinhVienNopDC'))
const SetThongBao = lazy(()=>import('../page/ThongBao'))
const DSDeCuong = lazy(()=>import('../page/DSDeCuong'))
const PCGVChamDC= lazy(()=>import('../page/PhanCongGVChamDC'))
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
    path:'/setThongBao',
    component:SetThongBao
  },

  {
    path:'/dstaikhoan',
    component:DSTaiKhoan
  },
  {
    path:'/dsNhomGiaoVu',
    component:DSNhomGiaoVu
  },
  {
    path:'/sinhVienNopDC',
    component:SinhVienNopDC
  },
  {
    path:'/danhsachDeCuong',
    component:DSDeCuong
  },
  {
    path:'/phancongGVChamDC',
    component:PCGVChamDC
  }
]

export default routes
