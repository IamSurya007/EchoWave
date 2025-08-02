import PostCard from "../ui/PostCard";
import {useEffect, useState} from "react";
import axios from "@/utils/api.js";
import InfiniteScroll from "react-infinite-scroll-component";

const Posts = () => {
    const [posts, setPosts] = useState([]); // All loaded posts
    const [currentPage, setCurrentPage] = useState(0); // Current page
    const [totalPages, setTotalPages] = useState(0); // Total pages available

    const getPosts = async () => {
        try {
            const res = await axios.get("/post/getposts", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                params: {
                    page: currentPage,
                    limit: 6,
                },
            });

            const {fetchedPosts, fetchedCurrentPage, fetchedTotalPages} = res.data;

            // Filter duplicate posts
            const newPosts = fetchedPosts.filter(
                (post) => !posts.find((existingPost) => existingPost._id === post._id)
            );

            setPosts((prevPosts) => [...prevPosts, ...newPosts]);
            setTotalPages(fetchedTotalPages);
            setCurrentPage(fetchedCurrentPage + 1); // Move to the next page
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    useEffect(() => {
        getPosts(); // Fetch initial posts
    }, []);

    return (
        <div className="md:w-1/3 rounded-md mx-auto">
            <InfiniteScroll
                dataLength={posts.length} // Number of posts loaded
                next={getPosts} // Function to load more posts
                hasMore={currentPage < totalPages} // Check if more pages are available
                loader={
                    <div>
                        <div className="flex w-full items-center animate-pulse gap-2 p-4">
                            <div className="h-12 w-12 rounded-full bg-slate-400"></div>
                            <div className="flex-1 ">
                                <div className="h-5 w-[69%] rounded-lg bg-slate-400 text-sm"></div>
                            </div>
                        </div>
                        <div className="h-64 w-full rounded-sm bg-slate-400 text-sm"></div>
                    </div>
                }
            >
                {posts
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .map((post) => (
                        <PostCard key={post._id} post={post}/>
                    ))}
            </InfiniteScroll>
        </div>
    );
};

export default Posts;
