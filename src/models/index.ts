export interface IAboutOurTeam  {
  created_at:string,
  id:number,
  image:string | undefined;
  name:string,
  text:string
};

export  interface IAbout  {
  created_at:string,
  id:number,
  image:string | undefined;
  title:string | null | any,
  mare:string | null
  text:string | null | any,
  more:string | null
};

export interface IContact  {
  color:string | null;
  created_at:string,
  id:number,
  logo:string | undefined
  text:string,
  title:string,
  link:string,
};
export interface IContactUS  {
  color:string | null;
  created_at:string,
  id:number,
  logo:string | undefined
  text:string,
  title:string,
};

export interface IFooter{
  title: string,
  text: string | null | undefined,
  logo: string,
  created_at: string,
  updated_at: string,
};

export interface IHeader  {
  created_at:string,
  id:number,
  title:string,
  link:string,
};

export interface IHomeAuthor  {
  color:string | null;
  created_at:string,
  id:number,
  logo:string,
  text:string | null,
  title:string,
};


export interface IHomeHeader  {
  color:string | null;
  created_at:string,
  id:number,
  logo:string ,
  text:string | null,
  title:string,
};

export interface IHomeInfo  {
  color:string | null;
  created_at:string,
  id:number,
  logo:string ,
  text:string | null,
  title:string,
  readmore:string
};

export interface IHomeNextRout  {
  color:string | undefined ;
  created_at:string,
  id:number,
  logo:string,
  text:string | null,
  title:string,
};
export interface ILectures  {
  background:string | null;
  color:string | undefined,
  created_at:string,
  lectures:[{
    color:string,
    text:string,
  }],
  title:string,
 
};


export interface ILectursLec{
  
    color:string | undefined,
    text:string,
  
}
export interface ILesson  {
  id:number,
  background:string | null;
  color:string | undefined,
  created_at:string,
  icon:string,
  ikonka:string,
  lectures:any[]
  lesson:string,
  button:boolean
};

export interface ILoginStyle {
  buttonBg_color:  string
  created_at:string
  id: number
  loginBg_color:string
  login_color:string
  login_title:string
  password_title:string
  registration_title:string
  remember_title:string
  signIn_title:string
  signUp_title:string
  title:string
  updated_at:string
};

export interface ILogo  {
  color:string | null;
  created_at:string,
  id:number,
  logo:string,
  text:string | null,
  title:string,
};

export interface IMail  {
  succes:boolean,
  info_response:string, 
 };

 export interface IQuiz  {
  background:string,
  correntAnswer:string,
  created_at:string,
  id:number,
  incorrectAnswet:string[],
  lesson:string,
  question:string,
};

export interface ISlide  {
  created_at:string,
  id:number,
  image:string | null;
  lectures:string,
  lessons:string | null,
  text1:string | null,
  text2:string | null,
  text3:string | null,
  button:[]|null,
  text_arr:[],
  text_arr_margin:[],
  slides:string[],
};

export interface ISendMail {

  text: string,
  title: string,
}

export interface ITeacher
  {
  id:number
  position:string,
  name:string,
  login:string,
  password:string,
  fullName:string,
  role:string,
  info:string,
  school:string,
  links:any | any[],
  updated_at:string,
  created_at:string,
};