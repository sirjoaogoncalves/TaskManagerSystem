<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'img_path',
        'user_id',
    ];

    public function member()
    {
        return $this->belongsTo(User::class, 'team_id');
    }
}
