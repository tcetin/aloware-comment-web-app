import Comment from "./Comment"

export const CommentList = ({ comments = [], loading = false, handleReply = () => { } }) => {
	const renderComment = (comment) => {
		let nested = 1;
		return <div key={comment.id}>
			<Comment comment={comment} handleReply={handleReply} showReply={nested < 3} />
			{comment.replies.map(c => {
				nested++;
				console.log(nested);
				return <div className="pl-2" key={c.id}> {renderComment(c)}</div>
			}
			)}
		</div >
	}
	return <div className="p-4 flex flex-col justify-start ">
		<p className="text-sm font-bold border-b-2 py-2">Comment List</p>
		<div className="max-h-96 overflow-y-auto">
			{loading && <p className="text-md font-bold text-center">Loading...</p>}
			{comments.length === 0 && <p className="text-sm text-center mt-2">There is no comment.</p>}
			{comments.length > 0 && comments.map((comment) => renderComment(comment))}
		</div>
	</div>
}