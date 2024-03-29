import styles from "../styles/Header.module.css";
import { server } from "../lib/config";
import axios from "axios";
import { useContext, useState,useRef } from "react";
import {AppContext} from "../AppContext";
import {Link, useNavigate} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faSortDown,faGear,faArrowRightFromBracket,faAngleRight, faTimes } from '@fortawesome/free-solid-svg-icons'

export default function Header({showHomeLink}){

    const searchInputRef = useRef(null);
    const Navigate = useNavigate();
    const {user,setSearchValue,searchValue,showSearch,setShowSearch} = useContext(AppContext)
    const [showUserMenu,setShowUserMenu] = useState(false);

    const logout = ()=>{
        axios.get(`${server}/api/v1/logout`,{withCredentials:true})
        .then(_ => {
            window.location.replace("/");
        })
    }

    return <div className={styles.header}>
        {showHomeLink ?
        <div className={styles.home}><Link to="/">EasyNotes</Link></div>
        :
        <div className={`${styles.search} ${showSearch && styles.active}`}>
            {showSearch ?
            <FontAwesomeIcon icon={faTimes} onClick={()=> {
                setShowSearch(false)
                setSearchValue("")
                searchInputRef.current.focus();
            }}/>
            :
            <FontAwesomeIcon icon={faSearch} onClick={()=> setShowSearch(true)} />}
            <input type="text" ref={searchInputRef} autoComplete="false" name="text" placeholder="Search by note content or date ..." value={searchValue} onChange={(e)=> setSearchValue(e.target.value)} />
        </div>}

        <div className={`${styles.userProfile} ${showSearch && styles.hide}`} onMouseOver={()=> setShowUserMenu(true)}>
            <img src={`${server}/avaters/${user.image}`} />
            <FontAwesomeIcon icon={faSortDown} />
            <div className={`${styles.userMenu} ${showUserMenu && styles.active}`} onMouseLeave={()=> setShowUserMenu(false)}>
                <ul>
                    <li>
                        <img src={`${server}/avaters/${user.image}`} alt="" />
                        <h3>{user.username}</h3>
                        <FontAwesomeIcon icon={faGear} onClick={()=> Navigate("/settings")} />
                    </li>
                    <li>
                        <div className={styles.profile} onClick={()=> Navigate("/settings")}>
                        <h3>Profile</h3>
                        <p>Edit your profile</p>
                        </div>
                        <FontAwesomeIcon icon={faAngleRight} />
                    </li>
                    <li onClick={logout}><FontAwesomeIcon icon={faArrowRightFromBracket} /> Log out</li>
                </ul>
                <div className={styles.close} onClick={()=> setShowUserMenu(false)}>
                    <FontAwesomeIcon icon={faTimes} />
                </div>
            </div>
        </div>
    </div>
}