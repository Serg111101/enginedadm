import "./ContactUsInfo.scss"
import { useAppSelector,useAppDispatch } from "../../hooks"
import { editContactUsInfo, getFetchContactUs } from "../../store/action/ContactUsAction";
import { useEffect,useState } from "react";
import {
  CloseOutlined,
  EditOutlined,
  CheckSquareOutlined,

} from "@ant-design/icons";
import Swal from "sweetalert2";

export function ContactUsInfo() {
    const dispatch = useAppDispatch();

    const {ContactUs} = useAppSelector((state:any)=>state?.ContactUs);
    const [show,setShow] = useState(false);
    const [done,setDone] = useState(false);
    const [editValue,setEditValue] = useState<any>({});
    let LocalValue: any;
    if (localStorage.getItem("language")) {
      let local: any = localStorage.getItem("language");
      LocalValue = JSON.parse(local);
    }
 
    useEffect(()=>{
      dispatch(getFetchContactUs());
  },[dispatch]);
     
  const doneShow = sessionStorage.getItem("done");
  useEffect(() => {
    if (!doneShow) {
      setDone(false)
    }else{
      setDone(JSON.parse(doneShow));

    }

  }, [doneShow]);
  async function editContact(){
    await dispatch(editContactUsInfo(editValue));
    await dispatch(getFetchContactUs());
    setShow(false); 
  }

  async function validateAndEditContactUS() {
    if (!editValue?.title?.trim()||!editValue?.text?.trim()) {
      Swal.fire({
        title:(LocalValue==="AM"? 'չի կարող դատարկ լինել':"cannot be empty") ,
        icon: 'error',
        confirmButtonText:(LocalValue==="AM"? 'Լավ':"OK")})
    } else {
      await editContact();
    }
  }
 



 

    return (
        <div className='ContactUsInfo'>
            <div className='ContactUsInfoContainer'>
                { !show&& <p className='contactUsInfoParagraph' >{ContactUs[0]?.title}</p>}
             {   show && <div className='inputTitle'>
                <input type='text'
                 value={editValue?.title}
                onChange={(e)=>{setEditValue({
                    title:e.target.value,
                  text:editValue?.text,
                })}}
                 />
              </div>
            }

                {!show &&  <p className='contactUsInfoParagraphText'>
                {ContactUs[0]?.text}
                </p>}
                {
                    done&& !show&&
                    <div>
                        <EditOutlined
                        className="iconantd"
                        onClick={()=>{
                            setShow(true);
                            setEditValue({
                                title:ContactUs[0]?.title,
                                text:ContactUs[0]?.text
                            })
                        }}
                        />
                    </div>
                }

                {
              show && <div className='inputTitle'>
                <textarea 
                cols={48}
                rows={8}
                 value={editValue?.text}
                onChange={(e)=>{setEditValue({
                    title:editValue?.title,
                  text:e.target.value,
                })}}
                 />
                 <div className="closeOkButtons" >
                    <CloseOutlined
                    className="iconantd"
                    onClick={()=>{setShow(false)}}   
                    />
                 <CheckSquareOutlined
                 className="iconantd"
                 onClick={()=>{validateAndEditContactUS()}}
                 />
                 </div>

              </div>

            }

                
            </div>


        </div>

    )
}
