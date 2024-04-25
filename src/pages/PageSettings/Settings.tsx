import  { useState, useEffect, useRef } from 'react';
import './Settings.scss';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  getfetchContact,
  getfetchHomeAuthor,
  getfetchHomeHeader,
  getfetchHomeInfo,
  getfetchHomeNextRout
} from '../../store/action/HomeAction'; 
import {
  CloseOutlined,
} from "@ant-design/icons";
import { HomeHeader } from '../../components/HomeHeader/HomeHeader';
import { HomeNextRoute } from '../../components/HomeNextRoute/HomeNextRoute';
import { HomeAuthorComponent } from '../../components/HomeAuthorComponent';
// import { HomeInfo } from '../../components/HomeInfo/HomeInfo';
import { Contact } from '../../components/Contact/Contact';
import { Info } from '../../components/Info';
import { getFetchFooter } from '../../store/action/FooterAction';
import { AboutTeam } from '../../components/AboutTeam';
import { getFetchLogo } from '../../store/action/LogoAction';
import { ContactUsInfo } from '../../components/ContactUsInfo';
import { EditHeader } from '../../components/EditHeader';
import { EditFooter } from '../../components/EditFooter';
import { LessonEdit } from '../../components/LessonEdit';
import { Satellites } from '../Satellites';
import { Teacher } from '../../components/Teacher';
import { AboutPerson } from '../AboutPerson';


export const Settings = () => {
  let LocalValue:any;
  if(localStorage.getItem("language")){
      let local:any = localStorage.getItem("language");
      LocalValue = JSON.parse(local);  
  }
  const arr = LocalValue === "AM"? [
    "ՈՒսուցիչ", 'Գլխավոր', 'Վերնագիր', 'Մեր ծրագրերը', 'Մեջբերեում',
    // 'HomeInfo',
     'Կապ', 'Կապ էլ․փոստի միջոցով', 
    'ՏԵղեկատու',
    'Մեր մասին', 'Մեր թիմը', 'Դասընթացներ',"Արբանյակ", 'Էջատակ'
  ] : [
    "Teacher","Home","Header","Our Programs","Qoutation",
    // "HomeInfo",
    "Contact us","Contact via E-mail","Info","About us","Our Team","Lessons","Satelite","Footer"
  ]
  const dispatch = useAppDispatch();
  const [item, setItem] = useState<any>(0);
  
 
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const getItem = sessionStorage.getItem('settings');

  useEffect(() => {
    if (getItem) {
      const storedItem = JSON.parse(sessionStorage.getItem('settings') || "");
      setItem(storedItem);
      

    } else {
      sessionStorage.setItem('settings', JSON.stringify(item));
    }
  }, [getItem,item]);
  
  useEffect(() => {
    dispatch(getFetchLogo());
    dispatch(getfetchHomeHeader());
    dispatch(getfetchHomeNextRout());
    dispatch(getfetchHomeAuthor());
    dispatch(getfetchHomeInfo());
    dispatch(getfetchContact());
    dispatch(getFetchFooter());
  }, [dispatch]);

  const { HomeAuthor } = useAppSelector((state: any) => state.HomeAuthor);
  const Background = HomeAuthor?.[0]?.logo;

  const handleMenuItemClick = (itemName: number) => {
    setItem(itemName);
    setMenuOpen(false);
    sessionStorage.setItem('settings', JSON.stringify(itemName));
  };


  return (
    <div className='setting'>
    <button className='menu-button' onClick={() => setMenuOpen(!menuOpen)}>
    {LocalValue==="AM"?"Ցանկ":"Menu"}  
    </button>
    <div className={`menu ${menuOpen ? 'open' : ''}`} ref={menuRef}>
      {arr.map((menuItem,index) => (
        <p
        key={menuItem}
        className={item === index ? 'active' : ''}
        onClick={() => handleMenuItemClick(index)}
      >
        {menuItem}
      </p>
      ))}
      <div><CloseOutlined className="iconantd" onClick={() => setMenuOpen(false)} /></div>
    </div>
      <div className='eiement'>
        <div className='homePageBottom' style={{ backgroundImage: `url(${Background})` }}>
          {item === 0 && (LocalValue === "AM"?"ՈՒսուցիչ":'Teacher') && <Teacher/>}
          {item === 1 && (LocalValue === "AM"? "Գլխավոր": 'Home') && <HomeHeader /> }
          {item === 2 &&(LocalValue === "AM"?"Վերնագիր":'Header') && <EditHeader />}
          {item === 3 && (LocalValue === "AM"?"Մեր ծրագրերը":'Our Programs') && <HomeNextRoute />}
          {item === 4 && (LocalValue === "AM"?"Մեջբերեում":'Qoutation') && <HomeAuthorComponent />}
          {/* {item === 'HomeInfo' && <HomeInfo />} */}
          {item === 5 && (LocalValue === "AM"?"Կապ":"Contact us") && <ContactUsInfo/>}
          {item === 6 && (LocalValue === "AM"? "Կապ էլ․փոստի միջոցով" : 'Contact via E-mail') && <Contact />}
          {item === 7 && (LocalValue === "AM"?"ՏԵղեկատու":'Info') && <Info />}
          {item === 8 && (LocalValue === "AM"?"Մեր մասին":'About us') && <AboutTeam />}
          {item === 9 && (LocalValue === "AM"?"Մեր թիմը":'Our Team') && <AboutPerson  />}
          {item === 10 && (LocalValue === "AM"?"Դասընթացներ":'Lessons') && <LessonEdit />}
          {item === 11 && (LocalValue === "AM"?"Արբանյակ":"Satelite") && <Satellites/>}
          {item === 12 && (LocalValue === "AM"?"Էջատակ":'Footer') && <EditFooter/>}

        </div>
      </div>
    </div>
  );
};
