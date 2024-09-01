<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\EventController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [EventController::class, 'index'])->name('dashboard');
    Route::get('/events', [EventController::class, 'index'])->name('events.index');
    Route::get('/events/{id}', [EventController::class, 'show'])->name('events.show');
    Route::post('/events/{id}/join', [EventController::class, 'join'])->name('events.join');
    Route::post('/events/{event}/join', [EventController::class, 'join'])->middleware('auth')->name('events.join.auth');
    Route::get('/admin/events/{event}/participants', [EventController::class, 'showParticipants'])->name('filament.resources.events.relationManager');
    Route::post('/events/{event}/cancel', [EventController::class, 'cancel'])->name('events.cancel');
    Route::get('/events/{event}/attendance/{user}', [EventController::class, 'markAttendance'])
    ->middleware('auth')
    ->name('events.attendance');

    Route::get('/profile/view', [ProfileController::class, 'view'])->name('profile.view');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::patch('/profile/avatar', [ProfileController::class, 'updateAvatar'])->name('profile.updateAvatar');

    // Multi-step form routes
  
        // Step 1: Personal Information
        Route::get('/profile-step1', [ProfileController::class, 'createStep1'])->name('profile.step1');
        Route::post('/profile-step1', [ProfileController::class, 'postStep1']);
    
        // Step 2: Educational Background
        Route::get('/profile-step2', [ProfileController::class, 'createStep2'])->name('profile.step2');
        Route::post('/profile-step2', [ProfileController::class, 'postStep2']);
    
        // Step 3: Additional Information
        Route::get('/profile-step3', [ProfileController::class, 'createStep3'])->name('profile.step3');
        Route::post('/profile-step3', [ProfileController::class, 'postStep3']);
    
        // Step 4: Emergency Contact
        Route::get('/profile-step4', [ProfileController::class, 'createStep4'])->name('profile.step4');
        Route::post('/profile-step4', [ProfileController::class, 'postStep4']);
});

require __DIR__.'/auth.php';
