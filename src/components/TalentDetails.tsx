import React, { useState, FC } from "react";
import { deleteImg } from "../app/talents/slice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Spin } from "../components";
import { Link } from "react-router-dom";
import { deleteImage, addReview } from "../app/talents/thunks";
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
    dispatch(deleteImg(id));
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

              <p className="mb-3">{talent?.intro}</p>
            </div>

            <div className="grid grid-cols-4 gap-0.5 mt-2">
              {talent?.images?.map((el) => (
                <div
                  className={`relative w-full h-60 bg-cover bg-center bg-no-repeat`}
                  style={{ backgroundImage: `url(${el?.source})` }}
                  key={el?.id}
                  //   style="background-image: url('https://sf-tk-sg.ibytedtos.com/obj/tiktok-web-sg/tt-sg-article-cover-351970d5103b996fbe9ddc67f6d668cc.gif');"
                >
                  {/* <!-- small player with views --> */}
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
                </div>
              ))}
            </div>
            <div
              className={
                token && user?.id !== talent?.id
                  ? "grid grid-cols-2 w-full gap-6"
                  : "grid grid-cols-1 w-full"
              }
            >
              {token && user?.id !== talent?.id && (
                <form
                  onSubmit={postReview}
                  className="flex border-t-2 border-t-gray-300 my-6  flex-col p-6 space-y-6 md:py-0 md:px-6 ng-untouched ng-pristine ng-valid"
                >
                  <label className="block pt-4">
                    <span className="mb-1">Title</span>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:bg-gray-800"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1">Review</span>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      rows={3}
                      className="block w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:bg-gray-800"
                    ></textarea>
                  </label>
                  <div className="relative pt-1">
                    <label htmlFor="customRange2" className="form-label">
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
                </form>
              )}
              <section className="w-full mx-auto">
                <div className="mx-auto max-w-screen-xl px-4 py-4 sm:px-2 lg:px-6">
                  <h2 className="text-lg font-bold sm:text-2xl">Reviews</h2>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-x-16 gap-y-12">
                  {talent.reviews.map((el) => (
                    <blockquote key={el.id} className="border-2 p-6 rounded-lg">
                      <header className="sm:flex sm:items-center">
                        <p className="mt-2 font-medium sm:ml-4 sm:mt-0">
                          {el.title} {el.rating}/5
                        </p>
                      </header>

                      <p className="mt-2 text-gray-700">{el.comment}</p>

                      <footer className="mt-4">
                        <p className="text-xs text-gray-500">
                          <Link to={`/talents/${el?.authorReview?.id}`}>
                            {el?.authorReview?.name}{" "}
                          </Link>
                          - {moment(el?.upddatedAt).format("DD-MM-YYYY")}
                        </p>
                      </footer>
                    </blockquote>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

{
  /* <div>
                <h4 className="text-xl">Reviews:</h4>
                  <div>
                    {idNumber !== user?.id &&<form onSubmit={postReview} className='w-1/2 flex flex-col my-5'>
                      <h4>Add a review</h4>
                      <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder='Title'/>
                      <input type="text" value={comment} onChange={(e)=>setComment(e.target.value)} placeholder='Comment'/>
                      <input type="range" min='1' max='5' value={rating} onChange={(e) => setRating(e.target.value)} />
                      <button type="submit">Submit!</button>
                    </form>}
                    
                    
                  {talent.reviews.length < 1? <p>No reviews yet</p>: 
                    talent.reviews.map((el) => (
                      <div key={el?.id} className="text-lg">
                        <h5 className="text-xl my-4">{el?.title}</h5>
                        <p >{el?.comment}</p>
                        <p>
                          Posted By:{" "}
                          <Link to={`/talents/${el?.authorReview?.id}`}>{el?.authorReview.name}</Link>
                        </p>
                      </div>
                    ))}
                </div>
              </div> */
}
export default JobDetails;
