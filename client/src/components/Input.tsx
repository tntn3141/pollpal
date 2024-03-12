import { useField } from "formik";

interface Props {
  label: string;
  name: string;
  labelClasses?: string;
  inputClasses?: string;
  type: string;
  helpText?: string;
}

function Input(props: Props) {
  const [field, meta] = useField(props);
  return (
    <>
      <label
        className={
          props.labelClasses ||
          `block mb-1 text-sm font-medium text-gray-900 dark:text-white`
        }
      >
        {props.label}
      </label>
      <input
        className={props.inputClasses || "default-input"}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="text-red-600">{meta.error}</div>
      ) : null}
    </>
  );
}

export default Input;
