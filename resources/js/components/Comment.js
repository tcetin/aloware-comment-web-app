import cx from "classnames";

export default function Comment({ comment, handleReply = () => { }, className, ...other }) {
	return (
		<>
			{comment &&
				<div className={cx("flex flex-col justify-start"), className} {...other}>
					<p className="text-sm text-gray-500">
						{comment.comment} {" "}
						<span className="text-sm font-bold text-gray-600 underline">{comment.username}</span>
					</p>
					<div className="flex justify-end">
						<span className="text-sm font-bold text-blue-500 cursor-pointer" onClick={() => handleReply(comment)}>reply</span>
					</div>
				</div>
			}
		</>
	)
}