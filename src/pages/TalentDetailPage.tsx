import React, { MouseEventHandler, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getOneTalentThunk } from "../app/talents/thunks";
import { Link } from "react-router-dom";
const TalentDetailPage = () => {
  const dispatch = useAppDispatch();
  const talent = useAppSelector((state) => state.talents.talent);
  const loading = useAppSelector((state) => state.talents.isLoading);
  const { id } = useParams<string>();
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
    const max: number  = talent?.images.length;
    setIndex(index+ 1);
    if (index === max - 1 ) {
      setIndex(0);
      setCurrentImg(talent?.images[0].source);
    }
    
    setCurrentImg(talent.images[index].source)
  };
  const previousImg = () => {
    const max: number = talent?.images.length;
    
    if (index === -1 ) {
      setIndex(index + max);
      return
    }
    setCurrentImg(talent?.images[index].source);
    setIndex(index - 1);
  };

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
              <div className="grid lg:grid-cols-4 md:grid-cols-2">
                {talent?.images.map((image, i) => (
                  <div
                    onClick={() => handleClickPic(image.source, i)}
                    className="md:w-48 lg:w-60 lg:h-60 md:h-48"
                    style={{
                      backgroundImage: `url(${image.source})`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                    }}
                    key={image.id}
                  />
                ))}
              </div>
              <div>
                <h4 className="text-xl">Reviews:</h4>
                <div>
                  {talent.reviews.length > 1 && talent.reviews.map((el) => (
                    <div key={el.id}>
                      <h5>{el.title}</h5>
                      <p>{el.comment}</p>
                      <p>Posted By: <Link to={`/jobs/${el.user.id}` }>{ el.user.name}</Link></p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="col-span-4 border-2 border-gray-500 rounded-xl">
              <div className="w-full flex justify-end">
                <p
                  className="text-xl m-3 cursor-pointer"
                  onClick={() => setOpenPreview(false)}
                >
                  X
                </p>
              </div>
              <div className=" flex  justify-between">
                <div
                  className="my-auto mx-20 text-6xl cursor-pointer"
                  onClick={() => previousImg()}
                >
                  {"<"}
                </div>
                <div
                  className="w-96 h-96 mb-12"
                  style={{
                    backgroundImage: `url(${currentImg})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                />
                <div
                  className="my-auto mx-20 text-6xl cursor-pointer"
                  onClick={() => nextImg()}
                >
                  {">"}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TalentDetailPage;
