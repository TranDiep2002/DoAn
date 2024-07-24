import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import sinhvienAPI from "../../route/sinhvienAPI";
import ErrorText from '../../components/Typography/ErrorText';
import { showNotification } from '../../features/common/headerSlice'
import { useNavigate } from 'react-router-dom';
import TaiKhoanAPI from '../../route/taiKhoanAPI';

function EditTaiKhoan({ id, closeModal }) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [taiKhoan, setTaiKhoan] = useState({
        maUser: '',
        loaiTaiKhoan: '',
        passWord: ''
    
    });

    useEffect(() => {
        if (!id) {
            console.error("id is undefined");
            return;
        }
        const fetchSinhVien = async () => {
            try {
                const response = await TaiKhoanAPI.getTaiKhoanbyId(id)
                setTaiKhoan(response.data);
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
             await TaiKhoanAPI.updateTaiKhoan(taiKhoan);
             dispatch(showNotification({ message: "update tài khoản thành công!", status: 1 }));
            closeModal();
            const navigate = useNavigate;
            navigate('/app/dstaikhoan')
        } catch (error) {
            
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaiKhoan({
            ...taiKhoan,
            [name]: value
        });
    };

    const validateForm = () => {
        if (!taiKhoan.maUser  || !taiKhoan.passWord || !taiKhoan.loaiTaiKhoan ) {
            setErrorMessage("Vui lòng điền đầy đủ các trường.");
            return false;
        }
        return true;
    };

    return (
        <>
            <label className="label">
                <span className={"label-text text-base-content " }>Mã người dùng:</span>
            </label>
            <input className="input  input-bordered w-full " type="text" name='maUser' value={taiKhoan.maUser} onChange={handleChange} containerStyle="mt-4" labelTitle="mã nguoif dùng"/>
            
            <label className="label">
                <span className={"label-text text-base-content " }>Mật khẩu:</span>
            </label>
            <input className="input  input-bordered w-full " type="text" name='passWord' value={taiKhoan.passWord} onChange={handleChange} containerStyle="mt-4" labelTitle="mật khẩu"/>
            
           
            <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Vai trò:</label>
                <select 
                id="loaiTaiKhoan" 
                name="loaiTaiKhoan" 
                value={taiKhoan.loaiTaiKhoan} 
                onChange={handleChange} 
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                <option value="SINHVIEN">Sinh viên</option>
                <option value="GIANGVIEN">Giảng viên</option>
                <option value="GIAOVU">Giáo vụ</option>
                <option value="HDKHOA">Hội đồng khoa</option>
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

export default EditTaiKhoan;
