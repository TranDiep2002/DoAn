import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../features/common/headerSlice'
import DSGiangVien from '../giangvien/dsSinhVien'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Danh sách giảng viên"}))
      }, [])


    return(
        <DSGiangVien />
    )
}

export default InternalPage