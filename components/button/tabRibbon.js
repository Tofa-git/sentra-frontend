import Stylesheet from "reactjs-stylesheet"

const TabRibbon = ({id, id_active, labels, clickRibbon}) => {

    return (
        <>
            <button className='d-flex align-items-center hover-dark px-3' style={(id !== id_active) ? styles.tabRibbon : styles.tabRibbonActive} onClick={()=>clickRibbon(id)}>
            	<span className='small p-1'>{labels}</span>
            </button>
        </>
    )

}

export default TabRibbon

const styles = Stylesheet.create({
    tabRibbon: {
        border: 'none',
        backgroundColor: 'transparent',
        borderBottom: '4px solid transparent'
    },
    tabRibbonActive: {
        border: 'none',
        backgroundColor: 'transparent',
        borderBottom: '4px solid darkBlue',
    }
})