import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../features/common/headerSlice'
import SetThongBao from '../kyThuatHeThong/setThoiGianDangKy'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Thiết Lập Năm Học, Học Kỳ"}))
      }, [])


    return(
        <SetThongBao />
    )
}

export default InternalPage