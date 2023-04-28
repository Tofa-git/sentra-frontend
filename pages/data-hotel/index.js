import { useState } from 'react'
import { useRouter } from 'next/router'
import Layout from "../../layouts/default";
import 'material-icons/iconfont/material-icons.css'

const Index = (props) => {
    const router = useRouter()
    const [token, setToken] = useState(props.keys)
    const [selectedId, setSelectedId] = useState('002')

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
            	    Data Hotel
	            </div>
    	    </Layout>
	    )
	}
}

export default Index