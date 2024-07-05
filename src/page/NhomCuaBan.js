import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../features/common/headerSlice'
import DangKyNhom from '../dangkynhom/dangkynhom'
import NhomCuaBan from '../dangkynhom/nhomcuaban'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Nhóm của bạn"}))
      }, [])


    return(
        <NhomCuaBan />
    )
}

export default InternalPage