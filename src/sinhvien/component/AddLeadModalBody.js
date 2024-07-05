import { useState } from "react"
import { useDispatch } from "react-redux"
import InputText from '../../components/Input/InputText'
import ErrorText from '../../components/Typography/ErrorText'
import { showNotification } from '../../features/common/headerSlice'
import sinhvienAPI from "../../route/sinhvienAPI"
import { addNewLead } from "../leadSlice"
import { useEffect } from "react"

function AddLeadModalBody({closeModal,handelGetSinhVien}){
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const[hoTen,setHoTen] = useState("");
    const[maSV,setMaSV] = useState("");
    const[email,setEmail]= useState("");
    const[nganh,setChuyenNganh]=useState("");
    const[passWord,setPassWord] = useState("");
    const[lopHanhChinh,setLopHanhChinh] = useState("");
  const [gioiTinh, setGioiTinh] = useState(''); // Thêm state giới tính
    const newLeadObj = {
        maSV:maSV,
        hoTen:hoTen,
        email:email,
        nganh:nganh,
        passWord:passWord,
        lopHanhChinh:lopHanhChinh,
        gioiTinh:gioiTinh
      };
     
    const handleGioiTinhChange = (event) => {
        setGioiTinh(event.target.value);
    };
    const setdulieuMaSV=(event)=>{
        setMaSV(event.target.value);
    }
    const setdulieuHoTen=(event)=>{
        setHoTen(event.target.value);
    }
    
    const setdulieuEmail=(event)=>{
        setEmail(event.target.value);
    }
    const setdulieuPassWord=(event)=>{
        setPassWord(event.target.value);
    }
    const setDuLieuLopHanhChinh = (event)=>{
        setLopHanhChinh(event.target.value)
    }
    const setdulieuChuyenNganh=(event)=>{
        setChuyenNganh(event.target.value)
        console.log(event.target.value); // Kiểm tra giá trị mới được chọn
        console.log('chuyên ngành:',nganh);
    }
    
    useEffect(() => {
        console.log('chuyenNganh:', nganh);
    }, [nganh]); // Sử dụng chuyenNganh là dependency của useEffect
    
   
    const validateForm = () => {
        if (!hoTen || !maSV || !email || !nganh || !passWord ) {
            setErrorMessage("Vui lòng điền đầy đủ các trường.");
            return false;
        }
        if(!nganh){
            setChuyenNganh("CNPM")
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setErrorMessage("Email không hợp lệ.");
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
        const response = await sinhvienAPI.postSinhVien(newLeadObj);
        console.log("Thêm sinh viên có dữ liệu là:", newLeadObj);
        console.log("kết quả thêm sinh viên:",response)
        dispatch(addNewLead({ newLeadObj })); // Dispatch hành động thêm mới lead
        dispatch(showNotification({ message: "Thêm sinh viên thành công!", status: 1 }));
        closeModal();
        handelGetSinhVien();
      } catch (error) {
        console.log("Lỗi thêm sinh viên:", error);
        setErrorMessage("Có lỗi xảy ra khi thêm sinh viên.");
      }
        }

    return(
        <>
             <label className="label">
                <span className={"label-text text-base-content " }>Họ và tên:</span>
            </label>
            <input className="input  input-bordered w-full " type="text" value={hoTen} onChange={setdulieuHoTen} containerStyle="mt-4" labelTitle="họ tên"/>
            <label className="label">
             <span className="label-text text-base-content">Giới tính:</span>
            </label>
            <div className="flex mt-2">
                <label className="mr-4">
                <input type="radio" value="Nam" checked={gioiTinh === 'Nam'} onChange={handleGioiTinhChange} /> Nam
                </label>
                <label>
                <input type="radio" value="Nữ" checked={gioiTinh === 'Nữ'} onChange={handleGioiTinhChange} /> Nữ
                </label>
            </div>
            <label className="label">
                <span className={"label-text text-base-content " }>Mã sinh viên:</span>
            </label>
            <input className="input  input-bordered w-full " type="text" value={maSV} onChange={setdulieuMaSV} containerStyle="mt-4" labelTitle="mã sinh viên"/>
            
            <label className="label">
                <span className={"label-text text-base-content " }>Mật khẩu:</span>
            </label>
            <input className="input  input-bordered w-full " type="text" value={passWord} onChange={setdulieuPassWord} containerStyle="mt-4" labelTitle="Mật khẩu"/>
            <label className="label">
                <span className={"label-text text-base-content " }>Email:</span>
            </label>
            <input className="input  input-bordered w-full " value={email} onChange={setdulieuEmail} containerStyle="mt-4" labelTitle="email"/>
            <label className="label">
                <span className={"label-text text-base-content " }>Lớp hành chính:</span>
            </label>
            <input className="input  input-bordered w-full " value={lopHanhChinh} onChange={setDuLieuLopHanhChinh} containerStyle="mt-4" labelTitle="Lớp hành chính"/>
            <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Chuyên ngành</label>
                <select 
                id="chuyenNganh" 
                name="chuyenNganh" 
                value={nganh} 
                onChange={setdulieuChuyenNganh} 
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
                <button  className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
                <button  className="btn btn-info px-6" onClick={() => saveNewLead()}>Save</button>
            </div>
        </>
    )
}

export default AddLeadModalBody