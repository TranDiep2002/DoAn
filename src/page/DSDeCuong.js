import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../features/common/headerSlice'
import DanhSachDeCuong from '../nopDeCuong/danhSachDeCuong'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Danh sách nhóm cần phê duyệt"}))
      }, [])


    return(
        <DanhSachDeCuong />
    )
}

export default InternalPage