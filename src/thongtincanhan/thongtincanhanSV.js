import React, { useEffect, useState } from 'react'
import sinhvienAPI from '../route/sinhvienAPI';
import TitleCard from "../components/Cards/TitleCard";
const ThongTinCaNhanSV = () => {
    const [sinhvien,setSinhVien]= useState("");
    const maSV = JSON.parse(localStorage.getItem("maUser"));
    const handelGetSinhVienbyMa = async()=>{
        try {
            const response = await sinhvienAPI.getSinhVienbyMaSV(maSV);
            setSinhVien(response.data);
        } catch (error) {
            console.log("lấy thông tin cá nhân sinh viên lỗi")
        }
    }
    useEffect(()=>{
        handelGetSinhVienbyMa();
    })
  return (
    <>
        <div style={{ width: '1000px' }}>
            <TitleCard title="Thông tin cá nhân " topMargin="mt-2"  >
                <div className="overflow-x-auto w-full">
                    <h3>Thông tin cá nhân sinh viên</h3>
                    <h4>Mã sinh viên  : {sinhvien.maSV}</h4>
                    <h4>Tên sinh viên : {sinhvien.hoTen}</h4>
                    <h4>Lớp hành chính: {sinhvien.lopHanhChinh}</h4>
                    <h4>Email         : {sinhvien.email}</h4>
                    <h4>Chuyên ngành  : {sinhvien.nganh}</h4>
                </div>
            </TitleCard>
        </div>

    </>
  )
}

export default ThongTinCaNhanSV