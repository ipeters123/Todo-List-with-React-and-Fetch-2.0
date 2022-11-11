import React from "react";
import {FormToDo} from "./formtodo.jsx";
import {TaskList} from "./tasklist.jsx";

export function Container () {
	return (
		<div>
			<h1 className="title">To do's</h1>
			<FormToDo />
		</div>
	);
};