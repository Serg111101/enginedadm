import { AboutPersons } from "../../components/AboutPersons/AboutPersons";
import { AboutTeam } from "../../components/AboutTeam/AboutTeam";
import { getAboutOutTeam, getFetchAbout } from "../../store/action/AboutAction";
import "./About.scss";
import { useEffect, useState } from "react";
import { useAppDispatch,useAppSelector } from '../../hooks';
import { getFetchLogo } from "../../store/action/LogoAction";
import { getfetchHomeAuthor } from "../../store/action/HomeAction";


export function About() {
  const { HomeAuthor } = useAppSelector((state:any) => state?.HomeAuthor); 
  const {About} = useAppSelector((state:any)=>state.About);

  const Background = HomeAuthor?.logo;
  const [show,setShow] = useState<boolean>(false);
  

  const dispatch = useAppDispatch()
  useEffect(()=>{
    dispatch(getFetchAbout());
    dispatch(getAboutOutTeam());
    dispatch(getFetchLogo());
    dispatch(getfetchHomeAuthor());
  },[dispatch])
  const id:any = "linkIdentifikator"

  
  return (
    <>
    {
   
      
      <div className="about" style={{ backgroundImage: `url(${Background})`}}>
        
      <h1 className="aboutTitle" >{About[About.length - 1]?.title}</h1>
      {
    
    !sessionStorage.getItem('friend')&&<div className="componentTheam" > <AboutTeam show={show} setShow = {setShow} id = {id}/></div>
      }
      {
    
    (sessionStorage.getItem('friend')||show) &&  <div className="personComponent" >  <AboutPersons id={id} show={show} setShow = {setShow} /> </div>
   }
   
    </div>
    }
   
   </>

  );
}
