import React, {useEffect, useState} from 'react'
import axios from "@/utils/api.js";
import {IoClose} from "react-icons/io5";
import profile from '../assets/profile.jpg'


export const Suggestions = () => {

    const [suggestedUsers, setSuggestedUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

    const getSuggestedUsers = async () => {
        try {
            const res = await axios.get('/user/secured/suggestedusers', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                params: {
                    page: currentPage,
                    limit: 6
                }
            });
            setSuggestedUsers(res.data);
        } catch (err) {
            console.log('error', err)
        }
    }

    useEffect(() => {
        getSuggestedUsers();
    }, []);
    return (
        <>
            <div className="md:w-4/5 p-2 mt-6 overflow-hidden  ml-auto rounded border border-gray-700">
                <span className="mb-4">People you might know</span>
                <div
                    className="overflow-x-auto overflow-y-hidden scroll-smooth whitespace-nowrap w-full"
                    style={{scrollbarWidth: 'thin'}}
                >
                    {suggestedUsers?.map((user) => (
                        <div
                            key={user._id}
                            className="inline-block border mt-3 p-2 md:w-1/6 w-2/5 border-gray-600 rounded-s mx-2"
                        >
                            <label className="flex ml-auto">
                                <IoClose/>
                            </label>
                            <div className="flex flex-col items-center justify-center">
                                <img
                                    className="w-28 h-28 rounded-full object-cover"
                                    src={user.userIcon}
                                    alt="profile"
                                />
                                <label className="text-lg">{user.name || 'surya'}</label>
                                <button className="border border-gray-700 bg-transparent rounded-s p-1 px-2">
                                    View Profile
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
