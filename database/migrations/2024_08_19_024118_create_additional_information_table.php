<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('additional_information', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');

            $table->boolean('is_currently_working');
            $table->json('hobbies')->nullable(); // Store hobbies as JSON
            $table->boolean('is_pwd');
            $table->boolean('has_conflict_with_law');
            $table->boolean('is_indigenous');
            $table->boolean('is_registered_voter');
            $table->boolean('attended_assembly');
            $table->text('why_no_assembly')->nullable();
            $table->string('residency_status'); // Permanent or Temporary

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('additional_information');
    }
};
