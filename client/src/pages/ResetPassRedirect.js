import styles from "../styles/pages/ResetPassRedirect.module.css";
import { useState } from "react"
import { server } from "../lib/config";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation,faSpinner,faCheck } from "@fortawesome/free-solid-svg-icons";
import useForm from "../lib/useForm";


export default function ResetPassRedirect(){

    const {token} = useParams();
    const [password,setPassword] = useState(null);
    const [confirmPass,setConfirmPass] = useState(null);
    const {error,success,loading,submitHandler} = useForm();

    const resetUserPassHandler = async (e)=>{
        e.preventDefault();
        const success = await submitHandler("patch",`${server}/api/v1/user/pass-reset?uri=${token}`,{newPassword:password,comfrimNewPass:confirmPass})
        if(success){
            window.location.replace("/login")
        }
    }

    return <div className={styles.main}>
    <div className={styles.body}>
        <h2>EasyNotes</h2>
        <form onSubmit={resetUserPassHandler}>
            <div className={styles.formControl}>
                <input type="password" placeholder="New password" onChange={(e)=> setPassword(e.target.value)} />
            </div>
            <div className={styles.formControl}>
                <input type="password" placeholder="Re-type password" onChange={(e)=> setConfirmPass(e.target.value)} />
            </div>
            {(error.status || success.status) && <div className={styles.msg}>
                {error.status && <><FontAwesomeIcon icon={faTriangleExclamation} /> {error.msg}</>}
                {success.status && <FontAwesomeIcon style={{color:"black"}} icon={faCheck} />}
            </div>}
            <button type="submit">{loading ? <FontAwesomeIcon className="fa-spin" icon={faSpinner} /> : "Submit"}</button>
        </form>
    </div>
</div>

}