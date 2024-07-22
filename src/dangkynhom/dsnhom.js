// import React, { useEffect, useState } from 'react';
// import TitleCard from "../components/Cards/TitleCard";
// import groupAPI from '../route/group';
// import giangVienAPI from '../route/giangVienAPI';

// const DanhSachNhom = () => {
//     const [dsNhom, setDSNhom] = useState([]);
//     const maUser = JSON.parse(localStorage.getItem("maUser"));
//     const [chuyenMon, setChuyenMon] = useState("");
//     const [approvalStatus, setApprovalStatus] = useState({});
//     const [ghiChu, setGhiChu] = useState('');
//     const [hiddenButton, setHiddenButton] = useState(true);

    

//     const handleChangeGhiChu = (event)=>{
//         setGhiChu(event.target.value);
//     }

//     useEffect(() => {
//         console.log(chuyenMon);
//         getChuyenMon();
//         getallGroup();
//         getTrangThai();
//     }, [chuyenMon]);

//     const getChuyenMon = async () => {
//         try {
//             const response = await giangVienAPI.getBoMonbyMaGV(maUser);
//             console.log("bộ môn của giảng viên :", response.data);
//             setChuyenMon(response.data);
//         } catch (error) {
//             console.log("Lỗi khi lấy bộ môn");
//         }
//     };

//     const getallGroup = async () => {
//         try {
//             const response = await groupAPI.getallGroup(chuyenMon);
//             console.log("danh sách nhóm:", response.data);
//             setDSNhom(response.data);
//         } catch (error) {
//             console.log("Lấy các nhóm theo chuyên môn lỗi:", error);
//         }
//     };

//     const updateTrangThai = async (maGV, tenDeTai) => {
//         try {
//             const response = await groupAPI.updateTrangThaibyGiangVienDeTai(maGV, tenDeTai);
//             console.log("Kết quả cập nhật:", response);
//             setApprovalStatus(prevState => ({
//                 ...prevState,
//                 [tenDeTai]: true
//             }));
//         } catch (error) {
//             console.log("cập nhật trạng thái lỗi:", error);
//         }
//     };
//     const getTrangThai = async (maGV, tenDeTai)=>{
//         try {
//             const response = await groupAPI.getTrangThaiDangKy(maGV, tenDeTai);
//             if(response.data==="Đã duyệt"){
//                 setHiddenButton(false)
//             }
//         } catch (error) {
//             console.log("Lỗi khi lấy trạng thái", error)
//         }
//     }
    
//     return (
//         <div style={{ width: '1000px' }}>
//             <TitleCard title="Danh sách nhóm " topMargin="mt-2" >
//                 <div>
//                     <table className="table w-full">
//                         <thead>
//                             <tr>
//                                 <th>Tên đề tài</th>
//                                 <th>Thành viên</th>
//                                 <th>GVHD</th>
//                                 <th>Mô tả đề tài</th>
//                                 <th>Năm Học</th>
//                                 <th></th>
//                                 <th></th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {
//                                 dsNhom.map((l, k) => {
//                                     return (
//                                         <tr key={l.id}>
//                                             <td>{l.tenDeTai}</td>
//                                             <td>
//                                                 {l.tenSinhViens && l.tenSinhViens.map((ten, index) => (
//                                                     <div key={index}>{ten}</div>
//                                                 ))}
//                                             </td>
//                                             <td>{l.hoTen}</td>
//                                             <td>{l.moTaDeTai}</td>
//                                             <td><b> Học Kỳ : </b>{l.tenKy}<br />
//                                                 <b>Năm Học : </b>{l.tenNamHoc}</td>
//                                             <td>
//                                                 {getTrangThai(l.maGV, l.tenDeTai)  ? (
//                                                     <span>Đã duyệt</span>
//                                                 ) : (
//                                                     <button className='btn btn-info' style={{ width: '80px' }} onClick={() => updateTrangThai(l.maGV, l.tenDeTai)}> Duyệt</button>
//                                                 )}
//                                             </td>
//                                             <td>
//                                                 {!approvalStatus[l.tenDeTai] && (
//                                                     <button className='btn btn-warning' style={{ width: '80px' }}>Hủy</button>
//                                                 )}
//                                             </td>
//                                             {/* <input type='text' name='ghiChu' onChange={handleChangeGhiChu} value={ghiChu} /> */}
//                                         </tr>
//                                     );
//                                 })
//                             }
//                         </tbody>
//                     </table>
//                 </div>
//             </TitleCard>
//         </div>
//     );
// };

