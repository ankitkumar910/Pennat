import { LoaderCircle, X } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { commentUIContext, userContext } from "../context/Context";
import supabase from "../config/supabaseClient";
import { toast } from "sonner";
import CommentCard from "./CommentCard";

function HomeComment({ setCommentUI, id }) {
	const [userInfo] = useContext(userContext);
	const [loading, setLoading] = useState(true);
	const [, , , setId] = useContext(commentUIContext);

	const userId = userInfo?.user_id;
	const [commentList, setCommentList] = useState([]);
	function deleteComment() {
		console.log("Comment Deleted from UI. 👍");
	}

	useEffect(() => {
		const fetchArticle = async () => {
			setLoading(true);
			try {
				const { data, error } = await supabase
					.from("ArticleTable")
					.select(`CommentTable(*)`)
					.eq("article_id", id)
					.single();

				if (error) console.log(error);
				if (!data) return;

				//setCommentCount(data?.comment_count);

				//DB se like lena hai
				//setLike(data.likes ?? 0);

				//Comment
				const { data: commentData, error: commentError } = await supabase
					.from("CommentTable")
					.select("*,UserTable(username,profile_img)")
					.eq("article_id", id);

				if (commentError) return;
				if (commentData) setCommentList(commentData);
			} catch (error) {
				console.error("Error:", error);

				toast("❌ Failed to load the article. Please try after few minutes.");
			} finally {
				setLoading(false);
			}
		};

		fetchArticle();
	}, [id]);

	return (
		<div className="h-2/3 overflow-y-clip border-t border-[#d8d0d0] dark:border-[#212020] w-full z-50 fixed bottom-0 bg-[#f5f8f7] dark:bg-[#101010]  shadow-2xl   md:w-1/3 md:border md:bottom-3 md:rounded-2xl md:right-1 md:justify-self-end   rounded-t-4xl flex flex-col  items-center">
			<div className="border-b h-12 w-full flex justify-between items-center p-4">
				<div className=" text-lg font-bold ">Comments</div>
				<X
					onClick={() => {
						setCommentUI((p) => !p);

						setId(null);
					}}
					size={18}
					className="hover:text-red-600 hover:font-bold cursor-pointer"
				/>
			</div>
			{!loading && (
				<div className="w-full h-full px-4">
					{commentList.length == 0 && (
						<span className="flex h-full  flex-col justify-center w-full items-center">
							<span className="font-bold">No Comments yet.</span>
							<span>Be the first one to comment.</span>
						</span>
					)}

					{commentList.length > 0 && (
						<div className="w-full h-full  rounded-md p-1    overflow-y-scroll no-scrollbar">
							{commentList.map((comment) => (
								<CommentCard
									user_id={userId}
									deleteComment={deleteComment}
									setCommentList={setCommentList}
									key={comment.id}
									comment={comment}
								/>
							))}
						</div>
					)}
				</div>
			)}

			{loading && (
				<div className="h-full w-full flex justify-center items-start pt-12 ">
					{" "}
					<LoaderCircle className="mt-1 mx-1 animate-spin" size={18} />{" "}
					<span>Loading..</span>{" "}
				</div>
			)}
		</div>
	);
}

export default HomeComment;
