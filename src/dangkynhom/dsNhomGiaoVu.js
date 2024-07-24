import React, { useEffect, useState } from 'react';
import TitleCard from "../components/Cards/TitleCard";
import groupAPI from '../route/group';
import giangVienAPI from '../route/giangVienAPI';
import '../dangkynhom/dangkynhom.css'
import { useDispatch, useSelector } from "react-redux";
import {setCurrentEditTenDeTai,setCurrentEditMoTaDeTai} from "./leadSlice"
import { openModal } from "../features/common/modalSlice";
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from '../utils/globalConstantUtil';


const DanhSachNhomGiaoVu = () => {
    const [dsNhom, setDSNhom] = useState([]);
    const maUser = JSON.parse(localStorage.getItem("maUser"));
    const [chuyenMon, setChuyenMon] = useState("");
    const [approvalStatus, setApprovalStatus] = useState({});
    const [ghiChu, setGhiChu] = useState('');
    const [hiddenButton, setHiddenButton] = useState(true);
    const dispatch = useDispatch();
   

    const handleChangeGhiChu = (event,tenDeTai,moTa)=>{
        if(tenDeTai&&moTa)
        setGhiChu(event.target.value);
    }

    useEffect(() => {
            getallGroup();
            console.log("ghi chú:",ghiChu)
    },[])

    useEffect(() => {
        dsNhom.forEach((nhom) => {
            getTrangThai(nhom.maGV, nhom.tenDeTai,nhom.moTaDeTai);
        });
    }, [dsNhom]);


    const getallGroup = async () => {
        try {
            const response = await groupAPI.getallDangKyGiaoVu();
            console.log("Danh sách nhóm:", response.data);
            setDSNhom(response.data);
        } catch (error) {
            console.log("Lấy các nhóm lỗi:", error);
        }
    };

    const updateTrangThai = async (maGV, tenDeTai,moTa) => {
        try {

            const response = await groupAPI.updateTrangThaibyGiangVienDeTai(maGV, tenDeTai,moTa);
            console.log("Kết quả cập nhật:", response);
            
            setApprovalStatus(prevState => ({
                ...prevState,
                [tenDeTai]: true
            }));
        } catch (error) {
            console.log("Cập nhật trạng thái lỗi:", error);
        }
    };

    const updateTrangThaiHuy = async (maGv, tenDeTai,moTa)=>{
        try {
            const response = await groupAPI.updateTrangThaiHuybyGiangVienDeTai(maGv,tenDeTai,moTa);
            console.log("kết quả trạng thái hủy: ", response.data)
            setApprovalStatus(prevState => ({
                ...prevState,
                [tenDeTai]: true
            }));
        } catch (error) {
            
        }
    }

    const getTrangThai = async (maGV, tenDeTai,moTaDeTai) => {
        try {
            const response = await groupAPI.getTrangThaiDangKy(maGV, tenDeTai,moTaDeTai);
            if (response.data === "Đã duyệt"||response.data==="Hủy") {
                setApprovalStatus(prevState => ({
                    ...prevState,
                    [tenDeTai]: true
                }));
            }
            
        } catch (error) {
            console.log("Lỗi khi lấy trạng thái:", error);
        }
    };
    const editDangKy=(tenDeTai,moTaDeTai)=>{
        dispatch(setCurrentEditTenDeTai(tenDeTai)); // Lưu id vào Redux store
        dispatch(setCurrentEditMoTaDeTai(moTaDeTai))
        dispatch(openModal({ title: "Edit Đăng Ký", bodyType: MODAL_BODY_TYPES.DANGKY_EDIT, extraProps: { moTaDeTai }, extraTenDeTai:{tenDeTai} }));
        console.log("Tên đề tài:",tenDeTai);
    }
    const themGhiChu=(tenDeTai,moTaDeTai)=>{
        dispatch(setCurrentEditTenDeTai(tenDeTai)); // Lưu id vào Redux store
        dispatch(setCurrentEditMoTaDeTai(moTaDeTai))
        dispatch(openModal({ title: "Thêm ghi chú", bodyType: MODAL_BODY_TYPES.GHICHU_ADD, extraProps: { moTaDeTai }, extraTenDeTai:{tenDeTai} }));
        console.log("Tên đề tài:",tenDeTai);
    }
    const updateLaiTrangThai=(tenDeTai)=>{
        setApprovalStatus(prevState => ({
            ...prevState,
            [tenDeTai]: false
        }));

    }

    return (
        <div style={{ width: '1000px' }}>
            <TitleCard title="Danh sách nhóm" topMargin="mt-2">
                <div>
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Tên đề tài</th>
                                <th>Thành viên</th>
                                <th>GVHD</th>
                                <th>Mô tả đề tài</th>
                                <th>Năm Học</th>
                                <th></th>
                                <th>Ghi Chú</th>
                                <th>Cập nhật GVHD</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                dsNhom.map((nhom, index) => (
                                    <tr key={index}>
                                        <td style={{ 
                                            wordWrap: 'break-word',
                                            whiteSpace: 'normal',
                                            maxWidth: '150px' // hoặc bất kỳ độ rộng nào phù hợp
                                        }}>
                                            {nhom.tenDeTai}
                                        </td>
                                        <td>
                                            {nhom.tenSinhViens && nhom.tenSinhViens.map((ten, idx) => (
                                                <div key={idx}>{ten}</div>
                                            ))}
                                        </td>
                                        <td>{nhom.hoTen}</td>
                                        <td style={{ 
                                            wordWrap: 'break-word',
                                            whiteSpace: 'normal',
                                            maxWidth: '150px' // hoặc bất kỳ độ rộng nào phù hợp
                                        }}>{nhom.moTaDeTai}</td>
                                        <td>
                                            <b>Học Kỳ:</b> {nhom.tenKy}<br />
                                            <b>Năm Học:</b> {nhom.tenNamHoc}
                                        </td>
                                        <td style={{width:'130px'}}>
                                            {approvalStatus[nhom.tenDeTai] ? (
                                                <div style={{display:'flex'}}>
                                                <span style={{color:'green'}}><b>Đã xét duyệt</b></span>
                                                <button className="btn btn-square btn-ghost" onClick={() => updateLaiTrangThai(nhom.tenDeTai)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                                                    </svg>

                                                </button>
                                                </div>
                                            ) : (
                                                <button className='btn btn-info' style={{ width: '80px' , marginBottom:'10px',marginLeft:'5px' }} onClick={() => updateTrangThai(nhom.maGV, nhom.tenDeTai, nhom.moTaDeTai)}>Duyệt</button>
                                            )}
                                        
                                            {!approvalStatus[nhom.tenDeTai] && (
                                                <button className='btn btn-warning' style={{ width: '80px',marginLeft:'5px' }} onClick={() => updateTrangThaiHuy(nhom.maGV, nhom.tenDeTai, nhom.moTaDeTai)}>Không duyệt</button>
                                            )}

                                        </td>
                                        <td>
                                        <button className="btn btn-square btn-ghost" onClick={() => themGhiChu(nhom.tenDeTai,nhom.moTaDeTai)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                    </svg>
                                                </button>
                                        </td>
                                       
                                        <td>
                                        <button className="btn btn-square btn-ghost" onClick={() => editDangKy(nhom.tenDeTai,nhom.moTaDeTai)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                    </svg>
                                                </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </TitleCard>
        </div>
    );
};

export default DanhSachNhomGiaoVu;


// import React, { useState } from "react";
// import { ListBox } from 'primereact/listbox';

// export default function BasicDemo() {
//     const [selectedCity, setSelectedCity] = useState(null);
//     const cities = [
//         { name: 'New York', code: 'NY' },
//         { name: 'Rome', code: 'RM' },
//         { name: 'London', code: 'LDN' },
//         { name: 'Istanbul', code: 'IST' },
//         { name: 'Paris', code: 'PRS' }
//     ];

//     // Tạo một mảng mới với tên và mã kết hợp
//     const citiesWithLabels = cities.map(city => ({
//         ...city,
//         label: `${city.name} - ${city.code}`
//     }));

//     return (
//         <div className="card flex justify-content-center">  
//             <ListBox 
//                 filter 
//                 value={selectedCity} 
//                 onChange={(e) => setSelectedCity(e.value)} 
//                 options={citiesWithLabels} 
//                 optionLabel="label" // Sử dụng trường label để hiển thị tên và mã
//                 className="w-full md:w-14rem" 
//             />
//             <p>{selectedCity ? `${selectedCity.name} - ${selectedCity.code}` : 'No city selected'}</p>
//         </div>
//     );
// }

// import React, { useState } from "react";
// import { ListBox } from 'primereact/listbox';

// export default function MultipleDemo() {
//     const [selectedCities, setSelectedCities] = useState([]);
//     const cities = [
//         { name: 'New York', code: 'NY' },
//         { name: 'Rome', code: 'RM' },
//         { name: 'London', code: 'LDN' },
//         { name: 'Istanbul', code: 'IST' },
//         { name: 'Paris', code: 'PRS' },
//         {name:'VietNam',code:'VN'}
//     ];

//     const handleCityChange = (e) => {
//         if (e.value.length <= 5) {
//             setSelectedCities(e.value);
//         } else {
//             alert('You can select up to 5 cities only.');
//         }
//     };

//     return (
//         <div className="card flex justify-content-center">  
//             <ListBox 
//                 multiple 
//                 value={selectedCities} 
//                 onChange={handleCityChange} 
//                 options={cities} 
//                 optionLabel="name" 
//                 className="w-full md:w-14rem" 
//             />

//             <div>
//                 {selectedCities && selectedCities.length > 0 ? (
//                     selectedCities.map((city, index) => (
//                         <p key={index}>{city.name}</p>
//                     ))
//                 ) : (
//                     <p>No cities selected</p>
//                 )}
//             </div>
//         </div>
//     );
// }
