import { useState } from 'react'
import { useRouter } from 'next/router'
import Layout from "../../../layouts/default"
import StdForm from "../../../components/forms/stdForm"
import CreateForm from './createForm'
import ImgButton from '../../../components/button/imgButton'
import 'material-icons/iconfont/material-icons.css'

const Index = (props) => {
    const router = useRouter()
    const [token, setToken] = useState(props.keys)
    const [selectedId, setSelectedId] = useState('002')

    const toolbarForm = (
    	<div className="d-flex flex-row align-items-center bg-light p-2" style={{borderBottom: '1px solid #dddddd'}}>
			<span className='flex-shrink-1 pe-1 small text-nowrap'>Keyword :</span>
			<div className="flex-fill input-group">
				<input name="q" type="text" className="form-control bg-white rounded-0 p-0 px-1" placeholder="Country Name" />
				<div className="d-flex input-group-append">
					<div className="d-flex btn-group">
						<a className="btn btn-outline-secondary rounded-0" id="search_button" role="button" title="Go Search" style={{padding: '2px 5px'}} href="#"><i className="material-icons" style={{verticalAlign: 'middle'}}>search</i></a>
						<a className="btn btn-outline-secondary rounded-0" id="filter_button" role="button" title="Search options" style={{padding: '2px 5px'}} data-bs-toggle="offcanvas" href="#searchOptions" aria-controls="searchOptions"><i className="material-icons" style={{verticalAlign: 'middle'}}>filter_alt</i></a>
					</div>
				</div>
    		</div>
    		<button className='btn btn-sm btn-primary bg-gradient ms-2 rounded-0 d-flex flex-row align-items-center shadow-sm' data-bs-toggle="modal" data-bs-target="#createHotel">
				<i className="material-icons fs-6" style={{verticalAlign: 'middle'}}>add</i>
				<span className='ms-2'>Tambah</span>
			</button>
    	</div>
    )

    const bodyForm = (
		<div className="table-wrapper rounded-0 d-flex h-100" style={{border: '1px solid #dddddd', backgroundColor: '#dddddd'}}>
			<div className="w-100">
				<table className="excel-table">
	    			<thead>
    					<tr>
    						<th width="30px">No</th>
    						<th width="30px">Sequence</th>
    						<th width="30px">Code</th>
    						<th>Country Name</th>
    						<th width="30px">Currency</th>
	    					<th width="30px">Status</th>
    						<th width="30px">Action</th>
    					</tr>
    				</thead>
					<tbody>
						<tr>
							<td align='center'>*</td>
							<td className='bg-white' colSpan={6}>Data not found</td>
						</tr>
					</tbody>
	    		</table>
			</div>
    	</div>
    )

    const footers = (
		<div>
			<span className='p-1 px-2 small text-primary'>Row 0 to 0 of 0 Eow(s)</span>
    	</div>
    )

    if(token == null){
        return (
            <>
                <h1>Loading...</h1>
            </>
        )
    }else{
	    return(
    	    <Layout selectId={selectedId}>
        	    <StdForm
        	    	id={1}
					icon="grid_on"
        	    	caption="Country Codes"
        	    	toolbar={toolbarForm}
        	    	body={bodyForm}
        	    	footer={footers}
        	    />
				<CreateForm
					id="createHotel"
					size="modal-md"
				/>
				<div className="offcanvas offcanvas-end" tabIndex="-1" id="searchOptions" aria-labelledby="searchOptionsLabel">
					<div className="offcanvas-header">
						<h5 className="offcanvas-title" id="searchOptionsLabel">Search Options</h5>
						<button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
					</div>
					<div className="offcanvas-body">
						<hr />
						<button className="btn btn-outline-primary rounded-0">Lakukan Pencarian</button>
					</div>
				</div>
			</Layout>
	    )
	}
}

export default Index