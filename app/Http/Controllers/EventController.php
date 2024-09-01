<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Notifications\EventCancelledNotification;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use BaconQrCode\Renderer\ImageRenderer;
use BaconQrCode\Renderer\Image\SvgImageBackEnd;
use BaconQrCode\Renderer\RendererStyle\RendererStyle;
use BaconQrCode\Writer;
use Illuminate\Support\Facades\Auth;

class EventController extends Controller
{
    public function index()
    {
        $events = Event::all();

        return Inertia::render('Dashboard', [
            'events' => $events,
            'auth' => auth()->user(),
        ]);
    }

    public function show($id)
        {
            $event = Event::findOrFail($id);
            $authUser = Auth::user();

            return Inertia::render('EventShow', [
                'event' => $event,
                'auth' => $authUser,  // Passing the auth user object correctly
                'qrCodeSvg' => $event->generateQrCode($authUser),
                'hasJoined' => $event->users->contains($authUser),
            ]);
        }

    public function join(Request $request, $id)
        {
            $event = Event::findOrFail($id);
            $user = $request->user();

            if (!$event->users()->where('user_id', $user->id)->exists()) {
                $event->users()->attach($user->id);
            }

            return redirect()->route('events.show', $id);
        }
     /**
     * Show participants of a specific event.
     *
     * @param  int  $id
     * @return \Inertia\Response
     */
    public function showParticipants($id)
    {
        // Find the event by ID
        $event = Event::with('users')->findOrFail($id);

        // Return the participants view with the event and its users
        return Inertia::render('EventParticipants', [
            'event' => $event,
            'participants' => $event->users,
        ]);
    }

    public function cancel(Request $request, $id)
        {
            $event = Event::findOrFail($id);
            $user = $request->user();

            $event->users()->detach($user->id);

            return redirect()->route('events.show', $id);
        }

        public function markAttendance(Request $request, $eventId, $userId)
        {
            // Retrieve the event and user
            $event = Event::findOrFail($eventId);
            $user = User::findOrFail($userId);
    
            // Check if the user is already marked as attended
            $attendance = $event->users()->where('user_id', $user->id)->first();
            if ($attendance && $attendance->pivot->attended) {
                return redirect()->back()->with('warning', 'User has already been marked as attended.');
            }
    
            // Mark attendance
            $event->users()->updateExistingPivot($user->id, ['attended' => true]);
    
            // Award youth points
            $user->increment('youth_points', $event->youth_points);
    
            return redirect()->route('dashboard')->with('success', 'Attendance marked and points awarded.');
        }
        
}
