import React, { useEffect, useState } from 'react';
import logo from '../assets/onebox.png';
import Googlelogo from '../assets/Frame.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUserData } from '../Context/UserData';

export const Login = () => {
  const { userData, setUserData, logout } = useUserData();
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/auth/google';
  };

  useEffect(() => {
    if (userData.name) {
      navigate('/dashboard');
    }
  }, [userData, navigate]);


  return (
    <div style={{ backgroundColor: "#000000" }} className="h-screen overflow-hidden flex flex-col justify-between">

      <div style={{ borderBottom: "1px solid #25262B" }} className="h-[8vh] flex justify-center items-center p-5">
        <img src={logo} alt="Logo" />
      </div>

      <div className="flex justify-center items-center p-5 h-[87vh]">
        <div style={{ border: "1px solid #343A40", backgroundColor: "#121212" }} className="p-10 shadow-lg rounded-lg w-[100%] md:w-[450px] lg:w-[500px]">
          <h2 className="text-center text-white text-xl mb-5">Create new Account</h2>
          <div style={{ marginBottom: "50px" }} className="text-center">
            (
              <div>
                <button
                  className="flex justify-center gap-5 text-white px-4 py-2 w-full rounded"
                  style={{ border: "1px solid #707172" }}
                  onClick={handleGoogleLogin}
                >
                  <img src={Googlelogo} alt="Google Logo" />
                  Sign Up with Google
                </button>
                <button
                  style={{
                    background: "linear-gradient(91.73deg, #4B63DD -2.99%, rgba(5, 36, 191, 0.99) 95.8%)",
                    marginTop: "20px"
                  }}
                  className="text-white px-4 py-2 w-2/3"
                  type="submit"
                >
                  Create an Account
                </button>
              </div>
            )
          </div>
          {!userData.name=='' && (
            <p className="text-center text-[#909296]">
              Already have an account? <span className="text-[#C1C2C5]"> <Link to={'/page1'}>Sign In</Link> </span>
            </p>
          )}
        </div>
      </div>

      <div style={{ backgroundColor: "#121212" }} className="h-[5vh] flex justify-center items-center p-5">
        <p className="text-[#5C5F66]">© 2023 Reachinbox. All rights reserved.</p>
      </div>
    </div>
  );
};
