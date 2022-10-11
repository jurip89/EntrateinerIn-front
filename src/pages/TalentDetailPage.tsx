import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getOneTalentThunk, deleteImage } from "../app/talents/thunks";
import { deleteImg } from "../app/talents/slice";
import { Link,useNavigate } from "react-router-dom";
const TalentDetailPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const talent = useAppSelector((state) => state.talents.talent);
  const loading = useAppSelector((state) => state.talents.isLoading);
  const user = useAppSelector((state) => state.auth.profile);
  const { id } = useParams<string>();
  const idNumber: number = parseInt(id!);
  useEffect(() => {
    dispatch(getOneTalentThunk(id));
  }, [dispatch, id]);

  const [currentImg, setCurrentImg] = useState<string | undefined>("");
  const [openPreview, setOpenPreview] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);

  const handleClickPic = (source: string, i: number) => {
    setOpenPreview(true);
    setCurrentImg(source);
    setIndex(i);
  };
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

  const destroy = (id:number) => {
    dispatch(deleteImage(id));
   dispatch(deleteImg(id))
 }

  return (
    <div className="w-full">
      {loading ? (
        <p>...Loading</p>
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
                {talent?.images.map((image, i) => (
                  <div key={image.id} >{user?.id === idNumber && (
                      <button className="bg-white m-auto w-8 h-8" onClick={() => destroy(image.id)}>X</button>
                    )}
                  <div
                    onClick={() => handleClickPic(image.source, i)}
                    className="xl:w-52 xl:h-52 lg:w-48 lg:h-48 md:w-40 md:h-40 sm:h-56 sm:w-56 justify-end"
                    style={{
                      backgroundImage: `url(${image.source})`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                    }}
                   
                  />
                    
                  </div>
                ))}
              </div>
              <div>
                <h4 className="text-xl">Reviews:</h4>
                <div>
                  {talent.reviews.length > 1 &&
                    talent.reviews.map((el) => (
                      <div key={el.id}>
                        <h5>{el.title}</h5>
                        <p>{el.comment}</p>
                        <p>
                          Posted By:{" "}
                          <Link to={`/jobs/${el.user.id}`}>{el.user.name}</Link>
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="col-span-4 border-2 border-gray-500 rounded-xl">
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
                  className="w-96 h-96 mb-12"
                  style={{
                    backgroundImage: `url(${currentImg})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                />
                <button
                  className="my-auto mx-20 text-6xl cursor-pointer"
                  onClick={() => nextImg()}
                >
                  {">"}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TalentDetailPage;
