<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

interface ICommentsRepository
{
	public function list(): Collection;
	public function getCommentsByDesc();
	public function create(array $attributes): Model;
	public function update(int $id, array $attributes): Model;
	public function delete(int $id);
}