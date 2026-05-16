<?php

namespace App\Http\Controllers;

use App\Models\Marche;
use Illuminate\Http\Request;

class MarcheController extends Controller
{
    public function index()
    {
        return response()->json(Marche::orderBy('created_at', 'desc')->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'titre' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $marche = Marche::create([
            'titre' => $request->titre,
            'description' => $request->description,
            'statut' => 'actif',
        ]);

        return response()->json($marche, 201);
    }

    public function show(Marche $marche)
    {
        return response()->json($marche);
    }

    public function update(Request $request, Marche $marche)
    {
        $request->validate([
            'titre' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'statut' => 'sometimes|string',
        ]);

        $marche->update($request->all());

        return response()->json($marche);
    }

    public function destroy(Marche $marche)
    {
        $marche->delete();
        return response()->json(null, 204);
    }
}
