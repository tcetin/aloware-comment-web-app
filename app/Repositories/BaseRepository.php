<?php

namespace App\Repositories;

use App\Repositories\IEloquentRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class BaseRepository implements IEloquentRepository
{
	/**
	 * @var Model
	 */
	protected $model;

	/**
	 * BaseRepository constructor.
	 *
	 * @param Model $model
	 */
	public function __construct(Model $model)
	{
		$this->model = $model;
	}

	/**
	 * @param array $attributes
	 *
	 * @return Model
	 */
	public function create(array $attributes): Model
	{
		return $this->model->create($attributes);
	}

	/**
	 * @param array $attributes
	 * @param int $id
	 *
	 * @return Model
	 */
	public function update(int $id, array $attributes): Model
	{
		$entity = $this->model->find($id);
		$entity->update($attributes);
		return $entity;
	}


	/**
	 * @param $id
	 * @return Model
	 */
	public function find($id): ?Model
	{
		return $this->model->find($id);
	}

	/**
	 * @param $id
	 */
	public function delete($id)
	{
		$entity = $this->find($id);
		$entity->delete();
	}

	/**
	 * @return Collection
	 */
	public function list(): Collection
	{
		return $this->model->all();
	}
}