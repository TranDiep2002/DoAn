import React, { useEffect, useState } from 'react';
import TitleCard from "../components/Cards/TitleCard";
import groupAPI from '../route/group';
import ChuyenMonAPI from '../route/chuyenmonAPI';
import { useDispatch } from 'react-redux';
import { showNotification } from '../features/common/headerSlice'
import ErrorText from '../components/Typography/ErrorText'
import { ListBox } from 'primereact/listbox';
import './dangkynhom.css'
import TrashIcon from '@heroicons/react/24/outline/TrashIcon';
import sinhvienAPI from '../route/giangVienAPI';


const DangKyNhom = () => {

    const dispatch = useDispatch();
    const [dsSinhVienGroup,setDSSinhVienGroup] = useState([]);
    const [dsGiangVienGroup,setDSGiangVienGroup] = useState([]);

    const [dsChuyenMon, setDSChuyenMon]= useState([])

    const maSV1 = JSON.parse(localStorage.getItem("maUser"));
    const[vaiTroSV1, setVaiTroSV1] = useState('Ba');
     const[vaiTroSV2,setVaiTroSV2] = useState('Ba');
     const[vaiTroSV3,setVaiTroSV3] = useState('Ba');
     const[vaiTroSV4,setVaiTroSV4] = useState('Ba');
     const[vaiTroSV5,setVaiTroSV5] = useState('BA');
    const[sinhViens,setDSSVConLai] = useState([]);

    const [maGV, setMaGV] = useState(dsGiangVienGroup[0]);// mã giảng viên HD
    const [tenDeTai,setTenDeTai] = useState('');
    const [moTa,setMotaDeTai] = useState('');
    const[nganh, setNganh] = useState(dsChuyenMon[0]);
    const [GroupbyMASV,setGroupbyMASV] = useState([]);// dùng để ktra sinh viên đó đã có nhóm chưa
    const [isDisable,setDisable] = useState(false);
    const[tenKy,setTenKy] = useState("");
    const[namHoc,setNamHoc]=useState("");
    const [errorMessage, setErrorMessage] = useState("")
    const [tenGV,setTenGV] = useState("");

    const trangThai = "Đang tiến hành";
    
    const handelChangeTenGV= (event)=>{
    setTenGV(event.target.value);
    }
    const handelChangeVaiTroSV1=(event)=>{
        setVaiTroSV1(event.target.value)
    }
    const handelChangDSSVConLai = (event)=>{
        setDSSVConLai(event.target.value);
    }
    // const handelChangemaSV2=(event)=>{
    //     setMaSinhVien(event.target.value)
    // }
    const handelChangeVaiTroSV2=(event)=>{
        setVaiTroSV2(event.target.value)
    }
    // const handelChangeMaSV3=(event)=>{
    //     setMaSV3(event.target.value)
    // }
    const handelChangeVaiTroSV3=(event)=>{
        setVaiTroSV3(event.target.value)
    }
    // const handelChangemaSV4=(event)=>{
    //     setMaSV4(event.target.value)
    // }
    const handelChangeVaiTroSV4=(event)=>{
        setVaiTroSV4(event.target.value)
    }
    // const handelChangemaSV5=(event)=>{
    //     setMaSV5(event.target.value)
    // }
    const handelChangeVaiTroSV5=(event)=>{
        setVaiTroSV5(event.target.value)
    }
    const handelChangeMaGV=(event)=>{
        setMaGV(event.target.value)
    }
    const handelChangetenDeTai=(event)=>{
        setTenDeTai(event.target.value)
    }
    const handelChangemota=(event)=>{
        setMotaDeTai(event.target.value)
    }
    const handelChangeNganh=(event)=>{
        setNganh(event.target.value)
    }
    const KiemTra = async ()=>{
            const response = await groupAPI.getGroupbyMaSinhVien(maSV1);
            console.log("group theo mã sinh viên:",response);
            setGroupbyMASV(response.data);
            
            if(response.data==='Không có nhóm nào với mã sinh viên này'|| response.data===""){
                setDisable(false);
            }
            else{
                setDisable(true)
                setErrorMessage("Bạn đã có nhóm, Vui lòng kiểm tra tại chức năng 'nhóm của bạn'");
            }
    }

    const group ={
        maSV1:maSV1,
        vaiTroSV1:vaiTroSV1,
        sinhViens:sinhViens,
        vaiTroSV2:vaiTroSV2,
        vaiTroSV3:vaiTroSV3,
        vaiTroSV4:vaiTroSV4,
        vaiTroSV5:vaiTroSV5,
        maGV:maGV,
        tenDeTai:tenDeTai,
        moTa:moTa,
        nganh:nganh
    }
    
    const getDSSinhVien = async ()=>{
        try {
            
            const response = await groupAPI.getSinhVienGroup(maSV1);
            console.log("danh sách sinh viên chua có nhóm:", response.data);
            setDSSinhVienGroup(response.data);
        } catch (error) {
            console.log("lỗi khi lấy danh sách sinh viên chưa  có nhóm!!",error);
        }
    }
    //Tạo một mảng mới với tên và mã kết hợp
    const SinhVienWithLabels = dsSinhVienGroup.map(sv => ({
        ...sv,
        label: `${sv.hoTen} - ${sv.maSV}`
    }));

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
    const getChuyenMon = async()=>{
        try {
            const response= await ChuyenMonAPI.getallChuyenMon();
            setDSChuyenMon(response.data)
        } catch (error) {
            console.log("lỗi khi lấy dữ liệu chuyên môn:",error)
        }
    }
    const TimKiemGiangVien = async (tenGV)=>{
        if(tenGV!==null){
        try {
            const response = await sinhvienAPI.getGiangVienbyHoTen(tenGV);
            setDSGiangVienGroup(response);
        } catch (error) {
            console.log("Tìm kiếm giảng viên trong đăng ký nhóm lỗi",error)
        }
    }
    }
    
    const themGroup = async()=>{
        try {
            const response = await groupAPI.postGroup(group);
            dispatch(showNotification({ message: response.data, status: 1 }));
            console.log(response.data);
        } catch (error) {
            console.log("thêm group lỗi",error)
        }
    }
    useEffect(()=>{
        console.log("Mã sinh viên là:",maSV1);
        KiemTra();
        getDSSinhVien();
        getDSGiangVien();
        getTenKy();
        getNamHoc();
        getChuyenMon();
        console.log("danh sách mã sinh viên đã chọn:",sinhViens)
        console.log("tình trạng nút đăng ký:",isDisable)
    },[sinhViens])

    const removeSinhVien = (sv) => {
        setDSSVConLai(sinhViens.filter(item => item.maSV !== sv.maSV));
    };
  

  return (
    <div style={{ width: '1000px' }}>
        <TitleCard title="Đăng ký nhóm " topMargin="mt-2" >
            <div className="overflow-x-auto w-full">
                <h4 styleClass="mt-16" style={{color:'red'}}>{errorMessage}!!!</h4>
                <h4>Kỳ học : <b>{tenKy}</b></h4>
                <h4>Năm học: <b>{namHoc}</b></h4>
                <label className="label">
                            <span className={"label-text text-base-content "}>Chọn vai trò của bạn trong nhóm:</span>
                        </label>
                        <select id="vaiTroSV1" name="vaiTroSV1" className='form-control' value={vaiTroSV1} onChange={handelChangeVaiTroSV1} style={{border: '2px solid #f0f0f0',borderRadius:'20px', padding:'5px',width:'200px'}}>
                            <option value="Dev">Dev</option>
                            <option value="Ba">Ba</option>
                            <option value="Test">Test</option>
                        </select>
                <div >
                    <div>
                        <label className="label">
                            <span className={"label-text text-base-content "}>Chọn sinh viên cùng nhóm:</span>
                        </label>
                        <table className="table w-full">
                            <thead>
                                <th>Danh sách sinh viên chưa có nhóm</th>
                                <th>Danh sách thành viên được chọn</th>
                                <th>Vị trí tương ứng của từng thành viên</th>
                            </thead>
                            <tbody>
                                <td>
                                <div className="custom-listbox">
                                     <ListBox 
                                            multiple 
                                            filter
                                            value={sinhViens} 
                                            onChange={handelChangDSSVConLai} 
                                            options={SinhVienWithLabels} 
                                            optionLabel="label" // Sử dụng trường label để hiển thị tên và mã
                                            className="w-full md:w-14rem" 
                                            listStyle={{ maxHeight: '100px' }}
                                        />
                                        </div>
                                </td>
                                <td>
                                    <div>
                                        {sinhViens && sinhViens.length > 0 ? (
                                                sinhViens.map((sv,index) => (
                                                    <div style={{ display: 'flex', justifyContent: 'space-between',marginBottom:'5px' }}>
                                                    <p key={sv.maSV}>{sv.hoTen}-{sv.maSV}</p><button onClick={() => removeSinhVien(sv)} className='remove-button'>  <TrashIcon className="w-5" /></button>
                                                    </div>
                                                ))
                                            ) : (
                                                <p>Không có sinh viên nào được chọn</p>
                                            )}
                                        </div>
                                </td>
                                <td style={{width:'300px'}}>
                                        {sinhViens[0]?(<select id="vaiTroSV1" name="vaiTroSV1" className='form-control' value={vaiTroSV2} onChange={handelChangeVaiTroSV2} style={{border: '2px solid #f0f0f0',borderRadius:'20px', padding:'5px',width:'200px', marginBottom:'5px'}}>
                                                            <option value="Dev">Dev</option>
                                                            <option value="Ba">Ba</option>
                                                            <option value="Test">Test</option>
                                                         </select>):''}
                                {sinhViens[1]?(<select id="vaiTroSV1" name="vaiTroSV1" className='form-control' value={vaiTroSV3} onChange={handelChangeVaiTroSV3} style={{border: '2px solid #f0f0f0',borderRadius:'20px', padding:'5px',width:'200px', marginBottom:'5px'}}>
                                                    <option value="Dev">Dev</option>
                                                    <option value="Ba">Ba</option>
                                                    <option value="Test">Test</option>
                                                </select>):''}
                                {sinhViens[2]?(<select id="vaiTroSV1" name="vaiTroSV1" className='form-control' value={vaiTroSV4} onChange={handelChangeVaiTroSV4} style={{border: '2px solid #f0f0f0',borderRadius:'20px', padding:'5px',width:'200px', marginBottom:'5px'}}>
                                                    <option value="Dev">Dev</option>
                                                    <option value="Ba">Ba</option>
                                                    <option value="Test">Test</option>
                                                </select>):''}
                                {sinhViens[3]?(<select id="vaiTroSV1" name="vaiTroSV1" className='form-control' value={vaiTroSV5} onChange={handelChangeVaiTroSV5} style={{border: '2px solid #f0f0f0',borderRadius:'20px', padding:'5px',width:'200px', marginBottom:'5px'}}>
                                                    <option value="Dev">Dev</option>
                                                    <option value="Ba">Ba</option>
                                                    <option value="Test">Test</option>
                                                </select>):''}
                                    
                                </td>
                            </tbody>

                        </table>
                    </div>
                    <div>
                        <label className="label">
                            <span className={"label-text text-base-content "}>Chọn giảng viên hướng dẫn:</span>
                        </label>
                    {/* <input className="input input-bordered w-full" id='select-sach' list='dsGiangVienGroup' type="text" name="tendetai" value={tenGV} onChange={handelChangeTenGV} onKeyUp={TimKiemGiangVien(tenGV)} /> */}
                        <select id="giangvien" name="giangvien" className='form-control' value={maGV} onChange={handelChangeMaGV} style={{border: '2px solid #f0f0f0',borderRadius:'20px', padding:'5px',width:'200px'}}>
                            {dsGiangVienGroup.map(item => (
                                <option key={item.maGV} value={item.maGV}>{item.hoTen}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="label">
                            <span className={"label-text text-base-content "}>Chọn chuyên ngành:</span>
                        </label>
                        <select id="chuyennganh" name="chuyenNganh" className='form-control' value={nganh} onChange={handelChangeNganh} style={{border: '2px solid #f0f0f0',borderRadius:'20px', padding:'5px',width:'200px'}}>
                            {dsChuyenMon.map(item => (
                                <option key={item.tenChuyenMon} value={item.tenChuyenMon}>{item.tenChuyenMon}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div>
                    <label className="label">
                        <span className={"label-text text-base-content "}>Tên đề tài:</span>
                    </label>
                    <input className="input input-bordered w-full" type="text" name="tendetai" value={tenDeTai} onChange={handelChangetenDeTai} />
                    <label className="label">
                        <span className={"label-text text-base-content "}>Mô tả đề tài:</span>
                    </label>
                    <input className="input input-bordered w-full" type="text" name="motadetai" value={moTa} onChange={handelChangemota} />
                    <button className="btn px-6 btn-sm normal-case btn-info" onClick={()=>themGroup()} disabled ={isDisable} style={{marginTop:'30px', marginLeft:'430px' }}>Đăng Ký</button>
                    
                </div>
            </div>
        </TitleCard>
    </div>
  )
}

export default DangKyNhom
