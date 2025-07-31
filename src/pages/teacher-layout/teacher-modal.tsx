import React from "react";
import {
  Modal,
  Input,
  Form as AntForm,
  Button,
  Select,
  Spin,
} from "antd";
import { Formik, Form, Field, ErrorMessage } from "formik";
import type { Branch, Teacher } from "@types";
import { MaskedInput } from "antd-mask-input";
import { useBranch, useTeachers } from "@hooks";
import { TeacherValidation } from "@utils";
interface TeacherModalProps {
  visible: boolean;
  onClose: () => void;
  editData?: Teacher;
  mode: "create" | "update";
}

const roles = ["assistant teacher", "main teacher"];

const TeacherModal: React.FC<TeacherModalProps> = ({
  visible,
  onClose,
  editData,
  mode,
}) => {
  const isEdit = mode === "update";

  const { data: branchData, isLoading } = useBranch();
  const branches: Branch[] = branchData?.data?.branch || [];
const { useCreateTeacher, useUpdateTeacher } = useTeachers();



  const initialValues: Teacher = {
    first_name: editData?.first_name || "",
    last_name: editData?.last_name || "",
    email: editData?.email || "",
    password: "",
    phone: editData?.phone || "",
    role: editData?.role || "",
    branchId: editData?.branches?.map((b: any) => b.id) || [],
  };

  const handleSubmit = async (values: Teacher) => {
  const { password, ...rest } = values;
  const payload: any = {
    ...rest,
    ...(isEdit ? {} : { password }),
  };

  try {
    if (isEdit && editData?.id) {
      useUpdateTeacher.mutate({ model: payload, id: editData.id }); // ✅
    } else {
      useCreateTeacher.mutate(payload); // ✅
    }
    onClose();
  } catch (error) {
    console.error("Submission error:", error);
  }
};

  return (
    <Modal
      title={isEdit ? "Edit Teacher" : "Add Teacher"}
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      {isLoading ? (
        <div style={{ textAlign: "center", padding: "40px 0" }}>
          <Spin size="large" />
        </div>
      ) : (
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={TeacherValidation(isEdit)}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <AntForm.Item label="First Name" labelCol={{ span: 24 }}>
                <Field
                  as={Input}
                  name="first_name"
                  placeholder="Enter first name"
                />
                <div style={{ color: "red" }}>
                  <ErrorMessage name="first_name" />
                </div>
              </AntForm.Item>

              <AntForm.Item label="Last Name" labelCol={{ span: 24 }}>
                <Field
                  as={Input}
                  name="last_name"
                  placeholder="Enter last name"
                />
                <div style={{ color: "red" }}>
                  <ErrorMessage name="last_name" />
                </div>
              </AntForm.Item>

              <AntForm.Item label="Email" labelCol={{ span: 24 }}>
                <Field as={Input} name="email" placeholder="Enter email" />
                <div style={{ color: "red" }}>
                  <ErrorMessage name="email" />
                </div>
              </AntForm.Item>

              <AntForm.Item label="Phone" labelCol={{ span: 24 }}>
                <Field name="phone">
                  {({ field }: any) => (
                    <MaskedInput
                      {...field}
                      onBlur={field.onBlur}
                      mask="+\9\9\8 (00) 000-00-00"
                    />
                  )}
                </Field>
                <div style={{ color: "red" }}>
                  <ErrorMessage name="phone" />
                </div>
              </AntForm.Item>

              {!isEdit && (
                <AntForm.Item label="Password" labelCol={{ span: 24 }}>
                  <Field
                    as={Input.Password}
                    name="password"
                    placeholder="Enter password"
                  />
                  <div style={{ color: "red" }}>
                    <ErrorMessage name="password" />
                  </div>
                </AntForm.Item>
              )}

              <AntForm.Item label="Role" labelCol={{ span: 24 }}>
                <Field name="role">
                  {({ field }: any) => (
                    <Select
                      {...field}
                      value={field.value}
                      onChange={(value) => setFieldValue("role", value)}
                      style={{ width: "100%" }}
                      placeholder="Select role"
                    >
                      {roles.map((r) => (
                        <Select.Option key={r} value={r}>
                          {r}
                        </Select.Option>
                      ))}
                    </Select>
                  )}
                </Field>
                <div style={{ color: "red" }}>
                  <ErrorMessage name="role" />
                </div>
              </AntForm.Item>

              <AntForm.Item label="Branches" labelCol={{ span: 24 }}>
                <Field name="branchId">
                  {({ field }: any) => (
                    <Select
                      {...field}
                      mode="multiple"
                      value={field.value}
                      onChange={(val) => setFieldValue("branchId", val)}
                      style={{ width: "100%" }}
                      placeholder="Select branch(es)"
                    >
                      {branches.map((branch) => (
                        <Select.Option key={branch.id} value={branch.id}>
                          {branch.name}
                        </Select.Option>
                      ))}
                    </Select>
                  )}
                </Field>
                <div style={{ color: "red" }}>
                  <ErrorMessage name="branchId" />
                </div>
              </AntForm.Item>

              <Button type="primary" htmlType="submit" block>
                {isEdit ? "Update" : "Create"}
              </Button>
            </Form>
          )}
        </Formik>
      )}
    </Modal>
  );
};

export default TeacherModal;