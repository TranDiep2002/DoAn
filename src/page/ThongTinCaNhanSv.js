import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../features/common/headerSlice'
import DropFileInput from '../nopDeCuong/sinhVienNopDC'
import ThongTinCaNhanSV from '../thongtincanhan/thongtincanhanSV'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Thông tin cá nhân"}))
      }, [])


    return(
        <ThongTinCaNhanSV />
    )
}

export default InternalPage