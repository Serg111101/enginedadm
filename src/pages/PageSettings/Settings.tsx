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
  const dispatch = useAppDispatch();
  const [item, setItem] = useState<any>("Teacher");
 
 
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
  let LocalValue:any;
  if(localStorage.getItem("language")){
      let local:any = localStorage.getItem("language");
      LocalValue = JSON.parse(local);  
  }
  const handleMenuItemClick = (itemName: string) => {
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
      {[
        "Teacher", 'Home', 'Header', 'HomeNextRoute', 'HomeAuthorComponent',
        // 'HomeInfo',
         'ContactUSInfo', 'Contact', 
        'Info',
        'AboutTeam', 'AboutPerson', 'Lessons',"Satelite", 'Footer'
      ].map(menuItem => (
        <p
        key={menuItem}
        className={item === menuItem ? 'active' : ''}
        onClick={() => handleMenuItemClick(menuItem)}
      >
        {menuItem}
      </p>
      ))}
      <div><CloseOutlined className="iconantd" onClick={() => setMenuOpen(false)} /></div>
    </div>
      <div className='eiement'>
        {item === 'Home' && <HomeHeader /> }
        <div className='homePageBottom' style={{ backgroundImage: `url(${Background})` }}>
           {item === 'Header' && <EditHeader />}
          {item === 'Teacher' && <Teacher/>}
          {item === 'HomeNextRoute' && <HomeNextRoute />}
          {item === 'HomeAuthorComponent' && <HomeAuthorComponent />}
          {/* {item === 'HomeInfo' && <HomeInfo />} */}
          {item === "ContactUSInfo" && <ContactUsInfo/>}
          {item === 'Contact' && <Contact />}
          {item === 'Info' && <Info />}
          {item === 'AboutTeam' && <AboutTeam />}
          {item === 'AboutPerson' && <AboutPerson  />}
          {item === 'Lessons' && <LessonEdit />}
          {item === "Satelite" && <Satellites/>}
          {item === 'Footer' && <EditFooter/>}

        </div>
      </div>
    </div>
  );
};
