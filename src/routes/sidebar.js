import UsersIcon from '@heroicons/react/24/outline/UsersIcon'



const iconClasses = `h-6 w-6`
const submenuIconClasses = `h-5 w-5`

const routes = [

    {
        path: '/app/dssinhvien', // url
        icon: <UsersIcon className={iconClasses}/>, // icon component
        name: 'Danh sách sinh viên', // name that appear in Sidebar
      },
  
  
]

export default routes


