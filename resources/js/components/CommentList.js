export const CommentList = ({ comments = [] }) => {
	return <div className="p-4 flex flex-col justify-start">
		<p className="text-sm font-bold border-b-2 py-2">Comment List</p>
		{comments.map((comment) =>
			<div key={comment.id} className="flex flex-col justify-start">
				<p className="text-sm text-gray-500">{comment.comment} <span className="text-sm font-bold text-gray-600 underline">{comment.username}</span></p>
				<div className="flex justify-end">
					<span className="text-sm font-bold text-blue-500 cursor-pointer" onClick={handleReply}>reply</span>
				</div>
			</div>
		)}
	</div>
}