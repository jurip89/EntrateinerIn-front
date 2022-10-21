import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { talentsThunk } from "../app/talents/thunks";
import { Link } from "react-router-dom";
import { Spin } from "../components";
const TalentPage = () => {
  const talents = useAppSelector((state) => state.talents.talents);
  const loading = useAppSelector((state) => state.talents.isLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(talentsThunk());
  }, [dispatch]);

  return (
    <div>
      {loading ? (
        <Spin />
      ) : (
        <div className="grid grid-cols-6 my-6">
          <div></div>
          <div className="col-span-4 mt-28">
            <div className="grid gap-5 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2  sm:grid-cols-1">
              {talents.map((el) => (
                <Link
                  key={el.id}
                  to={`/talents/${el.id}`}
                  className="group relative block bg-black"
                >
                  <img
                    alt="Profile pic"
                    src={el.profilePic}
                    className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
                  />

                  <div className="relative p-8">

                    <p className="text-2xl font-bold text-white">{el.name}</p>
                    {el.roles.map(role => <p key={ role.id} className="text-sm font-medium uppercase tracking-widest text-pink-500">
                      {role.name }
                    </p>)
}
                    

                    <div className="mt-64">
                      <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                        <p className="text-sm text-white">{el?.intro}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TalentPage;
