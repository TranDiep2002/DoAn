import React, { useState } from 'react'
import sinhvienAPI from '../route/sinhvienAPI';
import TitleCard from "../components/Cards/TitleCard"
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { openModal } from "../features/common/modalSlice"
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from '../utils/globalConstantUtil'
import TrashIcon from '@heroicons/react/24/outline/TrashIcon'
import { deleteLead, getLeadsContent } from "./leadSlice"
const TopSideButtons = () => {
    const dispatch = useDispatch()

    const openAddNewLeadModal = () => {
        dispatch(openModal({title : "Thêm sinh viên", bodyType : MODAL_BODY_TYPES.STUDENT_ADD_NEW}))
    }

    return(
        <div className="inline-block float-right">
            <button className="btn px-6 btn-sm normal-case btn-info" onClick={() => openAddNewLeadModal()}>Add New</button>
        </div>
    )
}
const DSSinhVien = () => {
    const [dssinhvien,setDSSinhVen] = useState([]);

    const dispatch = useDispatch()

    const handelGetSinhVien = async()=>{
        try {
            const response = await sinhvienAPI.getSinhVien();
            console.log("danh sách sinh viên la:", response.data);
            setDSSinhVen(response.data);
        } catch (error) {
            console.log("error",error);
        }
    }
    useEffect(() => {
        handelGetSinhVien();
        dispatch(getLeadsContent())
        console.log(dssinhvien);
    }, []);
   
    const deleteSinhVien=(id)=>{

    }
  return (
    < div style={{width:'1000px'}}>
            
            <TitleCard title="Danh sách sinh viên " topMargin="mt-2" TopSideButtons={<TopSideButtons />}>

                {/* Leads List in table format loaded from slice after api call */}
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                    <tr>
                        <th>Họ và tên</th>
                        <th>Giới tính</th>
                        <th>Ngày Sinh</th>
                        <th>Mã Sinh Viên</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            dssinhvien.map((l, k) => {
                                return(
                                    <tr key={k}>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src="/iconsinhvien.png" alt="Avatar" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{l.fullName}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{l.gioiTinh}</td>
                                    <td>{l.ngaySinh}</td>
                                    <td>{l.maUser}</td>
                                    <td><button className="btn btn-square btn-ghost" onClick={() => deleteSinhVien(k)}><TrashIcon className="w-5"/></button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            </TitleCard>
         </div>
    )
}

export default DSSinhVien