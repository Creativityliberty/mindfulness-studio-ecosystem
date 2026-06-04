<?php

namespace App\Observers;

use App\Models\User;

class UserObserver
{
    /**
     * Avant la création
     */
    public function creating(User $user)
    {
        // Exemple : définir une valeur par défaut
        $user->role ??= 'user';
    }

    /**
     * Après la création
     */
    public function created(User $user)
    {
        // Exemple : envoyer un email de bienvenue
    }

    /**
     * Avant la mise à jour
     */
    public function updating(User $user)
    {
        // Exemple : vérifier une condition
    }

    /**
     * Après la mise à jour
     */
    public function updated(User $user)
    {
        //
    }

    /**
     * Avant la suppression
     */
    public function deleting(User $user)
    {
        // Exemple : empêcher la suppression
        // throw new \Exception('Suppression interdite');
    }

    /**
     * Après la suppression
     */
    public function deleted(User $user)
    {
        //
    }

    /**
     * Avant restauration (soft deletes)
     */
    public function restoring(User $user)
    {
        //
    }

    /**
     * Après restauration
     */
    public function restored(User $user)
    {
        //
    }

    /**
     * Suppression définitive
     */
    public function forceDeleted(User $user)
    {
        //
    }
}
