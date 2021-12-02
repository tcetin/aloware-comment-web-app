import React, { useEffect, useState } from "react";
import config from "../_helpers/config"
import { CommentList } from "./CommentList";
import ErrorBoundary from "./ErrorBoundary";

export default function Comment() {
	const [error, setError] = React.useState("");
	const [state, setState] = React.useState({ username: "", comment: "" });
	const [loading, setLoading] = React.useState(false);
	const [comments, setComments] = useState([]);

	const getComments = () => {
		setError("");
		fetch(`${config().apiUrl}/comments`, { method: "GET", accept: "application/json" })
			.then(comments => comments.json())
			.then(result => {
				if ("error" in result) {
					throw new Error(result.error);
				}
				setComments(result)

			}).catch(err => {
				setError(err);
			});
	}

	useEffect(() => {
		getComments();
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		fetch(`${config().apiUrl}/comments`, {
			method: "POST",
			body: JSON.stringify(state)
		}).then((response) => response.json())
			.then((response => { console.log(response); }))
			.catch((error) => { setError(error) })
			.finally(() => {
				setLoading(false);
			})
	}
	const handleChange = (e) => {
		setState({ ...state, [e.target.name]: e.target.value });
	}
	return (
		<ErrorBoundary>
			<div className="bg-white p-10 shadow-sm">
				<p className="text-md font-bold">Blog Post Title</p>
				<p className="text-sm text-gray-500 border-b-2 border-gray-600 py-2">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				</p>
				{error && <p className="text-md font-bold text-red-600">{error}</p>}
				<form className="flex flex-col space-y-4 justify-start mt-4" onSubmit={handleSubmit}>
					<input type="text" name="username" placeholder="Please enter your user name." className="p-2 border-2 border-gray-400 text-md font-bold" onChange={handleChange} required />
					<textarea rows="4" name="comment" cols="10" placeholder="Please enter your comment." className="p-2 border-2 border-gray-400 text-md font-bold" onChange={handleChange} required />
					<div className="flex justify-end">
						<button type="submit" className="w-48 p-2 bg-green-400 text-white font-bold border-gray-400">Submit Comment</button>
					</div>
					{loading && <p className="text-md font-bold">Loading...</p>}
				</form >

				<CommentList comments={comments} />
			</div>
		</ErrorBoundary>
	)
}