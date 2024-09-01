<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\PersonalInformation;
use App\Models\EducationalBackground;
use App\Models\AdditionalInformation;
use App\Models\EmergencyContact;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */

     public function view(Request $request): Response
    {
        return Inertia::render('Profile/View', [
            'user' => $request->user(),
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }
    

    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'user' => $request->user(),
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    // Step 1: Personal Information
    public function createStep1(Request $request): Response
    {
        return Inertia::render('Profile/Step1', [
            'data' => $request->user()->personalInformation
        ]);
    }

    public function postStep1(Request $request): RedirectResponse
    {
        $request->validate([
            'barangay' => 'required|string|max:255',
            'sitio' => 'nullable|string|max:255',
            'religion' => 'nullable|string|max:255',
            'civil_status' => 'required|string|max:255',
            'is_solo_parent' => 'required|boolean',
            'gender' => 'required|string|max:255',
            'family_members' => 'nullable|integer',
            'siblings' => 'nullable|integer',
            'valid_id_path' => 'nullable|string|max:255'
        ]);

        PersonalInformation::updateOrCreate(
            ['user_id' => $request->user()->id],
            $request->only([
                'barangay', 'sitio', 'religion', 'civil_status',
                'is_solo_parent', 'gender', 'family_members',
                'siblings', 'valid_id_path'
            ])
        );

        return Redirect::route('profile.step2');
    }

    // Step 2: Educational Background
    public function createStep2(Request $request): Response
    {
        return Inertia::render('Profile/Step2', [
            'data' => $request->user()->educationalBackground
        ]);
    }

    public function postStep2(Request $request): RedirectResponse
    {
        $request->validate([
            'current_status' => 'required|string|max:255',
            'last_year_attended' => 'nullable|string|max:255',
            'year_graduated' => 'nullable|string|max:255',
            'year_level' => 'nullable|string|max:255',
            'course' => 'nullable|string|max:255'
        ]);

        EducationalBackground::updateOrCreate(
            ['user_id' => $request->user()->id],
            $request->only([
                'current_status', 'last_year_attended',
                'year_graduated',
                'year_level', 'course'
            ])
        );

        return Redirect::route('profile.step3');
    }

    // Step 3: Additional Information
    public function createStep3(Request $request): Response
    {
        return Inertia::render('Profile/Step3', [
            'data' => $request->user()->additionalInformation
        ]);
    }

    public function postStep3(Request $request): RedirectResponse
    {
        $request->validate([
            // Add your validation rules for additional information here
        ]);

        AdditionalInformation::updateOrCreate(
            ['user_id' => $request->user()->id],
            $request->all()
        );

        return Redirect::route('profile.step4');
    }

    // Step 4: Emergency Contact
    public function createStep4(Request $request): Response
    {
        return Inertia::render('Profile/Step4', [
            'data' => $request->user()->emergencyContact
        ]);
    }

    public function postStep4(Request $request): RedirectResponse
    {
        $request->validate([
            // Add your validation rules for emergency contact here
        ]);

        EmergencyContact::updateOrCreate(
            ['user_id' => $request->user()->id],
            $request->all()
        );

        // Redirect to a success page or dashboard
        return Redirect::route('dashboard');
    }

    /**
     * Update the user's profile information.
     */
    public function update(Request $request)
{
    $request->validate([
        'first_name' => 'required|string|max:255',
        'last_name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users,email,' . $request->user()->id,
        'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
    ]);

    $this->handleAvatarUpload($request, $request->user());

    // Update other fields
    $request->user()->update($request->only('first_name', 'last_name', 'email'));

    return back()->with('success', 'Profile updated successfully.');
}



    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
    private function handleAvatarUpload(Request $request, $user)
{
    if ($request->hasFile('avatar')) {
        // Delete the old avatar if it exists
        if ($user->avatar) {
            Storage::delete($user->avatar);
        }

        // Store the new avatar
        $path = $request->file('avatar')->store('avatars', 'public');
        $user->avatar = $path;
    }
}

public function updateAvatar(Request $request)
{
    \Log::info('Received request to update avatar.');

    if ($request->hasFile('avatar')) {
        \Log::info('Avatar file received.');

        $request->validate([
            'avatar' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $avatarName = $request->user()->id.'_avatar'.time().'.'.$request->avatar->extension();
        $request->avatar->storeAs('avatars', $avatarName, 'public');

        $user = $request->user();
        $user->avatar = $avatarName;
        $user->save();

        return response()->json(['success' => 'Avatar updated successfully']);
    } else {
        \Log::warning('No avatar file received.');
        return response()->json(['error' => 'Avatar file is required.'], 422);
    }
}
}
