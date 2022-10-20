import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { editProfile } from "../app/talents/thunks";
import { useNavigate } from "react-router-dom";
import { URL } from "../utils";
import { CLOUD_KEY } from "../utils";
import axios from "axios";

type Role = {
  name: string;
  id: string | number;
};

const EditProfilePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.profile);

  const [name, setName] = useState<string>("");
  const [intro, setIntro] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isRecruiter, setIsRecruiter] = useState<boolean>(false);
  const [yearsOfExperience, setYearsOfExperience] = useState<string>("0");
  const [role, setRole] = useState<string>("1");
  const [image, setImage] = useState<string>("");
  const [categories, setCategories] = useState<Role[]>([]);

  const getCategories = async () => {
    const res = await axios.get(`${URL}/roles`);
    setCategories(res.data);
  };

  useEffect(() => {
    getCategories();
  }, []);

  const uploadImg = async (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "v5ovcvk4");

    //post request to Cloudinary, remember to change to your own link
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_KEY}/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );
    const picture = await res.json();
    setImage(picture.url); //put the url in local state, next step you can send it to the backend
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      editProfile({
        profile: { name, intro, email, isRecruiter },
        role: { yearsOfExperience, roleId: role, userId: user?.id },
        image: { source: image, userId: user?.id },
      })
    );

    navigate("/talents");
  };

  return (
    <div className="w-full h-screen">
      <div className="flex flex-col my-14 mx-auto max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
        <div className="self-center mb-2 text-xl font-light text-gray-800 sm:text-2xl dark:text-white">
          Create a new job
        </div>

        <div className="p-6 mt-8">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col mb-2">
              <div className=" relative ">
                <input
                  type="text"
                  id="create-account-pseudo"
                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  name="pseudo"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => {
                    setTtile(e.target.value);
                  }}
                />
              </div>
            </div>
            <textarea
              className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              id="comment"
              placeholder="Description"
              name="Description"
              rows={7}
              cols={50}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></textarea>

            <div className="flex gap-4 mb-2">
              <div className=" relative ">
                <label className="flex items-center space-x-3 mb-3">
                  <input
                    type="checkbox"
                    checked={paid}
                    onChange={() => setPaid(!paid)}
                    className="form-tick appearance-none bg-white bg-check h-6 w-6 border border-gray-300 rounded-md checked:bg-green-500 checked:border-transparent focus:outline-none"
                  />
                  <span className="text-gray-700 dark:text-white font-normal">
                    Paid
                  </span>
                </label>
              </div>
              {paid && (
                <div className=" relative ">
                  <input
                    type="number"
                    id="create-account-last-name"
                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    name="Last name"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => {
                      setAmount(e.target.value);
                    }}
                  />
                </div>
              )}
            </div>
            <div className="flex flex-col mb-2">
              <div className=" relative ">
                <input
                  type="text"
                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>
            <select
              className="block w-52 text-gray-700 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              name="animals"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((el) => (
                <option key={el.id}>{el.name}</option>
              ))}
            </select>
            <div className="flex w-full my-4">
              <button
                type="submit"
                className="py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;
