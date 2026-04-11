import React, { useState, useEffect, useContext, useRef } from "react";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import supabase from "../config/supabaseClient";
import parse from "html-react-parser";
import {
	Bluetooth,
	Bookmark,
	BookMarked,
	BookOpenCheck,
	CalendarDays,
	ChevronLeft,
	Ellipsis,
	Heart,
	Hourglass,
	Share,
} from "lucide-react";
import { toast } from "sonner";
import Loader from "./Loader";
import { Spinner } from "@/components/ui/spinner";
import { userDp } from "../../public/avtar";
import { dataContext, userContext } from "../context/Context";
import CommentCard from "./CommentCard";
import { CalculateTime } from "../utils/CalculateTime";
import { ReaderMenu } from "./ReaderMenu";
import { SignDialogue } from "./SignDialogue";

function ArticleReader() {
	const navigate = useNavigate();
	const [userInfo] = useContext(userContext);
	const userId = userInfo?.user_id;
	const [searchParam] = useSearchParams();
	const commentRef = useRef();
	const articleId = searchParam.get("id");
	const [article, setArticle] = useState(null);
	const [author, setAuthor] = useState(null);
	const [loading, setLoading] = useState(true);
	const [commentCount, setCommentCount] = useState(null);
	let temporaryCount = useRef(0);
	const [commentList, setCommentList] = useState([]);
	const [canComment, setCanComment] = useState(true);
	const [showBtn, setShowBtn] = useState();
	const [isLiking, setIsLiking] = useState(false);

	const [like, setLike] = useState(null); // null = loading state
	const [isLiked, setIsLiked] = useState(false); // default false, fetch ke baad set hoga
	const [time, setTime] = useState();

	let [, , likedArcticles, setLikedArcticles] = useContext(dataContext);

	useEffect(() => {
		if (!articleId) {
			navigate("/home");
			return;
		}

		const fetchArticle = async () => {
			try {
				const { data, error } = await supabase
					.from("ArticleTable")
					.select(`*,UserTable(*),CommentTable(*)`)
					.eq("id", articleId)
					.single();

				if (error) console.log(error);
				if (!data) return;

				setArticle(data);
				setTime(CalculateTime(data.body ?? ""));
				setCommentCount(data?.comment_count);
				temporaryCount.current = data?.comment_count;
				setAuthor(data.UserTable);

				//DB se like lena hai
				setLike(data.likes ?? 0);

				if (userId) {
					if (likedArcticles.has(data.article_id)) {
						//liked article loaded
						setIsLiked(true);
					} else {
						//liked article not loaded
						const { data: likeData } = await supabase
							.from("LikesTable")
							.select("article_id")
							.eq("article_id", data.article_id)
							.eq("user_id", userId)
							.maybeSingle();

						if (likeData) {
							setIsLiked(true);
							setLikedArcticles((prev) => {
								const newSet = new Set(prev);
								newSet.add(data.article_id);
								return newSet;
							});
						}
					}
				}
				//Comment
				const { data: commentData, error: commentError } = await supabase
					.from("CommentTable")
					.select("*,UserTable(username,profile_img)")
					.eq("article_id", data.article_id);

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
	}, [articleId, navigate, userId, likedArcticles, setLikedArcticles]);

	useEffect(() => {
		if (commentRef.current?.value) {
			setShowBtn(true);
		} else {
			setShowBtn(false);
		}
	}, [commentRef.current?.value]);

	const formatDate = (date) => {
		return new Date(date).toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	if (loading) {
		return (
			<div className="flex items-center text-lg min-h-screen justify-center">
				<Spinner className="size-6 mx-1" /> Just a minute
			</div>
		);
	}

	if (!article) {
		return (
			<div className="mx-auto px-4 py-16 text-center h-screen">
				<h1 className="text-md font-bold mb-4">
					Error Occurred while loading article.
				</h1>
				<button
					onClick={() => navigate("/")}
					className="px-6 py-2 bg-gray-600 text-white rounded-lg">
					Go Home
				</button>
			</div>
		);
	}

	async function handleComment() {
		setCanComment(false);

		let commentText = commentRef.current.value + "";
		let newString = commentText.trim();

		if (newString.length) {
			const dummyComment = {
				id: crypto.randomUUID(),
				comment: commentText,
				UserTable: {
					username: userInfo?.username,
					profile_img: userInfo?.profile_img,
				},
			};
			setCommentCount((prev) => prev + 1);
			setCommentList((prev) => [dummyComment, ...prev]);
			if (!userId) return;

			const { data, error } = await supabase
				.from("CommentTable")
				.insert([
					{
						article_id: article?.article_id,
						user_id: userId,
						comment: newString,
					},
				])
				.select()
				.single();

			if (error) {
				toast("Comment Not Posted.");
				setCommentCount((p) => p - 1);
				console.log(error);
				return;
			} else if (data) {
				temporaryCount.current = temporaryCount.current + 1;
				const { data: countData, error: countError } = await supabase
					.from("ArticleTable")
					.update([{ comment_count: temporaryCount.current }])
					.eq("article_id", article?.article_id)
					.select();

				if (countError) {
					toast("Error while updating comment count.");
					console.log(countError);
					setCommentCount((p) => p - 1);
					return;
				}

				if (countData) toast("Comment Posted.");
			}
		}

		setCanComment(true);
		commentRef.current.value = null;
	}

	async function deleteComment(commentId, comment) {
		temporaryCount.current = temporaryCount.current - 1;
		setCommentCount((p) => p - 1);
		setCommentList((prev) => prev.filter((com) => com.id != comment.id));

		const { data: CommentTableData, error: CommentTableError } = await supabase
			.from("CommentTable")
			.delete()
			.eq("comment_id", comment.comment_id)
			.select();

		if (CommentTableError) {
			toast("Error occurred, while deleting comment.");
			setCommentCount((p) => p + 1);
			setCommentList((prev) => [comment, ...prev]);
			return;
		}

		if (CommentTableData) {
			const { data: commentCountData, error: commentCountError } =
				await supabase
					.from("ArticleTable")
					.update({ comment_count: temporaryCount.current })
					.select()
					.eq("article_id", article.article_id);

			if (commentCountError) {
				toast("Error while updating comment count.");
				temporaryCount.current = temporaryCount.current + 1;
				setCommentCount((p) => p + 1);
				setCommentList((prev) => [comment, ...prev]);
				return;
			}

			if (commentCountData) toast("Comment Deleted.");
		}
	}

	async function handleLike() {
		// 1. Safety checks
		if (isLiking || !userInfo) return;
		setIsLiking(true);

		// Keep track of the current state before we change it
		const wasLiked = isLiked;
		const currentLikeCount = like ?? 0;

		// 2. Update UI Immediately (Optimistic Update)
		// This makes the app feel fast
		setIsLiked(!wasLiked);
		setLike(wasLiked ? currentLikeCount - 1 : currentLikeCount + 1);

		// 3. Update the "LikesTable" (Add or Remove the record)
		const { error: likeError } = await (wasLiked
			? supabase
					.from("LikesTable")
					.delete()
					.eq("article_id", article?.article_id)
					.eq("user_id", userId)
			: supabase
					.from("LikesTable")
					.insert({ article_id: article?.article_id, user_id: userId }));

		if (likeError) {
			toast("❌ Error updating like");
			revertUI();
			return;
		}

		// 4. Update the "ArticleTable" count
		// We use the count we already have in memory + or - 1
		const { error: articleError } = await supabase
			.from("ArticleTable")
			.update({ likes: wasLiked ? currentLikeCount - 1 : currentLikeCount + 1 })
			.eq("article_id", article?.article_id);

		if (articleError) {
			toast("❌ Error updating count");
			revertUI();
		}

		// Helper to reset UI if something goes wrong
		function revertUI() {
			setIsLiked(wasLiked);
			setLike(currentLikeCount);
			setIsLiking(false);
		}

		setIsLiking(false);
	}
	return (
		<div className="min-h-screen  overflow-x-clip no-scrollbar  bg-white dark:bg-gray-900">
			<div className="max-w-4xl mx-auto px-4 pt-8">
				<button
					onClick={() => navigate(-1)}
					className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
					<ChevronLeft width={20} />
					Back
				</button>
			</div>

			<article className="max-w-3xl mx-auto px-4 py-8">
				<h1 className="text-4xl md:text-6xl sm:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
					{article?.title}
				</h1>

				<div className="flex  flex-row  justify-between  items-start gap-4 mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
					<div>
						<div className="flex  ">
							<div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
								<span
									title="Published Date"
									className="flex flex-row items-center">
									<CalendarDays className="ml-2" size={16} />
									<span className="px-1 flex">
										{" "}
										{formatDate(article.created_at)}
									</span>
								</span>
								<>
									{time && (
										<span
											title="Expected reading duration"
											className="flex flex-row items-center">
											<span>•</span>
											<BookOpenCheck className="ml-2" size={16} />
											<span className="px-1 flex"> {time.text}</span>
										</span>
									)}
								</>
								{article.view_count && (
									<>
										<span>•</span>
										<span>{article.view_count} views</span>
									</>
								)}
							</div>
						</div>

						<div className="rounded-xl mt-2">
							<div className="flex items-center gap-1">
								<img
									src={author?.profile_img || userDp}
									alt={author?.username}
									className="h-10 mr-4 rounded-full object-cover cursor-pointer"
									onClick={() => navigate(`/profile/${author?.username}`)}
								/>
								<div className="flex-1">
									<h3
										className="font-bold -mb-1 cursor-pointer hover:underline"
										onClick={() => navigate(`/profile/${author?.username}`)}>
										{author?.name || author?.username}
									</h3>
									<p className="text-gray-600 text-xs dark:text-gray-400">
										{author?.about || "Hey, I write on Pennat."}
									</p>
								</div>
							</div>
						</div>
					</div>

					<div>
						<ReaderMenu />
					</div>
				</div>

				<div className="tiptapEditor  font-[roboto] dark:text-[#E0E0E0] text-xl sm:text-2xl mb-8">
					{parse(article.body)}
				</div>

				<div className="flex items-center gap-3 py-8 border-gray-200 dark:border-gray-700">
					<SignDialogue
						title={`Liked this article?`}
						child={
							<div
								onClick={(e) => {
									e.stopPropagation();

									if (userInfo) {
										e.preventDefault();
										handleLike();
									}
								}}
								className="flex  items-center gap-2 px-4 py-2 rounded-full border  border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
								<Heart
									size={20}
									fill={isLiked ? "#ff0000" : "none"}
									strokeWidth={2}
									className={`${
										isLiked ? "stroke-red-600" : ""
									} transition-transform hover:scale-120`}
								/>

								<span className="text-sm">{like ?? "Like"}</span>
							</div>
						}
					/>

					<button className=" items-center gap-2 px-4 py-2 rounded-lg hidden border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
						<Bookmark size={18} />
						<span className="text-sm">Save</span>
					</button>

					<button className=" items-center gap-2 px-4 py-2 rounded-lg hidden  border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
						<Share size={18} />
						<span className="text-sm">Share</span>
					</button>
				</div>

				<div className="mt-12">
					<h2 className="text-lg font-bold mb-2 ml-2">
						{commentCount ?? ""} {commentCount > 1 ? "Comments" : "Comment"}
					</h2>

					{userInfo && (
						<div>
							<textarea
								onChange={(e) => {
									if (e.target.value) setShowBtn(true);
									else setShowBtn(false);
								}}
								ref={commentRef}
								placeholder="Write a comment..."
								className="block field-sizing-content  h-fit w-full px-2 py-0 focus:py-1 border-b border-gray-300 dark:border-gray-700 rounded-xs focus:outline-none"
							/>

							<div className="w-full mt-1 flex justify-end">
								<button
									disabled={!canComment}
									className={`transition duration-700 ${
										showBtn ? "opacity-100 block" : "opacity-0 collapse"
									}
								outline-0 px-3 py-2 mt-1 text-sm bg-gray-900 text-white dark:bg-gray-100 dark:text-black border rounded-full hover:bg-gray-700 dark:border-0 disabled:bg-gray-400`}
									onClick={(e) => {
										

										if (userInfo) {
											e.preventDefault();
											handleComment();
										}
									}}>
									{canComment ? "Post Comment" : "Please Wait.."}
								</button>
							</div>
						</div>
					)}

					{!userInfo && (
						<div>
							<div className=" w-full mt-1 flex justify-start pl-3 bg-gray-200 dark:bg-[#1b1b1c]  rounded-sm border py-2 text-gray-600 dark:text-gray-400  text-sm ">
								In order to comment and put your opinion you need to{" "}
								<NavLink to={'/login'} className={"px-1 text-blue-700 font-semibold underline"}> login.</NavLink>
							</div>
						</div>
					)}

					<div className="text-gray-500 w-full dark:text-gray-400">
						{commentList.length > 0 && (
							<div className="w-full rounded-md p-1">
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

						{!commentList.length && (
							<div className="p-2 text-center text-xs pt-8">
								No Comments. Be the first to comment.
							</div>
						)}
					</div>
				</div>
			</article>
		</div>
	);
}

export default ArticleReader;
