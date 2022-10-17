import React from "react";
import { Link ,useNavigate} from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { URL } from '../utils';
import { deleteJob } from "../app/jobs/thunks";
import axios from "axios";
import { Spin, MapDetail } from "../components";
const JobDetail = () => {

  const navigate = useNavigate();
  
  const loading = useAppSelector((state) => state.jobs.isLoading);
    const user = useAppSelector((state) => state.auth.profile);
  const token = useAppSelector((state) => state.auth.token);
  

  const job = useAppSelector((state) => state.jobs.job);

const apply = async (id: string) => {
    if (!token) {
      navigate("/login");
    }
    await axios.post(
      `${URL}/apply`,
      { jobId: id },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    navigate('/jobs')
};
  
  
  return (
    <div className="grid grid-cols-6 my-5">
      <div></div>
      {loading ? (
        <div className="col-span-4">
          <Spin />
        </div>
      ) : (
        <div className="col-span-4 border-2 border-indigo-400 rounded-lg">
          <div className="flex justify-between border-b-gray-400 border-b-2 p-5 w-full ">
              <h3 className="text-3xl ">{job?.title}</h3>
              {!user?.isRecruiter && (
              <button
                onClick={() => apply(job?.id!)}
                className=" border-blue-900 max-w-md rounded-md p-2  border-2 transition ease-in duration-400 hover:bg-blue-500 hover:text-white"
              >
                Directly Apply
              </button>
            )}
          </div>
          <div className="my-4">
            <div className="flex flex-row justify-start">
              <div
                className="rounded-full w-16 h-16 mx-4"
                style={{
                  backgroundImage: `url(${job?.user?.profilePic})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              />
              <p className="mx-4 m-auto">Posted by: {job?.user?.name}</p>
            </div>

            <div className="m-4 text-gray-600 space-y-5">
              <h5 className="text-lg my-3 text-black">Description:</h5>
              <p> {job?.description}</p>
              <p>
                <span className="text-black">Location: </span>
                {job?.location}
              </p>
              <p className={job?.paid ? "text-green-500" : "text-red-500"}>
                {job?.paid ? "Paid" : "Unpaid"}{" "}
                {job?.amount ? `$${job.amount}` : 0}
              </p>
            </div>
          </div>
          <MapDetail lat={job?.lat} lng={job?.lng} />
          {user?.isRecruiter && job?.applicantsJob?.map((el) => (
            <div key={el.id}>
              <Link to={`/talents/${el.id}`}>
                <div className="w-20 h-20 rounded-full" />
                <h3>{el.name}</h3>
                <div
                  className="rounded-full w-16 h-16 mx-4"
                  style={{
                    backgroundImage: `url(${el?.profilePic})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                />
                <p>{el.applicants.status}</p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobDetail