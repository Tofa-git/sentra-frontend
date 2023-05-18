import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import Stylesheet from "reactjs-stylesheet";
import TabRibbons from "../button/tabRibbon";
import SubRibbon from "../subRibbon/subRibbon";
import tabMenu from "../menu.js";
import { AuthContext } from "../../context/auth/reducer";
import { AUTH_LOGOUT } from "../../context/constant";

const Ribbons = (props) => {
  const router = useRouter();
  const { dispatch } = useContext(AuthContext);
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
      <div
        className="d-flex flex-row shadow-sm p-0 px-2 justify-content-between"
        style={styles.containerRibbon}
      >
        <div className="d-flex flex-row flex-fill">
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
        <button
          onClick={() => {
            localStorage.removeItem("AUTH_TOKEN");
            dispatch({ type: AUTH_LOGOUT });
            router.push("/authentication/login");
          }}
          className="btn btn-sm btn-primary bg-blue rounded shadow-sm mt-1 mt-1"
        >
          Logout
          <i
            className="material-icons fs-6 ms-2"
            style={{ verticalAlign: "middle" }}
          >
            logout
          </i>
        </button>
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
    maxHeight: "40px",
    minHeight: "30px",
    backgroundColor: "#eeeeee",
  },
  containerSubRibbon: {
    backgroundColor: "white",
    borderBottom: "1px solid #aaaaaa",
  },
});
