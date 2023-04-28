import React, { useEffect } from 'react'
import Layout from "../layouts/default";
import styles from '../styles/Home.module.css'
import 'material-icons/iconfont/material-icons.css'
import { useRouter } from 'next/router'

const Home = (props) => {
    const router = useRouter()

    useEffect(() => {
        if(props.keys !== null){
            router.push('/dashboard')
        }
    }, []);

    return (
        <>
            <h1>Loading...</h1>
        </>
    )

}

export default Home