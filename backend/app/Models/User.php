<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    /**
     * Indique à Laravel quel champ contient le mot de passe
     * (remplace le champ 'password' par défaut).
     */
    protected string $authPasswordName = 'mot_de_passe';

    protected $fillable = [
        'nom',
        'prenom',
        'email',
        'mot_de_passe',
        'role',
        'derniere_connexion',
    ];

    protected $hidden = [
        'mot_de_passe',
    ];

    protected $casts = [
        'derniere_connexion' => 'datetime',
    ];

    /**
     * Compatibilité Laravel < 10.x
     */
    public function getAuthPassword(): string
    {
        return $this->mot_de_passe;
    }
}
