import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import giangVienAPI from "../../route/giangVienAPI";
import ErrorText from '../../components/Typography/ErrorText';
import { showNotification } from '../../features/common/headerSlice'
import { useNavigate } from 'react-router-dom';
import BoMonAPI from '../../route/bomonAPI';
import groupAPI from '../../route/group';

function EditDangKy({ tenDeTai, moTaDeTai, closeModal }) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [dsGiangVienGroup,setDSGiangVienGroup] = useState([]);
    const[tenKy,setTenKy] = useState("");
    const[namHoc,setNamHoc]=useState("");
    const [dangKy, setDangKy] = useState({
        tenDeTai:'',
        moTaDeTai:'',
        maGV:''
    });
    const trangThai = "Đang tiến hành";

    useEffect(() => {
        if (!moTaDeTai) {
            console.error("moTaDeTai is undefined");
            return;
        }
        if(!tenDeTai){
            console.error("tenDeTai is undefined");
            return;
        }
        const fetchDangKy = async () => {
            try {
                const response = await groupAPI.getDangKybyTenDeTaiMoTaKyHoc(tenDeTai,moTaDeTai);
                setDangKy(response.data);
            } catch (error) {
                console.log("Lỗi khi lấy dữ liệu đăng ký:", error);
            }
        };
        fetchDangKy();
    }, [tenDeTai,moTaDeTai]);

    const saveEditDangKy = async () => {
        try {
             const response =await groupAPI.updateGiangVienHD(dangKy);
             console.log("update giảng viên hướng dẫn thành công", response);
             dispatch(showNotification({ message: "update giảng viên hướng dẫn thành công!", status: 1 }));
            closeModal();
        } catch (error) {
            console.log("cập nhật giảng viên hướng dẫn lỗi",error);
        }
    };

    const handleChange = (e) => {
        console.log("targe",e.target.value)
        const { name, value } = e.target;
        setDangKy({
            ...dangKy,
            [name]: value
        });
    };


    const getDSGiangVien = async ()=>{
        try {
            const response = await groupAPI.getGiangVienGroup();
            console.log("danh sách giảng viên :",response.data);
            setDSGiangVienGroup(response.data)
        } catch (error) {
            console.log("lỗi khi lấy danh sách giảng viên chưa  có nhóm!!",error);
        }
    }
    const getTenKy = async()=>{
        try {
            const response= await groupAPI.getTenKy(trangThai);
            console.log("danh sách kỳ học",response.data)
            setTenKy(response.data);
        } catch (error) {
            console.log("lỗi khi lấy danh sách kỳ học!!",error);
            
        }
    }
    const getNamHoc = async()=>{
        try {
            const response= await groupAPI.getNamHoc(trangThai);
            console.log("danh sách nam học",response.data)
            setNamHoc(response.data);
        } catch (error) {
            console.log("lỗi khi lấy danh sách kỳ học!!",error);
            
        }
    }
    useEffect(()=>{
        getDSGiangVien();
        getTenKy();
        getNamHoc();
    },[]);

    return (
        <>
            <label className="label">
                <span className={"label-text text-base-content " }>Tên đề tài:</span>
            </label>
            <input disabled='true' className="input  input-bordered w-full " type="text" name='tenDetai' value={dangKy.tenDeTai} onChange={handleChange} containerStyle="mt-4" labelTitle="tên đề tài"/>
          

            <label className="label">
                <span className={"label-text text-base-content " }>Mô tả đề tài:</span>
            </label>
            <input disabled='true' className="input  input-bordered w-full " type="text" name='motaDetai' value={dangKy.moTaDeTai} onChange={handleChange} containerStyle="mt-4" labelTitle="mô tả đề tài"/>
            
            <div className="mt-4">
                <label className="label">
                    <span className={"label-text text-base-content " }>Giảng viên hướng dẫn:</span>
                </label>
                <select id="giangvien" name="maGV" className='form-control' value={dangKy.maGV} onChange={handleChange} >
                                <option value="">none</option>
                            {dsGiangVienGroup.map(item => (
                                <option key={item.maGV} value={item.maGV}>{item.hoTen}</option>
                            ))}
                        </select>
            </div>

            
            <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>

            <div className="modal-action">
                <button className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
                <button className="btn btn-info px-6" onClick={() => saveEditDangKy()}>Save</button>
            </div>
        </>
    );
}

export default EditDangKy;
