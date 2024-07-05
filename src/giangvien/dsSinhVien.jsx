import React, { useState, useEffect } from 'react';
import giangVienAPI from '../route/giangVienAPI'
import TitleCard from "../components/Cards/TitleCard";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../features/common/modalSlice";
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from '../utils/globalConstantUtil';
import TrashIcon from '@heroicons/react/24/outline/TrashIcon';
import { deleteLead, getLeadsContent, setCurrentEditId } from "./leadSlice";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import authAPI from '../route/authAPI';
import FunnelIcon from '@heroicons/react/24/outline/FunnelIcon'
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon'
import SearchBar from "../components/Input/SearchBar"

 const TopSideButtons = () => {
    const dispatch = useDispatch();

    const openAddNewLeadModal = () => {
        dispatch(openModal({ title: "Thêm giảng viên", bodyType: MODAL_BODY_TYPES.TEACHER_ADD_NEW }));
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





const DSGiangVien = () => {
    const [dssinhvien, setDSSinhVien] = useState([]);

    const dispatch = useDispatch();

    const maUser = JSON.parse(localStorage.getItem("maUser"));

    const [isGiaoVu , setIsGiaoVu] = useState(true);

    const removeFilter = () => {
        handelGetSinhVien();
    }

    const applyFilter = async (params) => {
        const response = await giangVienAPI.getGiangVienbyBoMon(params)
        console.log("Danh sách giảng viên tìm theo chuyên ngành: ", response.data)
        setDSSinhVien(response.data);
    }

    // Search according to name
    const applySearch = async (params) => {
        const response = await giangVienAPI.getGiangVienbyHoTen(params)
        console.log("Danh sách giảng viên tìm theo họ tên:", response.data)
        setDSSinhVien(response.data);
    }

    const handelGetSinhVien = async () => {
        try {
            const response = await giangVienAPI.getGiangVien();
            console.log("danh sách giảng viên la:", response.data);
            setDSSinhVien(response.data);
        } catch (error) {
            console.log("error", error);
        }
    };

    const HiddenFunction = async ()=>{
        const response = await authAPI.getRole(maUser);
        // const isGiaoVuRole = response.data.includes('GIAOVU')
        
        console.log(response.data);
        setIsGiaoVu(response.data==="GIAOVU");
    }

    useEffect(() => {
        handelGetSinhVien();
        console.log("dispatch:", dispatch(getLeadsContent()));
        HiddenFunction();
    },[])

    const deleteSinhVien = async (id) => {
        try {
            console.log("id giảng viên xóa:", id);
            const response = await giangVienAPI.deleteGiangVien(id);
            console.log('kết quả của xóa giảng viên:', response);
            // Cập nhật lại danh sách sinh viên sau khi xóa
            handelGetSinhVien();
        } catch (error) {
            console.log('lỗi khi xóa giảng viên:', error);
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
        dispatch(openModal({ title: "Edit giảng viên", bodyType: MODAL_BODY_TYPES.TEACHER_EDIT, extraProps: { id } }));
        console.log("id giảng viên:",id);
    };

    return (
        <div style={{ width: '1000px' }}>
            <TitleCard title="Danh sách giảng viên " topMargin="mt-2" TopSideTimKiem={<TopSideTimKiem applySearch={applySearch} applyFilter={applyFilter} removeFilter={removeFilter}/>} TopSideButtons={isGiaoVu&&<TopSideButtons />}>
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Họ và tên</th>
                                <th>Gmail</th>
                                <th>Bộ môn</th>
                                <th>Vai Trò</th>
                                <th>Học vị</th>
                                <th>Đơn vị công tác</th>
                                <th></th>
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
                                                            <img src="/anhgiangvien.png" alt="Avatar" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="font-bold">{l.hoTen}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{l.email}</td>
                                            <td>{l.tenBoMon}</td>
                                            <td>{l.vaiTro}</td>
                                            <td>{l.hocVi}</td>
                                            <td>{l.donViCongTac}</td>
                                            <td>
                                                { isGiaoVu&& (
                                                <button className="btn btn-square btn-ghost" onClick={() => confirmDelete(l.id)}>
                                                    <TrashIcon className="w-5" />
                                                </button>
                                                )}
                                            </td>
                                            <td>
                                            { isGiaoVu&&(
                                                <button className="btn btn-square btn-ghost" onClick={() => editSinhVien(l.id)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                    </svg>
                                                </button>
                                )}
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

export default DSGiangVien;
