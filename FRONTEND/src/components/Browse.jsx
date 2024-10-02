import React from "react";
import Navbar from "./shared/Navbar";

export default function Browse() {
  return (
    <div>
      <div>
        <Navbar />
        <div className="max-w-7xl mx-auto my-10">
          <h1 className="font-bold text-xl my-10">
            Search Results ({allJobs.length})
          </h1>
          <div className="grid grid-cols-3 gap-4">
            {allJobs.map((job) => {
              return <Job key={job._id} job={job} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
