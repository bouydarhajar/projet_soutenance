<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'nom'           => 'Cherkaoui',
            'prenom'        => 'Ahmed',
            'email'         => 'admin@internat.ma',
            'mot_de_passe'  => Hash::make('admin@1234'),
            'role'          => 'admin',
            'derniere_connexion' => null,
        ]);
    }
}
