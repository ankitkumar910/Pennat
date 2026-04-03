import React, { useContext, useState } from "react";
import userDp from "../assets/user.png";
import { commentUIContext, dataContext, userContext } from "../context/Context";
import {
	BookOpenCheck,
	Ellipsis,
	Heart,
	History,
	MessageCircle,
	Send,
	Timer,
	Trash2,
} from "lucide-react";
import supabase from "../config/supabaseClient";
import { NavLink, useNavigate } from "react-router-dom";
import parse from "html-react-parser";
import { toast } from "sonner";
import { CalculateTime } from "../utils/CalculateTime";
import { CarouselComp } from "./ui/Crousel";
import ImageGrid from "./ImageGrid";
import { TimeFormate } from "./utils/TimeFormater";
import HomeComment from "./HomeComment";


function SearchArticleResult({ articles }) {
	return (
		<div className="mt-3">
			{articles.map((el) => (
				<SearchPost article={el} key={el.id} />
			))}
		</div>
	);
  
}

function SearchPost({ article }) {
	const [time] = useState(CalculateTime(article?.body ?? ""));
	const navigate = useNavigate();
  	const { name, username, profile_img } = article.UserTable;
	const [timestamp] = useState(article?.created_at ?? "");
	console.log("SearchPost:");
	console.log(article);
	return (
		<div className="mt-3">
			<div
				className={` disabled:bg-green-400 w-full border-b   sm:w-[60vw] max-w-2xl mx-auto py-6 px-4  sm:border sm:mt-2 border-[#ebdede] dark:border-[#232225]   sm:rounded-xl transition-all
			
			relative
			[&>span]:collapse
			[&:hover>span]:visible

			

			`}>
				<div className="flex  justify-between items-center mb-4  ">
				<div
					className="flex items-center gap-2  
			">
					<img
						onClick={() => navigate(`/profile/${username}`)}
						src={profile_img || userDp}
						alt={name}
						className="size-10 rounded-full object-cover ring-1 ring-gray-100 dark:ring-gray-800"
					/>
					<div className="flex flex-col   ">
						<span className="text-sm font-semibold text-gray-900 dark:text-gray-100 leading-none">
							{name}
						</span>
						<NavLink
							to={`/profile/${username}`}
							className="text-xs text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors mt-1">
							@{username}
						</NavLink>
					</div>
					<span className="items-start  h-full text-xs text-gray-500  mt-4 ">
						{" "}
						<span className="font-bold -ml-1">&#183;</span>{" "}
						{TimeFormate(timestamp)}
					</span>
				</div>

				<div className="flex  bg-blue-800   flex-row-reverse items-center">
					{/* <div>
						{user_id === author_id && (
							<div className="relative hidden">
								<button
									onClick={() => setIsMenuOpen(!isMenuOpen)}
									className="p-1.5 flex items-center rounded-full text-gray-400 hover:bg-gray-100 dark:hover:bg-[#252525] transition-colors cursor-pointer">
									<Ellipsis size={20} />
								</button>

								{isMenuOpen && (
									<div className="absolute right-0 mt-2 w-36 bg-white dark:bg-[#1F1B24] border border-gray-200 dark:border-gray-800 rounded-lg shadow-xl z-10 py-1">
										<button
											className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
											onClick={handleDelete}>
											<Trash2 size={14} />
											Delete
										</button>
									</div>
								)}
							</div>
						)}
					</div> */}
				</div>
			</div>

				<div
					onClick={() => {
						navigate(`/article?id=${article.id}`);
					}}
					className="hover:cursor-pointer ">
					<div className="space-y-2 ">
						<h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100 leading-snug">
							{article.title}
						</h2>
						<div className="text-[15px] leading-relaxed text-gray-600 dark:text-gray-400 line-clamp-3 prose-p:m-0 prose-headings:text-lg">
							{parse(article.body)}
						</div>
					</div>

					{/* {images.length > 0 && (
						<div className="h-fit  min-h-21 mb-8 overflow-clip">
							<ImageGrid images={images} />
						</div>
					)} */}
					
				</div>

				<span className="flex absolute timer top-0 right-0 flex-row items-center bg-[#282a2b] rounded-bl-md pl-2 pb-0.5 rounded-tr-3xl  px-1 transition-all duration-100">
					<span className="px-1 text-xs flex items-center text-gray-500">
						{" "}
						{time?.text}
					</span>
				</span>
			</div>
		</div>
	);
}

export default SearchArticleResult;
