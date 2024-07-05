import React, { useEffect, useState } from 'react';
import TitleCard from "../components/Cards/TitleCard";
import groupAPI from '../route/group';
import ChuyenMonAPI from '../route/chuyenmonAPI';
import { useDispatch } from 'react-redux';
import { showNotification } from '../features/common/headerSlice'

const DangKyNhom = () => {

    const dispatch = useDispatch();
    const [dsSinhVienGroup,setDSSinhVienGroup] = useState([]);
    const [dsGiangVienGroup,setDSGiangVienGroup] = useState([]);

    const [dsChuyenMon, setDSChuyenMon]= useState([])

    const maSV1 = JSON.parse(localStorage.getItem("maUser"));
    const[vaiTroSV1, setVaiTroSV1] = useState('');
    const [maSV2,setMaSinhVien] = useState(''); // sinh viên được thêm vào nhóm
    const[vaiTroSV2,setVaiTroSV2] = useState('');
    const [maGV, setMaGV] = useState('');// mã giảng viên HD
    const [tenDeTai,setTenDeTai] = useState('');
    const [moTa,setMotaDeTai] = useState('');
    const[nganh, setNganh] = useState('');
    const [GroupbyMASV,setGroupbyMASV] = useState([]);
    const [isDisable,setDisable] = useState(false);
    const[tenKy,setTenKy] = useState("");
    const[namHoc,setNamHoc]=useState("");
    const trangThai = "Đang tiến hành";
    
    const handelChangeVaiTroSV1=(event)=>{
        setVaiTroSV1(event.target.value)
    }
    const handelChangemaSV2=(event)=>{
        setMaSinhVien(event.target.value)
    }
    const handelChangeVaiTroSV2=(event)=>{
        setVaiTroSV2(event.target.value)
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
            }
    }

    const group ={
        maSV1:maSV1,
        vaiTroSV1:vaiTroSV1,
        maSV2:maSV2,
        vaiTroSV2:vaiTroSV2,
        maGV:maGV,
        tenDeTai:tenDeTai,
        moTa:moTa,
        nganh:nganh
    }
    
    const getDSSinhVien = async ()=>{
        try {
            const response = await groupAPI.getSinhVienGroup();
            console.log("danh sách sinh viên chua có nhóm:", response.data);
            setDSSinhVienGroup(response.data);
        } catch (error) {
            console.log("lỗi khi lấy danh sách sinh viên chưa  có nhóm!!",error);
        }
    }

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
        KiemTra();
        getDSSinhVien();
        getDSGiangVien();
        getTenKy();
        getNamHoc();
        getChuyenMon();
        console.log("tình trạng nút đăng ký:",isDisable)
    },[])
  

  return (
    <div style={{ width: '1000px' }}>
        <TitleCard title="Đăng ký nhóm " topMargin="mt-2" >
            <div className="overflow-x-auto w-full">
                <h4>Kỳ học : <b>{tenKy}</b></h4>
                <h4>Năm học: <b>{namHoc}</b></h4>
                <label className="label">
                            <span className={"label-text text-base-content "}>Chọn vai trò của bạn trong nhóm:</span>
                        </label>
                        <select id="vaiTroSV1" name="vaiTroSV1" className='form-control' value={vaiTroSV1} onChange={handelChangeVaiTroSV1}>
                            <option>none</option>
                            <option value="Dev">Dev</option>
                            <option value="Ba">Ba</option>
                            <option value="Test">Test</option>
                        </select>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
                    <div>
                        <label className="label">
                            <span className={"label-text text-base-content "}>Chọn sinh viên cùng nhóm:</span>
                        </label>
                        <select id="sinhvien" name="sinhvien" className='form-control' value={maSV2} onChange={handelChangemaSV2}>
                            <option>none</option>
                            {dsSinhVienGroup.map(item => (
                                <option key={item.maSV} value={item.maSV}>{item.maSV}-{item.hoTen}</option>
                            ))}
                        </select>
                        <label className="label">
                            <span className={"label-text text-base-content "}>Chọn vai trò của sinh viên trong nhóm:</span>
                        </label>
                        <select id="vaiTroSV2" name="vaiTroSV2" className='form-control' value={vaiTroSV2} onChange={handelChangeVaiTroSV2}>
                            <option>none</option>
                            <option value="Dev">Dev</option>
                            <option value="Ba">Ba</option>
                            <option value="Test">Test</option>
                        </select>
                    </div>
                    <div>
                        <label className="label">
                            <span className={"label-text text-base-content "}>Chọn giảng viên hướng dẫn:</span>
                        </label>
                        <select id="giangvien" name="giangvien" className='form-control' value={maGV} onChange={handelChangeMaGV}>
                            <option>none</option>
                            {dsGiangVienGroup.map(item => (
                                <option key={item.maGV} value={item.maGV}>{item.hoTen}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="label">
                            <span className={"label-text text-base-content "}>Chọn chuyên ngành:</span>
                        </label>
                        <select id="chuyennganh" name="chuyenNganh" className='form-control' value={nganh} onChange={handelChangeNganh}>
                            <option>none</option>
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
