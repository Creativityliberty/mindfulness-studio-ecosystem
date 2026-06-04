<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // create permissions
        Permission::create(['name' => 'view-posts']);
        Permission::create(['name' => 'create-posts']);

        // update cache to know about the newly created permissions (required if using WithoutModelEvents in seeders)
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // create roles and assign created permissions

        // this can be done as separate statements
        $role = Role::create(['name' => 'viewer']);
        $role->givePermissionTo('view-posts');

        // or may be done by chaining
        $role = Role::create(['name' => 'editor'])
            ->givePermissionTo(['create-posts']);

        $role = Role::create(['name' => 'super-admin']);
    }
}
