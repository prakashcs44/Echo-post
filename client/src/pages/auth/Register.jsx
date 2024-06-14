import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { register } from "@/redux/slices/authSlice";
import toast from "react-hot-toast";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const dispatch = useDispatch();
  const {isAuthenticated,loading,error} = useSelector(state=>state.auth);
  const navigate = useNavigate();


  useEffect(()=>{
      if(isAuthenticated){
        toast.success("Registered successfully");
        navigate("/home",{replace:true});
      }
      if(error){
        toast.error(error)
      }
  },[isAuthenticated])


  const registerHandler = async (ev) => {
     ev.preventDefault();
     const data  = new FormData();
     data.append("name",name);
     data.append("email",email);
     data.append("password",password);
     if(avatar)
     data.append("avatar",avatar);
     dispatch(register(data));
     setEmail("");
     setPassword("");
     setName("");
     setAvatarPreview("");
     setAvatar(null);
     
  };

  const onAvatarChange = (ev) => {
    const file = ev.target.files[0];

    setAvatar(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={registerHandler}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                  value={email}
                  onChange={(ev) => setEmail(ev.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
               
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={password}
                  onChange={(ev) => setPassword(ev.target.value)}
                />
               
              
              </div>

              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Test"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={name}
                  onChange={(ev) => setName(ev.target.value)}
                />
              </div>

              <div>
                {avatar ? (
                  <div className="flex flex-col items-center gap-3">
                    <div className="flex items-center gap-2">
                      <img
                        src={avatarPreview}
                        alt="avatar"
                        className="rounded-full size-14 flex-shrink-0 object-cover"
                      />
                      <p className="">{avatar.name}</p>
                    </div>

                    <Button
                      variant="ghost"
                     
                      onClick={() => {
                        setAvatar(null);
                        setAvatarPreview("");

                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <>
                    <label
                      htmlFor="avatar"
                      className=" mb-2 text-sm text-center font-medium text-gray-900 dark:text-white border-2 py-4 border-dashed flex flex-col items-center gap-2"
                    >
                        <div>
                        Upload Profile
                        </div>
                      
                      <IoCloudUploadOutline size={30} />
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      id="avatar"
                      name="avatar"
                      value={avatar}
                      onChange={onAvatarChange}
                    />
                  </>
                )}
              </div>

              <Button className="w-full" type="submit"  disabled = {loading}>
                Create An Account
              </Button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
