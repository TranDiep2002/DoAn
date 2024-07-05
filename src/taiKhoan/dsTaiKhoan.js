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
import TaiKhoanAPI from '../route/taiKhoanAPI'

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


const TopSideTimKiem = ({removeFilter, applyFilter, applySearch}) => {

    const [filterParam, setFilterParam] = useState("")
    const [searchText, setSearchText] = useState("")
    const locationFilters = ["SINHVIEN", "GIANGVIEN","GIAOVU"]

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
        if(searchText === ""){
            removeAppliedFilter()
        }else{
            applySearch(searchText)
            
        }
    }, [searchText])

    return(
        <div className="inline-block float-right">
            <SearchBar searchText={searchText} styleClass="mr-4" setSearchText={setSearchText}/>
            {filterParam !== "" && <button onClick={() => removeAppliedFilter()} className="btn btn-xs mr-2 btn-active btn-ghost normal-case">{filterParam}<XMarkIcon className="w-4 ml-2"/></button>}
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


const DSTaiKhoan = () => {
    const [dsTaiKhoan, setDSTaiKhoan] = useState([]);

    const dispatch = useDispatch();

    const [isGiaoVu , setIsGiaoVu] = useState(false);

    const removeFilter = () => {
        handelGetTaiKhoan();
    }

    const applyFilter = async (params) => {
        const response = await TaiKhoanAPI.getTaiKhoanbyLoaiTaiKhoan(params);
        console.log("Danh sách tài khoản tìm theo loại tài khoản: ", response.data)
        setDSTaiKhoan(response.data);
    }

    // Search according to name
    const applySearch = async (params) => {
        console.log("tìm kiếm tài khoản theo mã:",params)
        const response = await TaiKhoanAPI.getTaiKhoanbyMaUser(params);
        console.log("Danh sách tài khoản tìm mã user:", response.data)
        setDSTaiKhoan(response.data);
    }

    const handelGetTaiKhoan = async () => {
        try {
            const response = await TaiKhoanAPI.getAllTaiKhoan();
            console.log("danh sách tai khoản la:", response.data);
            setDSTaiKhoan(response.data);
        } catch (error) {
            console.log("error", error);
        }
    };


    useEffect(() => {
        handelGetTaiKhoan();
        dispatch(getLeadsContent());
    }, []);

    const deleteTaiKhoan = async (id) => {
        try {
            console.log("id tài khoản xóa:", id);
            const response = await TaiKhoanAPI.deleteTaiKhoan(id);
            console.log('kết quả của xóa tài khoản:', response);
            // Cập nhật lại danh sách sinh viên sau khi xóa
            handelGetTaiKhoan();
        } catch (error) {
            console.log('lỗi khi xóa tài khoản:', error);
        }
    };

    const confirmDelete = (id) => {
        confirmAlert({
            title: 'Xác nhận xóa',
            message: 'Bạn có chắc chắn muốn xóa tài khoản này không?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => deleteTaiKhoan(id)
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
            <TitleCard title="Danh sách tài khoản " topMargin="mt-2" TopSideTimKiem={<TopSideTimKiem applySearch={applySearch} applyFilter={applyFilter} removeFilter={removeFilter}/>} TopSideButtons={<TopSideButtons />} >
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Mã Người Dùng</th>
                                <th>Loại Tài Khoản</th>
                                <th>PassWord</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                dsTaiKhoan.map((l, k) => {
                                    return (
                                        <tr key={l.id}>
                                            <td>{l.maUser}</td>
                                            <td>{l.loaiTaiKhoan}</td>
                                            <td>{l.passWord}</td>
                                            <td>
                                            <button className="btn btn-square btn-ghost" onClick={() => confirmDelete(l.id)}>
                                                <TrashIcon className="w-5" />
                                            </button>
                                        
                                            </td>
                                            <td>
                                             
                                                <button className="btn btn-square btn-ghost" onClick={() => editSinhVien(l.id)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                    </svg>
                                                </button>
                                        
                                            </td>
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

export default DSTaiKhoan;
