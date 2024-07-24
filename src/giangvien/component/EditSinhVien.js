import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import giangVienAPI from "../../route/giangVienAPI";
import ErrorText from '../../components/Typography/ErrorText';
import { showNotification } from '../../features/common/headerSlice'
import { useNavigate } from 'react-router-dom';
import BoMonAPI from '../../route/bomonAPI';

function EditGiangVien({ id, closeModal }) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const[dsBoMon,setDSBoMon] = useState([])
    const [giangvien, setGiangVien] = useState({
        maGV:'',
        hoTen:'',
        vaiTro:'',
        email:'',
        soDT:'',
        tenBoMon:'',
        gioiTinh:'',
        hocVi:'',
        donViCongTac:''
    });

    useEffect(() => {
        if (!id) {
            console.error("id is undefined");
            return;
        }
        const fetchSinhVien = async () => {
            try {
                console.log("id trong hàm fetch",id);
                const response = await giangVienAPI.getGiangVienById(id);
                setGiangVien(response.data);
            } catch (error) {
                console.log("Lỗi khi lấy dữ liệu giảng viên:", error);
            }
        };
        fetchSinhVien();
    }, [id]);

    const saveEditSinhVien = async () => {
        if (!validateForm()) {
            return;
        }
        try {
             const response =await giangVienAPI.updateGiangVien(giangvien);
             console.log("update giảng viên thành công", response);
             dispatch(showNotification({ message: "update giảng viên thành công!", status: 1 }));
            closeModal();
        } catch (error) {
            console.log("cập nhật giảng viên lỗi",error);
        }
    };

    const handleChange = (e) => {
        console.log("targe",e.target.value)
        const { name, value } = e.target;
        setGiangVien({
            ...giangvien,
            [name]: value
        });
    };

    const validateForm = () => {
        if (!giangvien.maGV || !giangvien.hoTen  || !giangvien.email || !giangvien.soDT || !giangvien.tenBoMon ) {
            setErrorMessage("Vui lòng điền đầy đủ các trường.");
            return false;
        }
    
        if (!/\S+@\S+\.\S+/.test(giangvien.email)) {
            setErrorMessage("Email không hợp lệ.");
            return false;
        }
        return true;
    };
    const danhsachBoMon = async()=>{
        try {
            const response = await BoMonAPI.getallBoMon();
            console.log("danh sách bộ môn:", response.data);
            setDSBoMon(response.data);
        } catch (error) {
            
        }
    }
    useEffect(()=>{
        danhsachBoMon();
    },[]);

    return (
        <>
            <label className="label">
                <span className={"label-text text-base-content " }>Họ và tên:</span>
            </label>
            <input className="input  input-bordered w-full " type="text" name='hoTen' value={giangvien.hoTen} onChange={handleChange} containerStyle="mt-4" labelTitle="Mã sinh viên"/>
            
            <div className="flex mt-2">
                <label className="mr-4">
                <input type="radio" value="Nam" name='gioiTinh' checked={giangvien.gioiTinh === 'Nam'} onChange={handleChange} /> Nam
                </label>
                <label>
                <input type="radio" value="Nữ" name='gioiTinh' checked={giangvien.gioiTinh === 'Nữ'} onChange={handleChange} /> Nữ
                </label>
            </div>

            <label className="label">
                <span className={"label-text text-base-content " }>Mã giảng viên:</span>
            </label>
            <input className="input  input-bordered w-full " type="text" name='maGV' value={giangvien.maGV} onChange={handleChange} containerStyle="mt-4" labelTitle="Họ tên sinh viên"/>
            
            <div className="mt-4">
                <label className="label">
                    <span className={"label-text text-base-content " }>Học vị:</span>
                </label>
                <select 
                    id="hocVi" 
                    name="hocVi" 
                    value={giangvien.hocVi} 
                    onChange={handleChange} 
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                    <option value= "Thạc sĩ">Thạc Sĩ</option>
                    <option value="Tiến sĩ">Tiến Sĩ</option>
                    <option value="Phó giáo sư">Phó Giáo Sư</option>
                    <option value="Giáo sư">Giáo sư</option>
                    </select>
            </div>

            <label className="label">
                <span className={"label-text text-base-content " }>Đơn vị công tác:</span>
            </label>
            <input type='text' className="input  input-bordered w-full " name='donViCongTac' value={giangvien.donViCongTac} onChange={handleChange} containerStyle="mt-4" labelTitle="Ngày sinh"/>
           
            
            <label className="label">
                <span className={"label-text text-base-content " }>Email:</span>
            </label>
            <input type='email' className="input  input-bordered w-full "name='email' value={giangvien.email} onChange={handleChange} containerStyle="mt-4" labelTitle="Ngày sinh"/>
            <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Vai trò</label>
                <select 
                id="vaiTro" 
                name="vaiTro" 
                value={giangvien.vaiTro} 
                onChange={handleChange} 
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                <option value= "">none</option>
                <option value="Trưởng bộ môn">Trưởng bộ môn</option>
                <option value="Phó trưởng bộ môn">Phó trưởng bộ môn</option>
                </select>
            </div>
            <label className="label">
                <span className={"label-text text-base-content " }>Số điện thoại:</span>
            </label>
            <input className="input  input-bordered w-full " name='soDT' value={giangvien.soDT} onChange={handleChange} containerStyle="mt-4" labelTitle="email"/>
           
            <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Chuyên ngành</label>
                <select 
                id="tenBoMon" 
                name="tenBoMon" 
                value={giangvien.tenBoMon} 
                onChange={handleChange} 
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                    <option value="">none</option>
                    {dsBoMon.map(item => (
                    <option key={item.tenBoMon} value={item.tenBoMon}>{item.tenBoMon}</option>
                    ))}
                </select>
            </div>
            <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>

            <div className="modal-action">
                <button className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
                <button className="btn btn-info px-6" onClick={() => saveEditSinhVien()}>Save</button>
            </div>
        </>
    );
}

export default EditGiangVien;
