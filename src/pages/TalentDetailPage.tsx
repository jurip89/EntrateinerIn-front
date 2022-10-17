import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { getOneTalentThunk} from "../app/talents/thunks";
import { TalentDetails } from "../components";
const TalentDetailPage = () => {
  const dispatch = useAppDispatch();
 
  const { id } = useParams<string>();
  
  useEffect(() => {
    dispatch(getOneTalentThunk(id));
  }, [dispatch, id]);

  

  return (
    <TalentDetails id={id } />
  );
};

export default TalentDetailPage;
