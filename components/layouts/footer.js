import { useState, useEffect } from 'react'

const Footers = (props) => {
	const [tanggal, setTanggal] = useState(null);

	const getDate=()=>{
		let newDate = new Date()
		let tgl = newDate.getMonth()
		let hari = newDate.getDate()
		if(tgl < 10){
			tgl = '0'+tgl
		}
		if(hari < 10){
			hari = '0'+hari
		}
		setTanggal(hari+'-'+tgl+'-'+newDate.getFullYear())
	}

	useEffect(() => {
		getDate()
	}, [])

    return (
        <>
            <div className='d-flex' style={{borderTop: '1px solid #dddddd', backgroundColor: '#eeeeee'}}>
                <label className='p-0 px-2 d-flex flex-fill flex-justify-between'>
                    <span className='w-100 small m-0 p-0 text-secondary'>Login as Administrator</span>
                    <span className='flex-shrink-1 text-nowrap border small m-0 p-0 text-secondary'>{tanggal}</span>
                </label>
            </div>
        </>
    )

}

export default Footers