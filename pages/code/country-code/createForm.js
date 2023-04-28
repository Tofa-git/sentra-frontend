import { useState } from 'react'
import { useRouter } from 'next/router'
import 'material-icons/iconfont/material-icons.css'

const CreateForm = (options) => {
	console.log(options)
    return(
		<div className="modal fade" id={options.id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div className={options.size+' modal-dialog'}>
				<div className="modal-content rounded-2 shadow">
					<div className="modal-header">
						<h1 className="modal-title fs-5" id={options.id+'Label'}>Add Country</h1>
						<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div className="modal-body p-3">
						<div className='row mt-2'>
							<div className='col-sm-4'>Sequence</div>
							<div className='col-sm-4'><input type='number' className='form-control rounded-0' name='sequence' /></div>
						</div>
						<div className='row mt-2'>
							<div className='col-sm-4'>Code</div>
							<div className='col-sm-8'><input type='text' className='form-control rounded-0' name='code' /></div>
						</div>
						<div className='row mt-2'>
							<div className='col-sm-4'>Country Name</div>
							<div className='col-sm-8'><input type='number' className='form-control rounded-0' name='name' /></div>
						</div>
						<div className='row mt-2'>
							<div className='col-sm-4'>Currency</div>
							<div className='col-sm-8'>
								<select className='form-select rounded-0' name='currency'>
									<option value="0" selected disabled>Choose Currency</option>
								</select>
							</div>
						</div>
					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-danger rounded-0" data-bs-dismiss="modal">Cancel</button>
						<button type="button" className="btn btn-primary rounded-0">Save changes</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CreateForm