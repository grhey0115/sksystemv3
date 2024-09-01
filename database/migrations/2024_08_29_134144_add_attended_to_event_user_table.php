<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddAttendedToEventUserTable extends Migration
{
    public function up()
    {
        Schema::table('event_user', function (Blueprint $table) {
            $table->boolean('attended')->default(false)->after('user_id');
        });
    }

    public function down()
    {
        Schema::table('event_user', function (Blueprint $table) {
            $table->dropColumn('attended');
        });
    }
}
