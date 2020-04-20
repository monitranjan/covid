import React from 'react'
import {Redirect,Route }from 'react-router-dom'
const ProtectedDoctor=({component:Cmp,...rest})=> (
    <Route{...rest}
    render={(props)=>
        sessionStorage.getItem('user')?(
            <Cmp {...props}/>
        ):<Redirect to ="/"/>
    }
    />
)
export default ProtectedDoctor;