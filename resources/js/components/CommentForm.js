import React, { useEffect, useState } from "react";
import config from "../_helpers/config"
import { CommentList } from "./CommentList";
import ErrorBoundary from "./ErrorBoundary";

const fakeContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Lorem ipsum dolor sit amet, consectetur adipiscing elit.";


export default function CommentForm() {
	const [error, setError] = React.useState("");
	const [state, setState] = React.useState({ username: "", comment: "", comment_id: null });
	const [loading, setLoading] = React.useState(false);
	const [blogPost, setBlogPost] = React.useState({ title: "Blog Post Title", content: fakeContent, })
	const [comments, setComments] = useState([]);
	const [isSubmitting, setIsSubmitting] = useState(false);

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

	const resetForm = () => {
		setState({ username: "", comment: "", comment_id: null });
		setBlogPost({ title: "Blog Post Title", content: fakeContent });
	}

	useEffect(() => {
		getComments();
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		setIsSubmitting(true);
		console.log(state);
		fetch(`${config().apiUrl}/comments/store`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(state)
		}).then((response) => response.json())
			.then((response => {
				getComments();
				resetForm();
			}))
			.catch((error) => { setError(error) })
			.finally(() => {
				setLoading(false);
				setIsSubmitting(false);
			})
	}
	const handleChange = (e) => {
		setState({ ...state, [e.target.name]: e.target.value });
	}

	const onCommentReply = (comment) => {
		setBlogPost({ title: `Reply To ${comment.username} Comment`, content: comment.comment });
		setState({ ...state, comment_id: comment.id })
	}

	const cancelReply = () => {
		setBlogPost({ title: "Blog Post Title", content: fakeContent });
		setState({ ...state, comment_id: null })
	}
	return (
		<ErrorBoundary>
			<div className="bg-white p-10 shadow-sm">
				<p className="text-md font-bold">{blogPost.title} {" "}
					{state.comment_id && <span className="text-sm text-red-500 cursor-pointer" onClick={cancelReply}>cancel</span>}
				</p>
				<p className="text-sm text-gray-500 border-b-2 border-gray-600 py-2">{blogPost.content}</p>
				{error && <p className="text-md font-bold text-red-600">{error}</p>}
				<form className="flex flex-col space-y-4 justify-start mt-4" onSubmit={handleSubmit}>
					<input type="text" name="username" value={state.username} disabled={isSubmitting} placeholder="Please enter your user name." className="p-2 border-2 border-gray-400 text-md font-bold" onChange={handleChange} required />
					<textarea rows="4" name="comment" value={state.comment} disabled={isSubmitting} cols="10" placeholder="Please enter your comment." className="p-2 border-2 border-gray-400 text-md font-bold" onChange={handleChange} required />
					<div className="flex justify-end">
						<button type="submit" disabled={isSubmitting} className="w-48 p-2 bg-green-400 text-white font-bold border-gray-400">Submit Comment</button>
					</div>
				</form >

				<CommentList comments={comments} loading={loading} handleReply={onCommentReply} />
			</div>
		</ErrorBoundary>
	)
}