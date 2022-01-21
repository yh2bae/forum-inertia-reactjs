<?php

namespace App\Http\Controllers;

use Illuminate\Support\Str;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {   
        // Abort
        abort_if(!$request->hasAny(['thread', 'reply']), 404);

        // Model name
        $fullNameSpaceOfTheModel = "App\Models\\" . Str::studly($request->keys()[0]);

        // Query
        $model = $fullNameSpaceOfTheModel::find($request->get($request->keys()[0]));
        $toggle = $model->likes()->where('user_id', $request->user()->id)->exists() ? 'delete' : 'save' ;
        if($toggle == "delete") {
            $model->likes()->where('user_id', $request->user()->id)->delete();
        } else {
            $request->user()->likes()->$toggle($model->likes()->make());
        }
        

        return back();

        // switch ($key) {
        //     case 'thread' : 
        //         $thread = Thread::find($request->get($key));
        //         $toggle = $thread->likes()->where('user_id', $request->user()->id)->exists() ? 'delete' : 'save' ;
        //         $request->user()->likes()->$toggle($thread->likes()->make());
        //         break;
        //     case 'reply' : 
        //         $reply = Reply::find($request->get($key));
        //         $toggle = $reply->likes()->where('user_id', $request->user()->id)->exists() ? 'delete' : 'save' ;
        //         $request->user()->likes()->$toggle($reply->likes()->make());
        //         break;

        //     default: 
        //         abort(404);
        //         break;
        // }
    }
}
