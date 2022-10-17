import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { deleteJob } from "../app/jobs/thunks";
import { Link } from "react-router-dom";
import { MAP_BOX_KEY } from "../utils";
import Map, { Marker } from "react-map-gl";
import cinema from "../cinema.png";
import { Spin } from "./index";

const JobList = () => {
    const dispatch =useAppDispatch()
    const loading =useAppSelector(state=>state.jobs.isLoading)
  const jobs = useAppSelector((state) => state.jobs.jobs);
  const user = useAppSelector((state) => state.auth.profile);
  const [list, setList] = useState<boolean>(true);
  console.log(jobs)
  return (<div>

    {loading?<Spin/>:<div className={`grid grid-cols-6 mt-4`}>
      <div className="flex flex-col">
        <button onClick={() => setList(true)}>List</button>
        <button onClick={() => setList(false)}>Map</button>
        {user && user.isRecruiter && (
          <Link to="/jobs/create">Post a Vacancy</Link>
        )}
      </div>
      <div className={`${list ? "col-span-3 " : "col-span-5"} mb-6`}>
        {list ? (
          jobs?.map((el) => (
            <div
              className="mb-6 border-2 border-indigo-400 p-5 rounded-lg text-gray-600"
              key={el?.id}
            >
              {user?.email === el.user.email?<div><Link to={`/jobs/myjobs/recruiter/${el.id}`}>
                  <h3 className="text-3xl mb-2">{el.title}</h3>
                </Link>
                <button onClick={() => dispatch(deleteJob(el.id))}>
                  Delete
                </button></div>:<h3 className="text-3xl mb-2">{el?.title}</h3>}
              <p className="my-2">{el?.description}</p>
              <p>Posted By: {el?.user?.name}</p>
              <div className="flex flex-row justify-between my-3 text-gray-600">
                <p className="bg-indigo-200 p-1 my-1 rounded-lg">
                  {el?.role?.name}
                </p>
                <p className={el?.paid ? "text-green-600" : `"text-red-500`}>
                  {el?.paid ? "Paid" : "Unpaid"}
                </p>
                <p className="oldstyle-num">
                  $ {el?.amount ? `${el?.amount}` : "000"}
                </p>
                <p className="text-gray-600">{el?.location}</p>
              </div>
              {user?.isRecruiter? <Link className="text-lg text-sky-700 " to={`/jobs/myjobs/recruiter/${el?.id}`}>
                More Details
              </Link> :<Link className="text-lg text-sky-700 " to={`/jobs/${el?.id}`}>
                More Details
              </Link>}
            </div>
          ))
        ) : (
          <Map
            initialViewState={{
              longitude: 4.9041,
              latitude: 52.3676,
              zoom: 5.5,
            }}
            style={{ width: "95%", margin: "0 auto", height: "90vh" }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            mapboxAccessToken={MAP_BOX_KEY}
          >
            {jobs.map((el) => (
              <Marker
                longitude={el?.lng}
                latitude={el?.lat}
                anchor="center"
                key={el.id}
              >
                <Link
                  className="text-lg text-blue-800 bg-orange-700"
                  to={`/jobs/${el.id}`}
                >
                  <img src={cinema} alt="" />
                </Link>
              </Marker>
            ))}
          </Map>
        )}
      </div>
    </div>}
    </div>
  );
}

export default JobList