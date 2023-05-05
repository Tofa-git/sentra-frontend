import React, { Component, useState } from 'react'
import Layout from "../../layouts/default";
import dynamic from 'next/dynamic'
import 'material-icons/iconfont/material-icons.css'
import Input from '../../components/input';
import Select from '../../components/select';

const Index = (props) => {

    const [selectedId, setSelectedId] = useState('001')
    const [token, setToken] = useState(props.keys)

    if (token == null) {
        return (
            <>
                <h1>Loading...</h1>
            </>
        )
    } else {
        return (
            <Layout selectId={selectedId}>
                <div className='mx-3'>
                    <div className='row p-3'>
                        <div className='col-lg-6'>
                            <div className='text-dark mb-1'>Booking</div>
                            <div className='bg-white py-3 row'>
                                <div className='col-12'>
                                    <Input label={'Agent'} />
                                </div>
                                <div className='col-12'>
                                    <Select label={'Nationality'} />
                                </div>
                                <div className='col-6'>
                                    <Select label={'Country'} />
                                </div>
                                <div className='col-6'>
                                    <Select label={'City'} />
                                </div>
                                <div className='col-3'>
                                    <Input type='date' label='Check In' />
                                </div>
                                <div className='col-3'>
                                    <Input type='date' label='Check Out' />
                                </div>
                                <div className='col-3'>
                                    <Input type='number' label='Night' />
                                </div>
                                <div className='col-3'>
                                    <Select />
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-6'>
                            <div className='text-dark mb-1'>Hotel</div>
                            <div className='bg-white py-3'>
                                <div className='ms-3 text-dark'>List Hotel</div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }
}

export default Index