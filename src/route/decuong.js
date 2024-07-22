
import api from './axios'
const DeCuongAPI =  {
    uploadFile:(formData,maSV)=>{
        return api.post(`uploadFile/${maSV}`,formData,{
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    insertDeCuong: (formData,maSV)=>{
        return api.post(`/uploadFile/${maSV}`,formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
              }
        })
    },
    getFileName(maSV){
        return api.get(`getFileName/${maSV}`)
    },
    downloadFile(maSV){
        return api.get(`download/${maSV}`, {
            responseType: 'blob',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
    },
    XoaDeCuong(maSV){
        return api.delete(`/XoaDeCuong/${maSV}`)
    },
    getNgayConLai(){
        return api.get('/getNgayConLai')
    },
    getHanChot(){
        return api.get('/getHanChot')
    },
    getAllFileName(){
        return api.get(`/getAllFileName`)
    },
    downloadFilebyFileName(tenDeTai,moTaDeTai,tenFile){
        return api.get(`/downloadFilebyFileName/${tenDeTai}/${moTaDeTai}/${tenFile}`, {
            responseType: 'blob',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
    },
    duyetDC(tenDeTai,moTaDeTai){
        return api.put(`/duyetDC/${tenDeTai}/${moTaDeTai}`)
    },
    huyDC(tenDeTai,moTaDeTai){
        return api.put(`/huyDC/${tenDeTai}/${moTaDeTai}`)
    },
    yeuCauChinhSuaDC(tenDeTai,moTaDeTai){
        return api.put(`/yeuCauChinhSuaDC/${tenDeTai}/${moTaDeTai}`)
    },
    themGhiChuDC(tenDeTai,moTa,ghiChu){
        return api.put(`themGhiChuDC/${tenDeTai}/${moTa}/${ghiChu}`)
    },
    deTaiChuaCoGVCham(){
        return api.get('/deTaiChuaCoGVCham')
    },
    getTrangThaiGV(maGV){
        return api.get(`/getTrangThaiGV/${maGV}`)
    },
    getALlGV(){
        return api.get('/getALlGV')
    },
    themGiangVienChamDiem(body){
        return api.put('/themGiangVienChamDiem',body)
    }

}

export default DeCuongAPI