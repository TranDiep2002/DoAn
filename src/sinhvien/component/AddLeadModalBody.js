import { useState } from "react"
import { useDispatch } from "react-redux"
import InputText from '../../components/Input/InputText'
import ErrorText from '../../components/Typography/ErrorText'
import { showNotification } from '../../features/common/headerSlice'
import sinhvienAPI from "../../route/sinhvienAPI"
import { addNewLead } from "../leadSlice"
function AddLeadModalBody({closeModal}){
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const[maUser,setMaUser] = useState("");
    const[fullName,setFullName] = useState("");
    const[ngaySinh,setNgaySinh] = useState("");
    const[gioiTinh,setGioiTinh]= useState("");
    const[passWord,setPassWord] = useState("");
    const[email,setEmail]= useState("");
    const[chuyenNganh,setChuyenNganh]=useState("");
   
    const setdulieuMaUser=(event)=>{
        setMaUser(event.target.value);
    }
    const setdulieuFullName=(event)=>{
        setFullName(event.target.value);
        console.log(event)
    }
    const setdulieuNgaySinh=(event)=>{
        setNgaySinh(event.target.value);
    }
    const setdulieuGioiTinh=(event)=>{
        setGioiTinh(event.target.value);
    }
    const setdulieuEmail=(event)=>{
        setEmail(event.target.value);
    }
    const setdulieuPassWord=(event)=>{
        setPassWord(event.target.value);
    }
    const setdulieuChuyenNganh=(event)=>{
        setChuyenNganh(event.target.value)
    }

    const saveNewLead = async () => {
    const newLeadObj = {
        maUser:maUser,
        fullName:fullName,
        ngaySinh:ngaySinh,
        gioiTinh:gioiTinh,
        passWord:passWord,
        email:email,
        chuyenNganh:chuyenNganh
      };
      console.log(newLeadObj)
      try {
        const response = await sinhvienAPI.postSinhVien(newLeadObj);
        console.log("Thêm sinh viên có dữ liệu là:", newLeadObj);
        console.log("kết quả thêm sinh viên:",response)
        dispatch(addNewLead({ newLeadObj })); // Dispatch hành động thêm mới lead
        dispatch(showNotification({ message: "New Lead Added!", status: 1 }));
        closeModal();
      } catch (error) {
        console.log("Lỗi thêm sinh viên:", error);
        setErrorMessage("Có lỗi xảy ra khi thêm sinh viên.");
      }
        }

    return(
        <>
             <label className="label">
                <span className={"label-text text-base-content " }>Mã sinh viên:</span>
            </label>
            <input className="input  input-bordered w-full " type="text" value={maUser} onChange={setdulieuMaUser} containerStyle="mt-4" labelTitle="Mã sinh viên"/>
            <label className="label">
                <span className={"label-text text-base-content " }>Mã sinh viên:</span>
            </label>
            <input className="input  input-bordered w-full " type="text" value={fullName} onChange={setdulieuFullName} containerStyle="mt-4" labelTitle="Họ tên sinh viên"/>
            <label className="label">
                <span className={"label-text text-base-content " }>Mã sinh viên:</span>
            </label>
            <input className="input  input-bordered w-full " type="text" value={ngaySinh} onChange={setdulieuNgaySinh} containerStyle="mt-4" labelTitle="Ngày sinh"/>
            <label className="label">
                <span className={"label-text text-base-content " }>Mã sinh viên:</span>
            </label>
            <input className="input  input-bordered w-full " type="text" value={gioiTinh} onChange={setdulieuGioiTinh} containerStyle="mt-4" labelTitle="Giới tính"/>
            <label className="label">
                <span className={"label-text text-base-content " }>Mã sinh viên:</span>
            </label>
            <input className="input  input-bordered w-full " type="text" value={passWord} onChange={setdulieuPassWord} containerStyle="mt-4" labelTitle="Mật khẩu"/>
            <label className="label">
                <span className={"label-text text-base-content " }>Mã sinh viên:</span>
            </label>
            <input className="input  input-bordered w-full " value={email} onChange={setdulieuEmail} containerStyle="mt-4" labelTitle="email"/>
            <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Chuyên ngành</label>
                <select 
                id="chuyenNganh" 
                name="chuyenNganh" 
                value={chuyenNganh} 
                onChange={setdulieuChuyenNganh} 
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                <option value="CNPM">CNPM</option>
                <option value="CNĐPT">CNĐPT</option>
                <option value="Mạng máy tính">Mạng máy tính</option>
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

export default AddLeadModalBody