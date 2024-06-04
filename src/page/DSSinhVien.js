import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../features/common/headerSlice'
import DSSinhVien from '../sinhvien/dsSinhVien'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Danh sách sinh viên"}))
      }, [])


    return(
        <DSSinhVien />
    )
}

export default InternalPage