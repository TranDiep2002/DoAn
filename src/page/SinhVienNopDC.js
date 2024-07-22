import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../features/common/headerSlice'
import DropFileInput from '../nopDeCuong/sinhVienNopDC'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Sinh Viên nộp đề cương"}))
      }, [])


    return(
        <DropFileInput />
    )
}

export default InternalPage