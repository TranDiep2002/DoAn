// import { themeChange } from 'theme-change'
// import React, {  useEffect, useState } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import BellIcon  from '@heroicons/react/24/outline/BellIcon'
// import Bars3Icon  from '@heroicons/react/24/outline/Bars3Icon'
// import MoonIcon from '@heroicons/react/24/outline/MoonIcon'
// import SunIcon from '@heroicons/react/24/outline/SunIcon'
// import { openRightDrawer } from '../features/common/rightDrawerSlice';
// import { RIGHT_DRAWER_TYPES } from '../utils/globalConstantUtil'

// import { NavLink,  Routes, Link , useLocation} from 'react-router-dom'
// import {io} from "socket.io-client"

// function Header(){

//     const dispatch = useDispatch()
//     const {noOfNotifications, pageTitle} = useSelector(state => state.header)
//     const [currentTheme, setCurrentTheme] = useState(localStorage.getItem("theme"))

//     useEffect(()=>{
//         const socket = io("https://server-domain.com");
//     },[])
//     useEffect(() => {
//         themeChange(false)
//         if(currentTheme === null){
//             if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ) {
//                 setCurrentTheme("dark")
//             }else{
//                 setCurrentTheme("light")
//             }
//         }
//         // 👆 false parameter is required for react project
//       }, [])


//     // Opening right sidebar for notification
//     const openNotification = () => {
//         dispatch(openRightDrawer({header : "Notifications", bodyType : RIGHT_DRAWER_TYPES.NOTIFICATION}))
//     }


//     function logoutUser(){
//         localStorage.clear();
//         window.location.href = '/'
//     }

//     return(
//         // navbar fixed  flex-none justify-between bg-base-300  z-10 shadow-md
        
//         <>
//             <div className="navbar sticky top-0 bg-base-100  z-10 shadow-md ">


//                 {/* Menu toogle for mobile view or small screen */}
//                 <div className="flex-1">
//                     <label htmlFor="left-sidebar-drawer" className="btn btn-primary drawer-button lg:hidden">
//                     <Bars3Icon className="h-5 inline-block w-5"/></label>
//                     <h1 className="text-2xl font-semibold ml-2">{pageTitle}</h1>
//                 </div>

                

//             <div className="flex-none ">

//                 {/* Multiple theme selection, uncomment this if you want to enable multiple themes selection, 
//                 also includes corporate and retro themes in tailwind.config file */}
                
//                 {/* <select className="select select-sm mr-4" data-choose-theme>
//                     <option disabled selected>Theme</option>
//                     <option value="light">Default</option>
//                     <option value="dark">Dark</option>
//                     <option value="corporate">Corporate</option>
//                     <option value="retro">Retro</option>
//                 </select> */}


//             {/* Light and dark theme selection toogle **/}
//             <label className="swap ">
//                 <input type="checkbox"/>
//                 <SunIcon data-set-theme="light" data-act-class="ACTIVECLASS" className={"fill-current w-6 h-6 "+(currentTheme === "dark" ? "swap-on" : "swap-off")}/>
//                 <MoonIcon data-set-theme="dark" data-act-class="ACTIVECLASS" className={"fill-current w-6 h-6 "+(currentTheme === "light" ? "swap-on" : "swap-off")} />
//             </label>


//                 {/* Notification icon */}
//                 <button className="btn btn-ghost ml-4  btn-circle" onClick={() => openNotification()}>
//                     <div className="indicator">
//                         <BellIcon className="h-6 w-6"/>
//                         {noOfNotifications > 0 ? <span className="indicator-item badge badge-secondary badge-sm">{noOfNotifications}</span> : null }
//                     </div>
//                 </button>


//                 {/* Profile icon, opening menu on click */}
//                 <div className="dropdown dropdown-end ml-4">
//                     <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
//                         <div className="w-10 rounded-full">
//                         <img src="https://ss-images.saostar.vn/wp700/pc/1613810558698/Facebook-Avatar_3.png" alt="profile" />
//                         </div>
//                     </label>
//                     <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
//                         <li className="justify-between">
//                         <Link to={'/app/settings-profile'}>
//                             Profile Settings
//                             <span className="badge">New</span>
//                             </Link>
//                         </li>
//                         <li className=''><Link to={'/app/settings-billing'}>Bill History</Link></li>
//                         <div className="divider mt-0 mb-0"></div>
//                         <li><a onClick={logoutUser}>Logout</a></li>
//                     </ul>
//                 </div>
//             </div>
//             </div>

