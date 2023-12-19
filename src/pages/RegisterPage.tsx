import { SubmitHandler, useForm } from "react-hook-form";
import { useUser } from "../context/UserAuthContext";
import { Link } from "react-router-dom";

type DataType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};
export default function RegisterPage() {
  const { register: registerUser } = useUser();
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<DataType>();

  const onSubmit: SubmitHandler<DataType> = (data) => {
    console.log(data);
    registerUser(data.email, data.password, data.name);
    reset();
  };
  return (
    <div className="auth--container">
      <div className="form--wrapper">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="field--wrapper">
            <label>User Name</label>
            <input
              className="field--wrapper"
              placeholder="User Name"
              type="text"
              {...register("name", {
                required: "This Field Is Required",
              })}
            />
            <p className="error">{errors.root?.message}</p>
          </div>

          <div className="field--wrapper">
            <label>Email</label>
            <input
              placeholder="Email"
              className="field--wrapper"
              type="email"
              {...register("email", {
                required: "This Field Is Required",
              })}
            />
            <p className="error">{errors.root?.message}</p>
          </div>

          <div className="field--wrapper">
            <label>Password</label>
            <input
              placeholder="Password"
              className="field--wrapper"
              type="password"
              {...register("password", {
                required: "This Field Is Required",
              })}
            />
            <p className="error">{errors.root?.message}</p>
          </div>

          <div className="field--wrapper">
            <label>Confirm Password</label>
            <input
              className="field--wrapper"
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword", {
                required: "This Field Is Required",
                validate: (value) =>
                  getValues().password === value || "Passwords should match",
              })}
            />
            <p className="error">{errors.root?.message}</p>
          </div>

          <div className="deleteBtnDiv">
            <button className="deleteBtn">Register</button>
          </div>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
