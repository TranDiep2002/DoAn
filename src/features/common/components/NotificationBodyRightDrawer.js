import { useEffect, useState } from "react";
import ThongBaoAPI from "../../../route/thongBaoAPI";

function NotificationBodyRightDrawer() {
    const [dsThongBao, setDSThongBao] = useState([]);

    const handelGetThongBao = async () => {
        try {
            const response = await ThongBaoAPI.allGetThongBao();
            console.log("Danh sách các thông báo:", response.data);
            setDSThongBao(response.data);
        } catch (error) {
            console.log("Lấy danh sách thông báo lỗi:", error);
        }
    };

    useEffect(() => {
        handelGetThongBao();
    }, []);

    return (
        <>
            {dsThongBao.map((l, k) => {
                // Kiểm tra nếu l.id là số lẻ
                return (
                    l.id % 2 !== 0 && (
                        <div key={k} className="grid mt-3 card bg-base-200 rounded-box p-3 bg-blue-100">
                            {l.noiDungThongBao}<br></br>
                            Thời gian đăng ký: {l.ngayBatDau}<br></br>
                            Thời gian kết thúc:{l.ngayKetThuc}<br></br>
                            Học Kỳ:{l.tenKy}<br></br>
                            Năm Học:{l.namHoc}<br></br>
                        </div>
                    )
                    
                );
            })}
        </>
    );
}

export default NotificationBodyRightDrawer;
// npm install @stomp/stompjs
//npm install sockjs-client stompjs
//npm install theme-change