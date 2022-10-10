import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getOneTalentThunk } from "../app/talents/thunks";
const TalentDetailPage = () => {
  const dispatch = useAppDispatch();
  const talent = useAppSelector((state) => state.talents.talent);
  const loading = useAppSelector((state) => state.talents.isLoading);
  const { id } = useParams<string>();
  useEffect(() => {
    dispatch(getOneTalentThunk(id));
  }, [dispatch, id]);
    console.log(talent)
  return <div>TalentDetailPage</div>;
};

export default TalentDetailPage;
