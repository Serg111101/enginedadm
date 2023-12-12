
import React from "react";
import { Form, Input, Button } from "antd";
import "./AddTeacher.scss";
import { useAppDispatch } from "../../hooks";
import { fetchAddTeacher } from "../../store/action/TeacherAction";

const AddTeacher = () => {
  const dispatch = useAppDispatch();
  const onFinish = async (values: string) => {
    console.log(values);

    await dispatch(fetchAddTeacher(values));
  };

  return (
    <div className="registration-container">
      <Form className="registration-form" onFinish={onFinish}>
        <h2>Add Teacher</h2>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Please confirm your password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Teacher
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddTeacher;
