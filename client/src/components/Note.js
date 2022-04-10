import styles from "../styles/Note.module.css";
import { faCheck, faEdit,faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {server} from "../config";
import axios from "axios"
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../AppContext";
import AlertModal from "./AlertModal";

export default function Note({noteId,noteContent,noteDate,noteColor,existNote,addNote,closeNote}){
    const {setUpdateNoteStatus,setNNote} = useContext(AppContext)
    const [editStatus,setEditStatus] = useState(false);
    const [showAlertModal,setShowAlertModal] = useState(false);
    const [noteText,setNoteText] = useState(noteContent);

    const patchNote = ()=>{
        setUpdateNoteStatus(false)
        axios.patch(`${server}/api/v1/notes/update/${noteId}`,{content:noteText},{withCredentials:true})
        .then(res => {
            console.log(res)
            setEditStatus(false)
            setUpdateNoteStatus(true);
            setNoteText(noteText);
        })
        .catch(err => console.log(err));
    }

    const deleteNote = ()=>{
        if(closeNote){
            setNNote(false);
        }else{
            setUpdateNoteStatus(false)
            axios.delete(`${server}/api/v1/notes/delete/${noteId}`,{withCredentials:true})
            .then(res => {
                console.log(res)
                setShowAlertModal(false);
                setUpdateNoteStatus(true);
                setEditStatus(false);
            })
            .catch(err => console.log(err));
        }
    }

    useEffect(()=>{
        window.addEventListener("keyup",(e)=>{
            if(e.key == "Escape"){
                setNNote(false)
                setEditStatus(false)
            }
        })
    },[])

    return <div className={styles.note} style={{backgroundColor:noteColor}} noteId={noteId}>
        <div className={styles.text}>
        {editStatus ? <textarea autoFocus className={styles.inputText} type="text" value={noteText} onChange={(e)=> setNoteText(e.target.value)} />
        : 
        <p>{noteContent}</p>
        }
        </div>
        <div className={styles.footer}>
            <h4>{noteDate && noteDate.substring(0,10)}</h4>
            {existNote ? <div className={styles.control}>
                {editStatus ? <FontAwesomeIcon onClick={patchNote} icon={faCheck} /> : <FontAwesomeIcon icon={faEdit} onClick={()=> setEditStatus(true)} />}
            </div>
             :
            <div className={styles.control} onClick={addNote}><FontAwesomeIcon icon={faCheck} /></div>}
        </div>
        {(editStatus || closeNote) && <div className={styles.close} onClick={()=>setShowAlertModal(true)}>
            <FontAwesomeIcon icon={faTimes} />
        </div>}
        {showAlertModal
         &&
        <AlertModal
                onOk={deleteNote}
                onCancel={()=>setShowAlertModal(false)}
        />}
    </div>

}