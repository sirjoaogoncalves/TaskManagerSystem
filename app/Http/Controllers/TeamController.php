<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTeamRequest;
use App\Http\Requests\UpdateTeamRequest;
use App\Models\Team;
use App\Models\User;
use App\Http\Resources\TeamResource;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;

class TeamController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $teams = Team::all();

        return inertia('Team/Index', [
            'teams' => TeamResource::collection($teams),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $users = User::all();

        return inertia('Team/Create', [
            'users' => UserResource::collection($users),
                    ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:255',
        ]);

        $team = Team::create($data);

        // Sync users with the team
        if ($request->has('users')) {
            $team->users()->sync($request->input('users'));
        }

        return redirect()->route('team.index')
            ->with('success', "Team \"$team->name\" was created");
    }

    /**
     * Display the specified resource.
     */
    public function show(Team $team)
    {
        return inertia('Team/Show', [
            'team' => new TeamResource($team),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Team $team)
    {
        $users = User::all();

        return inertia('Team/Edit', [
            'team' => new TeamResource($team),
            'users' => $users,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTeamRequest $request, Team $team)
    {
        $data = $request->validated();
        $team->update($data);

        // Sync users with the team
        if ($request->has('users')) {
            $team->users()->sync($request->input('users'));
        } else {
            // If no users provided, detach all users from the team
            $team->users()->detach();
        }

        return redirect()->route('team.index')
            ->with('success', "Team \"$team->name\" was updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Team $team)
    {
        $team->delete();
        return redirect()->route('team.index')
            ->with('success', "Team \"$team->name\" was deleted");
    }
}
