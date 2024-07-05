import React, { useEffect, useState } from 'react'
import TitleCard from "../components/Cards/TitleCard";
import groupAPI from '../route/group';
import giangVienAPI from '../route/giangVienAPI';


const DanhSachNhom = () => {
    const [dsNhom,setDSNhom] = useState([]);
    const maUser = JSON.parse(localStorage.getItem("maUser"));
    const [chuyenMon,setChuyenMon] = useState("");
    useEffect(()=>{
        console.log(chuyenMon)
        getChuyenMon();
        getallGroup();
    },[chuyenMon])
  
    const getChuyenMon = async()=>{
        try {
            const response = await giangVienAPI.getBoMonbyMaGV(maUser);
            console.log("bộ môn của giảng viên :", response.data);
            setChuyenMon(response.data);
        } catch (error) {
            console.log("Lỗi khi lấy bộ môn");
        }
    }

    const getallGroup = async()=>{
        try {
            const response = await groupAPI.getallGroup(chuyenMon);
            console.log("danh sách nhóm:",response.data);
            setDSNhom(response.data);
        } catch (error) {
            console.log("Lấy các nhóm theo chuyên môn lỗi:",error);
        }
    }
    
  return (
    <div style={{ width: '1000px' }}>
    <TitleCard title="Danh sách nhóm " topMargin="mt-2" >
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
                                dsNhom.map((l, k) => {
                                    return (
                                        <tr key={l.id}>
                                          
                                            <td>{l.tenDeTai}</td>
                                           <td>
                                            {l.tenSinhViens && l.tenSinhViens.map((ten, index) => (
                                        <div key={index}>{ten}</div>
                                    ))}
                                            </td>
                                            <td>{l.hoTen}</td>
                                            <td>{l.moTaDeTai}</td>
                                            <td><b> Học Kỳ : </b>{l.tenKy}<br></br>
                                            <b>Năm Học : </b>{l.tenNamHoc}</td>
                                            <td><button className='btn btn-info' style={{width:'80px'}}> Duyệt</button></td>
                                            <td><button className='btn btn-warning' style={{width:'80px'}}>Hủy</button></td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
        </div>
    </TitleCard>
</div>
  )
}

export default DanhSachNhom