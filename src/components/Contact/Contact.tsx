import  { useEffect, useState } from "react";
import "./Contact.scss";
import { Input, Form, Button } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useAppDispatch,useAppSelector } from "../../hooks";
import {  editSendMail, getfetchSendMail } from "../../store/action/HomeAction";
import {
  CloseOutlined,
  EditOutlined,
  CheckSquareOutlined,
} from "@ant-design/icons";
import Swal from "sweetalert2";

export function Contact() {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const {SendMail} = useAppSelector((state)=>state.SendMail);
  const [language,setLanguage] = useState<any>();
  const [show,setShow] = useState(0);
  const [editValue,setEditValue] = useState<any>({});
  const [done,setDone] = useState(false);
  const [index,setIndex] = useState<any>();
  let LocalValue: any;
  if (localStorage.getItem("language")) {
    let local: any = localStorage.getItem("language");
    LocalValue = JSON.parse(local);
  }
  useEffect(()=>{
    dispatch(getfetchSendMail())
  },[dispatch])

  const doneShow = sessionStorage.getItem("done");
  useEffect(() => {
    if (!doneShow) {
      setDone(false)
    }else{
      setDone(JSON.parse(doneShow));

    }

  }, [doneShow]);


  
  const lang = localStorage.getItem("language");
  useEffect(()=>{
    if(lang){
      setLanguage(JSON.parse(lang));
    }

  },[lang]);
  async function contactEdit(){
    await dispatch(editSendMail(index,editValue));
    await dispatch(getfetchSendMail());
    setShow(0)
    setIndex(-1);

  }

  async function validateAndEditContact() {
    let editTitileError=editValue?.text !==undefined ? editValue?.text?.trim():true
    
    if ( !editTitileError||!editValue?.title?.trim()) {
      Swal.fire({
        title:(LocalValue==="AM"? 'Չի կարող դատարկ լինել':"Cannot be empty") ,
        icon: 'error',
        confirmButtonText:(LocalValue==="AM"? 'Լավ':"OK")})
    } else {
      await contactEdit();
      
    }
  }
 

  return (
    
    <div className="contact">
      <div className="container_contact">
        {show!==1&&<h1>{SendMail[0]?.title}</h1>}
        {show === 1 && (
                <div className="inputTextTitle">
                  <input
                    type={"text"}
                    value={editValue?.title}
                    onChange={(e) => {
                      setEditValue({

                        title: e.target.value,
                        text: editValue?.text,
                      });
                    }}
                  />
                </div>
              )}
        {show!==1&&<p>{SendMail[0]?.text}</p>}
        {show === 1 && (
                <div className="inputTextTitle">
                  <input
                    type={"text"}
                    value={editValue?.text}
                    onChange={(e) => {
                      setEditValue({
                        title: editValue?.title,
                        text: e.target.value,
                      });
                    }}
                  />
                  <div className="okCloseButtons" >
                  <CloseOutlined className="iconantd" onClick={()=>{setShow(0);setIndex(0)}}/>
                   <CheckSquareOutlined className="iconantd" onClick={()=>{ validateAndEditContact()}}/>
                  </div>
                </div>
              )
              }
              {done && show !== 1 && (
                <div className="editAuthorButton">
                  <EditOutlined
                    className="iconantd"
                    onClick={() => {
                      setEditValue({
                        title: SendMail[0]?.title,
                        text: SendMail[0]?.text,
                      });
                      setShow(1);
                      setIndex(0)
                    }}
                  />
                </div>
              )}


        <div className="inputs" id="inputs">
          <Form
            form={form}
            name="basic"
            autoComplete="off"
            
          >
            <div className="top_input">
              <div>
                {show !==2 && <label>{SendMail[1]?.title}</label>}
                {show === 2 && (
                <div className="inputText">
                  <input
                    type={"text"}
                    value={editValue?.title}
                    onChange={(e) => {
                      setEditValue({

                        title: e.target.value,
                        text: editValue?.text,
                      });
                    }}
                  />
                </div>
              )}

               {show !== 2 &&<Form.Item
                  name="email"
                  rules={[{ required: true, message:language ==="AM"? "Պարտադիր դաշտ !" :"Required" }]}
                >
                  <Input
                    type="email"
                    placeholder={SendMail[1]?.text}
                  />
                </Form.Item>}
                {show === 2 && (
                <div className="inputText">
                  <input
                    type={"text"}
                    value={editValue?.text}
                    placeholder="Placeholder Value"
                    onChange={(e) => {
                      setEditValue({
                        title: editValue?.title,
                        text: e.target.value,
                      });
                    }}
                  />
                     <div className="okCloseButtons" >
                  <CloseOutlined className="iconantd" onClick={()=>{setShow(0);setIndex(0)}}/>
                  <CheckSquareOutlined className="iconantd" onClick={()=>{ validateAndEditContact()}}/>
                  </div>
                </div>
              )}
              {done && show !== 2 && (
                <div className="editAuthorButton">
                  <EditOutlined
                    className="iconantd"
                    onClick={() => {
                      setEditValue({
                        title: SendMail[1]?.title,
                        text: SendMail[1]?.text,
                      });
                      setShow(2);
                      setIndex(1)
                    }}
                  />
                </div>
              )}



              </div>
              <div>
                {show !== 3 && <label>{SendMail[2]?.title}</label>}
                {show === 3 && (
                <div className="inputText">
                  <input
                    type={"text"}
                    value={editValue?.title}
                    onChange={(e) => {
                      setEditValue({
                        title: e.target.value,
                        text: editValue?.text,
                      });
                    }}
                  />
                </div>
              )}
               {show!==3 && <Form.Item
                  name="userName"
                  rules={[{ required: true, message:language==="AM"? "Պարտադիր դաշտ !" :"Required" }]}
                >
                  <Input
                    type="text"
                    placeholder={SendMail[2]?.text}
                  />
                </Form.Item>}
                {show === 3 && (
                <div className="inputText">
                  <input
                    type={"text"}
                    value={editValue?.text}
                    placeholder="Placeholder Value"
                    onChange={(e) => {
                      setEditValue({
                        title: editValue?.title,
                        text: e.target.value,
                      });
                    }}
                  />
                  <div className="okCloseButtons" >
                
                  <CloseOutlined className="iconantd" onClick={()=>{setShow(0);setIndex(0)}}/>
                  <CheckSquareOutlined className="iconantd" onClick={()=>{ validateAndEditContact()}}/>
                  </div>
                </div>
              )}
 {done && show !== 3 && (
                <div className="editAuthorButton">
                  <EditOutlined
                    className="iconantd"
                    onClick={() => {
                      setEditValue({
                        title: SendMail[2]?.title,
                        text: SendMail[2]?.text,
                      });
                      setShow(3);
                      setIndex(2)
                    }}
                  />
                </div>
              )}

              </div>
            </div>
            <div className="bottom_input">
              {show !==4 && <label>{SendMail[3]?.title}</label>}
              {show === 4 && (
                <div className="inputText">
                  <input
                    type={"text"}
                    value={editValue?.title}
                    onChange={(e) => {
                      setEditValue({
                        title: e.target.value,
                        text: editValue?.text,
                      });
                    }}
                  />
                </div>
              )}
              
            {show !==4 &&  <Form.Item
                name="textarea"
                rules={[{ required: true, message:language==="AM"? "Պարտադիր դաշտ" :"Required" }]}
              >
                <TextArea
                  rows={8}
                  cols={8}
                  maxLength={130}
                  placeholder={SendMail[3]?.text}
                  className="textareaContact"
                />
              </Form.Item>}
              {show === 4 && (
                <div className="inputText">
                  <input
                    type={"text"}
                    value={editValue?.text}
                    placeholder="Placeholder Value"
                    onChange={(e) => {
                      setEditValue({
                        title: editValue?.title,
                        text: e.target.value,
                      });
                    }}
                  />
                  <div className="okCloseButtons" >
                  <CloseOutlined className="iconantd" onClick={()=>{setShow(0);setIndex(0)}}/>
                     <CheckSquareOutlined className="iconantd" onClick={()=>{ validateAndEditContact()}}/>
                  </div>

                </div>
              )}
                {done && show !== 4 && (
                <div className="editAuthorButton">
                  <EditOutlined
                    className="iconantd"
                    onClick={() => {
                      setEditValue({
                        title: SendMail[3]?.title,
                        text: SendMail[3]?.text,
                      });
                      setShow(4);
                      setIndex(3)
                    }}
                  />
                </div>
              )}

            </div>
            <Form.Item className="message_submit">
              { show !==5 && <Button htmlType="submit">{SendMail[4]?.title}</Button>}
              
              {show === 5 && (
                <div className="inputText">
                  <input
                    type={"text"}
                    value={editValue?.title}
                    onChange={(e) => {
                      setEditValue({
                        title: e.target.value,
                      });
                    }}
                  />
                  <div className="okCloseButtons" >
                  <CloseOutlined className="iconantd" onClick={()=>{setShow(0);setIndex(0)}}/>
                  <CheckSquareOutlined className="iconantd" onClick={()=>{ validateAndEditContact()}}/>
                  </div>
                </div>
              )}
              {done && show !== 5 && (
                <div className="editAuthorButton">
                  <EditOutlined
                    className="iconantd"
                    onClick={() => {
                      setEditValue({
                        title: SendMail[4]?.title,
                      });
                      setShow(5);
                      setIndex(4)
                    }}
                  />
                </div>
              )}
            </Form.Item>

              
             { done && <div className="resonseMessage">
                { show !== 6 && SendMail[5]?.title}

                {show === 6 && (
                <div className="inputTextTitle">
                  <input
                    type={"text"}
                    value={editValue?.title}
                    onChange={(e) => {
                      setEditValue({
                        title: e.target.value,
                        text: editValue?.text,
                      });
                    }}
                  />

                </div>
              )}
                
              </div>}
              {done && <div className="resonseMessage">
                 { show !== 6 && SendMail[5]?.text}
                 {show === 6 && (
                <div className="inputTextTitle">
                  <input
                    type={"text"}
                    value={editValue?.text}
                    onChange={(e) => {
                      setEditValue({
                        title: editValue?.title,
                        text: e.target.value,
                      });
                    }}
                  />
                  <div className="okCloseButtons" >
                  <CloseOutlined className="iconantd" onClick={()=>{setShow(0);setIndex(0)}}/>
                  <CheckSquareOutlined className="iconantd" onClick={()=>{ validateAndEditContact()}}/>
                </div>
                </div>
              )}
                
              </div>}
                    
              {done && show !== 6 && (
                <div className="editAuthorButton">
                  <EditOutlined
                    className="iconantd"
                    onClick={() => {
                      setEditValue({
                        title: SendMail[5]?.title,
                        text:SendMail[5]?.text,
                      });
                      setShow(6);
                      setIndex(5)
                    }}
                  />
                </div>
              )}
          </Form>
        </div>
      </div>
    </div>
  );
}