import React, { useState, useEffect } from 'react';
import sinhvienAPI from '../route/sinhvienAPI';
import TitleCard from "../components/Cards/TitleCard";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../features/common/modalSlice";
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from '../utils/globalConstantUtil';
import TrashIcon from '@heroicons/react/24/outline/TrashIcon';
import { deleteLead, getLeadsContent, setCurrentEditId } from "./leadSlice";
import authAPI from '../route/authAPI';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import FunnelIcon from '@heroicons/react/24/outline/FunnelIcon'
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon'
import SearchBar from "../components/Input/SearchBar"
import '../dangkynhom/dangkynhom.css'

 const TopSideButtons = () => {
    const dispatch = useDispatch();

    const openAddNewLeadModal = () => {
        dispatch(openModal({ title: "Thêm sinh viên", bodyType: MODAL_BODY_TYPES.STUDENT_ADD_NEW }));
    };

    return (
        <div className="inline-block float-right">
            <button className="btn px-6 btn-sm normal-case btn-info" onClick={() => openAddNewLeadModal()}>Add New</button>
        </div>
    );
};

const ImportExcel = () => {
    const dispatch = useDispatch();

    const openAddNewLeadModal = () => {
        dispatch(openModal({ title: "Thêm file danh sách sinh viên", bodyType: MODAL_BODY_TYPES.IMPORT_SINHVIEN }));
    };

    return (
        <div className="inline-block float-right">
            <button className="btn px-6 btn-sm normal-case btn-info" onClick={() => openAddNewLeadModal()}>Add File</button>
        </div>
    );
};

const TopSideTimKiem = ({removeFilter, applyFilter, applySearch}) => {

    const [filterParam, setFilterParam] = useState("")
    const [searchText, setSearchText] = useState("")
    const locationFilters = ["Công nghệ phần mềm", "CNĐPT", "Hệ thống thông tin", "Mạng máy tính"]

    const showFiltersAndApply = (params) => {
        console.log("Gọi hàm applyFilter");
        applyFilter(params)
        setFilterParam(params)
    }

    const removeAppliedFilter = () => {
        removeFilter()
        setFilterParam("")
        setSearchText("")
    }

    useEffect(() => {
        if(searchText == ""){
            removeAppliedFilter()
        }else{
            applySearch(searchText)
            
        }
    }, [searchText])

    return(
        <div className="inline-block float-right">
            <SearchBar searchText={searchText} styleClass="mr-4" setSearchText={setSearchText}/>
            {filterParam != "" && <button onClick={() => removeAppliedFilter()} className="btn btn-xs mr-2 btn-active btn-ghost normal-case">{filterParam}<XMarkIcon className="w-4 ml-2"/></button>}
            <div className="dropdown dropdown-bottom dropdown-end">
                <label tabIndex={0} className="btn btn-sm btn-outline"><FunnelIcon className="w-5 mr-2"/>Filter</label>
                <ul tabIndex={0} className="dropdown-content menu p-2 text-sm shadow bg-base-100 rounded-box w-52" style={{zIndex:'1'}}>
                    {
                        locationFilters.map((l, k) => {
                            return  <li key={k}><a onClick={() => showFiltersAndApply(l)}>{l}</a></li>
                        })
                    }
                    <div className="divider mt-0 mb-0"></div>
                    <li><a onClick={() => removeAppliedFilter()}>Remove Filter</a></li>
                </ul>
            </div>
        </div>
    )
}


const DSSinhVien = () => {
    const [dssinhvien, setDSSinhVien] = useState([]);

    const dispatch = useDispatch();

    const maUser = JSON.parse(localStorage.getItem("maUser"));

    const [isGiaoVu , setIsGiaoVu] = useState(false);

    const removeFilter = () => {
        handelGetSinhVien();
    }

    const applyFilter = async (params) => {
        const response = await sinhvienAPI.getSinhVienbyChuyenNganh(params)
        console.log("Danh sách sinh viên tìm theo chuyên ngành: ", response.data)
        setDSSinhVien(response.data);
    }

    // Search according to name
    const applySearch = async (params) => {
        const response = await sinhvienAPI.getSinhVienbyHoTen(params)
        console.log("Danh sách sinh viên tìm theo họ tên:", response.data)
        setDSSinhVien(response.data);
    }

    const handelGetSinhVien = async () => {
        try {
            const response = await sinhvienAPI.getSinhVien();
            console.log("danh sách sinh viên la:", response.data);
            setDSSinhVien(response.data);
        } catch (error) {
            console.log("error", error);
        }
    };

    const HiddenFunction = async ()=>{
        const response = await authAPI.getRole(maUser);
        var isGiaoVuRole ;
        if(response.data==="GIAOVU"){
             isGiaoVuRole = true;
        }
        console.log("phép so sánh",response.data==="GIAOVU");
        console.log(response.data);
        setIsGiaoVu(isGiaoVuRole);
    } 
    useEffect(() => {
        handelGetSinhVien();
        dispatch(getLeadsContent());
        HiddenFunction();
    }, []);

    const deleteSinhVien = async (id) => {
        try {
            console.log("id sinh viên xóa:", id);
            const response = await sinhvienAPI.deleteSinhVien(id);
            console.log('kết quả của xóa sinh viên:', response);
            // Cập nhật lại danh sách sinh viên sau khi xóa
            handelGetSinhVien();
        } catch (error) {
            console.log('lỗi khi xóa sinh viên:', error);
        }
    };

    const confirmDelete = (id) => {
        confirmAlert({
            title: 'Xác nhận xóa',
            message: 'Bạn có chắc chắn muốn xóa sinh viên này không?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => deleteSinhVien(id)
                },
                {
                    label: 'No',
                    onClick: () => { /* Không làm gì cả */ }
                }
            ]
        });
    };

    const editSinhVien = (id) => {
        dispatch(setCurrentEditId(id)); // Lưu id vào Redux store
        dispatch(openModal({ title: "Edit sinh viên", bodyType: MODAL_BODY_TYPES.STUDENT_EDIT, extraProps: { id } }));
    };

    return (
        <div style={{ width: '1000px' }}>
            <TitleCard title="Danh sách sinh viên " topMargin="mt-2" TopSideTimKiem={<TopSideTimKiem applySearch={applySearch} applyFilter={applyFilter} removeFilter={removeFilter}/>} ImportExcel={isGiaoVu&&<ImportExcel />} TopSideButtons={isGiaoVu&&<TopSideButtons />} >
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Họ và tên</th>
                                <th>Mã sinh viên</th>
                                <th>Email</th>
                                <th>Lớp hành chính</th>
                                <th>Chuyên ngành</th>
                                {isGiaoVu && ( <th></th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                dssinhvien.map((l, k) => {
                                    return (
                                        <tr key={l.id}>
                                            <td>
                                                <div className="flex items-center space-x-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle w-12 h-12">
                                                            <img src="/iconsinhvien.png" alt="Avatar" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="font-bold">{l.hoTen}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{l.maSV}</td>
                                            <td>{l.email}</td>
                                            <td>{l.lopHanhChinh}</td>
                                            <td>{l.nganh}</td>
                                            {isGiaoVu && (
                                                <td>
                                            <button className="btn btn-square btn-ghost" onClick={() => confirmDelete(l.id)}>
                                                <TrashIcon className="w-5" />
                                            </button>
                                            </td>)}
                                            {isGiaoVu && ( <td>
                                           
                                                <button className="btn btn-square btn-ghost" onClick={() => editSinhVien(l.id)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                    </svg>
                                                </button>
                                            
                                            </td>)}
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </TitleCard>
        </div>
    );
};

export default DSSinhVien;
