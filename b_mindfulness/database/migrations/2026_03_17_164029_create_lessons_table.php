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
        Schema::create('lessons', function (Blueprint $table) {
            $table->uuid('id')->primary();

            $table->foreignUuid('module_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->string('slug');
            $table->string('name');
            $table->text('content')->nullable();


            $table->text('description')->nullable();

            $table->unsignedInteger('duration_minutes');
            $table->unsignedInteger('order');

            $table->unique(['module_id', 'slug']);
            $table->unique(['module_id', 'name']);
            $table->unique(['module_id', 'order']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lessons');
    }
};
