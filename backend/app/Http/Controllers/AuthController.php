<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Connexion utilisateur
     */
    public function login(Request $request): JsonResponse
    {
        $request->validate([
            'email'       => 'required|email',
            'mot_de_passe' => 'required|string|min:6',
            'remember'     => 'boolean',
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->mot_de_passe, $user->mot_de_passe)) {
            throw ValidationException::withMessages([
                'email' => ['Identifiants incorrects. Veuillez vérifier votre email et mot de passe.'],
            ]);
        }

        // Mettre à jour la dernière connexion
        $user->update(['derniere_connexion' => now()]);

        // Révoquer les anciens tokens (optionnel, selon votre besoin de sessions multiples)
        $user->tokens()->delete();

        // Gestion de l'expiration du token pour le "Se souvenir de moi"
        // Si non coché, le token expire après la durée définie (ex: 1 heure)
        // Si coché, le token n'expire pas (null)
        $expiresAt = $request->remember ? null : now()->addMinutes(config('sanctum.expiration') ?? 60);

        // Créer un nouveau token Sanctum
        $token = $user->createToken('intarnet-stock-token', ['*'], $expiresAt)->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Connexion réussie.',
            'token'   => $token,
            'user'    => [
                'id'                  => $user->id,
                'nom'                 => $user->nom,
                'prenom'              => $user->prenom,
                'email'               => $user->email,
                'role'                => $user->role,
                'derniere_connexion'  => $user->derniere_connexion?->format('d/m/Y H:i'),
            ],
        ], 200);
    }

    /**
     * Déconnexion utilisateur
     */
    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Déconnexion réussie.',
        ]);
    }

    /**
     * Obtenir l'utilisateur connecté
     */
    public function me(Request $request): JsonResponse
    {
        $user = $request->user();
        return response()->json([
            'success' => true,
            'user'    => [
                'id'                  => $user->id,
                'nom'                 => $user->nom,
                'prenom'              => $user->prenom,
                'email'               => $user->email,
                'role'                => $user->role,
                'derniere_connexion'  => $user->derniere_connexion?->format('d/m/Y H:i'),
            ],
        ]);
    }

    /**
     * Mettre à jour le profil
     */
    public function updateProfile(Request $request): JsonResponse
    {
        $user = $request->user();

        $request->validate([
            'nom'    => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email'  => 'required|email|unique:users,email,' . $user->id,
        ]);

        $user->update($request->only('nom', 'prenom', 'email'));

        return response()->json([
            'success' => true,
            'message' => 'Profil mis à jour avec succès.',
            'user'    => [
                'id'                  => $user->id,
                'nom'                 => $user->nom,
                'prenom'              => $user->prenom,
                'email'               => $user->email,
                'role'                => $user->role,
                'derniere_connexion'  => $user->derniere_connexion?->format('d/m/Y H:i'),
            ],
        ]);
    }

    /**
     * Mettre à jour le mot de passe
     */
    public function updatePassword(Request $request): JsonResponse
    {
        $request->validate([
            'actuel' => 'required',
            'nouveau' => 'required|min:6|confirmed',
        ]);

        $user = $request->user();

        if (! Hash::check($request->actuel, $user->mot_de_passe)) {
            throw ValidationException::withMessages([
                'actuel' => ['Le mot de passe actuel est incorrect.'],
            ]);
        }

        $user->update([
            'mot_de_passe' => Hash::make($request->nouveau)
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Mot de passe modifié avec succès.'
        ]);
    }
}
