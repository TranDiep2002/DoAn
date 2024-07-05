import React, { useEffect, useState } from 'react'
import TitleCard from "../components/Cards/TitleCard";
import groupAPI from '../route/group';
import TrashIcon from '@heroicons/react/24/outline/TrashIcon';

const NhomCuaBan = () => {
    const [GroupbyMASV,setGroupbyMASV] = useState([]);
    const maUser1 = JSON.parse(localStorage.getItem("maUser"));
   
    useEffect(()=>{     
        getGroupbyMaSV();  
    },[])

    const getGroupbyMaSV = async()=>{
        try {
            const response = await groupAPI.getGroupbyMaSinhVien(maUser1);
            if(response.data==="Không có nhóm nào với mã sinh viên này"){
                setGroupbyMASV([])
            }
            else
            {
            console.log("group theo mã sinh viên:",response);
            setGroupbyMASV(response.data);
            }
        } catch (error) {
            console.log("Lấy group theo mã sinh viên lỗi:",error);
        }
    }
    
  return (
    <div style={{ width: '1000px' }}>
    <TitleCard title="Nhóm của bạn " topMargin="mt-2" >
        
        <div>
            <h4>Nhóm của bạn:</h4>
            <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Tên đề tài</th>
                                <th>Thành viên</th>
                                <th>GVHD</th>
                                <th>Mô tả đề tài</th>
                                <th>Năm Học</th>
                                <th>Trạng Thái Duyệt</th>

                            </tr>
                        </thead>
                        <tbody>
                        {
                                GroupbyMASV.map((l, k) => {
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
                                            <td>{l.trangThai}</td>
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

export default NhomCuaBan