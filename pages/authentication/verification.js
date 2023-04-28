import Layout from "../../layouts/login"
import Image from 'next/image'
import 'material-icons/iconfont/material-icons.css'
import { useState, useEffect } from 'react'
import Router from 'next/router'
import axios from "axios"
import Cookies from 'js-cookie'
import Logo from '../../assets/images/logo.png'

function Verifikasi() {
    const [kode, setKode] = useState("");
    const verifikasiHandler = async (e) => {
        e.preventDefault();
        /*
        const formData = new FormData();
        formData.append('kode', kode);
        await axios.post(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/login`, formData)
        .then((response) => {
            Cookies.set('token', response.data.token);
            */
            Router.push('/dashboard');
            /*
        })
        .catch((error) => {
            setValidation(error.response.data);
        })
        */
    };

    useEffect(() => {
        if(Cookies.get('token')) {
            Router.push('/dashboard');
        }
    }, []);

    return(
        <Layout>
            <div className="row justify-content-sm-center align-items-sm-center h-100">
                <div className="col-sm-4 p-4 mh-100 bg-white shadow text-center" style={{borderRadius: '10px', minWidth: '350px', backgroundColor: 'rgba(255,255,255,0.75)', boxShadow: '0px 0px 10px #aaaaaa'}}>
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <Image src={Logo} alt="Logo Sentra Hotel" className="img-fluid" style={{height: '60px', width: 'auto'}} />
                        <span className="lh-sm fs-6 mt-2">Click and Book Everywhere</span>
                    </div>
                    <form onSubmit={verifikasiHandler} className="text-start">
                        <label className="mt-5">Masukan Kode Verifikasi</label>
                        <div className="d-flex">
                            <input type="text" className="rounded-0 form-control text-center fs-3" value={kode} onChange={(e) => setKode(e.target.value)} placeholder="000-000-000"/>
                            <div className="p-2 bg-secondary d-flex clearValue" style={{cursor: 'pointer'}} title="Clear username">
                                <i className="material-icons align-self-center text-white fs-5">clear</i>
                            </div>
                        </div>
                        <div className="d-flex flex-column mt-5">
                            <button type="submit" className="justify-content-center btn btn-primary bg-gradient d-flex">
                                <span className="px-2">Next</span>
                                <i className="material-icons align-self-center">play_circle_outline</i>
                            </button>
                        </div>
                        <div className="mt-4 d-flex flex-column align-items-center">
                            <span className="text-muted" style={{fontSize: '10pt'}}>ExtraNET V.1.1</span>
                            <span className="text-muted" style={{fontSize: '8pt'}}>PT. Nama Perusahaan</span>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default Verifikasi