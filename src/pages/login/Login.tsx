import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {Auth} from "../../redux/slice/auth/authSlice"
import toast, { Toaster } from "react-hot-toast";
import { replace, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import loading from "../../services/loading.json"


type Inputs={
  email:string,
  password:string

}
const Login = () => {
   const navigate=useNavigate()
  const dispatch = useAppDispatch()

  const {error,isLoading}=useAppSelector(state=>state.authSlice)

    // Hook-Form
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
     
      await dispatch(Auth(data))

      navigate("/",{replace:true})
    
    };


  return (
        <section className="fix-height  m-auto px-7 flex items-center justify-center bg-[#FF8D4C] h-screen">

            <Toaster/>
      <div className="m-auto bg-white shadow-xl rounded-lg p-5 w-full md:w-1/3">
        <h1 className="text-3xl font-bold text-[#FF8D4C] mb-5 text-center">Log In</h1>
        <form className="student-form-form" onSubmit={handleSubmit(onSubmit)}>
        {/* Form Fields */}
        <div className="form-group">
          <label htmlFor="Email">Email</label>
          <input
            id="Email"
            type="email"
            placeholder="Enter Email"
            {...register("email", { required: "The Email is Required" })}
          />
          {errors.email && (
            <span className="text-red-400">{errors.email.message}</span>
          )}
        </div>
        <div className="form-group full-width">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            placeholder="Enter Password"
            type="password"
            {...register("password", {
              minLength: { value: 6, message: "Too Short Password" },
            })}
          ></input>
          {errors.password && (
            <span className="text-red-400">{errors.password.message}</span>
          )}
        </div>

        <button type="submit" className="submit-button">
           {isLoading=="Pending" ? <Lottie style={{width:"50px"}} animationData={loading} /> : "LOGIN"}
        </button>


    
        

      </form>
      </div>
    </section>
  );
};

export default Login;
