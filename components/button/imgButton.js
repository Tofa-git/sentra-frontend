import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import Stylesheet from "reactjs-stylesheet"
import tabMenu from '../menu.js'

const ImgButton = ({id, caption, icon, type, subMenu, target}) => {
    const [buildSubMenu, setBuildSubMenu] = useState([])

    const subMenus=(refid)=>{
        const renderSubMenu = tabMenu.filter(menus => menus.headid.includes(refid))
        setBuildSubMenu(renderSubMenu)
    }

    useEffect(() => {
        subMenus(id)
    }, [])

    return (
        <>
            {
                {
                    1:  <Link href={target ?? '/#'} className='border d-flex align-items-center hover-dark p-1 px-2' style={styles.imgButton}>
                            <i className="material-icons fs-6 text-secondary">{icon}</i>
                            <span className='ms-2 small text-secondary'>{caption}</span>
                        </Link>,
                    2:  (
                        <div className="btn-group">
                            <button className="dropdown-toggle border d-flex align-items-center hover-dark p-1 px-2" style={styles.imgButton} data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="material-icons fs-6 text-secondary">{icon}</i>
                                <span className='ms-2 small text-secondary'>{caption}</span>
                            </button>
                            <ul className="dropdown-menu shadow-sm">
                                {buildSubMenu.map((menu) => (
                                        {
                                        1:  <React.Fragment key={menu.id}>
                                                <li><Link href={menu.target ?? '/#'} className="dropdown-item small">{menu.caption}</Link></li>
                                            </React.Fragment>,
                                        3:  <React.Fragment key={menu.id}>
                                                <li><hr className="dropdown-divider" /></li>
                                            </React.Fragment>

                                        }[menu.type]
                                ))}
                            </ul>
                        </div>),
                    3: <div style={{borderLeft: '1px solid #aaaaaa', margin: '0px 3px'}}></div>
                }[type]
            }
        </>
    )

}

export default ImgButton

const styles = Stylesheet.create({
    imgButton: {
        border: 'none',
        backgroundColor: 'transparent'
    },
})