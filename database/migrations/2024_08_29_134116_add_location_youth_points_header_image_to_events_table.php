<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddLocationYouthPointsHeaderImageToEventsTable extends Migration
{
    public function up()
    {
        Schema::table('events', function (Blueprint $table) {
            $table->string('location')->after('end_time');
            $table->integer('youth_points')->after('location');
            $table->string('header_image')->nullable()->after('youth_points');
        });
    }

    public function down()
    {
        Schema::table('events', function (Blueprint $table) {
            $table->dropColumn(['location', 'youth_points', 'header_image']);
        });
    }
}
