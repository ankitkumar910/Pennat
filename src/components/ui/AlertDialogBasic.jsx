import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { themeContext } from "../../context/Context";

export function AlertDialogBasic({ titleText, handleLogOut }) {
	const [theme] = useContext(themeContext);
	console.log(theme)
	return (
		<AlertDialog >
			<AlertDialogTrigger asChild>
				<Button variant="gost"> <span className="pr-2"> {titleText ? titleText : "Show Dialog"}</span></Button>
			</AlertDialogTrigger>
			<AlertDialogContent className={`${theme} bg-background text-foreground `}>
				<AlertDialogHeader>
					<AlertDialogTitle >Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						You will be log out of your account. Click 'Continue' to log out.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction className="hover:bg-red-600">
						<span onClick={handleLogOut}>Continue</span>
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
