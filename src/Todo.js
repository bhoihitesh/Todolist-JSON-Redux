import React, { useEffect } from 'react'
import { AiOutlinePlusCircle, AiFillEye, AiFillEdit, AiTwotoneDelete, AiFillCheckCircle } from 'react-icons/ai';
import { Scrollbars } from 'react-custom-scrollbars'
import { useGetAllDataQuery, useViewDataByIdQuery, useAddDataByIdMutation, useEditDataByIdMutation, useDeleteDataByIdMutation } from './Features/ApiCall';
import { useState } from 'react';
// import { AddUserData, Newuserdata } from './Features/AddUserSlice';
const Todo = () => {
    const [getApi, setApi] = useState([])
    const [name, setName] = useState('')
    let [id, setId] = useState("")
    const [Edituserclick, setEdituserclick] = useState(false)
    const [Viewuserclick, setViewuserclick] = useState(false)
    const [render, setRender] = useState(false)

    const { data, isLoading } = useGetAllDataQuery()
    let res = useViewDataByIdQuery(id)
    let [createuser, info] = useAddDataByIdMutation()
    let [changeuser, userinfo] = useEditDataByIdMutation()
    let [delUser, delUserinfo] = useDeleteDataByIdMutation()

    // Initialized Data
    useEffect(() => {
        { isLoading ? <p>Loading</p> : setApi(data) }

    }, [isLoading])

    //Add user 
    const CreateUser = () => {
        createuser({ name })
        setName('')
        setRender(true)
        setApi([{ info: info.data }, ...getApi])
    }

    // View user
    let Viewuser = async (e) => {
        setName([res.data.name])
        setId(e)
        setViewuserclick(true)
    }

    // Edit user
    const Edituser = (e) => {
        setId(e)
        setName([res.data.name])
        setEdituserclick(true)
    }

    //Edit user complete 
    const editcomplete = () => {
        changeuser({ name })
        setApi([{ userinfo: userinfo.data }, ...getApi])
        setName('')
        setRender(true)
    }
    return (
        <>
            {
                render
                    ?

                    <div className="container">
                        <div className="row bg-light rounded-3">
                            <div className="col-lg-12 d-flex flex-column justify-content-center">
                                <div className="header text-center text-primary"><h1>Todo List</h1></div>
                                <div className="todo-top d-flex flex-row justify-content-center">
                                    {
                                        Edituserclick
                                            ?
                                            <div className=' d-flex flex-row justify-content-center'>
                                                <input type="text" className='form-control w-100' value={name} onChange={(e) => setName(e.target.value)} />
                                                <button className='btn btn-success fs-4 ms-1'><AiFillEdit className='m-2' onClick={() => editcomplete()} /></button>
                                            </div>
                                            :
                                            <div className=' d-flex flex-row justify-content-center'>
                                                <input type="text" className='form-control w-100' value={name} onChange={(e) => setName(e.target.value)} />
                                                {Viewuserclick
                                                    ?
                                                    ''
                                                    :
                                                    <button className='btn btn-success fs-4 ms-1'><AiFillCheckCircle className='m-2' onClick={CreateUser} /></button>
                                                }
                                            </div>
                                    }
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="todo-bottom ">
                                    <div className=' d-flex justify-content-center my-5'>
                                        <ul className='list-group w-100 rounded-4'>
                                            <Scrollbars style={{ width: "100%", height: '20rem' }} className=" rounded-2">

                                                <div>
                                                    {getApi.map((e, i) => {

                                                        return (
                                                            <>
                                                                <li className='list-group-item' key={i}>

                                                                    <div className=' fs-4 d-flex justify-content-between'>
                                                                        <p>{e.name}</p>
                                                                        <p>
                                                                            <span className='view me-1'><AiFillEye onClick={() => Viewuser(e.id)} /></span>
                                                                            <span className='edit me-1'><AiFillEdit onClick={() => Edituser(e.id)} /></span>
                                                                            <span className='delete me-1'><AiTwotoneDelete onClick={() => delUser(e.id)} /></span>
                                                                        </p>
                                                                    </div>
                                                                </li>
                                                            </>
                                                        )
                                                    })}
                                                </div>

                                            </Scrollbars>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div><Todo /></div>
            }
        </>
    )
}

export default Todo