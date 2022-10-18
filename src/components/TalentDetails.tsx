import React,{useState,FC,useEffect,useRef} from 'react'
import { deleteImg } from "../app/talents/slice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Spin } from "../components";
import { Link, useNavigate } from "react-router-dom";
import {  deleteImage,addReview} from "../app/talents/thunks";

type JobProps = {
  id: string |undefined,
}
const JobDetails: FC<JobProps> = (props) => {

  const dispatch = useAppDispatch();
   const navigate = useNavigate();
  const talent = useAppSelector((state) => state.talents.talent);
  const loading = useAppSelector((state) => state.talents.isLoading);
  const user = useAppSelector((state) => state.auth.profile);
  

  const [title, setTitle] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [rating, setRating] = useState<string>('1')
  
  const idNumber: number = parseInt(props.id!);

  const maxScrollWidth = useRef<number>(0);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const carousel = useRef<HTMLDivElement>(null);

  const movePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  const moveNext = () => {
    if (
      carousel.current !== null &&
      carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current
    ) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  const isDisabled = (direction:string) => {
    if (direction === 'prev') {
      return currentIndex <= 0;
    }

    if (direction === 'next' && carousel.current !== null) {
      return (
        carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current
      );
    }

    return false;
  };

  useEffect(() => {
    if (carousel !== null && carousel.current !== null) {
      carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex;
    }
  }, [currentIndex]);

  useEffect(() => {
    maxScrollWidth.current = carousel.current
      ? carousel.current.scrollWidth - carousel.current.offsetWidth
      : 0;
  }, []);
    



  const postReview = (e:React.FormEvent) => {
    e.preventDefault();
    const body = {title,comment,rating,receiverId:talent?.id!}
    dispatch(addReview(body))
    setComment('');
    setTitle('');
    setRating('1')
  }

 
  
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
          
            <div className=" col-span-4 border-2 border-gray-600 p-5 rounded-xl flex flex-col space-y-3">
              <div className="flex flex-col">
                <div
                  className="w-40 h-40 rounded-full"
                  style={{
                    backgroundImage: `url(${talent?.profilePic})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                />
                <h2 className="text-5xl text-gray-600 my-auto">
                  {talent?.name}
                </h2>
                {user?.id === idNumber && <button>Edit Profile</button>}
              </div>
              <div className="flex flex-col-reverse">
                {talent?.roles.map((el) => (
                  <div
                    className="m-2 text-lg bg-indigo-400 text-white p-1 rounded-lg w-96"
                    key={el.id}
                  >
                    <p>
                      {el.name} with {el.userRoles.yearsOfExperience} years of
                      experience
                    </p>
                  </div>
                ))}
              </div>

              <div>
                <p className="text-lg">{talent?.intro}</p>
              </div>
              <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 m-auto gap-5">
                <div className="carousel my-12 mx-auto">
      
      <div className="relative overflow-hidden">
        <div className="flex justify-between absolute top left h-full">
          <button
            onClick={movePrev}
            className="hover:bg-blue-900/75 text-white w-10 h-full text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300"
            disabled={isDisabled('prev')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-20 -ml-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="sr-only">Prev</span>
          </button>
          <button
            onClick={moveNext}
            className="hover:bg-blue-900/75 text-white w-10 h-full text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300"
            disabled={isDisabled('next')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-20 -ml-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
            <span className="sr-only">Next</span>
          </button>
        </div>
        <div
          ref={carousel}
          className="carousel-container relative flex gap-1 overflow-hidden scroll-smooth snap-x snap-mandatory touch-pan-x z-0"
        >
          {talent?.images.map((resource, index) => {
            return (
              <div
                key={index}
                className="carousel-item text-center relative w-64 h-64 snap-start"
              >
                <div
                  
                  className="h-full w-full aspect-square block bg-origin-padding bg-left-top bg-cover bg-no-repeat z-0"
                  style={{ backgroundImage: `url(${resource.source|| ''})` }}
                >{user?.id === idNumber && (
                      <button
                        className="bg-white m-auto w-8 h-8"
                        onClick={() => destroy(resource.id)}
                      >
                        X
                      </button>
                    )}
                  <img
                    src={resource.source || ''}
                    alt={''}
                    className="w-full aspect-square hidden"
                  />
                </div>
                
              </div>
            );
          })}
        </div>
      </div>
    </div>
              </div>
              <div>
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
              </div>
            </div>
            
        </div>
      )}
    </div>
  )
}



export default JobDetails