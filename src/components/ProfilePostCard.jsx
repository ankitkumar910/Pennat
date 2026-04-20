import React, { useContext, useState } from "react";
import parse from "html-react-parser";
import { Ellipsis, Trash2, BookOpen } from "lucide-react";
import supabase from "../config/supabaseClient";
import Loader from "./Loader";
import { userContext } from "../context/Context";
import { NavLink } from "react-router-dom";
import { toast } from "sonner";

function ProfilePostCard({ article, setArticle, isOpen, setOpenMenuId }) {
	const [loader, setLoader] = useState(false);
	const [userInfo] = useContext(userContext);
	const user_id = userInfo?.user_id;

	if (!article) return null;

	async function handleDelete(e) {
		e.stopPropagation()
		e.preventDefault()
		setLoader(true);
		const res = await supabase
			.from("ArticleTable")
			.delete()
			.eq("id", article.id);

		if (!res.error) {
			toast("Deleted successfully.")
			setArticle((p) => p.filter((x) => x.id !== article.id));
		}else{
			toast("Error while deleting")
			console.log(res.error)
		}
		setLoader(false);
	}

	return (
		<NavLink
			to={`/article?id=${article.id}`}
			onContextMenu={(e) => {
				e.preventDefault();
				setOpenMenuId(isOpen ? null : article.id);
			}}
			className="group px-1    relative flex flex-col w-full  bg-white dark:bg-[#141414]  border  
			 overflow-hidden  duration-300 mx-auto   sm:border sm:mt-2  border-[#ebdede] dark:border-[#232225]    sm:rounded-xl transition-all">
			{/* Loading Overlay */}
			{loader && (
				<div className="absolute inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-black/80 backdrop-blur-[2px]">
					<Loader text={"Deleting..."} />
				</div>
			)}

			<div className="flex   justify-between items-start  absolute right-2  top-2">
				{user_id == article.author_id && (
					<div className="relative ">
						<button
							onClick={(e) => {
								e.preventDefault();
								e.stopPropagation();
								setOpenMenuId(isOpen ? null : article.id);
							}}
							className={`p-1.5 rounded-full text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100
							 dark:hover:bg-[#252525] ${
									isOpen && "bg-[#252525]"
								} transition-all cursor-pointer`}>
							<Ellipsis
								size={20}
								className="hover:scale-110 hover:animate-pulse "
							/>
						</button>

						{/* Action Menu */}
						{isOpen && (
							<>
								{/* Backdrop to close menu on click outside */}
								<div
									className="relative right-4   inset-0 z-10  "
									onClick={() => setOpenMenuId(null)}
								/>
								<div
									onClick={handleDelete}
									className="w-30 p-2  bg-red-300 dark:bg-red-950  border border-gray-400 dark:border-gray-800  text-red-800 dark:text-red-500
								 rounded-lg  absolute right-8 top-4 ">
									<button className="  min-w-12 ">
										<span className="flex flex-row  items-center">
											<Trash2 size={14} />
											Delete Post
										</span>
									</button>
								</div>
							</>
						)}
					</div>
				)}
			</div>

			<div className="px-5 mt-6 pb-5">
				<h3 className=" font-semibold text-gray-800 dark:text-gray-100 text-xl line-clamp-1 mb-2 tracking-tight">
					{article.title}
				</h3>
				<div className="text-sm text-gray-800 dark:text-gray-400 line-clamp-3 leading-relaxed opacity-80 prose-p:m-0">
					{parse(article.body)}
				</div>
			</div>
		</NavLink>
	);
}

export default React.memo(ProfilePostCard);
