import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import ErrorText from '../../components/Typography/ErrorText';
import { showNotification } from '../../features/common/headerSlice'
import DeCuongAPI from '../../route/decuong';

function EditGhiChuDC({ tenDeTai, moTaDeTai, closeModal }) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const[ghiChu,setGhiChu] = useState("");
    
    
    

    const handleChangeGhiChu = (event)=>{
        setGhiChu(event.target.value)
    }

    const saveGhiChu = async()=>{
        try {
            if(ghiChu===""){
                setErrorMessage("Vui lòng nhập đầy đủ thông tin")
                return;
            }
            const response = await DeCuongAPI.themGhiChuDC(tenDeTai,moTaDeTai,ghiChu);
            console.log("Kết quả cập nhật ghi chú:", response.data);
            dispatch(showNotification({ message: "update ghi chú thành công!", status: 1 }));
            closeModal();
        } catch (error) {
            console.log("Cập nhật ghi chú lỗi:",error)
            
        }
    }

    return (
        <>
            <label className="label">
                <span className={"label-text text-base-content " }>Nội dung ghi chú:</span>
            </label>
            <input  className="input  input-bordered w-full " type="text" name='ghichu' value={ghiChu} onChange={handleChangeGhiChu} containerStyle="mt-4" labelTitle="nhập ghi chú"/>
          

            
            <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>

            <div className="modal-action">
                <button className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
                <button className="btn btn-info px-6" onClick={() => saveGhiChu()}>Save</button>
            </div>
        </>
    );
}

export default EditGhiChuDC;
