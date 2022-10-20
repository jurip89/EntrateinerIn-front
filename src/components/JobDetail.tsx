import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { URL } from "../utils";
import { deleteJob } from "../app/jobs/thunks";
import axios from "axios";
import { Spin, MapDetail } from "../components";
const JobDetail = () => {
  const navigate = useNavigate();

  const loading = useAppSelector((state) => state.jobs.isLoading);
  const user = useAppSelector((state) => state.auth.profile);
  const token = useAppSelector((state) => state.auth.token);

  const job = useAppSelector((state) => state.jobs.job);

  const apply = async (id: string | number | undefined) => {
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
    navigate("/jobs");
  };

  return (
    <div>
      {loading ? (
        <Spin />
      ) : (
        <section>
          <div className="relative mx-auto max-w-screen-xl px-4 py-8">
            <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
              <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
                <MapDetail lat={job?.lat} lng={job?.lng} />

                {user?.isRecruiter && (
                  <div className="container mx-auto px-4 sm:px-8 max-w-3xl">
                    <div className="py-8">
                      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                          <table className="min-w-full leading-normal">
                            <thead>
                              <tr>
                                <th
                                  scope="col"
                                  className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                                >
                                  User
                                </th>
                                <th
                                  scope="col"
                                  className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                                >
                                  Role
                                </th>
                                <th
                                  scope="col"
                                  className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                                >
                                  Created at
                                </th>
                                <th
                                  scope="col"
                                  className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                                >
                                  Status
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {job?.applicantsJob?.map((el) => (
                                <tr key={el?.id}>
                                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <div className="flex items-center">
                                      <div className="flex-shrink-0">
                                        <Link
                                          to={`/talents/${el?.id}`}
                                          className="block relative"
                                        >
                                          <img
                                            alt="profil"
                                            src={el?.profilePic}
                                            className="mx-auto object-cover rounded-full h-10 w-10 "
                                          />
                                        </Link>
                                      </div>
                                      <div className="ml-3">
                                        <p className="text-gray-900 whitespace-no-wrap">
                                          {el?.name}
                                        </p>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                      {el?.roles[0]?.name}
                                    </p>
                                  </td>
                                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <button className="text-gray-900 whitespace-no-wrap m-auto">
                                      Hire
                                    </button>
                                  </td>
                                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                      <span
                                        aria-hidden="true"
                                        className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                                      ></span>
                                      <span className="relative">
                                        {el?.applicants?.status}
                                      </span>
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="sticky top-0">
                <div className="mt-8 flex justify-between">
                  <div className="max-w-[35ch]">
                    <h1 className="text-2xl font-bold">{job?.title}</h1>

                    <p className="mt-0.5 text-sm">
                      {job?.paid ? "Paid" : "Unpaid"}
                    </p>
                  </div>

                  <p className="text-lg font-bold">${job?.amount}</p>
                </div>

                <details className="group relative mt-4">
                  <summary className="block">
                    <div>
                      <div className="prose max-w-none group-open:hidden">
                        <p>{job?.description}</p>
                        <p>Location {job?.location}</p>
                      </div>
                      {job?.user.email !== user?.email && !user?.isRecruiter && (
                        <button
                          onClick={() => apply(job?.id)}
                          className="ml-3 block rounded bg-indigo-600 px-5 py-3 text-xs font-medium text-white hover:bg-indigo-400"
                        >
                          Apply
                        </button>
                      )}
                    </div>
                  </summary>

                  <div className="prose max-w-none pb-6">
                    <p></p>
                  </div>
                </details>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default JobDetail;
