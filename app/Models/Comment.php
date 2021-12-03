<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = ["username", "content", "comment_id"];

    protected $appends = ["replies"];

    public function getRepliesAttribute()
    {
        return $this->replies()->get();
    }

    // a comment has many replies
    public function replies()
    {
        return $this->hasMany(Comment::class);
    }

    // a reply belongs to one comment
    public function comment()
    {
        return $this->belongsTo(Comment::class);
    }
}