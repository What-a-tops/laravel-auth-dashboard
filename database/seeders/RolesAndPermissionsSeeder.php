<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use App\Models\User;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Check if roles exist before creating them
        if (!Role::where('name', 'admin')->exists()) {
            $adminRole = Role::create(['name' => 'admin']);
        } else {
            $adminRole = Role::where('name', 'admin')->first();
        }

        if (!Role::where('name', 'user')->exists()) {
            $userRole = Role::create(['name' => 'user']);
        } else {
            $userRole = Role::where('name', 'user')->first();
        }

        // Assign roles to the admin user
        $adminUser = User::find(1); // Admin user
        if ($adminUser) {
            $adminUser->assignRole($adminRole);
        }

        // Assign the user role to all other users
        $allUsers = User::all();
        foreach ($allUsers as $user) {
            if ($user->id !== 1) {
                $user->assignRole($userRole);
            }
        }
    }
}
