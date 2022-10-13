import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { createJob } from "../app/jobs/thunks";
import { useNavigate } from "react-router-dom";
import { URL } from "../utils";
import axios from "axios";

type Role = {
    name: string;
    id: string | number;
  };



const CreateJobPage = () => {
  

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.profile);

  const [title, setTtile] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [paid, setPaid] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>("0");
  const [location, setLocation] = useState<string>("");
  const [category, setCategory] = useState<string>("1");
  const [categories, setCategories] = useState<Role[]>([]);

  const getCategories = async () => {
    const res = await axios.get(`${URL}/roles`);
    setCategories(res.data);
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      createJob({
        title,
        description,
        duration,
        paid,
        amount,
        location,
        userId: user?.id,
        categoryId: category,
      })
    );
    
    setAmount("0");
    setDescription("");
    setTtile("");
    setDuration("");
    setPaid(false);
    setLocation("");
    navigate(`/jobs`)
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTtile(e.target.value);
          }}
          placeholder='Title'
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
        <label htmlFor="paid">{paid? 'Paid': 'Unpaid' }</label>
        <input type="checkbox" id="paid" checked={paid} onChange={() => setPaid(!paid)} />
        {paid && <input
          placeholder="Amount"
          type="number"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
          }}
        />}
        <input
          placeholder="Location"
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <label htmlFor="category">Role: </label>
        <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((el) => (
            <option key={el.id} value={el.id}>
              {el.name}
            </option>
          ))}
        </select>
        <button type="submit">Create job!</button>
      </form>
    </div>
  );
};

export default CreateJobPage;