// export default DanhSachNhom;
import React, { useEffect, useState } from 'react';
import TitleCard from "../components/Cards/TitleCard";
import groupAPI from '../route/group';
import giangVienAPI from '../route/giangVienAPI';

const DanhSachNhom = () => {
    const [dsNhom, setDSNhom] = useState([]);
    const maUser = JSON.parse(localStorage.getItem("maUser"));
    const [chuyenMon, setChuyenMon] = useState("");
    const [approvalStatus, setApprovalStatus] = useState({});
    const [ghiChu, setGhiChu] = useState('');
    const [hiddenButton, setHiddenButton] = useState(true);

    const handleChangeGhiChu = (event)=>{
        setGhiChu(event.target.value);
    }

    useEffect(() => {
        getChuyenMon();
    }, []);

    useEffect(() => {
        if (chuyenMon !== "") {
            getallGroup();
        }
    }, [chuyenMon]);

    useEffect(() => {
        dsNhom.forEach((nhom) => {
            getTrangThai(nhom.maGV, nhom.tenDeTai,nhom.moTaDeTai);
        });
    }, [dsNhom]);

    const getChuyenMon = async () => {
        try {
            const response = await giangVienAPI.getBoMonbyMaGV(maUser);
            console.log("Bộ môn của giảng viên:", response.data);
            setChuyenMon(response.data);
        } catch (error) {
            console.log("Lỗi khi lấy bộ môn:", error);
        }
    };

    const getallGroup = async () => {
        try {
            const response = await groupAPI.getallGroup(chuyenMon);
            console.log("Danh sách nhóm:", response.data);
            setDSNhom(response.data);
        } catch (error) {
            console.log("Lấy các nhóm theo chuyên môn lỗi:", error);
        }
    };

    const updateTrangThai = async (maGV, tenDeTai) => {
        try {
            const response = await groupAPI.updateTrangThaibyGiangVienDeTai(maGV, tenDeTai);
            console.log("Kết quả cập nhật:", response);
            setApprovalStatus(prevState => ({
                ...prevState,
                [tenDeTai]: true
            }));
        } catch (error) {
            console.log("Cập nhật trạng thái lỗi:", error);
        }
    };

    const getTrangThai = async (maGV, tenDeTai,moTaDeTai) => {
        try {
            const response = await groupAPI.getTrangThaiDangKy(maGV, tenDeTai,moTaDeTai);
            if (response.data === "Đã duyệt") {
                setApprovalStatus(prevState => ({
                    ...prevState,
                    [tenDeTai]: true
                }));
            }
        } catch (error) {
            console.log("Lỗi khi lấy trạng thái:", error);
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
                                <th>Thành viên</th>
                                <th>GVHD</th>
                                <th>Mô tả đề tài</th>
                                <th>Năm Học</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                dsNhom.map((nhom, index) => (
                                    <tr key={index}>
                                        <td>{nhom.tenDeTai}</td>
                                        <td>
                                            {nhom.tenSinhViens && nhom.tenSinhViens.map((ten, idx) => (
                                                <div key={idx}>{ten}</div>
                                            ))}
                                        </td>
                                        <td>{nhom.hoTen}</td>
                                        <td>{nhom.moTaDeTai}</td>
                                        <td>
                                            <b>Học Kỳ:</b> {nhom.tenKy}<br />
                                            <b>Năm Học:</b> {nhom.tenNamHoc}
                                        </td>
                                        <td>
                                            {approvalStatus[nhom.tenDeTai] ? (
                                                <span>Đã duyệt</span>
                                            ) : (
                                                <button className='btn btn-info' style={{ width: '80px' }} onClick={() => updateTrangThai(nhom.maGV, nhom.tenDeTai,nhom.moTaDeTai)}>Duyệt</button>
                                            )}
                                        </td>
                                        <td>
                                            {!approvalStatus[nhom.tenDeTai] && (
                                                <button className='btn btn-warning' style={{ width: '80px' }}>Hủy</button>
                                            )}
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

export default DanhSachNhom;
