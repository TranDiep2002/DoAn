import { useState } from "react"
import { useDispatch } from "react-redux"
import ErrorText from '../../components/Typography/ErrorText'
import { showNotification } from '../../features/common/headerSlice'
import { addNewLead } from "../leadSlice"
import BoMonAPI from "../../route/bomonAPI"
import ChuyenMonAPI from "../../route/chuyenmonAPI"

function AddNewChuyenMon({closeModal}){
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [tenChuyenMon,setTenChuyenMon] = useState("");
    const chuyenMon = {
        tenChuyenMon:tenChuyenMon
        
      };
   const handelChangeTenBoMon = (event)=>{
    setTenChuyenMon(event.target.value)
   }
    
    
    const validateForm = () => {
        if (!tenChuyenMon  ) {
            setErrorMessage("Vui lòng điền đầy đủ các trường.");
            return false;
        }
        return true;
    };
    const saveNewChuyenMon = async () => {
        if (!validateForm()) {
            return;
        }
      try {
        const response = await ChuyenMonAPI.insertChuyenMon(chuyenMon);
        console.log("Thêm chuyên môn có dữ liệu là:", chuyenMon);
        console.log("kết quả thêm chuyên môn:",response)
        dispatch(addNewLead({ chuyenMon })); // Dispatch hành động thêm mới lead
        dispatch(showNotification({ message: "Thêm chuyên môn thành công!", status: 1 }));
        closeModal();
      } catch (error) {
        console.log("Lỗi thêm chuyên môn:", error);
        setErrorMessage("Có lỗi xảy ra khi thêm chuyên môn.");
      }
        }

    return(
        <>
             <label className="label">
                <span className={"label-text text-base-content " }>Tên Chuyên Môn:</span>
            </label>
            <input className="input  input-bordered w-full " type="text" value={tenChuyenMon} onChange={handelChangeTenBoMon} containerStyle="mt-4" labelTitle="tên chuyên môn"/>
            
            <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
            <div className="modal-action">
                <button  className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
                <button  className="btn btn-info px-6" onClick={() => saveNewChuyenMon()}>Save</button>
            </div>
        </>
    )
}

export default AddNewChuyenMon