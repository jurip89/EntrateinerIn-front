import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { updateJob, getSingleJob } from "../app/jobs/thunks";
import { useNavigate, useParams } from "react-router-dom";
import { URL } from "../utils";
import axios from "axios";
import { Spin } from "../components";

type Role = {
  name: string;
  id: string | number;
};

const EditJobPage = () => {
  const { id } = useParams<string>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const getCategories = async () => {
    const res = await axios.get(`${URL}/roles`);
    setCategories(res.data);
  };
    const token: string | null = localStorage.getItem("token");
    
const loading = useAppSelector((state) => state.jobs.isLoading);
const job = useAppSelector((state) => state.jobs.job);
  

  const [title, setTtile] = useState<string>(job?.title!);
  const [description, setDescription] = useState<string>(job?.description!);
  const [duration, setDuration] = useState<string>(job?.duration!);
  const [paid, setPaid] = useState<boolean>(job?.paid!);
  const [amount, setAmount] = useState<string | number>(job?.amount!);
  const [location, setLocation] = useState<string>(job?.location!);
  const [category, setCategory] = useState<string | number>(job?.role?.name!);
  const [categories, setCategories] = useState<Role[]>([]);
    
    useEffect(() => {
    if (!token) {
      navigate("/");
    }
    dispatch(getSingleJob(id));      
      
    getCategories();
  }, [token, navigate, id, dispatch]);

    
  
    
  console.log({ title, description, duration, paid, amount, category });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      updateJob({
        id,
        title,
        description,
        duration,
        paid,
        amount,
        location,
        categoryId: category,
      })
    );

    navigate(`/jobs`);
  };

  return (
    <div>
      {loading ? (
        <Spin />
          ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTtile(e.target.value);
            }}
            placeholder="Title"
          />
          <textarea
            placeholder="Description"
            name=""
            id=""
            cols={50}
            rows={10}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <input
            placeholder="Duration"
            type="text"
            value={duration}
            onChange={(e) => {
              setDuration(e.target.value);
            }}
          />
          <label htmlFor="paid">{paid ? "Paid" : "Unpaid"}</label>
          <input
            type="checkbox"
            id="paid"
            checked={paid}
            onChange={() => setPaid(!paid)}
          />
          {paid && (
            <input
              placeholder="Amount"
              type="number"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            />
          )}
          <input
            placeholder="Location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <label htmlFor="category">Role: </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((el) => (
              <option key={el.id} value={el.id}>
                {el.name}
              </option>
            ))}
          </select>
          <button type="submit">Create job!</button>
        </form>
      )}
    </div>
  );
};

export default EditJobPage;
