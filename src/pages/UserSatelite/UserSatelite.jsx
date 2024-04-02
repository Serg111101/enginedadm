import React, { useEffect, useState } from 'react';
import './UserSatelite.scss';
// import useAuth from '../../hooks/index';
import { useNavigate } from "react-router-dom"
// import LinksModal from '../../components/LinksModal/LinksModal';
import { EditOutlined, DeleteOutlined, ArrowRightOutlined, EyeFilled, CheckSquareOutlined, PlusCircleFilled, CloseCircleFilled } from '@ant-design/icons'
import axios from '../../axios/adminaxios';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addLinksSuperAdmin, deleteLinksSuperAdmin, editLinksSuperAdmin, getLinksSuperAdmin } from '../../store/action/LinksSuperAdmin';
import locale from 'antd/es/date-picker/locale/en_US';


const UserSatelite = () => {
  let URL = process.env.REACT_APP_BASE_URL
  let loacal;
  if (localStorage?.getItem('language')) {
    let languageLocal = localStorage?.getItem('language');
    loacal = JSON.parse(languageLocal)
  }
  const [selectVal, setSelectVal] = useState('');
  const [openLinks, setOpenLinks] = useState('')
  const [editLinks, setEditLink] = useState(false)
  const [image, setImage] = useState("");
  const [open, setOpen] = useState('');
  const [cameraLink, setCameraLink] = useState("")
  const [linkVal, setLinkVal] = useState("");

  // const { auth } = useAuth();
  const navigate = useNavigate()
  // const [showLinks,setShowLinks] = useState(false);
  const dispatch = useAppDispatch();

  const [linkValue, setLinkvalue] = useState([])
  const { LinksSuperAdmin} = useAppSelector((state) => state.LinksSuperAdmin);

  useEffect(() => {
    dispatch(getLinksSuperAdmin());
  
  }, [dispatch]);
  async function navigateTo(el) {
    if (el?.includes("http://")) {
      window.open(el, "_blank");

    } else {
      window.open("http://" + el, "_blank");
    }
    if (el?.includes("https://")) {
      window.open(el, "_blank")
    } else {
      window.open("http://" + el, "_blank");
    }
  }

  const handleSelectChange = (e,el) => {
    setLinkvalue([el?.cameraLinks,el?.spaceLinks])
    setSelectVal(e.target.value);
    // setShowLinks(true)
    // setLinkvalue([...linkValue,el?.cubesat_link,el?.camera_link])
    
};


async function navigateTo(el){
    if(el?.includes("http://")){
      window.open(el, "_blank");

    }else{
      window.open("http://"+el, "_blank");
    }
    if(el.includes("https://")){
      window.open(el, "_blank")
    }else{
      window.open("http://"+el, "_blank");
    }
  }
  
 useEffect(()=>{
    if(selectVal?.length>0){
        selectVal==="cubesatLInk"&& navigateTo(linkValue[0]);
        selectVal==="cameraLink"&& navigateTo(linkValue[1]);
        setSelectVal("")
        setLinkvalue([])
    }
 },[selectVal])
  async function uploadImageHandler(e) {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    if (formData.has("image")) {
      try {
        const response = await axios.post(`${URL}aeroSpace/addPicture`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });


        setImage(response?.data?.dirname);
      } catch (error) {
        return "Server request is failed";
      }
    }
  }
  async function addLinks() {
 
 await   dispatch(addLinksSuperAdmin({image:image,cameraLinks:cameraLink,spaceLinks:linkVal}))
  await  dispatch(getLinksSuperAdmin());
    setOpen(false)

  }
  async function edit(){
await dispatch(editLinksSuperAdmin(editLinks))
await dispatch(getLinksSuperAdmin());
await setEditLink('')
  }
  async function deleteItem(id){
   await dispatch(deleteLinksSuperAdmin(id))
   await dispatch(getLinksSuperAdmin());
 
      }
  return (
    <div className="UserSatelite">
      <button className='btn' onClick={() => navigate("/home")} > {loacal === "AM" ? "Հետ" : "Back"}</button>
      <div className="contaLink"> 
   {!open&&   <button className='addBtn' onClick={()=>{setOpen(true)}}>    <PlusCircleFilled className="iconantd" /></button>}

        {open && <div className='otherInput' >
          <div className="uploadImage">
            <input
              value={""}
              type="file"
              onChange={(e) => {
                uploadImageHandler(e);
              }}
              accept="image/*"
              id="filess2"
              name="filess2"
              style={{ display: "none" }}
            />

            {
              image?.length > 0 && <div className='cubesatImage' > <img src={image} alt='cubesat image' /></div>
            }
            <div className='uploadButton' > {image?.length > 0 ? (
              <>
                <CloseCircleFilled className="iconantd" onClick={() => { setImage("") }} />
              </>

            ) : (
              <label htmlFor="filess2">
                <PlusCircleFilled className="iconantd" style={{display:"block",background:"none"}} />
                {loacal === 'AM' ? "Ավելացրեք արբանյակի նկար" : 'Add a satellite image'}
              </label>
            )}
            </div>

          </div>
          {image?.length > 0 && <div className='inputContainer' >
            <div>
              <label htmlFor="linkVal">{loacal === 'AM' ? "Ավելացրեք արբանյակի հղում" : 'Add a satellite link'}</label>
              <input type='text' id='linkVal' name='linkVal' value={linkVal} onChange={(e) => { setLinkVal(e.target.value) }} />
            </div>

            <div>
              <label htmlFor="cameraLinkVal">{loacal === 'AM' ? "Ավելացրեք տեսախցիկի հղում" : 'Add a camera link'}</label>
              <input type='text' id='cameraLinkVal' name='cameraLinkVal' value={cameraLink} onChange={(e) => { setCameraLink(e.target.value) }} />
            </div>




          </div>}





          <div className="contaButton">
            <button className='button' onClick={() => { setOpen(false) }} >{loacal === 'AM' ? "Հետ" : 'go back'}</button>
            <button className='button' onClick={() => { addLinks() }} >{loacal === 'AM' ? "Պահպանել" : 'Save'}</button>
          </div>
        </div>}
        {editLinks && 
        <div className='otherInput'>
        <div className='cubesatImage'> <img  src={image || editLinks?.image} alt="Edited image" />
            <div className='uploadButton' > {image?.length > 0 ? (
                <>
                    <CloseCircleFilled className="iconantd" onClick={() => { setImage("") }} />
                </>

            ) : (
                <label htmlFor="filess2">
                    <PlusCircleFilled className="iconantd" />
                </label>
            )}


                <input
                    value={""}
                    type="file"
                    onChange={(e) => {
                        uploadImageHandler(e);
                    }}
                    accept="image/*"
                    id="filess2"
                    name="filess2"
                    style={{ display: "none" }}
                />

            </div>

        </div>
        <div className='inputContainer' >
            <div>
                <label htmlFor="linkVal">{locale === 'AM' ? "Ավելացրեք արբանյակի հղում" : 'Add a satellite link'}</label>
                <input type='text' name='linkVal' id='linkVal' value={editLinks?.spaceLinks} onChange={(e) => { setEditLink({ ...editLinks, spaceLinks: e.target.value }) }} />

            </div>
            <div>
                <label htmlFor="cameraLinkVal">{locale === 'AM' ? "Ավելացրեք տեսախցիկի հղում" : 'Add a camera link'}</label>
                <input type='text' id='cameraLinkVal' name='cameraLinkVal' value={editLinks?.cameraLinks} onChange={(e) => { setEditLink({ ...editLinks, cameraLinks: e.target.value }) }} />
            </div>
        </div>


        <div className="contaButton">
            <button className='button' onClick={() => { setEditLink(false); setLinkVal("") }} >{locale === 'AM' ? "Հետ" : 'go back'}</button>
            <button className='button' onClick={() => { edit(); }} >Save</button>
        </div>

    </div>}
        {<div className='ClassTable'>
          
        </div>}
        <div className='AllLinks'>
      {!open && !editLinks && LinksSuperAdmin?.map((el, i) => (
                    <div className="linksContainer" key={i}>
                        { el.spaceLinks && el.image &&<div className="item">
                            <div onClick={()=>{!el?.cameraLinks?.length&&navigateTo(el?.spaceLinks)}} className="imageDiv">
                                {<img  src={el?.image} alt="picture with cubesat" />}
                            </div>
                            <div className="selectDiv">
                                {el?.cameraLinks?<select onChange={(e)=>handleSelectChange(e,el)}>
                                    <option  hidden>
                                    {loacal ==="AM" ? "Ընտեք հղման տեսակը":"Select the link type"}
                                    </option>
                                    <option  value="spaceLinks">{loacal==="AM" ? "Արբանյակի կառավարում":"Satelite control"}</option>
                                    <option value="cameraLinks">{loacal==="AM" ? "Տեսախցիկ":"Camera"}</option>
                                </select>
                                :
                                <div>
                                    <button onClick={()=>{navigateTo(el?.spaceLinks)}} >{loacal==="AM" ? "Արբանյակի կառավարում":"Satelite control"}</button>

                                </div>  
                              
                              }
                            </div>
                        </div>}
                        <div className="contaButton" >
                        <button onClick={()=>{setEditLink(el)}}><EditOutlined className="iconantd" /></button>
                        <button onClick={()=>{deleteItem(el.id)}}><DeleteOutlined className="iconantd" /></button>
                        </div>
                    </div>
                ))} 
                </div>
        {/* {selectVal === "cubesatLInk"&&<LinksModal showLinks={showLinks} setShowLinks={setShowLinks} state={linkValue} selectVal={selectVal} />}
            {selectVal === "cameraLink"&&<LinksModal showLinks={showLinks} setShowLinks={setShowLinks} state={linkValue} selectVal={selectVal} />} */}
      </div>

    </div>
  );
};

export default UserSatelite;
