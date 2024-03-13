import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
  return (
    <button className='  inline-bock text-lg font-medium text-white transition-colors duration-200 '
   
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn