import React from "react";
import { User2Icon, LogOut } from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button, buttonVariants } from "../ui/button.jsx";
import { Link } from "react-router-dom";

export default function Navbar() {
  const user = false;
  return (
    <>
      <div className="bg-white ">
        <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
          <div>
            <h1 className="text-2xl font-bold">
              Job<span className="text-[#2a0adf]">Board</span>
            </h1>
          </div>
          <div className="flex items-center gap-10">
            <ul className="flex items-center font-medium gap-5">
              <li>Home</li>
              <li>Jobs</li>
              <li>Browse</li>
            </ul>
            {!user ? (
              <div className="flex items-center">
                <Link to="/login">
                  <Button variant="secondary">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button variant="outline" className="bg-blue-500 text-white">
                    SignUp
                  </Button>
                </Link>
              </div>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="flex gap-4 space-y-2">
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-medium">Saurabh Yadav</h4>
                      <p className="text-sm text-mutative-foreground">
                        Lorem ipsum dolor sit
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col  text-red-600">
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <User2Icon></User2Icon>
                      <Button variant="link">view profile</Button>
                    </div>
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <LogOut />
                      <Button variant="link">Logout</Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
