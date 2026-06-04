<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return auth()->user()->can('view-posts') ? response()->json(Post::all()) : response()->json('You do not have permission to view posts.');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if (! auth()->user()->can('create-posts')) {
            return response()->json('You do not have permission to create posts.');
        }
        Post::create($request->all());

        return response()->json('Post created successfully.');
    }
}
