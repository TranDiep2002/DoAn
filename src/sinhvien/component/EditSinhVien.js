import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import sinhvienAPI from "../../route/sinhvienAPI";
import ErrorText from '../../components/Typography/ErrorText';
import { showNotification } from '../../features/common/headerSlice'
import { useNavigate } from 'react-router-dom';

function EditSinhVien({ id, closeModal }) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [sinhvien, setSinhVien] = useState({
        hoTen: '',
        maSV: '',
        email: '',
        nganh: '',
        lopHanhChinh:'',
        gioiTinh:'',
    
    });

    useEffect(() => {
        if (!id) {
            console.error("id is undefined");
            return;
        }
        const fetchSinhVien = async () => {
            try {
                const response = await sinhvienAPI.getSinhVienById(id);
                setSinhVien(response.data);
            } catch (error) {
                console.log("Lỗi khi lấy dữ liệu sinh viên:", error);
            }
        };
        fetchSinhVien();
    }, [id]);

    const saveEditSinhVien = async () => {
         if (!validateForm()) {
            return;
        }
        try {
             await sinhvienAPI.updateSinhVien(sinhvien);
             dispatch(showNotification({ message: "update sinh viên thành công!", status: 1 }));
            closeModal();
            const navigate = useNavigate;
            navigate('/app/dssinhvien')
        } catch (error) {
            
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSinhVien({
            ...sinhvien,
            [name]: value
        });
    };

    const validateForm = () => {
        if (!sinhvien.hoTen || !sinhvien.maSV || !sinhvien.gioiTinh||!sinhvien.nganh || !sinhvien.lopHanhChinh || !sinhvien.email ) {
            setErrorMessage("Vui lòng điền đầy đủ các trường.");
            return false;
        }
    
        if (!/\S+@\S+\.\S+/.test(sinhvien.email)) {
            setErrorMessage("Email không hợp lệ.");
            return false;
        }
        return true;
    };

    return (
        <>
            <label className="label">
                <span className={"label-text text-base-content " }>Họ và tên:</span>
            </label>
            <input className="input  input-bordered w-full " type="text" name='hoTen' value={sinhvien.hoTen} onChange={handleChange} containerStyle="mt-4" labelTitle="họ tên"/>
            <label className="label">
             <span className="label-text text-base-content">Giới tính:</span>
            </label>
            <div className="flex mt-2">
                <label className="mr-4">
                <input type="radio" value="Nam" name='gioiTinh' checked={sinhvien.gioiTinh === 'Nam'} onChange={handleChange} /> Nam
                </label>
                <label>
                <input type="radio" value="Nữ" name='gioiTinh' checked={sinhvien.gioiTinh === 'Nữ'} onChange={handleChange} /> Nữ
                </label>
            </div>
            <label className="label">
                <span className={"label-text text-base-content " }>Mã sinh viên:</span>
            </label>
            <input className="input  input-bordered w-full " type="text" name='maSV' value={sinhvien.maSV} onChange={handleChange} containerStyle="mt-4" labelTitle="mã sinh viên"/>
            
            {/* <label className="label">
                <span className={"label-text text-base-content " }>Mật khẩu:</span>
            </label>
            <input className="input  input-bordered w-full " type="text" value={sinhvien.passWord} onChange={handleChange} containerStyle="mt-4" labelTitle="Mật khẩu"/> */}
            <label className="label">
                <span className={"label-text text-base-content " }>Email::</span>
            </label>
            <input className="input  input-bordered w-full " name='email' value={sinhvien.email} onChange={handleChange} containerStyle="mt-4" labelTitle="email"/>
            <label className="label">
                <span className={"label-text text-base-content " }>Lớp hành chính:</span>
            </label>
            <input className="input  input-bordered w-full " name='lopHanhChinh' value={sinhvien.lopHanhChinh} onChange={handleChange} containerStyle="mt-4" labelTitle="email"/>
            <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Chuyên ngành</label>
                <select 
                id="nganh" 
                name="nganh" 
                value={sinhvien.nganh} 
                onChange={handleChange} 
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                <option value= "">none</option>
                <option value="CNPM">CNPM</option>
                <option value="CNĐPT">CNĐPT</option>
                <option value="Mạng máy tính">Mạng máy tính</option>
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

export default EditSinhVien;
