
import React from "react";
import { Form, Input, Button } from "antd";
import "./AddTeacher.scss";
import { useAppDispatch } from "../../hooks";
import { fetchAddTeacher, getTeacher } from "../../store/action/TeacherAction";

const AddTeacher = ({setOpen}:any) => {
  const dispatch = useAppDispatch();
  const onFinish = async (values: string) => {


    await dispatch(fetchAddTeacher(values));
    dispatch(getTeacher('admin'))
    setOpen(false)
  };

  let LocalValue:any;
if (localStorage.getItem("language")) {
  let local:any = localStorage.getItem("language");
  LocalValue = JSON.parse(local);
}

  return (
    <div className="registration-container">
      <Form className="registration-form" onFinish={onFinish}>
        <h2>{LocalValue=='AM'?'Ավելացնել ուսուցիչ':'Add teacher'}</h2>



        <Form.Item
          label={LocalValue=='AM'?"Անուն Ազգանուն":'Name Surname'}
          name="fullName"
          rules={[{ required: true, message: LocalValue=='AM'?"Պարտադիր դաշտ!":'Required field' }]}
        >
          <Input />
        </Form.Item>


        <Form.Item
          label={LocalValue=='AM'?"Առարկան":'Subject'} 
          name="position"
          rules={[{ required: true, message: LocalValue=='AM'?"Պարտադիր դաշտ!":'Required field' }]}
        >
          <Input />
        </Form.Item>


        <Form.Item
          label={LocalValue=='AM'?"Մուտքանուն":'Username'} 
          name="username"
          rules={[{ required: true, message: LocalValue=='AM'?"Պարտադիր դաշտ!":'Required field' }]}
        >
          <Input />
        </Form.Item>


        <Form.Item
          label={LocalValue=='AM'?"Գաղտաբառը":'Password'} 
          name="password"
          rules={[{ required: true, message: LocalValue=='AM'?"Պարտադիր դաշտ!":'Required field' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label= {LocalValue=='AM'?"Հաստատել գաղտաբառը":'Confirm password'} 
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            { required: true, message: LocalValue=='AM'?"Պարտադիր դաշտ!":'Required field' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error( LocalValue=='AM'?"Համընկնում չկա !":'There is no coincidence !' )
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
          {LocalValue=='AM'?"Ավելացնել ուսուցիչ":'Add teacher'} 
          </Button>
        </Form.Item>
      </Form>
      <button className="buttonprev" onClick={()=> setOpen(false)}>{LocalValue=='AM'?"Հետ":'Back'} </button>
    </div>
  );
};

export default AddTeacher;
