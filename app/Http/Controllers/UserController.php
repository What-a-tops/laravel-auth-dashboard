<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRequest;
use App\Http\Requests\UpdateRequest;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (request()->input('search')) {
            return UserResource::collection(User::orderBy('created_at', 'desc')
                ->where('name', 'LIKE', request()->input('search') . '%')
                ->where('id', '<>', 1)
                ->get());
        }

        return UserResource::collection(User::orderBy('created_at', 'desc')
            ->where('id', '<>', 1)
            ->paginate(5));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('profile_photo')) {
            $photoPath = $request->file('profile_photo')->store('profile-photos', 'public');
            $data['profile_photo_path'] = $photoPath;
        }


        $data['password'] = bcrypt($data['password']);
        $user = User::create($data);
        return response(new UserResource($user), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return new UserResource($user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, User $user)
    {
        try {
            $data = $request->validated();
            //DELETE PHOTO AND REPLACE NEW
            if ($request->hasFile('profile_photo')) {
                if ($user->profile_photo_path) {
                    $pathToDelete = 'public/' . $user->profile_photo_path;
                    Storage::delete($pathToDelete);
                }

                $photoPath = $request->file('profile_photo')->store('profile-photos', 'public');
                $data['profile_photo_path'] = $photoPath;
            }

            $user->update($data);
            return new UserResource($user);
        } catch (\Exception $e) {
            Log::error('Error updating user:', ['error' => $e->getMessage()]);
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        try {
            $user->delete();
            return response('', 204);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to delete the user.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
