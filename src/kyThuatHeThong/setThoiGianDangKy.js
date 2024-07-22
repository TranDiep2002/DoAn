import React from 'react'
import { useState } from 'react';
import TitleCard from '../components/Cards/TitleCard';
import ThongBaoAPI from '../route/thongBaoAPI';

const SetThongBao = () => {
    const [dateTime, setDateTime] = useState('');
    const [noiDung,setNoiDung] = useState("");
    const [ ngayBatDau,setNgayBatDau]= useState("");
    const [thoiGianBatDau,setThoiGianBatDau] = useState("");
    const [ngayKetThuc,setNgayKetThuc] = useState("");
    const [thoiGianKetThuc,setThoiGianKetThuc]=useState("");
    const [click,setClick] = useState(false);

    const handelSetNoiDung= (event)=>{
        setNoiDung(event.target.value)
    }
    const handelChangeNgayBatDau= (event)=>{
        setNgayBatDau(event.target.value)
    }

    const handelChangeThoiGianBatDau= (event)=>{
        setThoiGianBatDau(event.target.value)
    }

    const handelChangeNgayKetThuc= (event)=>{
        setNgayKetThuc(event.target.value)
    }

    const handelChangeThoiGianKetThuc= (event)=>{
        setThoiGianKetThuc(event.target.value)
    }

    const handleChange = (event) => {
      setDateTime(event.target.value);
    };
  
    const body={
        ngayBatDau: `${ngayBatDau} ${thoiGianBatDau}:00`,
        ngayKetThuc: `${ngayKetThuc} ${thoiGianKetThuc}:00`,
        noiDungThongBao: noiDung
    }

    const ThemThongBao = async()=>{
        try {
            console.log("Thông báo gửi đi:",body)
            const response = await ThongBaoAPI.ThemThongBao(body);
            console.log("Kết quả thêm thông báo:",response.data)
            setClick(true)
        } catch (error) {
            console.log("Thêm thông báo lỗi:",error)
        }
    }
  return (
    <div>
        <TitleCard title="Thiết lập thời gian đăng ký" topMargin="mt-2">
        <div className="overflow-x-auto w-full">
            <div>
                <label className="label">
                    <span className={"label-text text-base-content " }>Ngày bắt đầu:</span>
                </label>
                <input className="input  input-bordered w-400 "  type="date" value={ngayBatDau} onChange={handelChangeNgayBatDau} placeholder="yyyy-MM-dd HH:mm:ss" style={{width:'450px'}} />

                <label className="label">
                <span className={"label-text text-base-content " }>Thời gian:</span>
                </label>
                <input className="input  input-bordered w-400 "  type="text" value={thoiGianBatDau} onChange={handelChangeThoiGianBatDau} placeholder="HH:mm:ss" style={{width:'450px'}} />
            </div>

            <div>
                <label className="label">
                    <span className={"label-text text-base-content " }>Ngày két thúc:</span>
                </label>
                <input className="input  input-bordered w-400 "  type="date" value={ngayKetThuc} onChange={handelChangeNgayKetThuc} placeholder="yyyy-MM-dd HH:mm:ss" style={{width:'450px'}} />

                <label className="label">
                <span className={"label-text text-base-content " }>Thời gian:</span>
                </label>
                <input className="input  input-bordered w-400 "  type="text" value={thoiGianKetThuc} onChange={handelChangeThoiGianKetThuc} placeholder="HH:mm:ss" style={{width:'450px'}} />
            </div>
            <label className="block text-sm font-medium text-gray-700" >Nội dung thông báo</label>
                <select 
                id="noiDung" 
                name="noiDung" 
                value={noiDung} 
                onChange={handelSetNoiDung} 
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                style={{width:'450px', border:'1px solid gray'}}
                >
                <option value= "Đăng ký đề tài">Đăng ký đề tài</option>
                <option value="Nộp đề cương">Nộp đề cương</option>
                <option value="Hoàn thiện hồ sơ">Hoàn thiện hồ sơ</option>
                <option value="Đăng ký bảo vệ">Đăng ký bảo vệ</option>
                </select>
                <label className="label">
                <span className={"label-text text-base-content " }>Nội dung khác:</span>
                </label>
                <input className="input  input-bordered w-400 "  type="text" value={dateTime} onChange={handleChange} placeholder="HH:mm:ss" style={{width:'450px'}} />
            

            <button  className="btn btn-info px-6" onClick={() => ThemThongBao()}>ThemThongBao</button>
        
        </div>
        </TitleCard >
    </div>
  )
}

export default SetThongBao