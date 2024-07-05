import { useState } from "react"
import { useDispatch } from "react-redux"
import InputText from '../../components/Input/InputText'
import ErrorText from '../../components/Typography/ErrorText'
import { showNotification } from '../../features/common/headerSlice'
import giangVienAPI from "../../route/giangVienAPI"
import { addNewLead } from "../leadSlice"
import { useEffect } from "react"
import BoMonAPI from "../../route/bomonAPI"

function AddNewBoMon({closeModal}){
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [tenBoMon,setTenBoMon] = useState("");
    const [moTa,setMoTa] = useState("");
    const boMon = {
        tenBoMon:tenBoMon,
        moTa:moTa
      };
   const handelChangeTenBoMon = (event)=>{
    setTenBoMon(event.target.value)
   }
   const handelChangeMoTa = (event)=>{
    setMoTa(event.target.value);
   }
    
    
    const validateForm = () => {
        if (!tenBoMon || !moTa  ) {
            setErrorMessage("Vui lòng điền đầy đủ các trường.");
            return false;
        }
        return true;
    };
    const saveNewBoMon = async () => {
        if (!validateForm()) {
            return;
        }
      try {
        const response = await BoMonAPI.insertBoMon(boMon);
        console.log("Thêm bộ môn có dữ liệu là:", boMon);
        console.log("kết quả thêm bộ môn:",response)
        dispatch(addNewLead({ boMon })); // Dispatch hành động thêm mới lead
        dispatch(showNotification({ message: "Thêm bộ môn thành công!", status: 1 }));
        closeModal();
      } catch (error) {
        console.log("Lỗi thêm bộ môn:", error);
        setErrorMessage("Có lỗi xảy ra khi thêm bộ môn.");
      }
        }

    return(
        <>
             <label className="label">
                <span className={"label-text text-base-content " }>Tên Bộ Môn:</span>
            </label>
            <input className="input  input-bordered w-full " type="text" value={tenBoMon} onChange={handelChangeTenBoMon} containerStyle="mt-4" labelTitle="Mã sinh viên"/>
            <label className="label">
                <span className={"label-text text-base-content " }>Mô Tả:</span>
            </label>
            <input className="input  input-bordered w-full " type="text" value={moTa} onChange={handelChangeMoTa} containerStyle="mt-4" labelTitle="Họ tên sinh viên"/>
            
            <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
            <div className="modal-action">
                <button  className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
                <button  className="btn btn-info px-6" onClick={() => saveNewBoMon()}>Save</button>
            </div>
        </>
    )
}

export default AddNewBoMon