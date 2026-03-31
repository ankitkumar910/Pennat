import NavbarPage from "./NavbarPage";
import ArticlePage from "./ArticlePage";
import AddArticle from "./AddArticle";
import FieldInput from "./ui/FieldInput";
import ArticleWriter from "./ArticleWriter";
import { useContext, useEffect, useState } from "react";

import { FilePenLine, LogIn, PenLine } from "lucide-react";
import { commentUIContext, dataContext, userContext } from "../context/Context";
import { useNavigate } from "react-router-dom";
import supabase from "../config/supabaseClient";
import NoArticles from "./utils/NoArticles";
import HomeComment from "./HomeComment";

function Home() {
	const [write, setWriter] = useState(false);
	const [crousel, setCrousel] = useState(true);
	const [userInfo, isLoading] = useContext(userContext);
	const navi = useNavigate();
	const [commentClicked, setCommentClicked] = useState();
	const [id, setId] = useState(-1); //used for Home Comment Ui

	const [articles, setArticlesData, , setLikedArcticles, , setMyFollowing] =
		useContext(dataContext);

	useEffect(() => {
		if (isLoading) return;

		async function loadeArticles() {
			const response = await supabase
				.from("ArticleTable")
				.select(
					"created_at,likes,comment_count,article_id,id,title,author_id,body,UserTable(name,username,profile_img,user_id),images"
				);

			if (response.error) {
				console.error("Database error:", response.error);

				return null;
			}
			if (response.data) {
				setArticlesData(response.data);
				console.log(response.data);

				const { data, error } = await supabase.from("LikesTable").select();

				if (error) {
					console.log(error);
				} else if (data) {
					let tempSet = new Set();
					data.forEach((row) => {
						if (row.user_id == userInfo.user_id) tempSet.add(row.article_id);
					});
					console.log("Liked Articles By Me 🙍‍♂️🩷");
					console.log(tempSet);
					setLikedArcticles(tempSet);
				}
			}
		}

		loadeArticles();
	}, [
		userInfo,
		isLoading,
		navi,
		setLikedArcticles,
		setArticlesData,
		setMyFollowing,
	]);

	return (
		<div className="w-full    -mt-2 box-border h-fit  min-h-screen dark:bg-[#1F1B24]">
			<NavbarPage />

			<div
				className="
			    mt-15 overflow-auto"
				id="writer">
				{  write  && <ArticleWriter setWriter={setWriter} />}
				<div 
					hidden={write || !userInfo}
					onClick={() => {
						setWriter(true);
					}}
					className="border-2 hover:border-gray-900 shadow-2xl  bg-black bottom-2 right-2 fixed justify-center sm:mx-auto mx-2 w-fit  text-sm rounded-2xl dark:bg-[#313839]  my-2 py-1 
					
					mb-4  ">
					<div
						id="article_Button"
						className="h-full w-full cursor-pointer px-4 flex justify-between items-center py-3 outline-0 [&:hover>.pencil]:-rotate-5 select-none"
						placeholder="">
						<PenLine size={18} color="white" className="pencil" />
						<span className="p-1 text-white">Write Article</span>
					</div>
				</div>
			</div>

			<commentUIContext.Provider
				value={[commentClicked, setCommentClicked, id, setId]}>
				<div className="box-border">
					{articles && <ArticlePage />}
					{!articles && <NoArticles />}
				</div>

				{commentClicked && (
					<div>
						<HomeComment setCommentUI={setCommentClicked} id={id} />
					</div>
				)}
			</commentUIContext.Provider>
		</div>
	);
}

export default Home;
