/*eslint-disable*/
import { Form, Input, Button, } from "antd";
import "./AddTeacher.scss";
import { useAppDispatch } from "../../hooks";
import { fetchAddTeacher, getTeacher, } from "../../store/action/TeacherAction";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
// import { useForm } from "antd/es/form/Form";
// import { addSyntheticLeadingComment } from "typescript";

const AddTeacher = ({ setOpen }: any) => {

  const [error, setError] = useState<any>({});
  const [loading, setLoadnig] = useState(false);
  const [links,setLinks] = useState<any>([]);

  const dispatch = useAppDispatch();
  const onFinish = async (values: any) => {

    const obj = {
      ...values,
      cubesat_link:links,
    }
    

    await dispatch(fetchAddTeacher(obj, setError, setLoadnig));
    dispatch(getTeacher('admin'))
    if (error === "ok") {
      setOpen(false)
      setLoadnig(false);
      setError("")

    }
  };




  useEffect(() => {

    if (error === 'ok') {

      Swal.fire({
        position: "center",
        icon: "success",
        title: LocalValue === 'AM' ? "Տվյալները հաջողությամբ հաստատվել են" : 'Data has been successfully verified' ,
        showConfirmButton: false,
        timer: 2500
      }).then(() => {
        setOpen(false)
        setError("");
        setLoadnig(false)

      });
    }
    if (error?.response?.status < 200 || error?.response?.status >= 400) {

      Swal.fire({
        position: "center",
        icon: "error",
        // title: "Լրացրեք բոլոր դաշտերը!!!",
        showConfirmButton: false,
        timer: 2500
      }).then(() => {
        setError("");
        setLoadnig(false)
      });
    }
  }, [error, loading])





  let LocalValue: any;
  if (localStorage.getItem("language")) {
    let local: any = localStorage.getItem("language");
    LocalValue = JSON.parse(local);
  }

  return (
    <div className="registration-container">
      <Form className="registration-form" onFinish={onFinish} >
        <h2 className="h2">{LocalValue === 'AM' ? 'Ավելացնել ուսուցիչ' : 'Add teacher'}</h2>



        <Form.Item
          label={LocalValue === 'AM' ? "Անուն Ազգանուն" : 'Name Surname'}
          name="fullName"
          rules={[{ required: true, message: LocalValue === 'AM' ? "Պարտադիր դաշտ!" : 'Required field' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={LocalValue === 'AM' ? "Դպրոց" : 'school'}
          name="school"
          rules={[{ required: true, message: LocalValue === 'AM' ? "Պարտադիր դաշտ!" : 'Required field' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={LocalValue === 'AM' ? "Առարկան" : 'Subject'}
          name="position"
          rules={[{ required: true, message: LocalValue === 'AM' ? "Պարտադիր դաշտ!" : 'Required field' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={LocalValue === 'AM' ? "Հղում" : 'Link'}
          rules={[{ required: true, message: LocalValue === 'AM' ? "Պարտադիր դաշտ!" : 'Required field' }]}
        >
          <Input onChange={(e:any)=>{setLinks([e.target.value])}} />
        </Form.Item>


        <Form.Item
          label={LocalValue === 'AM' ? "Մուտքանուն" : 'Username'}
          name="username"
          rules={[{ required: true, message: LocalValue === 'AM' ? "Պարտադիր դաշտ!" : 'Required field' }]}
        >
          <Input />
        </Form.Item>
        


        <Form.Item
          label={LocalValue === 'AM' ? "Գաղտաբառը" : 'Password'}
          name="password"
          rules={[{ required: true, message: LocalValue === 'AM' ? "Պարտադիր դաշտ!" : 'Required field' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label={LocalValue === 'AM' ? "Հաստատել գաղտաբառը" : 'Confirm password'}
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            { required: true, message: LocalValue === 'AM' ? "Պարտադիր դաշտ!" : 'Required field' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(LocalValue === 'AM' ? "Համընկնում չկա !" : 'There is no coincidence !')
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item >
          <Button disabled={loading} className={loading ? "load" : ""} type="primary" htmlType="submit">
            {LocalValue === 'AM' ? "Ավելացնել ուսուցիչ" : 'Add teacher'}
          </Button>
        </Form.Item>
      </Form>
      <button className="buttonprev" onClick={() => setOpen(false)}>{LocalValue === 'AM' ? "Հետ" : 'Back'} </button>
    </div>
  );
};

export default AddTeacher;
