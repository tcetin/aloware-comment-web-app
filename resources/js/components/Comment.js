import cx from "classnames";

export default function Comment({ comment, handleReply = () => { }, className, showReply = true, ...other }) {
	return (
		<>
			{comment &&
				<div className={cx("flex flex-col justify-start"), className} {...other}>
					<p className="text-sm text-gray-500">
						{comment.content} {" "}
						<span className="text-sm font-bold text-gray-600 underline">{comment.username}</span>
					</p>
					{showReply && <div className="flex justify-end">
						<span className="text-sm font-bold text-blue-500 cursor-pointer" onClick={() => handleReply(comment)}>reply</span>
					</div>}
				</div>
			}
		</>
	)
}