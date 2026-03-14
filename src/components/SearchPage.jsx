import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import NavbarPage from "./NavbarPage";
import supabase from "../config/supabaseClient";
import ArticlePage from "./ArticlePage";
import { LoaderCircle } from "lucide-react";
import path from "../assets/Empty.json";
import { Player } from "@lottiefiles/react-lottie-player";

function SearchPage() {
	const [searchParams] = useSearchParams();
	const [searchQuery, SetSearchQuery] = useState(searchParams.get("q"));
	const [articles, setArticles] = useState([]);
	const [loading, setLoading] = useState();
	const navigate = useNavigate();

	useEffect(() => {
		if (!searchQuery) {
			//	navigate("/home");
			return;
		} else {
			async function Search(text) {
				setLoading(true);
				console.log("📞 Calling api...");
				let orQuery = `title.ilike.%${text}%,body.ilike.%${text}%`;

				const { data: searchData, error: searchError } = await supabase
					.from("ArticleTable")
					.select("*,UserTable(*)")
					.or(orQuery);

				if (searchError) {
					console.log(searchError);
					console.log("Got Error");
					setLoading(false);
				} else if (searchData) {
					console.log("Got Data");
					console.log(searchData);
					setArticles(searchData);
					setLoading(false);
				}

				console.log("Call Finised.");
			}
			Search(searchQuery);
		}
	}, [navigate, searchQuery]);

	if (loading)
		return (
			<div className="h-screen w-full">
				<div className="min-h-full flex items-center justify-center">
					<div className="flex items-center gap-2 text-gray-600">
						<LoaderCircle size={24} className="animate-spin" />
						<span>Loading..</span>
					</div>
				</div>
			</div>
		);

	return (
		<div className="w-full ">
			<NavbarPage SetSearchQuery={SetSearchQuery} />
			{!loading && !articles.length && (
				<div className="h-full w-full">
					<div className="min-h-screen flex items-center justify-center">
						<div className="flex items-center gap-2 text-gray-600">
							<div className="select-none h-full w-full flex flex-col items-center justify-center  ">
								<Player
									autoplay
									className="h-50 m-0  sm:h-54   md:h-60"
									src={path}></Player>

								<h2 className="text-center text-gray-300 bg-gray-800 mt-2 sm:-mt-1 rounded px-4 font-mono  my-0  py-0 text-sm font-extralight">
									No result found for{" "}
									<span className="text-blue-500 font-bold text-lg">
										{searchQuery}
									</span>
								</h2>
							</div>
						</div>
					</div>
				</div>
			)}
			<div className="h-full  w-full flex mt-12 justify-center">
				{articles.length>0 && (
					<div className="w-full h-full">
						<ArticlePage articles={articles} />
					</div>
				)}
			</div>

		
		</div>
	);
}

export default SearchPage;
