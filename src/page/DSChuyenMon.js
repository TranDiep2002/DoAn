import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../features/common/headerSlice'
import DanhSachBoMon from '../bomon/danhSachBoMon'
import DSChuyenMon from '../chuyenmon/danhsachChuyenMon'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Danh sách chuyên môn"}))
      }, [])


    return(
        <DSChuyenMon />
    )
}

export default InternalPage