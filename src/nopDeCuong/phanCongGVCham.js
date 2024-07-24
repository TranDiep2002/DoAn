import React, { useEffect, useState } from 'react';
import DeCuongAPI from '../route/decuong';
import { ListBox } from 'primereact/listbox';
import '../dangkynhom/dangkynhom.css';
import TrashIcon from '@heroicons/react/24/outline/TrashIcon';
import TitleCard from "../components/Cards/TitleCard";

const PhanCongGVChamDC = () => {
    const [dsGV, setDSGV] = useState([]);
    const [dsDeTai, setDSDeTai] = useState([]);
    const [trangThaiGV, setTrangThaiGV] = useState("");
    const [GVCham, setMaGVCham] = useState(null);
    const [dsDeTaiChon, setDSDeTaiChon] = useState([]);

    const body = {
        maGV: GVCham ? GVCham.maGV:"",
        deTaiList: dsDeTaiChon
    };

    const getAllGiangVien = async () => {
        try {
            const response = await DeCuongAPI.getALlGV();
            console.log("Kết quả lấy tất cả giảng viên để chấm ĐC:", response.data);
            setDSGV(response.data);
        } catch (error) {
            console.log("Lấy giảng viên để chấm lỗi:", error);
        }
    };

    const getDSDeTaiChuaPC = async () => {
        try {
            const response = await DeCuongAPI.deTaiChuaCoGVCham();
            console.log("Kết quả lấy đề tài chưa có gv chấm:", response.data);
            setDSDeTai(response.data);
        } catch (error) {
            console.log("Lỗi khi lấy danh sách đề tài chưa được phân công:", error);
        }
    };

    const getTrangThaiGV = async (maGV) => {
        try {
            const response = await DeCuongAPI.getTrangThaiGV(maGV);
            console.log("Kết quả lấy trạng thái:", response.data);
            setTrangThaiGV(response.data);
        } catch (error) {
            console.log("Lấy trạng thái giảng viên lỗi");
        }
    };

    const handelChangeMaGV = (event) => {
        setMaGVCham(event.value); // `event.value` chứa giá trị đã chọn
    };

    const handelChangeDsDeTai = (event) => {
        setDSDeTaiChon(event.value); // `event.value` chứa giá trị đã chọn
    };

    const GiangVienWithLabels = dsGV.map(gv => ({
        ...gv,
        label: `${gv.hoTen} - ${gv.maGV}`
    }));

    const DeTaiWithLabels = dsDeTai.map(deTai=>({
        ...deTai,
         label: `${deTai.tenDeTai} - ${deTai.moTa}`
    }))

    const removeGVCham = () => {
        setMaGVCham("");
    };
    const removeDeTaiChon =(dt)=>{
        setDSDeTaiChon(dsDeTaiChon.filter(item => item.moTa !== dt.moTa));
    }

    useEffect(() => {
        getAllGiangVien();
        getDSDeTaiChuaPC();
    }, []);

    return (
        <div style={{ width: '1000px' }}>
            <TitleCard title="Đăng ký nhóm" topMargin="mt-2">
                <div className="overflow-x-auto w-full">
                    <div>
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>Danh sách giảng viên</th>
                                    <th>Giảng viên được phân công</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <div className="custom-listbox">
                                            <ListBox
                                                filter
                                                value={GVCham}
                                                onChange={handelChangeMaGV}
                                                options={GiangVienWithLabels}
                                                optionLabel="label"
                                                className="w-full md:w-14rem"
                                                listStyle={{ maxHeight: '100px' }}
                                            />
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            {GVCham ? (
                                                <p>
                                                    {GVCham.label}
                                                    <button onClick={removeGVCham} className='remove-button'>
                                                        <TrashIcon className="w-5" />
                                                    </button>
                                                </p>
                                            ) : (
                                                <p>Không có giảng viên nào được chọn</p>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                        <td>Danh sách đề tài</td>
                                        <td>Danh sách đề tài được chọn</td>
                                </tr>
                                <tr>
                                <td>
                                        <div className="custom-listbox">
                                            <ListBox
                                                filter
                                                multiple
                                                value={dsDeTaiChon}
                                                onChange={handelChangeDsDeTai}
                                                options={DeTaiWithLabels}
                                                optionLabel="label"
                                                className="w-full md:w-14rem"
                                                listStyle={{ maxHeight: '100px' }}
                                            />
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                        {dsDeTaiChon && dsDeTaiChon.length > 0 ? (
                                                dsDeTaiChon.map((dt,index) => (
                                                    <div style={{ display: 'flex', justifyContent: 'space-between',marginBottom:'5px' }}>
                                                    <p key={dt.tenDeTai}>{dt.tenDeTai}-{dt.moTa}</p><button onClick={() => removeDeTaiChon(dt)} className='remove-button'>  <TrashIcon className="w-5" /></button>
                                                    </div>
                                                ))
                                            ) : (
                                                <p>Không có sinh viên nào được chọn</p>
                                            )}
                                        </div>
                                    </td>

                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </TitleCard>
        </div>
    );
};

export default PhanCongGVChamDC;