//         </>
//     )
// }

// export default Header
// // import { themeChange } from 'theme-change'
// // import React, { useEffect, useState } from 'react'
// // import { useSelector, useDispatch } from 'react-redux'
// // import BellIcon from '@heroicons/react/24/outline/BellIcon'
// // import Bars3Icon from '@heroicons/react/24/outline/Bars3Icon'
// // import MoonIcon from '@heroicons/react/24/outline/MoonIcon'
// // import SunIcon from '@heroicons/react/24/outline/SunIcon'
// // import { openRightDrawer } from '../features/common/rightDrawerSlice';
// // import { RIGHT_DRAWER_TYPES } from '../utils/globalConstantUtil'
// // import { NavLink, Routes, Link, useLocation } from 'react-router-dom'
// // import SockJS from 'sockjs-client'
// // import { Stomp } from '@stomp/stompjs'

// // function Header() {
// //   const dispatch = useDispatch()
// //   const { pageTitle } = useSelector(state => state.header)
// //   const [noOfNotifications, setNoOfNotifications] = useState(0)
// //   const [currentTheme, setCurrentTheme] = useState(localStorage.getItem("theme") || "light")
// //   const [stompClient, setStompClient] = useState(null)

// //   useEffect(() => {
// //     themeChange(false)
// //     if (currentTheme === null) {
// //       if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
// //         setCurrentTheme("dark")
// //       } else {
// //         setCurrentTheme("light")
// //       }
// //     }
// //   }, [currentTheme])

// //   useEffect(() => {
    
// //     const socket = new SockJS('http://localhost:8080/ws'); // Đảm bảo URL endpoint đúng
// //     const client = Stomp.over(socket);
// //     client.connect({}, (frame) => {
// //       console.log('Connected: ' + frame);
// //       client.subscribe('/topic/notifications', (result) => {
// //         console.log('Kết quả nhận được:', JSON.parse(result.body));
// //         setNoOfNotifications((prev) => prev + 1);
// //       });
// //     });

// //     setStompClient(client);
// //     return () => {
// //       if (client) client.disconnect();
// //     };
// //   }, []);

// //   const openNotification = () => {
// //     dispatch(openRightDrawer({ header: "Notifications", bodyType: RIGHT_DRAWER_TYPES.NOTIFICATION }))
// //   }

// //   const logoutUser = () => {
// //     localStorage.clear()
// //     window.location.href = '/'
// //   }

// //   return (
// //     <div className="navbar sticky top-0 bg-base-100 z-10 shadow-md">
// //       <div className="flex-1">
// //         <label htmlFor="left-sidebar-drawer" className="btn btn-primary drawer-button lg:hidden">
// //           <Bars3Icon className="h-5 inline-block w-5" />
// //         </label>
// //         <h1 className="text-2xl font-semibold ml-2">{pageTitle}</h1>
// //       </div>
// //       <div className="flex-none">
// //         <label className="swap">
// //           <input type="checkbox" onChange={() => setCurrentTheme(currentTheme === "light" ? "dark" : "light")} />
// //           <SunIcon data-set-theme="light" data-act-class="ACTIVECLASS" className={`fill-current w-6 h-6 ${currentTheme === "dark" ? "swap-on" : "swap-off"}`} />
// //           <MoonIcon data-set-theme="dark" data-act-class="ACTIVECLASS" className={`fill-current w-6 h-6 ${currentTheme === "light" ? "swap-on" : "swap-off"}`} />
// //         </label>
// //         <button className="btn btn-ghost ml-4 btn-circle" onClick={openNotification}>
// //           <div className="indicator">
// //             <BellIcon className="h-6 w-6" />
// //             {noOfNotifications > 0 ? <span className="indicator-item badge badge-secondary badge-sm">{noOfNotifications}</span> : null}
// //           </div>
// //         </button>
// //         <div className="dropdown dropdown-end ml-4">
// //           <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
// //             <div className="w-10 rounded-full">
// //               <img src="https://ss-images.saostar.vn/wp700/pc/1613810558698/Facebook-Avatar_3.png" alt="profile" />
// //             </div>
// //           </label>
// //           <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
// //             <li className="justify-between">
// //               <Link to={'/app/settings-profile'}>
// //                 Profile Settings
// //                 <span className="badge">New</span>
// //               </Link>
// //             </li>
// //             <li><Link to={'/app/settings-billing'}>Bill History</Link></li>
// //             <div className="divider mt-0 mb-0"></div>
// //             <li><a onClick={logoutUser}>Logout</a></li>
// //           </ul>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// // export default Header
import { themeChange } from 'theme-change'

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openRightDrawer } from '../features/common/rightDrawerSlice';
import { RIGHT_DRAWER_TYPES } from '../utils/globalConstantUtil';
import BellIcon from '@heroicons/react/24/outline/BellIcon';
import Bars3Icon from '@heroicons/react/24/outline/Bars3Icon';
import MoonIcon from '@heroicons/react/24/outline/MoonIcon';
import SunIcon from '@heroicons/react/24/outline/SunIcon';
import { Link } from 'react-router-dom';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

