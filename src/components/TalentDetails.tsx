import React, { useState, FC } from "react";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Spin } from "../components";
import { Link } from "react-router-dom";
import {
  deleteImage,
  addReview,
  deleteReview,
  changeProfilePic,
} from "../app/talents/thunks";
import moment from "moment";

type JobProps = {
  id: string | undefined;
};
const JobDetails: FC<JobProps> = (props) => {
  const dispatch = useAppDispatch();

  const talent = useAppSelector((state) => state.talents.talent);
  const loading = useAppSelector((state) => state.talents.isLoading);
  const user = useAppSelector((state) => state.auth.profile);
  const token = useAppSelector((state) => state.auth.token);

  const [title, setTitle] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [rating, setRating] = useState<string>("1");
  const [openReview,setOpenReview]= useState<boolean>(false)

  const postReview = (e: React.FormEvent) => {
    e.preventDefault();
    const body = {
      title,
      comment,
      rating,
      receiverId: talent?.id!,
      authorId: user?.id,
    };
    dispatch(addReview(body));
    setComment("");
    setTitle("");
    setRating("1");
  };

  const destroy = (id: number) => {
    dispatch(deleteImage(id));
  };

  return (
    <div className="w-full">
      {loading ? (
        <Spin />
      ) : (
        <div className="my-20 grid grid-cols-6 ">
          <div></div>
          <div className="col-span-4 relative w-full mx-auto my-3">
            <div className="flex flex-col justify-center items-center my-5">
              <div
                className={`w-40 h-40 bg-cover bg-center bg-no-repeat rounded-full`}
                style={{ backgroundImage: `url(${talent?.profilePic})` }}
              ></div>
              <span className="my-3">{talent?.name}</span>

              <div className="flex gap-10 text-sm">
                <div className="flex flex-col items-center">
                  <span className="font-bold">{talent?.reviews?.length}</span>
                  <span>Reviews</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-bold">1.20 K</span>
                  <span>Followers</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-bold">100 K</span>
                  <span>Likes</span>
                </div>
              </div>

              {user?.id === talent?.id && (
                <Link
                  to={`/talents/${talent?.id}/edit`}
                  className="my-5 px-5 py-2 font-semibold text-sm border border-gray-400"
                >
                  Edit profile
                </Link>
              )}

              <p className="my-24">{talent?.intro}</p>
            </div>

            <div className="grid lg:grid-cols-4 sm:grid-cols-1 gap-0.5 mt-2">
              {talent?.images?.map((el) => (
                <div
                  className={`relative w-full h-60 bg-cover rounded-lg bg-center bg-no-repeat`}
                  style={{ backgroundImage: `url(${el?.source})` }}
                  key={el?.id}
                >
                  {user?.id === talent.id && (
                    <div
                      onClick={() => destroy(el.id)}
                      className="absolute bottom-1 rounded-full bg-white left-1 flex gap-1 text-white text-xs items-center"
                    >
                      <svg
                        className="h-4 w-4"
                        version="1.1"
                        id="Layer_1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        width="122.881px"
                        height="122.88px"
                        viewBox="0 0 122.881 122.88"
                        enableBackground="new 0 0 122.881 122.88"
                        xmlSpace="preserve"
                      >
                        <g>
                          <path d="M61.44,0c16.966,0,32.326,6.877,43.445,17.996c11.119,11.118,17.996,26.479,17.996,43.444 c0,16.967-6.877,32.326-17.996,43.444C93.766,116.003,78.406,122.88,61.44,122.88c-16.966,0-32.326-6.877-43.444-17.996 C6.877,93.766,0,78.406,0,61.439c0-16.965,6.877-32.326,17.996-43.444C29.114,6.877,44.474,0,61.44,0L61.44,0z M80.16,37.369 c1.301-1.302,3.412-1.302,4.713,0c1.301,1.301,1.301,3.411,0,4.713L65.512,61.444l19.361,19.362c1.301,1.301,1.301,3.411,0,4.713 c-1.301,1.301-3.412,1.301-4.713,0L60.798,66.157L41.436,85.52c-1.301,1.301-3.412,1.301-4.713,0c-1.301-1.302-1.301-3.412,0-4.713 l19.363-19.362L36.723,42.082c-1.301-1.302-1.301-3.412,0-4.713c1.301-1.302,3.412-1.302,4.713,0l19.363,19.362L80.16,37.369 L80.16,37.369z M100.172,22.708C90.26,12.796,76.566,6.666,61.44,6.666c-15.126,0-28.819,6.13-38.731,16.042 C12.797,32.62,6.666,46.314,6.666,61.439c0,15.126,6.131,28.82,16.042,38.732c9.912,9.911,23.605,16.042,38.731,16.042 c15.126,0,28.82-6.131,38.732-16.042c9.912-9.912,16.043-23.606,16.043-38.732C116.215,46.314,110.084,32.62,100.172,22.708 L100.172,22.708z" />
                        </g>
                      </svg>
                    </div>
                  )}
                  {user?.id === talent.id && (
                    <button
                      onClick={() =>
                        dispatch(
                          changeProfilePic({
                            id: talent.id,
                            profilePic: el.source,
                          })
                        )
                      }
                      className="absolute bottom-1 rounded-full bg-white right-1 flex gap-1 text-white text-xs items-center"
                    >
                      <svg
                        className="h-4 w-4"
                        version="1.1"
                        id="Capa_1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        viewBox="0 0 187.879 187.879"
                        //style="enable-background:new 0 0 187.879 187.879;"
                        xmlSpace="preserve"
                      >
                        <g>
                          <path
                            d="M93.946,50.173c13.833,0,25.087-11.254,25.087-25.087C119.033,11.254,107.779,0,93.946,0
		C80.114,0,68.86,11.254,68.86,25.086C68.86,38.919,80.114,50.173,93.946,50.173z M93.946,15c5.562,0,10.087,4.525,10.087,10.086
		c0,5.562-4.525,10.087-10.087,10.087S83.86,30.648,83.86,25.086C83.86,19.525,88.385,15,93.946,15z"
                          />
                          <path
                            d="M123.127,61.76c-3.018-3.421-7.363-5.384-11.925-5.384H76.677c-4.558,0-8.9,1.959-11.917,5.375
		c-3.017,3.416-4.423,7.969-3.859,12.491l13.35,107.065c0.468,3.754,3.659,6.572,7.442,6.572h24.348
		c3.779,0,6.969-2.812,7.441-6.562l13.494-107.053C127.546,69.739,126.144,65.181,123.127,61.76z M99.426,172.879h-11.11
		L75.785,72.386c-0.033-0.267,0.04-0.504,0.218-0.706c0.179-0.202,0.405-0.304,0.674-0.304h34.525c0.269,0,0.495,0.103,0.674,0.304
		c0.178,0.202,0.251,0.439,0.217,0.707L99.426,172.879z"
                          />
                        </g>
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>
            <div className={"grid grid-cols-1 w-full"}>
              <section className="w-full mx-auto">
                {talent.reviews.length > 0 && (
                  <div className="mx-auto max-w-screen-xl px-4 py-4 sm:px-2 lg:px-6">
                    <h2 className="text-lg font-bold sm:text-2xl">Reviews</h2>
                  </div>
                )}

                <div className="mt-8 grid grid-cols-1 gap-x-16 gap-y-12">
                  {talent?.reviews.map((el) => (
                    <blockquote
                      key={el?.id}
                      className="border-1 p-4 rounded-lg"
                    >
                      <header className="sm:flex sm:items-center">
                        <p className="mt-2 font-medium sm:mt-0">
                          {el?.title.toUpperCase()} {el?.rating}/5
                        </p>
                      </header>

                      <p className="mt-2 text-gray-700">{el?.comment}</p>

                      <footer className="mt-4 flex flex-row justify-between">
                        <p className="text-xs text-gray-500">
                          <Link to={`/talents/${el?.authorReview?.id}`}>
                            {el?.authorReview?.name}{" "}
                          </Link>
                          - {moment(el?.upddatedAt).format("DD-MM-YYYY")}
                        </p>
                        {el?.authorReview?.id === user?.id && (
                          <button onClick={() => dispatch(deleteReview(el.id))}>
                            Delete
                          </button>
                        )}
                      </footer>
                    </blockquote>
                  ))}
                </div>
              </section>

              {token && user?.id !== talent?.id && (
                <div>
                  <button
                      className="py-2 ml-4 px-4 mx-auto mb-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                      onClick={() => { setOpenReview(!openReview)} }
                  >
                    Add a review
                  </button>
                  {openReview &&<form
                    onSubmit={postReview}
                    className="flex border-t-1 border-t-gray-300 my-6 w-full mx-auto flex-col p-6 space-y-6 md:py-0 md:px-6 ng-untouched ng-pristine ng-valid"
                  >
                    <label className="block pt-4">
                      <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:bg-gray-800"
                      />
                    </label>
                    <label className="block">
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows={3}
                        placeholder="Comment Here"
                        className="block w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:bg-gray-800"
                      ></textarea>
                    </label>
                    <div className="relative pt-1">
                      <label
                        htmlFor="customRange2"
                        className="form-label mr-12 w-full"
                      >
                        Rating
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="5"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        className="range range-primary"
                      />
                    </div>
                    <button
                      type="submit"
                      className="py-2 px-4 mx-auto mb-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                    >
                      Review
                    </button>
                  </form>}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetails;
