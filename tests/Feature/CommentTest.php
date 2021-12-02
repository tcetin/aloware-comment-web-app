<?php

namespace Tests\Feature;

use App\Models\Comment;
use App\Repositories\ICommentsRepository;
use Illuminate\Foundation\Testing\Concerns\InteractsWithExceptionHandling;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Mockery;
use Mockery\MockInterface;
use Tests\TestCase;

class CommentTest extends TestCase
{
    use WithFaker, RefreshDatabase, InteractsWithExceptionHandling;

    public $repo;


    protected function setUp(): void
    {
        parent::setUp();
    }



    /** @test */
    public function an_user_can_see_comments()
    {
        $this->withoutExceptionHandling();

        $comments = Comment::factory(5)->create();

        $this->mock(ICommentsRepository::class, function (MockInterface $mock) use ($comments) {
            $mock->shouldReceive('list')->once()->andReturn($comments);
        });

        $this->getJson("/api/comments")
            ->assertStatus(200)
            ->assertJson($comments->toArray());
    }

    /** @test */
    public function an_user_can_create_a_comment()
    {
        $this->withoutExceptionHandling();

        $attributes = ['username' => 'test', 'comment' => 'test'];

        $comment = Comment::factory()->create($attributes);

        $this->mock(ICommentsRepository::class, function (MockInterface $mock) use ($attributes, $comment) {
            $mock->shouldReceive('create')->once()->with($attributes)->andReturn($comment);
        });

        $this->postJson("/api/comments/store", $attributes)
            ->assertStatus(201)
            ->assertJson($comment->toArray());

        $this->assertDatabaseHas("comments", $attributes);
    }
}