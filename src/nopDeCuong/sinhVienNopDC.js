import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './drop-file-input.css';
import { ImageConfig } from '../config/ImageConfig';
import uploadImg from '../assets/cloud-upload-regular-240.png';
import TitleCard from '../components/Cards/TitleCard';
import DeCuongAPI from '../route/decuong';
import TrashIcon from '@heroicons/react/24/outline/TrashIcon';
import '../dangkynhom/dangkynhom.css';
import { useDispatch } from "react-redux";
import { showNotification } from '../features/common/headerSlice';
import ErrorText from '../components/Typography/ErrorText'





const DropFileInput = props => {
    const wrapperRef = useRef(null);
    const dispatch = useDispatch();
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("");
    const [downloadUrl, setDownloadUrl] = useState("");
    const [trangThaiBaiNop,setTrangThaiBaiNop]=useState("")// để cập nhật trạng thái đã nộp bài hay chưa
    const [trangThaiFileBaiNop,setTrangThaiFileBaiNop] = useState(false) // để ẩn icon word chỗ file bài nộp
    const [trangThaiNopBai,setTrangthaiNopbai] = useState(false) // ẩn chỗ nộp bài
    const [errorMessage, setErrorMessage] = useState("")
    const[disableNopBai,setDisableNopBai]= useState(false);// những sinh viên chưa có nhóm thì không thể nộp bài

    const [hanChot,setHanChot] = useState("");
    const [thoiGianConLai,setThoiGianConLai] = useState("");
    const maUser = JSON.parse(localStorage.getItem("maUser"));

    const onDragEnter = () => wrapperRef.current.classList.add('dragover');
    const onDragLeave = () => wrapperRef.current.classList.remove('dragover');
    const onDrop = () => wrapperRef.current.classList.remove('dragover');

    const onFileDrop = (e) => {
        const newFile = e.target.files[0];
        if (newFile) {
            setFile(newFile);
            props.onFileChange(newFile);
        }
    };

    // lấy ra hạn chót nộp đề cương
    const getHanChot = async()=>{
        try {
            const response = await DeCuongAPI.getHanChot();
            setHanChot(response.data)
        } catch (error) {
            console.log("Lấy hạn chót lỗi",error)
        }
    }

    // lấy thời gian còn lại
    const getTGConLai = async()=>{
    try {
        const response = await DeCuongAPI.getNgayConLai();
        setThoiGianConLai(response.data)
    } catch (error) {
        console.log("Lấy thời gian còn lại lỗi:",error)
    }
    }

    const fileRemove = () => {
        setFile(null);
        props.onFileChange(null);
    };

    const getFileName = async () => {
        try {
            const response = await DeCuongAPI.getFileName(maUser);
            console.log("Kết quả lấy tên file:",fileName)
            if(response.data===""){
                setTrangthaiNopbai(true)
                setTrangThaiBaiNop("Chưa có bài nộp")
                setFileName("Chưa có bài nộp nào");
                setTrangThaiFileBaiNop(false)
            }
            else if(response.data==="Sinh vien chua co nhom"){
                setDisableNopBai(true)
                setTrangthaiNopbai(true)
                setTrangThaiBaiNop("Chưa có bài nộp")
                setFileName("Chưa có bài nộp nào");
                setTrangThaiFileBaiNop(false)
            }
            else{
            setTrangThaiBaiNop("Nộp bài để chấm điểm")
            setFileName(response.data);
            setTrangthaiNopbai(false);
            setTrangThaiFileBaiNop(true);
            downloadFileSV()
            }
        } catch (error) {
            console.log("Lỗi lấy tên file:", error);
        }
    };

    const downloadFileSV = async () => {
        try {
            const response = await DeCuongAPI.downloadFile(maUser);
            console.log("response downloadfile", response.data)
            if (response.status !== 200) {
                console.log("Lỗi tải xuống tệp:", response.statusText);
                return;
            }
            if(response.data==="Sinh vien chua nop bai"){
                setTrangThaiBaiNop("Chưa nộp bài")
            }
            else{
            const url = window.URL.createObjectURL(new Blob([response.data]));
            setDownloadUrl(url);
            setTrangThaiBaiNop("Nộp bài để chấm điểm")
            }
        } catch (error) {
            console.log("Lỗi tải xuống tệp:", error);
        }
    };
    const SinhVienNopbai = async()=>{
        if(file===null){
            setErrorMessage("Không có file nào để nộp, vui lòng thêm file bài tập.");
            return false;
        }
        try {
            const formData = new FormData();
            formData.append('file',file);
            const response = await DeCuongAPI.uploadFile(formData,maUser)
            getFileName();
            dispatch(showNotification({ message: "Nộp bài thành công!", status: 1 }));
            console.log("Kết quả nộp bài:",response.data)
        } catch (error) {
            console.log("Nộp bài lỗi");
        }
    }


    const DeleteDeCUong= async ()=>{
        try {
            const response = await DeCuongAPI.XoaDeCuong(maUser);
            dispatch(showNotification({ message: response.data, status: 1 }));
            getFileName();
        } catch (error) {
            console.log("Xóa file lỗi",error)
        }

    }


    useEffect(() => {
        getHanChot();
        getTGConLai();
        getFileName();
        downloadFileSV();
    },[]);
    

    useEffect(() => {
        console.log("downloadUrl:", downloadUrl);
    }, [downloadUrl]);

    return (
        <div style={{ width: '1000px' }}>
            <TitleCard title="Đề cương đồ án" topMargin="mt-2">
                <div className="overflow-x-auto w-full">
                    <h4><b>Quy định bài nộp: sinh viên đặt tên file theo mã sinh viên.</b></h4>
                    <h4 style={{color:'red'}}><b>VD: mã sinh viên: 20A10010355 , tên file: 20A10010355.docx</b></h4>
                    <h4 style={{color:'blue', marginTop:'10px', marginBottom:'10px'}}>" Lưu ý: Khi sinh viên muốn xóa bài làm hiện tại và nộp bài mới, chỉ cần click chọn biểu tượng thùng rác"</h4>
                    <table className="table w-full">
                        <tbody>
                            <tr style={{ width: '200px', height: '50px', backgroundColor: '#EEEEEE' }}>
                                <td><b>Trạng Thái Bài Nộp</b></td>
                                <td style={{ backgroundColor: '#CCFFCC' }}>{trangThaiBaiNop}</td>
                            </tr>
                            <tr style={{ width: '200px', height: '50px', backgroundColor: '#FFFFFF' }}>
                                <td><b>Trạng Thái Chấm Điểm</b></td>
                                <td>Chưa phân loại</td>
                            </tr>
                            <tr style={{ width: '200px', height: '50px', backgroundColor: '#EEEEEE' }}>
                                <td><b>Hạn chót</b></td>
                                <td>{hanChot}</td>
                            </tr>
                            <tr style={{ width: '200px', height: '50px', backgroundColor: '#FFFFFF' }}>
                                <td><b>Thời gian còn lại</b></td>
                                <td style={{ backgroundColor: '#CCFFCC' }}>{thoiGianConLai}</td>
                            </tr>
                            <tr style={{ width: '200px', height: '50px', backgroundColor: '#EEEEEE' }}>
                                <td><b>Sửa đổi lần cuối</b></td>
                                <td>.................</td>
                            </tr>
                            <tr style={{ width: '200px', height: '50px', backgroundColor: '#FFFFFF' }}>
                                <td><b>File bài tập nộp</b></td>
                                <td style={{display:'flex'}}>
                                <a href={downloadUrl} download={fileName} style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', background: '#f0f0f0', padding: '5px', textDecoration: 'none', color: '#000', gap: '5px', width:'250px' }}>
                                    {trangThaiFileBaiNop && (<img src='https://lms.hou.edu.vn/theme/image.php/fordson/core/1675396394/f/document' style={{ width: '20px' }} alt='' />)}
                                    <span>{fileName}</span>
                                </a>
                                {trangThaiFileBaiNop && 
                                    <button className="btn btn-square btn-ghost" onClick={() => DeleteDeCUong()}>
                                        <TrashIcon className="w-5" />
                                    </button>
                                }
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                { trangThaiNopBai && (<div className="overflow-x-auto w-full">
                    <div
                        ref={wrapperRef}
                        className="drop-file-input"
                        onDragEnter={onDragEnter}
                        onDragLeave={onDragLeave}
                        onDrop={onDrop}
                        style={{marginLeft:'250px',marginTop:'50px'}}
                    >
                        <div className="drop-file-input__label" >
                            <img src={uploadImg} alt="" style={{marginLeft:'15px'}} />
                            <p>Tải file tại đây</p>
                        </div>
                        <input type="file" value="" onChange={onFileDrop} />
                    </div>
                    {
                        file ? (
                            <div className="drop-file-preview">
                                <p className="drop-file-preview__title">
                                    Sẵn sàng nộp bài
                                </p>
                                <div className="drop-file-preview__item" >
                                    <img src={ImageConfig[file.type.split('/')[1]] || ImageConfig['docx']} alt="" />
                                    <div className="drop-file-preview__item__info">
                                        <p>{file.name}</p>
                                        <p>{file.size}B</p>
                                    </div>
                                    <button className="remove-button" onClick={() => fileRemove()} style={{marginLeft:'100px'}}>
                                        <TrashIcon className="w-5" />
                                    </button>
                                </div>
                            </div>
                        ) : null
                    }
                    {/* <h4 style={{color:'red',marginLeft:'270px',marginTop:'20px'}}>{errorMessage}</h4> */}
                    <ErrorText styleClass="mt-16" style={{marginLeft:'270px',marginTop:'20px'}}>{errorMessage}</ErrorText>
                    <div style={{marginLeft:'400px',marginTop:'30px'}}>
                    <button className="btn btn-info px-6" onClick={() => SinhVienNopbai()} disabled={disableNopBai}>Nộp Bài</button>
                    </div>
                    
                </div>)}
            </TitleCard>
        </div>
    );
}

DropFileInput.propTypes = {
    onFileChange: PropTypes.func
}

export default DropFileInput;


