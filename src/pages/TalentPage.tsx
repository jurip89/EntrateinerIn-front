import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { talentsThunk } from "../app/talents/thunks";
import { Link } from "react-router-dom";
const TalentPage = () => {
  const talents = useAppSelector((state) => state.talents.talents);
  const loading = useAppSelector((state) => state.talents.isLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(talentsThunk());
  }, [dispatch]);
  console.log(talents);
  console.log(loading);

  return (
    <div>
      {loading ? (
        <p>...Loading</p>
      ) : (
        <div className="grid grid-cols-5 my-6">
          <div></div>
          <div className="col-span-3 ">
            <div className="grid gap-5 2xl:grid-cols-5 lg:grid-cols-3  sm:grid-cols-2">
              {talents.map((el) => (
                <div key={el.id} className="rounded-lg border-2">
                  <Link to={`/talents/${el.id}`}>
                  <div className="mx-4 my-4 flex justify-between">
                    <div
                      className="rounded-full w-20 h-20 "
                      style={{
                        backgroundImage: `url(${el.profilePic})`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                      }}
                    />
                    <h3 className="text-lg">{el.name}</h3>
                  </div>
                  <div className="w-full">
                    <ul className="flex justify-between">
                      {el.roles.map((role) => (
                        <li className="bg-indigo-400 p-1 m-3 rounded-lg" key={role.id}>{role.name}</li>
                      ))}
                    </ul>
                    </div>
                    </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TalentPage;
