import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../features/common/headerSlice'
import DangKyNhom from '../dangkynhom/dangkynhom'
import PhanCongGVChamDC from '../nopDeCuong/phanCongGVCham'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Phâ công GV chấm đề cương"}))
      }, [])


    return(
        <PhanCongGVChamDC />
    )
}

export default InternalPage