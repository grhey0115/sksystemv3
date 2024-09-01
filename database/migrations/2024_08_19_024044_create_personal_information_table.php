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
        Schema::create('personal_information', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');

            $table->string('barangay');
            $table->string('sitio')->nullable();
            $table->string('religion')->nullable();
            $table->string('civil_status');
            $table->boolean('is_solo_parent');
            $table->string('gender');
            $table->integer('family_members')->nullable();
            $table->integer('siblings')->nullable();
            $table->string('valid_id_path')->nullable(); // Path to uploaded valid ID

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('personal_information');
    }
};
