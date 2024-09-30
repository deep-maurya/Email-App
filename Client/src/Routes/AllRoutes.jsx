import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Login } from '../Component/Login'
import { Page2 } from '../Pages/Page2'
import { Page3 } from '../Pages/Page3'
import { Page4 } from '../Pages/Page4'
import { DashBoard } from '../Pages/DashBoard'

export const AllRoutes = () => {
  return (
    <>
    <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/dashboard' element={<DashBoard/>}/>
        <Route path='/page2' element={<Page2/>}/>
        <Route path='/page3' element={<Page3/>}/>
        <Route path='/page4' element={<Page4/>}/>
    </Routes>
    </>
  )
}
