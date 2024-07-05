import React, { useEffect, useState } from 'react';
import groupAPI from '../route/group';
import TitleCard from '../components/Cards/TitleCard';
import authAPI from '../route/authAPI';
import { useDispatch } from 'react-redux';
import { showNotification } from '../features/common/headerSlice'

const SetNamHocHocKy = ({ onSelect }) => {
    const [tenKy, setTenKy] = useState('Kỳ 1');
    const [namHoc, setNamHoc] = useState('');
    const [KyHienTai,setKyHienTai]= useState('');
    const dispatch = useDispatch();
    const body ={
        tenKy: tenKy,
        namHoc:namHoc
    }
    const handleSelectChange = (event) => {
        const { name, value } = event.target;
        if (name === 'tenKy') {
            setTenKy(value);
        } else if (name === 'namHoc') {
            setNamHoc(value);
        }
    };


    const handleSave = async () => {
      try {
        const response = await authAPI.ThemKyHoc(body);
        console.log("Kết quả set năm học hệ thống:", response);
        dispatch(showNotification({ message: "Thiết lập năm học cho hệ thống thành công!", status: 1 }));
        handelGetNamHocKyHocHienTai();
      } catch (error) {
        console.log("Thiết lập năm học hệ thống lỗi", error);
      } 
    };
    const handelGetNamHocKyHocHienTai = async()=>{
        try {
            const response = await authAPI.getNamHocKyHocHienTai();
            console.log("Kỳ hiện tại:", response.data)
            setKyHienTai(response.data);
        } catch (error) {
            console.log("Lấy kỳ hiện tại lỗi:", error);
        }
    }
useEffect(()=>{
    console.log("Lấy gì hiện tại!!!")
    console.log("chạy tới hàm này:",handelGetNamHocKyHocHienTai());
},[])
    return (
        <div style={{ width: '1000px' }}>
            <TitleCard title="Thiết Lập Năm Học Cho Hệ Thống" topMargin="mt-2">
                <div className="overflow-x-auto w-full">
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
                        <label className="label">
                            <span className="label-text text-base-content">Chọn Kỳ học:</span>
                        </label>
                        
                        <select 
                        id="tenKy" 
                        name="tenKy" 
                        value={tenKy} 
                        onChange={handleSelectChange} 
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        >
                        <option value= "Kỳ 1">Kỳ 1</option>
                        <option value="Kỳ 2">Kỳ 2</option>
                        <option value="Kỳ 3">Kỳ 3</option>
                        </select>
                        <label className="label">
                            <span className={"label-text text-base-content " }>Năm Học:</span>
                        </label>
                        <input className="input  input-bordered w-full " type="text" name='namHoc' value={namHoc} onChange={handleSelectChange} containerStyle="mt-4" labelTitle="Năm Học"/>
                        
                    </div>
                    <button className='btn btn-info' onClick={handleSave}> Lưu </button>
                    <div>
                        <h4>Năm Học Hiện Tại:  <b>{KyHienTai.tenKy}</b></h4>
                        <h4>Kỳ Học Hiện Tại:   <b>{KyHienTai.namHoc}</b></h4>
                    </div>
                </div>
            </TitleCard>
        </div>
    );
}

export default SetNamHocHocKy;
