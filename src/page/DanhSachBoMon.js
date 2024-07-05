import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../features/common/headerSlice'
import DanhSachBoMon from '../bomon/danhSachBoMon'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Danh sách bộ môn"}))
      }, [])


    return(
        <DanhSachBoMon />
    )
}

export default InternalPage