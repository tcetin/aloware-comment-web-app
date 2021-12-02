<?php

namespace App\Http\Controllers;

use App\Repositories\ICommentsRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Validator;

class CommentsController extends Controller
{
    protected $repo;


    public function __construct(ICommentsRepository $repo)
    {
        $this->repo = $repo;
    }


    public function list()
    {
        try {
            $list = $this->repo->getCommentsByDesc()->get();
            return  response()->json($list->toArray());
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), ['username' => 'required', 'comment' => 'required']);

        if ($validator->fails()) {
            $messages = Arr::flatten($validator->errors()->toArray());
            return response()->json($messages, 422);
        }

        $created = $this->repo->create($request->all());

        return response()->json($created->toArray(), 201);
    }
}