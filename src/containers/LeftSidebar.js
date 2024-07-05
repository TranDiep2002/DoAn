import { NavLink,  Routes, Link , useLocation} from 'react-router-dom'
import SidebarSubmenu from './SidebarSubmenu';
import XMarkIcon  from '@heroicons/react/24/outline/XMarkIcon'
import { useDispatch } from 'react-redux';
import routes from '../routes/sidebar';
import { useEffect, useState } from 'react';
import authAPI from '../route/authAPI';
import giangVienAPI from '../route/giangVienAPI'
function LeftSidebar(){
    const location = useLocation();

    const dispatch = useDispatch()
    const maUser = JSON.parse(localStorage.getItem("maUser"));

    const[role,setRole ]= useState('');
    const [vaiTro,setVaiTro] = useState('');

    const getPhanQuyen = async()=>{
        try {
            const response= await authAPI.getRole(maUser);
            console.log("Quyền của người dùng:",response.data);
            setRole(response.data);
        } catch (error) {
            console.log("Lỗi khi lấy phân quyền:", error);
        }
    }
    const getVaiTro = async()=>{
        try {
            const response= await giangVienAPI.getVaiTro(maUser);
            console.log("Vai trò của giảng viên:" , response.data)
            setVaiTro(response.data)
        } catch (error) {
            console.log("Lỗi khi lấy vai trò giảng viên")
        }
    }

    const close = (e) => {
        document.getElementById('left-sidebar-drawer').click()
    }
    useEffect(() => {
        getPhanQuyen();
        console.log("menu:",routes);
        
            getVaiTro();
        
    }, []);
    return (
        <div className="drawer-side z-30">
            <label htmlFor="left-sidebar-drawer" className="drawer-overlay"></label>
            <ul className="menu pt-2 w-80 bg-base-100 min-h-full text-base-content">
                <button className="btn btn-ghost bg-base-300 btn-circle z-50 top-0 right-0 mt-4 mr-2 absolute lg:hidden" onClick={() => close()}>
                    <XMarkIcon className="h-5 inline-block w-5" />
                </button>
                <li className="mb-2 font-semibold text-xl">
                    <Link to={'/app/welcome'}>
                        <img className="mask mask-squircle w-10" src="/logoOpenUniversity.png" alt="DashWind Logo" />
                        <b>Welcome</b>
                    </Link>
                </li>
                {
                    routes.map((route, k) => {
                        // Kiểm tra quyền truy cập
                        if (( Array.isArray(route.role)&& route.role.includes(role) || !route.role) && (Array.isArray(route.vaiTro) &&route.vaiTro.includes(vaiTro) || !route.vaiTro)) {
                            
                            return (
                                <li key={k}>
                                    {route.submenu ? (
                                        <SidebarSubmenu {...route} />
                                    ) : (
                                        <NavLink
                                            end
                                            to={route.path}
                                            className={({ isActive }) => `${isActive ? 'font-semibold bg-base-200 ' : 'font-normal'}`}
                                        >
                                            {route.icon} {route.name}
                                            {location.pathname === route.path ? (
                                                <span className="absolute inset-y-0 left-0 w-1 rounded-tr-md rounded-br-md bg-primary" aria-hidden="true"></span>
                                            ) : null}
                                        </NavLink>
                                    )}
                                </li>
                            );
                        }
                        return null;
                    })
                }
            </ul>
        </div>
    );
}

export default LeftSidebar
// import { NavLink, Link, useLocation } from 'react-router-dom'
// import SidebarSubmenu from './SidebarSubmenu';
// import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon'
// import { useDispatch } from 'react-redux';
// import routes from '../routes/sidebar';
// import { useEffect, useState } from 'react';
// import authAPI from '../route/authAPI';
// import giangVienAPI from '../route/giangVienAPI'

// function LeftSidebar(){
//     const location = useLocation();
//     const dispatch = useDispatch()
//     const maUser = JSON.parse(localStorage.getItem("maUser"));

//     const [role, setRole] = useState('');
//     const [vaiTro, setVaiTro] = useState('');

//     const getPhanQuyen = async () => {
//         try {
//             const response = await authAPI.getRole(maUser);
//             console.log("Quyền của người dùng:", response.data);
//             setRole(response.data);
//         } catch (error) {
//             console.log("Lỗi khi lấy phân quyền:", error);
//         }
//     }

//     const getVaiTro = async () => {
//         try {
//             const response = await giangVienAPI.getVaiTro(maUser);
//             console.log("Vai trò của giảng viên:", response.data)
//             setVaiTro(response.data)
//         } catch (error) {
//             console.log("Lỗi khi lấy vai trò giảng viên")
//         }
//     }

//     const close = (e) => {
//         document.getElementById('left-sidebar-drawer').click()
//     }

//     useEffect(() => {
//         getPhanQuyen();
//         console.log("menu:", routes);
//         getVaiTro();
//     }, []);

//     return (
//         <div className="drawer-side z-30">
//             <label htmlFor="left-sidebar-drawer" className="drawer-overlay"></label>
//             <ul className="menu pt-2 w-80 bg-base-100 min-h-full text-base-content">
//                 <button className="btn btn-ghost bg-base-300 btn-circle z-50 top-0 right-0 mt-4 mr-2 absolute lg:hidden" onClick={() => close()}>
//                     <XMarkIcon className="h-5 inline-block w-5" />
//                 </button>
//                 <li className="mb-2 font-semibold text-xl">
//                     <Link to={'/app/welcome'}>
//                         <img className="mask mask-squircle w-10" src="/logoOpenUniversity.png" alt="DashWind Logo" />
//                         <b>Welcome</b>
//                     </Link>
//                 </li>
//                 {
//                     routes.map((route, k) => {
//                         const hasRole = route.role ? Array.isArray(route.role) && route.role.includes(role) : true;
//                         const hasVaiTro = route.vaiTro ? Array.isArray(route.vaiTro) && route.vaiTro.includes(vaiTro) : true;

//                         if (hasRole && hasVaiTro) {
//                             return (
//                                 <li key={k}>
//                                     {route.submenu ? (
//                                         <SidebarSubmenu {...route} />
//                                     ) : (
//                                         <NavLink
//                                             end
//                                             to={route.path}
//                                             className={({ isActive }) => `${isActive ? 'font-semibold bg-base-200 ' : 'font-normal'}`}
//                                         >
//                                             {route.icon} {route.name}
//                                             {location.pathname === route.path ? (
//                                                 <span className="absolute inset-y-0 left-0 w-1 rounded-tr-md rounded-br-md bg-primary" aria-hidden="true"></span>
//                                             ) : null}
//                                         </NavLink>
//                                     )}
//                                 </li>
//                             );
//                         }
//                         return null;
//                     })
//                 }
//             </ul>
//         </div>
//     );
// }

// export default LeftSidebar;