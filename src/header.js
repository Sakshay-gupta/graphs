import React from "react";

const Header = () =>{
    return(
        <>
        <div className={`nav-cont `}>
                <span className={`nav-elem-1 active`} >Page 1</span>
                <span className={`nav-elem-2`} >Page 5</span>
        </div>
        <div className="app_container">
            <div className={`nav-cont `}>
                <span className={`nav-elem-1 active`}>Foundation</span>
                <span className={`nav-elem-2 `}>Primer</span>
                <span className={`nav-elem-3 `}>Eye Shadow</span>
            </div>
            <div className={`nav-cont `}>
                <span className={`nav-elem-1 `}><i>Launch Tracker</i></span>
                <span className={`nav-elem-2 active`}><i>Detailed Tracker</i></span>
            </div>
        </div>
        </>

    )
}

export default Header;