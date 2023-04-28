import React, { Component, useState } from 'react'
import Layout from "../../layouts/default";
import dynamic from 'next/dynamic'
import 'material-icons/iconfont/material-icons.css'

const Index = (props) => {

    const [selectedId, setSelectedId] = useState('001')
    const [token, setToken] = useState(props.keys)

    if(token == null){
        return (
            <>
                <h1>Loading...</h1>
            </>
        )
    }else{
	    return(
    	    <Layout selectId={selectedId}>
        	    <div>
            	    List Booking
	            </div>
    	    </Layout>
    	)
	}
}

export default Index