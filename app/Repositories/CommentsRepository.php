<?php

namespace App\Repositories;

use App\Models\Comment;
use Illuminate\Support\Collection;

class CommentsRepository extends BaseRepository implements ICommentsRepository
{
	public $depthCount = 0;
	/**
	 *
	 * @param Comment $model
	 */
	public function __construct(Comment $model)
	{
		parent::__construct($model);
	}

	public function getCommentsByDesc()
	{
		return $this->model->with("replies")->where("comment_id", null)->orderBy('id', 'DESC');
	}

	// exceed 3 max depth
	public function exceedMaxDepth($commentId)
	{
		if ($commentId) {
			$comment = $this->model->find($commentId);
			if ($this->depthCount < 3) {
				$this->depthCount++;
				return $this->exceedMaxDepth($comment->comment_id);
			}

			return true;
		}

		return false;
	}
}