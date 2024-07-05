import React, { useState, useEffect } from 'react';
import giangVienAPI from '../route/giangVienAPI'
import TitleCard from "../components/Cards/TitleCard";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../features/common/modalSlice";
import {  MODAL_BODY_TYPES } from '../utils/globalConstantUtil';
import TrashIcon from '@heroicons/react/24/outline/TrashIcon';
import {  getLeadsContent, setCurrentEditId } from "./leadSlice";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import authAPI from '../route/authAPI';
import BoMonAPI from '../route/bomonAPI';

 const TopSideButtons = () => {
    const dispatch = useDispatch();

    const openAddNewLeadModal = () => {
        dispatch(openModal({ title: "Thêm bộ môn", bodyType: MODAL_BODY_TYPES.BOMON_ADD_NEW }));
    };

    return (
        <div className="inline-block float-right">
            <button className="btn px-6 btn-sm normal-case btn-info" onClick={() => openAddNewLeadModal()}>Add New</button>
        </div>
    );
};

const DSBoMon = () => {
    const [dsBoMon, setDSBoMon] = useState([]);

    const dispatch = useDispatch();

    const maUser = JSON.parse(localStorage.getItem("maUser"));

    const [isGiaoVu , setIsGiaoVu] = useState(true);

    const handelGetBoMon = async () => {
        try {
            const response = await BoMonAPI.getallBoMon();
            console.log("danh sách bộ môn:", response.data);
            setDSBoMon(response.data);
        } catch (error) {
            console.log("lỗi khi lấy danh sách bộ môn",error);
        }
    };

    const HiddenFunction = async ()=>{
        const response = await authAPI.getRole(maUser);
        // const isGiaoVuRole = response.data.includes('GIAOVU')
        console.log(response.data);
        setIsGiaoVu(response.data==="GIAOVU");
    }

    useEffect(() => {
        handelGetBoMon();
        dispatch(getLeadsContent());
        HiddenFunction();
    }, []);

    const deleteBoMon = async (id) => {
        try {
            const response = await BoMonAPI.deleteBoMon(id);
            console.log("Kết quả xóa bộ môn", response.data);
            handelGetBoMon();
        } catch (error) {
            console.log("lỗi khi xóa bộ môn",error);
        }
    };

    const confirmDelete = (id) => {
        confirmAlert({
            title: 'Xác nhận xóa',
            message: 'Bạn có chắc chắn muốn xóa sinh viên này không?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => deleteBoMon(id)
                },
                {
                    label: 'No',
                    onClick: () => { /* Không làm gì cả */ }
                }
            ]
        });
    };

    const editBoMon = (id) => {
        dispatch(setCurrentEditId(id)); // Lưu id vào Redux store
        dispatch(openModal({ title: "Edit bộ môn", bodyType: MODAL_BODY_TYPES.BOMON_EDIT, extraProps: { id } }));
        console.log("id bộ môn để edit:",id);
        handelGetBoMon();
    };

    return (
        <div style={{ width: '1000px' }}>
            <TitleCard title="Danh sách bộ môn " topMargin="mt-2" TopSideButtons={isGiaoVu&&<TopSideButtons />}>
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Tên Bộ Môn</th>
                                <th>Mô Tả</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                dsBoMon.map((l, k) => {
                                    return (
                                        <tr key={l.id}>
                                            <td>{l.tenBoMon}</td>
                                            <td>{l.moTa}</td>
                                            <td>
                                                { isGiaoVu&& (
                                                <button className="btn btn-square btn-ghost" onClick={() => confirmDelete(l.id)}>
                                                    <TrashIcon className="w-5" />
                                                </button>
                                                )}
                                            </td>
                                            <td>
                                            { isGiaoVu&&(
                                                <button className="btn btn-square btn-ghost" onClick={() => editBoMon(l.id)}>
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

export default DSBoMon;
