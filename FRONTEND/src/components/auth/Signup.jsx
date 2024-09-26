import React from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
export default function Signup() {
  return (
    <div>
      <Navbar />
      <div className="flex  items-center justify-center max-w-7xl mx-auto">
        <form
          action=""
          className="w-1/2 border border-grey-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Signup</h1>
          <div className="my-2">
            <Label> Full Name</Label>
            <Input type="text" placeholder="Enter fullname"></Input>
          </div>
          <div className="my-2">
            <Label>Email</Label>
            <Input type="email" placeholder="Enter email"></Input>
          </div>
          <div className="my-2">
            <Label> Phone Number</Label>
            <Input type="text" placeholder="Enter Phone Number"></Input>
          </div>
          <div className="my-2">
            <Label> Password</Label>
            <Input type="password" placeholder="Enter password"></Input>
          </div>
          <div className="flex items-center">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-one" id="option-one" />
                <Label htmlFor="option-one">Student </Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-two" id="option-two" />
                <Label htmlFor="option-two">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
        </form>
      </div>
    </div>
  );
}
