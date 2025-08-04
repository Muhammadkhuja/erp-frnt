import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button, Card, Input, Select } from "antd";
import * as Yup from "yup";

const { Option } = Select;

const ForgotPassword = () => {
  return (
    <div>
      <Card style={{ maxWidth: 400, margin: "0 auto", marginTop: 100 }}>
        <Formik
          initialValues={{ email: "", password: "", role: "" }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email")
              .required("Email is required"),
            password: Yup.string().required("Password is required"),
            role: Yup.string().required("Role is required"),
          })}
          onSubmit={(values) => {
            console.log("Form submitted:", values);
          }}
        >
          {({ setFieldValue }) => (
            <Form>
              <div style={{ marginBottom: 16 }}>
                <label>Email</label>
                <Field
                  as={Input}
                  name="email"
                  type="email"
                  placeholder="Enter email"
                />
                <ErrorMessage name="email">
                  {(msg) => (
                    <div style={{ color: "red", fontSize: 12 }}>{msg}</div>
                  )}
                </ErrorMessage>
              </div>

              <div style={{ marginBottom: 16 }}>
                <label>Role</label>
                <Select
                  placeholder="Select role"
                  style={{ width: "100%" }}
                  onChange={(value) => setFieldValue("role", value)}
                >
                  <Option value="teacher">Teacher</Option>
                  <Option value="student">Student</Option>
                  <Option value="admin">Admin</Option>
                  <Option value="lid">Lid</Option>
                </Select>
                <ErrorMessage name="role">
                  {(msg) => (
                    <div style={{ color: "red", fontSize: 12 }}>{msg}</div>
                  )}
                </ErrorMessage>
              </div>

              <Button type="primary" htmlType="submit" block>
                Forgot Password
              </Button>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default ForgotPassword;
