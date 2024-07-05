import React, { useEffect, useState } from 'react'
import ErrorText from '../../components/Typography/ErrorText';
import BoMonAPI from '../../route/bomonAPI';
import { useDispatch } from 'react-redux';
import { showNotification } from '../../features/common/headerSlice'

function EditBoMon  ({id,closeModal})  {
    const dispatch = useDispatch();
    const[errorMessage,setErrorMessage] = useState('');
    const [boMon,setBoMon] = useState({
        tenBoMon:'',
        moTa:''

    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setBoMon({
            ...boMon,
            [name]: value
        });
    };
    const FecthBoMon = async ()=>{
        try {
            console.log("id trong hàm fetch",id)
            const response = await BoMonAPI.getBoMonbyID(id);
            console.log("Lấy bộ môn theo id:", response.data);
            setBoMon(response.data);
        } catch (error) {
            console.log("lỗi khi lấy bộ môn theo id");
        }
    }
    useEffect(()=>{
        console.log("id:",id)
        FecthBoMon();
    },[id])
    const validateForm = () => {
        if (!boMon.tenBoMon || !boMon.moTa  ) {
            setErrorMessage("Vui lòng điền đầy đủ các trường.");
            return false;
        }
        return true;
    };
    const saveEditBoMon = async ()=>{
        if (!validateForm()) {
            return;
        }
        try {
            const response = await BoMonAPI.updateBoMon(boMon);
            console.log("kết quả cập nhật bộ môn", response.data);
            dispatch(showNotification({ message: "update giảng viên thành công!", status: 1 }));
            closeModal();
        } catch (error) {
            console.log("Lỗi khi cập nhật bộ môn",error);
        }
    }
  return (
    <div>
         <label className="label">
                <span className={"label-text text-base-content " }>Tên Bộ Môn:</span>
            </label>
            <input className="input  input-bordered w-full " type="text" name='tenBoMon' value={boMon.tenBoMon} onChange={handleChange} containerStyle="mt-4" labelTitle="Mã sinh viên"/>
            <label className="label">
                <span className={"label-text text-base-content " }>Mô Tả:</span>
            </label>
            <input className="input  input-bordered w-full " type="text" name='moTa' value={boMon.moTa} onChange={handleChange} containerStyle="mt-4" labelTitle="Họ tên sinh viên"/>
            
            <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
            <div className="modal-action">
                <button className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
                <button className="btn btn-info px-6" onClick={() => saveEditBoMon()}>Save</button>
            </div>
    </div>
  )
}

export default EditBoMon