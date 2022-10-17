import React,{useEffect} from "react";
import { useAppDispatch } from "../app/hooks";
import { getMyJobsTalent } from "../app/jobs/thunks";
import { JobList } from "../components";
const MyJobsPageTalent = () => {
  
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMyJobsTalent())
  },[dispatch])
  
 
  return <JobList/>
};

export default MyJobsPageTalent;
