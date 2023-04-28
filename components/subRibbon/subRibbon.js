import React, { useState } from 'react'
import Stylesheet from "reactjs-stylesheet"
import ImgButton from '../button/imgButton'
import tabMenu from '../menu.js'

const SubRibbon = ({loadMenu}) => {
    return (
        <div className='d-flex gap-1'>
            {loadMenu.map((menu) => (
                <React.Fragment key={menu.id}>
                    <ImgButton id={menu.id} caption={menu.caption} icon={menu.icon} type={menu.type} target={menu.target} />
                </React.Fragment>
            ))}
        </div>
    )

}

export default SubRibbon