import { useState } from "react"
import { useDispatch } from "react-redux"
import InputText from '../../components/Input/InputText'
import ErrorText from '../../components/Typography/ErrorText'
import { showNotification } from '../../features/common/headerSlice'
import giangVienAPI from "../../route/giangVienAPI"
import { addNewLead } from "../leadSlice"
import { useEffect } from "react"
import BoMonAPI from "../../route/bomonAPI"

function AddGiangVienNew({closeModal}){
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const[maGV,setMaUser] = useState("");
    const[hoTen,setFullName] = useState("");
    const[vaiTro,setVaiTro]=useState("Giảng Viên");
    const[email,setEmail]= useState("");
    const[soDT,setSoDT]= useState("");
    const[passWord,setPassWord] = useState("");
    const[boMon, setBoMon]= useState("");
    const[hocVi,setHocVi] = useState("Thạc sĩ");
    const[donViCongTac,setDonViCongTac] = useState("");
    const[gioiTinh,setGioiTinh] = useState("");
    const[dsBoMon,setDSBoMon] = useState([])
    const newLeadObj = {
        maGV:maGV,
        hoTen:hoTen,
        vaiTro:vaiTro,
        email:email,
        soDT:soDT,
        passWord:passWord,
        tenBoMon:boMon,
        gioiTinh:gioiTinh,
        hocVi:hocVi,
        donViCongTac:donViCongTac
      };
   
    const setdulieuMaUser=(event)=>{
        setMaUser(event.target.value);
    }
    const setdulieuGioiTinh = (event)=>{
        setGioiTinh(event.target.value)
    }
    const setdulieuHocVi=(event)=>{
        setHocVi(event.target.value)
    }
    const setdulieuDonViCongTac=(event)=>{
        setDonViCongTac(event.target.value)
    }
    const setdulieuFullName=(event)=>{
        setFullName(event.target.value);
        console.log(event)
    }

    const setdulieuEmail=(event)=>{
        setEmail(event.target.value);
    }
    const setdulieuPassWord=(event)=>{
        setPassWord(event.target.value);
    }
    const setdulieuVaiTro=(event)=>{
        setVaiTro(event.target.value)
        console.log(event.target.value); // Kiểm tra giá trị mới được chọn
    }
     const setdulieuSDT = (event) =>{
        setSoDT(event.target.value);
     }
     const setdulieuBoMon =(event)=>{
        const selectedBoMon =event.target.value;
        if (selectedBoMon === "") {
            // Nếu người dùng không chọn gì, thì mới lấy giá trị mặc định là bộ môn đầu tiên
            setBoMon(dsBoMon.length > 0 ? dsBoMon[0].tenBoMon : "");
        } else {
            setBoMon(selectedBoMon);
        }
     }
    
    
    const validateForm = () => {
        if (!maGV || !hoTen || !email || !soDT  || !boMon ) {
            setErrorMessage("Vui lòng điền đầy đủ các trường.");
            return false;
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
        const response = await giangVienAPI.postGiangVien(newLeadObj);
        console.log("Thêm giảng viên có dữ liệu là:", newLeadObj);
        console.log("kết quả thêm giảng viên:",response)
        dispatch(addNewLead({ newLeadObj })); // Dispatch hành động thêm mới lead
        dispatch(showNotification({ message: "Thêm giảng viên thành công!", status: 1 }));
       // dispatch(getLeadsContent())
        closeModal();
      } catch (error) {
        console.log("Lỗi thêm giảng viên:", error);
        setErrorMessage("Có lỗi xảy ra khi thêm giảng viên.");
      }
        }

    const danhsachBoMon = async()=>{
        try {
            const response = await BoMonAPI.getallBoMon();
            console.log("danh sách bộ môn:", response.data);
            setDSBoMon(response.data);
            
        } catch (error) {
            
        }
    }
    useEffect(()=>{
        danhsachBoMon();
    },[]);

    return(
        <>
             <label className="label">
                <span className={"label-text text-base-content " }>Họ và tên:</span>
            </label>
            <input className="input  input-bordered w-full " type="text" value={hoTen} onChange={setdulieuFullName} containerStyle="mt-4" labelTitle="Mã sinh viên"/>
            
            <div className="flex mt-2">
                <label className="mr-4">
                <input type="radio" value="Nam" checked={gioiTinh === 'Nam'} onChange={setdulieuGioiTinh} /> Nam
                </label>
                <label>
                <input type="radio" value="Nữ" checked={gioiTinh === 'Nữ'} onChange={setdulieuGioiTinh} /> Nữ
                </label>
            </div>
            <label className="label">
                <span className={"label-text text-base-content " }>Mã giảng viên:</span>
            </label>
            <input className="input  input-bordered w-full " type="text" value={maGV} onChange={setdulieuMaUser} containerStyle="mt-4" labelTitle="Họ tên sinh viên"/>

            <div className="mt-4">
                <label className="label">
                    <span className={"label-text text-base-content " }>Học vị:</span>
                </label>
                <select 
                    id="hocVi" 
                    name="hocVi" 
                    value={hocVi} 
                    onChange={setdulieuHocVi} 
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                    <option value= "Thạc sĩ">Thạc Sĩ</option>
                    <option value="Tiến sĩ">Tiến Sĩ</option>
                    <option value="Phó giáo sư">Phó Giáo Sư</option>
                    <option value="Giáo sư">Giáo sư</option>
                    </select>
            </div>

            <label className="label">
                <span className={"label-text text-base-content " }>Đơn vị công tác:</span>
            </label>
            <input type='text' className="input  input-bordered w-full " value={donViCongTac} onChange={setdulieuDonViCongTac} containerStyle="mt-4" labelTitle="Ngày sinh"/>
           
            <label className="label">
                <span className={"label-text text-base-content " }>Email:</span>
            </label>
            <input type='email' className="input  input-bordered w-full " value={email} onChange={setdulieuEmail} containerStyle="mt-4" labelTitle="Ngày sinh"/>
           
            <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Vai trò</label>
                <select 
                id="vaiTro" 
                name="vaiTro" 
                value={vaiTro} 
                onChange={setdulieuVaiTro} 
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                <option value= "Giảng Viên">Giảng Viên</option>
                <option value="Trưởng bộ môn">Trưởng bộ môn</option>
                <option value="Phó trưởng bộ môn">Phó trưởng bộ môn</option>
                </select>
            </div>
            <label className="label">
                <span className={"label-text text-base-content " }>Số điện thoại:</span>
            </label>
            <input className="input  input-bordered w-full " value={soDT} onChange={setdulieuSDT} containerStyle="mt-4" labelTitle="email"/>
            <label className="label">
                <span className={"label-text text-base-content " }>Mật khẩu:</span>
            </label>
            <input className="input  input-bordered w-full " type="text" value={passWord} onChange={setdulieuPassWord} containerStyle="mt-4" labelTitle="Mật khẩu"/>
            
            <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Bộ Môn:</label>
                <select 
                id="tenBoMon" 
                name="tenBoMon" 
                value={boMon} 
                onChange={setdulieuBoMon} 
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                    <option value="">none</option>
                    {dsBoMon.map(item => (
                    <option key={item.tenBoMon} value={item.tenBoMon}>{item.tenBoMon}</option>
                    ))}
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

export default AddGiangVienNew