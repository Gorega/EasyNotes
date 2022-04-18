import styles from "../styles/preLogin/form.module.css";
import Layout from "../components/preLogin/Layout";
import axios from "axios";
import { server } from "../config";
import { useState } from "react";
import useForm from "../components/lib/useForm";

export default function ResetPass(){
    const {error,success,loading,submitHandler} = useForm();
    const [email,setEmail] = useState(null);

    const sendResetMailHandler = (e)=>{
        e.preventDefault();
        return submitHandler(axios.post,
            `${server}/api/v1/user/email-reset-pass`,
            {email}),
            "",
            "a link has been sent to your email address"
    }

return <Layout
    formStatus={loading}
    formResult={{status:error.status,msg:success.msg || error.msg}}>

    <form onSubmit={sendResetMailHandler}>
        <p>To reset your password, enter your email below and submit. An email will be sent to you with instructions about how to complete the process.</p>
        <div className={styles.formControl}>
            <input type="email" placeholder="Email" onChange={(e)=> setEmail(e.target.value)} />
        </div>
        <div className={styles.msg}>
            {success.status && success.msg}
        </div>
        <button type="submit" className={styles.unique}>Submit</button>
    </form>
    </Layout>

}