import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../features/common/headerSlice'
import SetNamHocHocKy from '../kyThuatHeThong/setNamHocHocKy'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Thiết Lập Năm Học, Học Kỳ"}))
      }, [])


    return(
        <SetNamHocHocKy />
    )
}

export default InternalPage