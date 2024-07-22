
import React, { useState, useRef } from 'react';
import sinhvienAPI from '../../route/sinhvienAPI';
import { showNotification } from '../../features/common/headerSlice'
import { useDispatch } from "react-redux";

const AddFileSinhVien = ({closeModal}) => {
  const [file, setFile] = useState(null);
  const inputFileRef = useRef(null);
  const [blob, setBlob] = useState('');
  const[sheetName, setSheetName] = useState('');
  const [isDragEnter, setIsDragEnter] = useState(false);
  const dispatch = useDispatch();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setBlob(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleChangeSheetName = (event) => {
    setSheetName(event.target.value);
  }

  const saveFileSinhVien = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await sinhvienAPI.uploadFileSinhVien(formData, sheetName);
      console.log("Kết quả upload file sinh viên:", response.data);
      dispatch(showNotification({ message: "update giảng viên thành công!", status: 1 }));
      closeModal();
    } catch (error) {
      console.log("Upload file sinh viên lỗi:", error);
    }
  }

  return (
    <>
      <div
        onClick={() => inputFileRef.current && inputFileRef.current.click()}
        className={`relative p-6 cursor-pointer mx-auto mt-10 border-2 border-dashed border-blue-600 flex flex-col items-center text-base leading-[1.6] select-none`}
      >
        <input
          ref={inputFileRef}
          type="file"
          onChange={handleFileChange}
          hidden
        />
        <p className="text-center my-3 pointer-events-none">
          Thêm file danh sách sinh viên
        </p>
        <p className="text-center text-[#F05123] pointer-events-none">
          Kéo thả file vào đây, hoặc bấm để chọn file
        </p>
        {file && <p className="text-center mt-3">Đã chọn: {file.name}</p>}
       {/* {blob && <img src={blob} alt="Selected file preview" className="mt-3" />} */}
      </div>
      <p className="text-center text-[#F05123] pointer-events-none">
        Tên sheet trong file:
      </p>
      <input className="input input-bordered w-full" name='sheetName' value={sheetName} onChange={handleChangeSheetName} />
      <div className="modal-action">
        <button className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
        <button className="btn btn-info px-6" onClick={() => saveFileSinhVien()}>Save</button>
      </div>
    </>
  );
};

export default AddFileSinhVien;
