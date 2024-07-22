import React, { useEffect, useState } from 'react';
import TitleCard from "../components/Cards/TitleCard";
import groupAPI from '../route/group';
import giangVienAPI from '../route/giangVienAPI';
import '../dangkynhom/dangkynhom.css'
import { useDispatch, useSelector } from "react-redux";
import {setCurrentEditTenDeTai,setCurrentEditMoTaDeTai} from "./leadSlice"
import { openModal } from "../features/common/modalSlice";
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from '../utils/globalConstantUtil';
import DeCuongAPI from '../route/decuong';

const DanhSachDeCuong = () => {
    const [dsDeCuong, setDSDeCuong] = useState([]);
    const maUser = JSON.parse(localStorage.getItem("maUser"));
    const [approvalStatus, setApprovalStatus] = useState({});
    const dispatch = useDispatch();
    const [downloadUrl, setDownloadUrl] = useState("");

    useEffect(() => {
            getAllDSDeCuong();
    },[])

    // useEffect(() => {
    //     dsNhom.forEach((nhom) => {
    //         getTrangThai(nhom.maGV, nhom.tenDeTai,nhom.moTaDeTai);
    //     });
    // }, [dsNhom]);

    const getAllDSDeCuong = async () => {
        try {
            const response = await DeCuongAPI.getAllFileName();
            console.log("Danh sách đề cương:", response.data);
            setDSDeCuong(response.data);
        } catch (error) {
            console.log("Lấy các đề cương lỗi:", error);
        }
    };

    const updateTrangThaiDuyet = async ( tenDeTai,moTa) => {
        try {

            const response = await DeCuongAPI.duyetDC(tenDeTai,moTa)
            console.log("Kết quả cập nhật:", response);
            
            setApprovalStatus(prevState => ({
                ...prevState,
                [tenDeTai]: true
            }));
        } catch (error) {
            console.log("Cập nhật trạng thái lỗi:", error);
        }
    };

    const updateTrangThaiHuy = async ( tenDeTai,moTa)=>{
        try {
            const response = await DeCuongAPI.huyDC(tenDeTai,moTa)
            console.log("kết quả trạng thái hủy: ", response.data)
            setApprovalStatus(prevState => ({
                ...prevState,
                [tenDeTai]: true
            }));
        } catch (error) {
            
        }
    }

    const updateTrangThaiYCChinhSua = async ( tenDeTai,moTa)=>{
        try {
            const response = await DeCuongAPI.yeuCauChinhSuaDC(tenDeTai,moTa)
            console.log("kết quả trạng thái yêu cầu chỉnh sửa: ", response.data)
            setApprovalStatus(prevState => ({
                ...prevState,
                [tenDeTai]: true
            }));
        } catch (error) {
            
        }
    }

   
    const themGhiChu=(tenDeTai,moTaDeTai)=>{
        dispatch(setCurrentEditTenDeTai(tenDeTai)); // Lưu id vào Redux store
        dispatch(setCurrentEditMoTaDeTai(moTaDeTai))
        dispatch(openModal({ title: "Thêm ghi chú", bodyType: MODAL_BODY_TYPES.GHICHUDC_ADD, extraProps: { moTaDeTai }, extraTenDeTai:{tenDeTai} }));
        console.log("Tên đề tài:",tenDeTai);
    }
    const updateLaiTrangThai=(tenDeTai)=>{
        setApprovalStatus(prevState => ({
            ...prevState,
            [tenDeTai]: false
        }));

    }
    useEffect(() => {
        dsDeCuong.forEach((decuong) => {
            decuong.tenFile?.forEach((ten, idx) => {
                downloadFileSV(decuong.tenDeTai, decuong.moTa, ten);
            });
        });
    }, [dsDeCuong]);

    const downloadFileSV = async (tenDeTai,moTaDeTai,tenFile) => {
        try {
            const response = await DeCuongAPI.downloadFilebyFileName(tenDeTai,moTaDeTai,tenFile);
            console.log("response downloadfile", response.data)
            if (response.status !== 200) {
                console.log("Lỗi tải xuống tệp:", response.statusText);
                return;
            }
           
            else{
            const url = window.URL.createObjectURL(new Blob([response.data]));
            setDownloadUrl(url);
            }
        } catch (error) {
            console.log("Lỗi tải xuống tệp:", error);
        }
    };

    return (
        <div style={{ width: '1000px' }}>
            <TitleCard title="Danh sách nhóm" topMargin="mt-2">
                <div>
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Tên đề tài</th>
                                <th>Mô tả đề tài</th>
                                <th>Năm học</th>
                                <th>Đề cương</th>
                                <th>Chức năng</th>
                                <th>Ghi Chú</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                dsDeCuong.map((decuong, index) => (
                                    <tr key={index}>
                                        <td style={{ 
                                            wordWrap: 'break-word',
                                            whiteSpace: 'normal',
                                            maxWidth: '150px' // hoặc bất kỳ độ rộng nào phù hợp
                                        }}>
                                            {decuong.tenDeTai}
                                        </td>
                                        
                                        
                                        <td style={{ 
                                            wordWrap: 'break-word',
                                            whiteSpace: 'normal',
                                            maxWidth: '150px' // hoặc bất kỳ độ rộng nào phù hợp
                                        }}>{decuong.moTa}</td>
                                        <td>
                                            <b>Học Kỳ:</b> {decuong.tenKy}<br />
                                            <b>Năm Học:</b> {decuong.namHoc}
                                        </td>
                                        <td>
                                            {decuong.tenFile && decuong.tenFile.map((ten,idx) => (
                                                <div key={idx} style={{marginBottom:'10px', marginLeft:'15px'}}>
                                                    <a href={downloadUrl} download={ten} style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', background: '#f0f0f0', textDecoration: 'none', color: '#000', gap: '5px', width:'130px',height:'30px' }}>
                                                    <img src='https://lms.hou.edu.vn/theme/image.php/fordson/core/1675396394/f/document' style={{ width: '15px' }} alt='' />
                                                    <span >{ten}</span>
                                                    </a>
                                                </div>
                                            ))}
                                        </td>

                                        <td style={{width:'130px'}}>
                                            {approvalStatus[decuong.tenDeTai] ? (
                                                <div style={{display:'flex'}}>
                                                <span style={{color:'green'}}><b>Đã xét duyệt</b></span>
                                                <button className="btn btn-square btn-ghost" onClick={() => updateLaiTrangThai(decuong.tenDeTai)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                                                    </svg>

                                                </button>
                                                </div>
                                            ) : (
                                                <button className='btn btn-info' style={{ width: '100px' , marginBottom:'10px',marginLeft:'5px' }} onClick={() => updateTrangThaiDuyet( decuong.tenDeTai, decuong.moTa)}>Duyệt</button>
                                            )}
                                        
                                            {!approvalStatus[decuong.tenDeTai] && (
                                                <button className='btn btn-warning' style={{ width: '100px',marginLeft:'5px' }} onClick={() => updateTrangThaiHuy( decuong.tenDeTai, decuong.moTa)}>Hủy</button>
                                            )}
                                            {
                                                !approvalStatus[decuong.tenDeTai] && (
                                                    <button className='btn btn-danger' style={{ width: '100px',marginLeft:'5px', marginTop:'10px' }} onClick={() => updateTrangThaiYCChinhSua( decuong.tenDeTai, decuong.moTa)}>Yêu cầu chỉnh sửa</button>
                                                )
                                            }

                                        </td>
                                        <td>
                                            <button className="btn btn-square btn-ghost" onClick={() => themGhiChu(decuong.tenDeTai,decuong.moTa)}>
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

export default DanhSachDeCuong;

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


