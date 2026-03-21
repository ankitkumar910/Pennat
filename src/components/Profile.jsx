import React, { useContext, useEffect, useRef, useState } from "react";
import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import {
	ChevronLeft,
	ChevronRight,
	Ellipsis,
	LoaderCircle,
	LogOut,
	MoveRight,
	PencilIcon,
} from "lucide-react";
import supabase from "../config/supabaseClient";
import { dataContext, userContext } from "../context/Context";
import userDp from "../assets/user.png";
import { cover_placeholder } from "../../public/resource";

// Components
import ImageUpdater from "./ImageUpdater";
import ProfileImageUpdater from "./ProfileEditor";
import UserProfilePosts from "./UserProfilePosts";
import ProfileFooter from "./ProfileFooter";
import { AlertDialogBasic } from "./ui/AlertDialogBasic";
import { toast } from "sonner";

function Profile() {
	// 1. Context and Params
	const { username: urlUsername } = useParams();
	const navigate = useNavigate();
	const [currentUser] = useContext(userContext);
	const [, , , , myFollowing] = useContext(dataContext);
	const [isFollow, setFollow] = useState(true);
	// 2. Local State
	const [profileData, setProfileData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [failed, setFailed] = useState(false);

	const [ImgEditor, setImgEditor] = useState(false);
	const [popup, SetPopup] = useState(false);

	// UI States (Synced with profileData)
	const [cover, setCover] = useState(cover_placeholder);
	const [profileImg, setProfileImg] = useState(userDp);
	const [about, setAbout] = useState("");
	const [control, setControl] = useState(false);
	const [follower, setFollower] = useState(0);
	const [following, setFollowing] = useState(0);

	// 3. Logic: Decide which data to load

	//check for viewing other profile
	let isMyProfile = useRef(true);

	const [info] = useContext(userContext);
	if (!info) navigate("/login");

	//follow - unfollow function

	async function handleFollow() {
		setFollow(true);
		setFollower((p) => p + 1);
		const { error: followError } = await supabase.from("FollowTable").insert({
			follower_id: currentUser?.user_id,
			following_id: profileData?.user_id,
		});

		if (followError) {
			setFollow(false);
			toast("Something went wrong.");
			console.log(followError);
			setFollower((p) => p - 1);
			return;
		}
	}

	async function handleUnfollow() {
		setFollow(false);
		setFollower((p) => p - 1);
		const { error: unfollowError } = await supabase
			.from("FollowTable")
			.delete()
			.eq("follower_id", currentUser?.user_id)
			.eq("following_id", profileData?.user_id);

		if (unfollowError) {
			setFollow(true);
			toast("Something went wrong.");
			console.log(unfollowError);
			setFollower((p) => p + 1);
			return;
		}
	}

	useEffect(() => {
		if (urlUsername) {
			isMyProfile.current = false;
		}
		async function fetchProfile() {
			setLoading(true);

			// Scenario A: Viewing someone else's profile (or own profile via URL)
			if (urlUsername) {
				const res = await supabase
					.from("UserTable")
					.select("*, ArticleTable(*)")
					.eq("username", urlUsername)
					.single();

				if (res.error) {
					setFailed(true);
				} else {
					setProfileData(res.data);
					setFailed(false);
				}
			}
			// Scenario B: Viewing own profile page (no username in URL)
			else if (currentUser) {
				setProfileData(currentUser);
				setFailed(false);
			}

			setLoading(false);
		}

		fetchProfile();
	}, [urlUsername, currentUser]);

	// 4. Update UI visuals when profileData changes
	useEffect(() => {
		function myFunction() {
			if (profileData) {
				setCover(profileData.cover_img || cover_placeholder);
				setProfileImg(profileData.profile_img || userDp);
				setAbout(profileData.about || "");
			}
		}
		myFunction();
	}, [profileData]);

	// 5. Permission Check: Is this the logged-in user's own profile?
	const isOwnProfile = currentUser?.user_id === profileData?.user_id;
	useEffect(() => {
		if (!urlUsername) {
			navigate(`/profile/${currentUser?.username}`);
			return;
		}
	}, [isOwnProfile, navigate]);
	//check follow
	useEffect(() => {
		if (!isOwnProfile && !loading) {
			console.log("Calling supabase to get follow status.");
			async function loadFollowState() {
				const { data: stateData, error: stateError } = await supabase
					.from("FollowTable")
					.select()
					.eq("follower_id", currentUser?.user_id)
					.eq("following_id", profileData?.user_id);

				if (stateError) {
					setFollow(false);
					toast("Can't load profile.");
					console.log(stateError);
				}

				if (stateData?.length < 1) {
					setFollow(false);
				} else if (stateData?.length > 0) {
					setFollow(true);
				}
			}

			loadFollowState();
		}
	}, [isOwnProfile, loading]);

	//load follower count
	useEffect(() => {
		if (!profileData) return;
		async function loadFollower() {
			const { count, error: followerError } = await supabase
				.from("FollowTable")
				.select("*", { count: "exact", head: true })
				.eq("following_id", profileData?.user_id);

			if (followerError) {
				toast("Error while loading follower count");
				console.log(followerError);
				return;
			}
			console.log("COunt", count);
			setFollower(count ?? 0);
		}

		loadFollower();
	}, [profileData]);

	//load following count
	useEffect(() => {
		if (!profileData) return;
		async function loadFollower() {
			const { count, error: followingError } = await supabase
				.from("FollowTable")
				.select("*", { count: "exact", head: true })
				.eq("follower_id", profileData?.user_id);

			if (followingError) {
				toast("Error while loading following count");
				console.log(followingError);
				return;
			}
			console.log("COunt", count);
			setFollowing(count ?? 0);
		}

		loadFollower();
	}, [profileData]);

	//follow list
	console.log("myFollow", myFollowing);

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center dark:bg-black">
				<div className="flex items-center gap-2 text-gray-600">
					<LoaderCircle size={24} className="animate-spin" />
					<span>Loading profile...</span>
				</div>
			</div>
		);
	}

	if (failed || !profileData) {
		return (
			<div className="min-h-screen flex items-center justify-center dark:bg-black">
				<div className="bg-orange-100 p-4 rounded-xl border border-orange-200 text-orange-700">
					User not found or something went wrong.
				</div>
			</div>
		);
	}

	async function handleLogOut() {
		const res = await supabase.auth.signOut();
		if (res.error) {
			alert(`Can't LogOut.
        Error : ${res.error.message}`);
			return null;
		}

		localStorage.removeItem("theme");
		navigate("/login");
	}

	return (
		<div className="relative  dark:text-gray-400 bg-white dark:bg-black  pb-1 box-border w-full min-h-screen ">
			{/* Navigation & Edit Controls */}
			<div className="absolute w-full z-10 p-4">
				<div className="w-full flex justify-between items-center">
					<button
						onClick={() => navigate("/home", true)}
						className="p-2 rounded-full dark:bg-[#1F1B24] bg-white shadow-lg hover:scale-105 transition cursor-pointer  ">
						<ChevronLeft />
					</button>

					{/* Only show Edit Pencil if it's the user's own profile */}
					{isOwnProfile && (
						<div
							onClick={() => {
								setControl((p) => !p);
							}}
							className={`p-2  relative text-foreground dark:bg-[#000000] bg-white flex justify-end rounded-full ${
								control && "bg-background text-foreground"
							}`}>
							{" "}
							<Ellipsis
								size={24}
								className={`${
									!control && "text-amber-50 "
								} rotate-90 text-foreground`}
							/>
							<ul
								hidden={!control}
								className="absolute z-50 right-12  w-fit min-w-[20vw] bg-inherit  sm:min-w-[10vw]  rounded-md   shadow-lg transition cursor-pointer p-1
                            *:hover:border
                            *:rounded-md
                            *:hover:bg-gray-600
                            ">
								<li>
									<button
										className="p-1 px-4 whitespace-nowrap flex items-center   transition cursor-pointer  w-full "
										onClick={() => SetPopup(true)}>
										<PencilIcon
											size={14}
											className="hover:-rotate-12 mx-1 mr-5"
										/>{" "}
										Edit
									</button>
								</li>

								<li>
									<div className="p-1 w-full px-4 whitespace-nowrap flex items-center   transition cursor-pointer hover:bg-red-800 rounded-md">
										<LogOut size={14} className="mx-1" />
										<AlertDialogBasic
											className={`px-0`}
											titleText={`Log Out  `}
											handleLogOut={handleLogOut}
										/>
									</div>
								</li>

								<li>
									<button
										className="p-1 px-4 whitespace-nowrap flex items-center   transition cursor-pointer "
										onClick={() => navigate("/control")}>
										<ChevronRight
											size={14}
											className="hover:-rotate-12 mx-1 mr-5"
										/>{" "}
										More
									</button>
								</li>
							</ul>
						</div>
					)}
				</div>
			</div>

			{/* Cover Image */}
			<div className="w-full p-0 sm:p-0 sm:max-h-60 sm:h-52 flex   h-30">
				<img
					src={cover}
					alt="cover"
					className="min-w-full rounded-none   object-cover"
				/>
			</div>

			{/* Profile Info Section */}
			<div className="-mt-13 w-full md:w-1/2  px-4 flex flex-col justify-start  mx-auto  ">
				<div className="flex w-full items-center justify-between mx-2">
					<div className="relative group pl-4">
						<img
							src={profileImg}
							alt="profile"
							className="h-20 w-20 sm:w-25 sm:h-25 rounded-full shadow-2xs  object-cover"
						/>
						{/* Edit Profile Image Button (Only for owner) */}
						{isOwnProfile && (
							<button
								onClick={() => setImgEditor(true)}
								className="absolute bottom-1 right-1 p-1 sm:p-2 bg-white dark:bg-[#1F1B24] rounded-full shadow-md border dark:border-gray-700 transition transform hover:scale-110 cursor-pointer">
								<PencilIcon size={14} />
							</button>
						)}
					</div>

					{!isOwnProfile && (
						<div
							onClick={isFollow ? handleUnfollow : handleFollow}
							className={`border p-2 mt-16 rounded-md mx-2 
								${!isFollow ? "bg-foreground text-background" : "bg-background text-foreground"}
							  hover:text-foreground  hover:bg-gray-500 transition-all duration-400  shadow-2xs cursor-pointer`}>
							{isFollow ? "Following" : "Follow"}
						</div>
					)}
				</div>

				<div className="flex pl-4 items-center mt-1 sm:mt-2">
					<h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
						{profileData.name}
					</h2>
					<p className="text-sm ml-0.5 items-center mt-2 text-gray-500">
						@{profileData.username}
					</p>
				</div>
				{!about && (
					<div className="mt-1 pl-4 text-sm">
						<p className="text-gray-700 dark:text-gray-400 leading-relaxed max-w-sm">
							{about
								? about
								: `Hey, I am am ${profileData?.name}. I write articles on Pennet.`}
						</p>
					</div>
				)}
				<div className=" pl-4  md:mt-4 text-xs  flex gap-8  mt-2  ">
					<NavLink
						to={`followers?id=${profileData?.user_id}`}
						className="flex flex-col justify-center items-center">
						<label className="text-sm" htmlFor="followers">
							Followers
						</label>
						<p className="font-semibold">{follower}</p>
					</NavLink>
					<NavLink
						to={`following?id=${profileData?.user_id}`}
						className="flex flex-col justify-center items-center">
						<label className="text-sm" htmlFor="following">
							Following
						</label>
						<p className="font-semibold">{following}</p>
					</NavLink>
				</div>
			</div>

			{/* Modals */}
			{popup && isOwnProfile && (
				<ImageUpdater
					setCover={setCover}
					SetPopup={SetPopup}
					cover={cover}
					user_id={profileData.user_id}
				/>
			)}

			{ImgEditor && isOwnProfile && (
				<ProfileImageUpdater
					profileImg={profileImg}
					setProfileImg={setProfileImg}
					setImgEditor={setImgEditor}
					user_id={profileData?.user_id}
				/>
			)}

			{/* Posts Section */}
			<div className="mt-8  px-6  sm:w-full sm:px-4 md:px-0 md:w-1/2 mx-auto border-t dark:border-gray-800">
				{profileData.ArticleTable && (
					<UserProfilePosts ArticleTable={profileData.ArticleTable} />
				)}
			</div>

			<ProfileFooter />

			<Outlet />
		</div>
	);
}

export default Profile;
