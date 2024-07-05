import { useEffect } from 'react'
import { MODAL_BODY_TYPES } from '../utils/globalConstantUtil'
import { useSelector, useDispatch } from 'react-redux'
import { closeModal } from '../features/common/modalSlice'
import ConfirmationModalBody from '../features/common/components/ConfirmationModalBody'
import AddLeadModalBody from '../sinhvien/component/AddLeadModalBody'
import EditSinhVien from '../sinhvien/component/EditSinhVien'
import AddGiangVienNew from '../giangvien/component/AddLeadModalBody'
import EditGiangVien from '../giangvien/component/EditSinhVien'
import AddNewBoMon from '../bomon/component/insertBoMon'
import EditBoMon from '../bomon/component/editBoMon'
import AddNewChuyenMon from '../chuyenmon/components/addNewChuyenMon'
import EditChuyenMon from '../chuyenmon/components/editChuyenMon'


function ModalLayout(){


    const {isOpen, bodyType, size, extraObject, title,extraProps} = useSelector(state => state.modal)
    const dispatch = useDispatch()

    const close = (e) => {
        dispatch(closeModal(e))
    }



    return(
        <>
        {/* The button to open modal */}

            {/* Put this part before </body> tag */}
            <div className={`modal ${isOpen ? "modal-open" : ""}`}>
            <div className={`modal-box  ${size === 'lg' ? 'max-w-5xl' : ''}`}>
                <button className="btn btn-sm btn-circle absolute right-2 top-2" onClick={() => close()}>✕</button>
                <h3 className="font-semibold text-2xl pb-6 text-center">{title}</h3>


                {/* Loading modal body according to different modal type */}
                {
                    {
                             [MODAL_BODY_TYPES.STUDENT_ADD_NEW] : <AddLeadModalBody closeModal={close} extraObject={extraObject}/>,
                             [MODAL_BODY_TYPES.STUDENT_EDIT]:<EditSinhVien {...extraProps} closeModal={close} extraObject={extraObject}/>,
                             [MODAL_BODY_TYPES.TEACHER_ADD_NEW] : <AddGiangVienNew closeModal={close} extraObject={extraObject}/>,
                             [MODAL_BODY_TYPES.TEACHER_EDIT]:<EditGiangVien {...extraProps} closeModal={close} extraObject={extraObject}/>,
                             [MODAL_BODY_TYPES.BOMON_ADD_NEW]:<AddNewBoMon closeModal={close} extraObject={extraObject}/>,
                             [MODAL_BODY_TYPES.BOMON_EDIT]:<EditBoMon {...extraProps} closeModal={close} extraObject={extraObject}/>,
                             [MODAL_BODY_TYPES.CHUYENMON_ADD_NEW]:<AddNewChuyenMon closeModal={close} extraObject={extraObject}/>,
                             [MODAL_BODY_TYPES.CHUYENMON_EDIT]:<EditChuyenMon {...extraProps} closeModal={close} extraObject={extraObject}/>,
                             [MODAL_BODY_TYPES.CONFIRMATION] : <ConfirmationModalBody extraObject={extraObject} closeModal={close}/>,
                             [MODAL_BODY_TYPES.DEFAULT] : <div></div>
                    }[bodyType]
                }
            </div>
            </div>
            </>
    )
}

export default ModalLayout