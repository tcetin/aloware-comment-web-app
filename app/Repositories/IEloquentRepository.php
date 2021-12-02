<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Interface EloquentRepoInterface
 * @package App\Repositories
 */
interface IEloquentRepository
{
	/**
	 * @param array $attributes
	 * @return Model
	 */
	public function create(array $attributes): Model;

	/**
	 * @param array $attributes
	 * @param int $id
	 * @return Model
	 */
	public function update(int $id, array $attributes): Model;

	/**
	 * @param $id
	 * @return Model
	 */
	public function find($id): ?Model;

	/**
	 * @param $id
	 */
	public function delete($id);

	/**
	 * @return Collection
	 */
	public function list(): Collection;
}