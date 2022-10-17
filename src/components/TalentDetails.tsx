import React,{useState,FC} from 'react'
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
  const [currentImg, setCurrentImg] = useState<string | undefined>("");
  const [openPreview, setOpenPreview] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);

  const [title, setTitle] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [rating, setRating] = useState<string>('1')
  
  const idNumber: number = parseInt(props.id!);


      const nextImg = () => {
    const max: number = talent?.images.length;
    setIndex(index + 1);
    if (index === max - 1) {
      setIndex(0);
      setCurrentImg(talent?.images[0].source);
    }

    setCurrentImg(talent.images[index].source);
  };
  const previousImg = () => {
    const max: number = talent?.images.length;

    if (index === -1) {
      setIndex(index + max);
      return;
    }
    setCurrentImg(talent?.images[index].source);
    setIndex(index - 1);
  };



  const postReview = (e:React.FormEvent) => {
    e.preventDefault();
    const body = {title,comment,rating,receiverId:talent?.id!}
    dispatch(addReview(body))
    setComment('');
    setTitle('');
    setRating('1')
  }

  const handleClickPic = (source: string, i: number) => {
    setOpenPreview(true);
    setCurrentImg(source);
    setIndex(i);
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
          {!openPreview ? (
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
                {talent?.images?.map((image, i) => (
                  <div key={image?.id}>
                    {user?.id === idNumber && (
                      <button
                        className="bg-white m-auto w-8 h-8"
                        onClick={() => destroy(image.id)}
                      >
                        X
                      </button>
                    )}
                    <div
                      onClick={() => handleClickPic(image?.source, i)}
                      className="xl:w-52 xl:h-52 lg:w-48 lg:h-48 md:w-40 md:h-40 sm:h-56 sm:w-56 justify-end"
                      style={{
                        backgroundImage: `url(${image?.source})`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition:'center'
                      }}
                    />
                  </div>
                ))}
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
            ) : (<div className="col-span-4 border-2 border-gray-500 rounded-xl">
              <div className="w-full flex justify-end">
                <button
                  className="text-xl m-3 cursor-pointer"
                  onClick={() => setOpenPreview(false)}
                >
                  X
                </button>
              </div>
              <div className=" flex  justify-between">
                <button
                  className="my-auto mx-20 text-6xl cursor-pointer"
                  onClick={() => previousImg()}
                >
                  {"<"}
                </button>
                <div
                  className="xl:w-96 xl:h-96 md:w-64 md:h-64 mb-12"
                  style={{
                    backgroundImage: `url(${currentImg})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition:'center'
                  }}
                />
                <button
                  className="my-auto mx-20 text-6xl cursor-pointer"
                  onClick={() => nextImg()}
                >
                  {">"}
                </button>
              </div>
            </div>)}
        </div>
      )}
    </div>
  )
}

export default JobDetails