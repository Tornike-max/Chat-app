import { SubmitHandler, useForm } from "react-hook-form";
import { useUser } from "../context/UserAuthContext";
import { Link } from "react-router-dom";

type LoginTypes = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const { login } = useUser();

  const { register, handleSubmit, reset } = useForm<LoginTypes>();

  const onSubmit: SubmitHandler<LoginTypes> = (data) => {
    login(data.email, data.password);
    reset();
  };

  return (
    <div className="auth--container2">
      <div className="form--wrapper">
        <form className="formStyle" onSubmit={handleSubmit(onSubmit)}>
          <div className="field--wrapper">
            <label>Email</label>
            <input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "This Field Is Required",
              })}
            />
          </div>
          <div className="field--wrapper">
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "This Field Is Required",
              })}
            />
          </div>

          <div className="field--wrapper">
            <input
              type="submit"
              value="Login"
              className="btn btn--lg btn--main"
            />
          </div>
        </form>
        <p>
          Don't have an account yet? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}
