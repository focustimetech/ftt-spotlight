<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\BlogPost;
use App\BlogGroup;
use App\BlogAuthor;
use App\BlogVideo;
use App\Http\Resources\BlogPost as BlogPostResource;
use App\Http\Resources\BlogGroup as BlogGroupResource;
use App\Http\Resources\BlogAuthor as BlogAuthorResource;
use App\Http\Resources\BlogVideo as BlogVideoResource;

class BlogController extends Controller
{
    public function getGroups()
    {
        $blog_groups = BlogGroup::all();

        return BlogGroupResource::collection($blog_groups);
    }

    public function getPostsByGroup($group_id)
    {
        $blog_group = BlogGroup::find($group_id);

        if ($blog_group) {
            return BlockPostResource::collection($blog_group->blogPosts()->get());
        } else {
            return response()->json([
                'message' => 'The blog post group with this ID could not be found.'
            ], 404);
        }
    }

    public function getPostById($post_id)
    {
        $blog_post = BlogPost::find($post_id);

        if ($blog_post) {
            return new BlogPostResource($blog_post);
        } else {
            return response()->json([
                'message' => "The blog post having ID $post_id could not be found."
            ], 404);
        }
    }
}
