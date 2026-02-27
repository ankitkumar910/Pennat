import React from "react";
import { Button } from "@/components/ui/button";
import { AlertDialogBasic } from "../components/ui/AlertDialogBasic";
import { AlertDialogDestructive } from "./AlertDialogDestructive";

function ButtonDestructive({ text }) {
	return <Button variant="destructive">{text ? text : "Destructive"}</Button>;
}

function UserControl() {
	return (
		<div className="min-h-screen py-2 px-2">
			<div>
				<label htmlFor="">
					<p className="text-lg"> Account Deleteion </p>
					<hr className="py-2" />
					<p className="text-sm text-gray-400">
						Delete your account will erase your data and articles and it is can
						not be undone.
					</p>
					<br />
					<AlertDialogDestructive />
				</label>
			</div>
		</div>
	);
}

export default UserControl;
