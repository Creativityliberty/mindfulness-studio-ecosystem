<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(10)->create();
        // $this->call(RolesAndPermissionsSeeder::class);

        // $viewer = User::factory()->create([
        //     'name' => 'Viewer User',
        //     'email' => 'viewer@test.com',
        // ]);
        // $viewer->assignRole('viewer');

        // $editor = User::factory()->create([
        //     'name' => 'Editor User',
        //     'email' => 'editor@test.com',
        // ]);
        // $editor->assignRole('editor');

        // $superAdmin = User::factory()->create([
        //     'name' => 'Super Admin User',
        //     'email' => 'superadmin@test.com',
        // ]);
        // $superAdmin->assignRole('super-admin');

        // Post::create([
        //     'title' => 'Test Post',
        // ]);

    }
}
