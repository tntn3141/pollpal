import axios from "axios";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "../components/Input";
import Modal from "../components/Modal";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/userStore";

interface RegisterFormValues {
  name: string,
  email: string,
  password: string,
  confirmedPassword: string
}

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmedPassword: "",
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("This field is required."),
  email: Yup.string()
    .email("Invalid email.")
    .required("This field is required."),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long.")
    .required("This field is required."),
  confirmedPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password must match.")
    .required("This field is required."),
});

const submitRegistration = async (values: RegisterFormValues) => {
  try {
    const response = await axios.post("/auth/register", values);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

const Register = () => {
  const token = useUserStore((state) => state.token);
  console.log(token);
  return (
    <section className="bg-blue-500 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          Flowbite
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <Formik
              initialValues={initialValues}
              onSubmit={submitRegistration}
              validationSchema={validationSchema}
            >
              {(formik) => (
                <Form className="space-y-3 md:space-y-5">
                  <div>
                    <Input label="Name" name="name" type="text" />
                  </div>
                  <div>
                    <Input label="Email" name="email" type="email" />
                  </div>
                  <div>
                    <Input label="Password" name="password" type="password" />
                  </div>
                  <div>
                    <Input
                      label="Confirm password"
                      name="confirmedPassword"
                      type="password"
                    />
                  </div>
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="terms"
                        aria-describedby="terms"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      />
                    </div>
                    <div className="ml-3 text-sm dark:text-white">
                      {"I agree to the PollPal "}
                      <Modal
                        buttonTitle={"Terms and Conditions"}
                        type="link"
                        modalTitle="Terms and Conditions"
                      >
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Inventore quia molestiae iusto perferendis
                        reiciendis maiores doloremque magni non voluptatum,
                        adipisci architecto repellendus veritatis accusamus
                        facere tenetur quisquam tempora excepturi corrupti
                        perspiciatis ea, vero fugit! Adipisci alias iste natus
                        esse ut!
                      </Modal>
                      {/* <label
                        htmlFor="terms"
                        className="font-light text-gray-500 dark:text-gray-300"
                      >
                        I accept the{" "}
                        <a
                          className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                          href="#"
                        >
                          Terms and Conditions
                        </a>
                      </label> */}
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={!formik.isValid}
                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Create an account
                  </button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Already have an account?{" "}
                    <Link
                      to={"/login"}
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Login here
                    </Link>
                  </p>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
