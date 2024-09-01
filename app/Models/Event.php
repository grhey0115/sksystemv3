<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use BaconQrCode\Renderer\ImageRenderer;
use BaconQrCode\Renderer\Image\SvgImageBackEnd;
use BaconQrCode\Renderer\RendererStyle\RendererStyle;
use BaconQrCode\Writer;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [ 
    'name',
    'description',
    'start_time',
    'end_time',
    'location',        // Add this line
    'youth_points',    // Add this line
    'header_image',    // Add this line];
    ];
    public function users()
    {
        return $this->belongsToMany(User::class, 'event_user');
    }
    public function generateQrCode(User $user)
    {
        $url = route('events.attendance', ['event' => $this->id, 'user' => $user->id]);

        $renderer = new ImageRenderer(
            new RendererStyle(400),
            new SvgImageBackEnd()
        );

        $writer = new Writer($renderer);

        return $writer->writeString($url);
    }
}
