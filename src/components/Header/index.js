import React from 'react';
import SideNav from "../SideNav";

function Header(props) {
    const { currentTab, setCurrentTab } = props;

    return (
        <header>
        <div>
            <SideNav
                currentTab={currentTab}
                setCurrentTab={setCurrentTab}
            ></SideNav>
            </div>
        </header>
    );
}

export default Header;