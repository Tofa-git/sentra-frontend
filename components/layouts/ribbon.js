import React, { useState } from "react";
import Stylesheet from "reactjs-stylesheet";
import TabRibbons from "../button/tabRibbon";
import SubRibbon from "../subRibbon/subRibbon";
import tabMenu from "../menu.js";

const Ribbons = (props) => {
  const [selectId, setSelectId] = useState(props.selected);
  const [buildMenu, setBuildMenu] = useState(
    tabMenu.filter((menus) => menus.refid.includes(selectId))
  );

  const clickRibbon = (el) => {
    setSelectId(el);
    const renderMenu = tabMenu.filter((menus) => menus.refid.includes(el));
    setBuildMenu(renderMenu);
  };

  return (
    <>
      <div className="d-flex shadow-sm p-0 px-2" style={styles.containerRibbon}>
        <TabRibbons
          labels="Home"
          id="001"
          id_active={selectId}
          clickRibbon={clickRibbon}
        />
        <TabRibbons
          labels="Basic"
          id="002"
          id_active={selectId}
          clickRibbon={clickRibbon}
        />
        <TabRibbons
          labels="Management"
          id="003"
          id_active={selectId}
          clickRibbon={clickRibbon}
        />
        <TabRibbons
          labels="Statistic"
          id="004"
          id_active={selectId}
          clickRibbon={clickRibbon}
        />
        <TabRibbons
          labels="Member"
          id="005"
          id_active={selectId}
          clickRibbon={clickRibbon}
        />
      </div>
      <div className="p-1" style={styles.containerSubRibbon}>
        <SubRibbon loadMenu={buildMenu} />
      </div>
    </>
  );
};

export default Ribbons;

const styles = Stylesheet.create({
  containerRibbon: {
    maxHeight: "30px",
    minHeight: "30px",
    backgroundColor: "#eeeeee",
  },
  containerSubRibbon: {
    backgroundColor: "white",
    borderBottom: "1px solid #aaaaaa",
  },
});
