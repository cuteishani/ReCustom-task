import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const UserSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  role: Yup.string().required("Role is required"),
});

interface UserFormProps {
  initialData?: { name: string; email: string; role: string };
  onSubmit: (data: { name: string; email: string; role: string }) => void;
}

const UserForm: React.FC<UserFormProps> = ({ initialData, onSubmit }) => {
  return (
    <Formik
      initialValues={initialData || { name: "", email: "", role: "" }}
      validationSchema={UserSchema}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values);
        resetForm(); // Clear the form after submission
      }}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-4">
          <div>
            <label className="block font-bold">Name</label>
            <Field
              data-testid="name"
              name="name"
              className="w-full border px-2 py-1"
              placeholder="Enter name"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
          <div>
            <label className="block font-bold">Email</label>
            <Field
              name="email"
              type="email"
              data-testid="email"
              className="w-full border px-2 py-1"
              placeholder="Enter email"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
          <div>
            <label className="block font-bold">Role</label>
            <Field
              name="role"
              as="select"
              className="w-full border px-2 py-1"
              data-testid="role"
            >
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </Field>
            <ErrorMessage
              name="role"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
          <button
            data-testid="submit"
            type="submit"
            disabled={isSubmitting}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default UserForm;
