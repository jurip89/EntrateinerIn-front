import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getMyJobsRecruiter,deleteJob } from "../app/jobs/thunks";

import { Spin } from "../components";

const MyJobsPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token: string | null = localStorage.getItem("token");
  useEffect(() => {
    !token && navigate("/");
    dispatch(getMyJobsRecruiter());
  }, [dispatch, navigate, token]);

  const loading = useAppSelector((state) => state.jobs.isLoading);
  const myJobs = useAppSelector((state) => state.jobs.jobs);

  console.log(myJobs);

  return (
    <div>
      {loading ? (
        <Spin />
      ) : (
        <div className="grid grid-cols-6">
          <div></div>
            <div className="col-span-4 flex m-7">
              {myJobs.map(el => <div className="w-full" key={el.id}>
                <h3>{el.title}</h3>
                <button onClick={() => dispatch(deleteJob(el.id))}>Delete</button>
              </div>)}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyJobsPage;
