import React, { useEffect, useState } from 'react'
import ErrorText from '../../components/Typography/ErrorText';
import BoMonAPI from '../../route/bomonAPI';
import { useDispatch } from 'react-redux';
import { showNotification } from '../../features/common/headerSlice'
import ChuyenMonAPI from '../../route/chuyenmonAPI';

function EditChuyenMon  ({id,closeModal})  {
    const dispatch = useDispatch();
    const[errorMessage,setErrorMessage] = useState('');
    const [chuyenMon,setChuyenMon] = useState({
        tenChuyenMon:''

    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setChuyenMon({
            ...chuyenMon,
            [name]: value
        });
    };
    const FecthBoMon = async ()=>{
        try {
            console.log("id trong hàm fetch",id)
            const response = await ChuyenMonAPI.getChuyenMonbyID(id);
            console.log("Lấy chuyên môn theo id:", response.data);
            setChuyenMon(response.data);
        } catch (error) {
            console.log("lỗi khi lấy chuyên môn theo id");
        }
    }
    useEffect(()=>{
        console.log("id:",id)
        FecthBoMon();
    },[id])
    const validateForm = () => {
        if (!chuyenMon.tenChuyenMon   ) {
            setErrorMessage("Vui lòng điền đầy đủ các trường.");
            return false;
        }
        return true;
    };
    const saveEditChuyenMon = async ()=>{
        if (!validateForm()) {
            return;
        }
        try {
            const response = await ChuyenMonAPI.updateChuyenMon(chuyenMon);
            console.log("kết quả cập nhật chuyên môn", response.data);
            dispatch(showNotification({ message: "update chuyên môn thành công!", status: 1 }));
            closeModal();
        } catch (error) {
            console.log("Lỗi khi cập nhật chuyên môn",error);
        }
    }
  return (
    <div>
         <label className="label">
                <span className={"label-text text-base-content " }>Tên Chuyên Môn:</span>
            </label>
            <input className="input  input-bordered w-full " name='tenChuyenMon' type="text"  value={chuyenMon.tenChuyenMon} onChange={handleChange} containerStyle="mt-4" labelTitle="tên chuyên môn"/>
           
            <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
            <div className="modal-action">
                <button className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
                <button className="btn btn-info px-6" onClick={() => saveEditChuyenMon()}>Save</button>
            </div>
    </div>
  )
}

export default EditChuyenMon