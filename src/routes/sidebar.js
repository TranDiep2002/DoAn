import UsersIcon from '@heroicons/react/24/outline/UsersIcon'
// import UserIcon from ' @heroicons/react/24/outline/UserIcon'
import CheckcircleIcon from '@heroicons/react/24/outline/CheckCircleIcon'
import BookOpen from '@heroicons/react/24/outline/BookOpenIcon'
import Cook6 from '@heroicons/react/24/outline/Cog6ToothIcon'
import Calendar from '@heroicons/react/24/outline/CalendarDaysIcon'
import Clock from '@heroicons/react/24/outline/ClockIcon'
import UserCircle from '@heroicons/react/24/outline/UserCircleIcon'
import BookOpenIcon from '@heroicons/react/24/outline/BookOpenIcon'
const iconClasses = `h-6 w-6`
const submenuIconClasses = `h-5 w-5`



const routes = [
      {
        path: '/app/dstaikhoan', // url
        role:[ "GIAOVU"],
        icon: <UserCircle className={iconClasses}/>, // icon component
        name: 'Danh sách tài khoản', // name that appear in Sidebar
      },
      {
        path: '/app/dssinhvien', // url
        icon: <UsersIcon className={iconClasses}/>, // icon component
        name: 'Danh sách sinh viên', // name that appear in Sidebar
      },
      {
        path: '/app/dsgiangvien', // url
        icon: <UsersIcon className={iconClasses}/>, // icon component
        name: 'Danh sách giảng viên', // name that appear in Sidebar
      },
      {
        path: '/app/dangkynhom',
        icon: <CheckcircleIcon className={iconClasses}/>,
        name:'Đăng ký đề tài',
        role:["SINHVIEN"],
      },
      {
        path: '/app/nhomcuaban',
        icon: <UsersIcon className={iconClasses}/>,
        name:'Nhóm của bạn',
        role:["SINHVIEN"],
      },
      {
        path: '/app/danhsachnhom',
        icon: <UsersIcon className={iconClasses}/>,
        name:'Danh sách các nhóm',
        role: ["GIANGVIEN"],
        vaiTro: ["Trưởng bộ môn", "Phó trưởng bộ môn", "Giáo vụ"]
      },
      {
        path: '/app/dsNhomGiaoVu',
        icon: <UsersIcon className={iconClasses}/>,
        name:'Danh sách các nhóm',
        role: ["GIAOVU","HDKHOAHOC"],
      },
      {
        path:'',
        icon: <BookOpen className={`${iconClasses} inline` }/>,
        name:'Bộ môn - Chuyên môn',
        role:[ "GIAOVU"],
        submenu:[
          {
            path:'/app/danhsachbomon',
            icon:<BookOpen className={submenuIconClasses}/>,
            name:'Danh sách bộ môn',
          },
          {
            path:'/app/danhsachchuyenmon',
            icon:<BookOpen className={submenuIconClasses}/>,
            name:'Danh sách chuyên ngành',
          }
        ]
      },
      {
        path:'',
        icon: <Cook6 className={`${iconClasses} inline` }/>,
        name:'Kỹ thuật hệ thống',
        role:[ "GIAOVU"],
        submenu:[
          {
            path:'/app/setNamHoc',
            icon:<Calendar className={submenuIconClasses}/>,
            name:'Thiết lập năm học hệ thống',
          },
          {
            path:'/app/setThongBao',
            icon:<Clock className={submenuIconClasses}/>,
            name:'Thiết lập thời gian đăng ký',
          }
        ]

      },
      {
        path: '/app/sinhVienNopDC',
        icon: <BookOpenIcon className={iconClasses}/>,
        name:'Nộp đề cương',
        role: ["SINHVIEN"],
      },
      {
        path: '/app/danhsachDeCuong',
        icon: <BookOpenIcon className={iconClasses}/>,
        name:'Duyệt đề cương',
        role: ["HDKHOAHOC"],
      },
      {
        path:'/app/phancongGVChamDC',
        icon:<BookOpenIcon className={iconClasses}/>,
        name:"Phân công GV chấm ĐC",
        role: ["HDKHOAHOC"],
      },
      {
        path: '/app/thongtincanhanSV', // url
        icon: <UserCircle className={iconClasses}/>, // icon component
        name: 'Thông tin cá nhân', // name that appear in Sidebar
        role: ["SINHVIEN"],
      }
      
]

export default routes

