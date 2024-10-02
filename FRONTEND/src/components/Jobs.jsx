import React from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";

const jobArray = [1, 2, 3, 4, 6];
export default function Jobs() {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <FilterCard />
        </div>

        {jobArray.map((item, index) => (
          <Job />
        ))}
      </div>
    </div>
  );
}
