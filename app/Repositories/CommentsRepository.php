<?php

namespace App\Repositories;

use App\Models\Comment;
use Illuminate\Support\Collection;

class CommentsRepository extends BaseRepository implements ICommentsRepository
{
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
		return $this->model->orderBy('id', 'DESC');
	}
}