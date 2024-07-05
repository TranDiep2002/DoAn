import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../features/common/headerSlice'

import DanhSachNhom from '../dangkynhom/dsnhom'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Danh sách nhóm cần phê duyệt"}))
      }, [])


    return(
        <DanhSachNhom />
    )
}

export default InternalPage