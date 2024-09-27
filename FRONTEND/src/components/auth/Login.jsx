import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button, buttonVariants } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { USER_API_END_POINT } from "../utils/constant.js";

import axios from "axios";
export default function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  // console.log(input);
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success === true) {
        navigate("/");
        toast.success(res.data.message);
      }
      // toast.success(res.data.message);
      // navigate("/");
    } catch (error) {
      console.log(error);
      toast(error.response.data.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex  items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-grey-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Login</h1>

          <div className="my-2">
            <Label className="font-semibold">Email</Label>
            <Input
              type="email"
              placeholder="Enter email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              className="rounded-xl border-2 border-blue-300"
            ></Input>
          </div>

          <div className="my-2">
            <Label className="font-semibold"> Password</Label>
            <Input
              type="password"
              placeholder="Enter password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              className="rounded-xl border-2 border-blue-300"
            ></Input>
          </div>
          <div className="flex items-center">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>

          <Button
            type="submit"
            className="w-full my-4 bg-red-500 text-white rounded-xl hover:bg-blue-600"
          >
            Login
          </Button>
          <span className="text-sm">
            Don't have an account?
            <Link to="/signup" className="text-blue-600">
              Signup
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}
