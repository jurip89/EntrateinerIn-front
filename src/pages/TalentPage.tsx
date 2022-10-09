import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { talentsThunk } from "../app/talents/thunks";
const TalentPage = () => {
  const talents = useAppSelector((state) => state.talents.talents);
  const loading = useAppSelector((state) => state.talents.isLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(talentsThunk())
   },[dispatch])
console.log(talents)
console.log(loading)

  return <div>TalentPage</div>;
};

export default TalentPage;