function Header() {
    const dispatch = useDispatch();
    const { pageTitle } = useSelector(state => state.header);
    const [noOfNotifications, setNoOfNotifications] = useState(0);
    const [currentTheme, setCurrentTheme] = useState(localStorage.getItem("theme") || "light");
    const [stompClient, setStompClient] = useState(null);

    useEffect(() => {
        themeChange(false);
        if (currentTheme === null) {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                setCurrentTheme("dark");
            } else {
                setCurrentTheme("light");
            }
        }
    }, [currentTheme]);

    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/ws');
        const client = Stomp.over(socket);
        client.connect({}, (frame) => {
            console.log('Connected: ' + frame);
            client.subscribe('/topic/notifications', (message) => {
                console.log('Received: ', JSON.parse(message.body));
                setNoOfNotifications((prev) => prev + 1);
            });
        });

        setStompClient(client);
        return () => {
            if (client) client.disconnect();
        };
    }, []);


    const openNotification = () => {
        dispatch(openRightDrawer({ header: "Notifications", bodyType: RIGHT_DRAWER_TYPES.NOTIFICATION }));
    };

    const logoutUser = () => {
        localStorage.clear();
        window.location.href = '/';
    };

    return (
        <div className="navbar sticky top-0 bg-base-100 z-10 shadow-md">
            <div className="flex-1">
                <label htmlFor="left-sidebar-drawer" className="btn btn-primary drawer-button lg:hidden">
                    <Bars3Icon className="h-5 inline-block w-5" />
                </label>
                <h1 className="text-2xl font-semibold ml-2">{pageTitle}</h1>
            </div>
            <div className="flex-none">
                <label className="swap">
                    <input type="checkbox" onChange={() => setCurrentTheme(currentTheme === "light" ? "dark" : "light")} />
                    <SunIcon data-set-theme="light" data-act-class="ACTIVECLASS" className={`fill-current w-6 h-6 ${currentTheme === "dark" ? "swap-on" : "swap-off"}`} />
                    <MoonIcon data-set-theme="dark" data-act-class="ACTIVECLASS" className={`fill-current w-6 h-6 ${currentTheme === "light" ? "swap-on" : "swap-off"}`} />
                </label>
                <button className="btn btn-ghost ml-4 btn-circle" onClick={openNotification}>
                    <div className="indicator">
                        <BellIcon className="h-6 w-6" />
                        {noOfNotifications > 0 ? <span className="indicator-item badge badge-secondary badge-sm">{noOfNotifications}</span> : null}
                    </div>
                </button>
                <div className="dropdown dropdown-end ml-4">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img src="https://ss-images.saostar.vn/wp700/pc/1613810558698/Facebook-Avatar_3.png" alt="profile" />
                        </div>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li className="justify-between">
                            <Link to={'/app/settings-profile'}>
                                Profile Settings
                                <span className="badge">New</span>
                            </Link>
                        </li>
                        <li><Link to={'/app/settings-billing'}>Bill History</Link></li>
                        <div className="divider mt-0 mb-0"></div>
                        <li><a onClick={logoutUser}>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Header;
