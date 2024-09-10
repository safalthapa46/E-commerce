import React, { useEffect } from 'react'

import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth';
// import { SideBar } from '../side-bar'
// import { useAuth } from '../../hooks/use-auth'

const AdminLayout = () => {
  const navigate = useNavigate();
  const { accessToken, role } = useAuth();

  useEffect(() => {

    if (!accessToken || accessToken == undefined) {
      navigate('/signin')
    }
    if (accessToken && role === "user") {
        navigate('/user-dashboard')
    }
  }, [accessToken, navigate, role])
  return (
        <Outlet />
  )
}

export default AdminLayout