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
import ChuyenMonAPI from '../route/chuyenmonAPI';

 const TopSideButtons = () => {
    const dispatch = useDispatch();

    const openAddNewLeadModal = () => {
        dispatch(openModal({ title: "Thêm chuyên môn", bodyType: MODAL_BODY_TYPES.CHUYENMON_ADD_NEW }));
    };

    return (
        <div className="inline-block float-right">
            <button className="btn px-6 btn-sm normal-case btn-info" onClick={() => openAddNewLeadModal()}>Add New</button>
        </div>
    );
};

const DSChuyenMon = () => {
    const [dsChuyenMon, setDSChuyenMon] = useState([]);

    const dispatch = useDispatch();

    const maUser = JSON.parse(localStorage.getItem("maUser"));

    const [isGiaoVu , setIsGiaoVu] = useState(true);

    const handelGetDSChuyenMon = async () => {
        try {
            const response = await ChuyenMonAPI.getallChuyenMon();
            console.log("danh sách chuyên môn la:", response.data);
            setDSChuyenMon(response.data);
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
        handelGetDSChuyenMon();
        dispatch(getLeadsContent());
        HiddenFunction();
    }, []);

    const deleteChuyenMon = async (id) => {
        try {
            console.log("id Chuyên môn xóa:", id);
            const response = await ChuyenMonAPI.deleteChuyenMonbyID(id);
            console.log('kết quả của xóa chuyên môn:', response);
            // Cập nhật lại danh sách  khi xóa
            handelGetDSChuyenMon();
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
                    onClick: () => deleteChuyenMon(id)
                },
                {
                    label: 'No',
                    onClick: () => { /* Không làm gì cả */ }
                }
            ]
        });
    };

    const editChuyenMon = (id) => {
        dispatch(setCurrentEditId(id)); // Lưu id vào Redux store
        dispatch(openModal({ title: "Edit chuyên môn", bodyType: MODAL_BODY_TYPES.CHUYENMON_EDIT, extraProps: { id } }));
       // console.log("id chuyên môn:",id);
    };

    return (
        <div style={{ width: '1000px' }}>
            <TitleCard title="Danh sách chuyên môn " topMargin="mt-2" TopSideButtons={isGiaoVu&&<TopSideButtons />}>
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Tên Chuyên Môn</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                dsChuyenMon.map((l, k) => {
                                    return (
                                        <tr key={l.id}>
                                            
                                            <td>{l.tenChuyenMon}</td>
                                            <td>
                                                { isGiaoVu&& (
                                                <button className="btn btn-square btn-ghost" onClick={() => confirmDelete(l.id)}>
                                                    <TrashIcon className="w-5" />
                                                </button>
                                                )}
                                            </td>
                                            <td>
                                            { isGiaoVu&&(
                                                
                                                <button className="btn btn-square btn-ghost" onClick={() => editChuyenMon(l.id)}>
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

export default DSChuyenMon;
