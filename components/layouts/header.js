const Headers = () => {
    return (
        <>
            <div className='d-flex headerBlue m-0 p-0'>
            	<a className="d-flex align-items-center hover-dark btn btn-primary bg-transparent rounded-0 shadow-none p-2" style={{border: 'none'}} data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
            		<i className="material-icons">apps</i>
            	</a>
                <label className='p-0 d-flex align-items-center px-2 cursor-default'>
                    <span className='small m-0 p-0 text-light fs-6'>Extra-Net Solution Network (ESN)</span>
                </label>
            </div>
            <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
	            <div className="offcanvas-header">
	            	<h5 className="offcanvas-title" id="offcanvasExampleLabel">Offcanvas</h5>
	            	<button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
	            </div>
	            <div className="offcanvas-body">
	            	<div>
	            		Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.
	            	</div>
	            	<div className="dropdown mt-3">
	            		<button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">Dropdown button</button>
	            		<ul className="dropdown-menu">
	            			<li><a className="dropdown-item" href="#">Action</a></li>
	            			<li><a className="dropdown-item" href="#">Another action</a></li>
	            			<li><a className="dropdown-item" href="#">Something else here</a></li>
	            		</ul>
	            	</div>
	            </div>
	        </div>
        </>
    )

}

export default Headers