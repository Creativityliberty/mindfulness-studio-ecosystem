<?php

namespace Database\Seeders;

use App\Enums\RoleEnum;
use App\Enums\UserStatusEnum;
use App\Models\Admin;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1️⃣ Seeder des rôles et permissions
        $this->call([
            RolesAndPermissionsSeeder::class,
        ]);

        // 2️⃣ Création des admins par défaut (guard: admin)
        $defaultAdmins = [
            [
                'first_name' => 'Super',
                'last_name' => 'Admin',
                'email' => 'super_admin@mindfull.com',
                'role' => RoleEnum::SUPER_ADMIN->value,
            ],
            [
                'first_name' => 'Admin',
                'last_name' => 'User',
                'email' => 'admin@mindfull.com',
                'role' => RoleEnum::ADMIN->value,
            ],
        ];

        foreach ($defaultAdmins as $data) {
            $admin = Admin::firstOrCreate(
                ['email' => $data['email']],
                [
                    'first_name' => $data['first_name'],
                    'last_name' => $data['last_name'],
                    'password' => Hash::make('password'),
                    'status' => UserStatusEnum::ACTIVE,
                ]
            );

            if (! $admin->hasRole($data['role'])) {
                $admin->assignRole($data['role']);
            }
        }

        // 3️⃣ Création des users par défaut (guard: web)
        $defaultUsers = [
            [
                'first_name' => 'Teacher',
                'last_name' => 'User',
                'email' => 'teacher@mindfull.com',
                'role' => RoleEnum::TEACHER->value,
            ],
            [
                'first_name' => 'Student',
                'last_name' => 'User',
                'email' => 'student@mindfull.com',
                'role' => RoleEnum::STUDENT->value,
            ],
            [
                'first_name' => 'Guest',
                'last_name' => 'User',
                'email' => 'guest@mindfull.com',
                'role' => RoleEnum::GUEST->value,
            ],
        ];

        foreach ($defaultUsers as $data) {
            $user = User::firstOrCreate(
                ['email' => $data['email']],
                [
                    'first_name' => $data['first_name'],
                    'last_name' => $data['last_name'],
                    'password' => Hash::make('password'),
                    'status' => UserStatusEnum::ACTIVE,
                ]
            );

            if (! $user->hasRole($data['role'])) {
                $user->assignRole($data['role']);
            }
        }
    }
}
