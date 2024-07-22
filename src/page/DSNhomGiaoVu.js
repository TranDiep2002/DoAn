import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../features/common/headerSlice'

import DanhSachNhomGiaoVu from '../dangkynhom/dsNhomGiaoVu'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Danh sách nhóm đồ án"}))
      }, [])


    return(
        <DanhSachNhomGiaoVu />
    )
}

export default InternalPage