import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { deleteJob } from "../app/jobs/thunks";
import moment from "moment";
import { Link } from "react-router-dom";
import { MAP_BOX_KEY } from "../utils";
import Map, { Marker } from "react-map-gl";
import cinema from "../cinema.png";
import { Spin } from "./index";

const JobList = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.jobs.isLoading);
  const jobs = useAppSelector((state) => state.jobs.jobs);
  const user = useAppSelector((state) => state.auth.profile);
  const [list, setList] = useState<boolean>(true);
  return (
    <div>
      {loading ? (
        <Spin />
      ) : (
        <div
          className={`grid xl:grid-cols-6 mt-4 lg:grid-cols-5 md:grid-cols-4`}
        >
          <div className="relative  bg-white ">
            <div className="flex flex-col sm:flex-row sm:justify-around">
              <div className="w-72">
                <nav className="mt-10 px-6 ">
                  <button
                    onClick={() => setList(true)}
                    className="hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors  duration-200  text-gray-600 rounded-lg "
                  >
                    <span className="mx-4 text-lg font-normal">List</span>
                    <span className="flex-grow text-right"></span>
                  </button>
                  <button
                    onClick={() => setList(false)}
                    className="hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors duration-200  text-gray-800  rounded-lg"
                  >
                    <span className="mx-4 text-lg font-normal">Map</span>
                    <span className="flex-grow text-right"></span>
                  </button>
                  {user?.isRecruiter && (
                    <Link
                      to="/jobs/create"
                      className="hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors duration-200  text-gray-600 rounded-lg"
                    >
                      <span className="mx-4 text-lg font-normal">
                        Create a Job
                      </span>
                      <span className="flex-grow text-right"></span>
                    </Link>
                  )}
                </nav>
              </div>
            </div>
          </div>
          <div
            className={`${
              list ? "col-span-4 " : "xl:col-span-4 md:col-span-3 "
            } mb-6`}
          >
            {list ? (
              <section className="mt-12 w-full mx-auto px-4">
                <div>
                  <h1 className="text-gray-800 text-3xl font-semibold">
                    Explore The Jobs
                  </h1>
                </div>

                <ul className="mt-12 space-y-6">
                  {jobs.map((el) => (
                    <li
                      key={el?.id}
                      className="p-5 bg-white rounded-md shadow-sm"
                    >
                      <div>
                        <div className="justify-between sm:flex">
                          <div className="flex-1">
                            {user?.email === el?.user?.email ? (
                              <div className="flex w-3/4 justify-between">
                                <Link to={`/jobs/myjobs/recruiter/${el.id}`}>
                                  <h3 className="text-xl font-medium text-cyan-600">
                                    {el?.title}
                                  </h3>
                                </Link>
                                <button
                                  className="px-4 py-2 text-sm text-gray-700 duration-100 border rounded-md hover:border-indigo-600 active:shadow-lg"
                                  onClick={() => dispatch(deleteJob(el.id))}
                                >
                                  Delete
                                </button>
                              </div>
                            ) : (
                              <Link to={`/jobs/${el?.id}`}>
                                <h3 className="text-xl font-medium text-cyan-600">
                                  {el?.title}
                                </h3>
                              </Link>
                            )}
                            <p className="text-gray-500 mt-2 pr-2">
                              {el?.description.length > 250 ? `${el?.description.slice(0,250)}...`:el?.description }
                            </p>
                          </div>
                          <div className="mt-5 space-y-4 text-sm sm:mt-0 sm:space-y-2">
                            <span className="flex items-center text-gray-500">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 mr-2"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              {moment(el?.createdAt).format("DD-MM-YYYY")}
                            </span>
                            <span className="flex items-center text-gray-500">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 mr-2"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              {el?.amount}
                            </span>
                          </div>
                        </div>
                        <div className="mt-4 items-center space-y-4 text-sm sm:flex sm:space-x-4 sm:space-y-0">
                          <span className="flex items-center text-gray-500">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 mr-2"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                                clipRule="evenodd"
                              />
                              <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                            </svg>
                            {el?.role?.name}
                          </span>
                          <span className="flex items-center text-gray-500">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 mr-2"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            {el?.location}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
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
                    key={el?.id}
                  >
                    <Link
                      className="text-lg text-blue-800 bg-orange-700"
                      to={`/jobs/${el?.id}`}
                    >
                      <img src={cinema} alt="" />
                    </Link>
                  </Marker>
                ))}
              </Map>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default JobList;
