import { useFormikContext } from "formik";
import { Input } from "neetoui/formik";

export const AutoSubmitOnBlurInput = ({ label, name, placeholder, size }) => {
  const { handleBlur, submitForm } = useFormikContext();

  const handleBlurAndSubmit = event => {
    handleBlur(event);
    submitForm();
  };

  return (
    <Input
      label={label}
      name={name}
      placeholder={placeholder}
      size={size}
      onBlur={handleBlurAndSubmit}
    />
  );
};
