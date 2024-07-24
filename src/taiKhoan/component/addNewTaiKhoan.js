import { useState } from "react"
import { useDispatch } from "react-redux"
import InputText from '../../components/Input/InputText'
import ErrorText from '../../components/Typography/ErrorText'
import { showNotification } from '../../features/common/headerSlice'
import sinhvienAPI from "../../route/sinhvienAPI"
import { addNewLead } from "../leadSlice"
import { useEffect } from "react"
import TaiKhoanAPI from "../../route/taiKhoanAPI"

function AddNewTaiKhoan({closeModal,handelGetSinhVien}){
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const[maUser,setMaUser] = useState("");
    const[loaiTaiKhoan,setLoaiTaiKhoan]= useState("");
    const[passWord,setPassWord] = useState("");
    const newLeadObj = {
        maUser:maUser,
        loaiTaiKhoan:loaiTaiKhoan,
        passWord:passWord,
      };

    const setdulieuMaUser=(event)=>{
        setMaUser(event.target.value);
    }
    const setdulieuLoaiTaiKhoan=(event)=>{
        setLoaiTaiKhoan(event.target.value);
    }
    

    const setdulieuPassWord=(event)=>{
        setPassWord(event.target.value);
    }


   
    const validateForm = () => {
        if (!maUser || !loaiTaiKhoan || !passWord  ) {
            setErrorMessage("Vui lòng điền đầy đủ các trường.");
            return false;
        }
        return true;
    };
    const saveNewLead = async () => {
        if (!validateForm()) {
            return;
        }
      console.log(newLeadObj)
      try {
        const response = await TaiKhoanAPI.insertTaiKhoan(newLeadObj)
        console.log("Thêm tài khoản có dữ liệu là:", newLeadObj);
        console.log("kết quả thêm tài khoản:",response)
        dispatch(addNewLead({ newLeadObj })); // Dispatch hành động thêm mới lead
        dispatch(showNotification({ message: "Thêm tài khoản thành công!", status: 1 }));
        closeModal();
        handelGetSinhVien();
      } catch (error) {
        console.log("Lỗi thêm tài khoản:", error);
        setErrorMessage("Có lỗi xảy ra khi thêm tài khoản.");
      }
        }

    return(
        <>
            <label className="label">
                <span className={"label-text text-base-content " }>Mã người dùng:</span>
            </label>
            <input className="input  input-bordered w-full " type="text" name='maUser' value={maUser} onChange={setdulieuMaUser} containerStyle="mt-4" labelTitle="mã nguoif dùng"/>
            
            <label className="label">
                <span className={"label-text text-base-content " }>Mật khẩu:</span>
            </label>
            <input className="input  input-bordered w-full " type="text" name='passWord' value={passWord} onChange={setdulieuPassWord} containerStyle="mt-4" labelTitle="mật khẩu"/>
            
           
            <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Vai trò:</label>
                <select 
                id="loaiTaiKhoan" 
                name="loaiTaiKhoan" 
                value={loaiTaiKhoan} 
                onChange={setdulieuLoaiTaiKhoan} 
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
                <button  className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
                <button  className="btn btn-info px-6" onClick={() => saveNewLead()}>Save</button>
            </div>
        </>
    )
}

export default AddNewTaiKhoan