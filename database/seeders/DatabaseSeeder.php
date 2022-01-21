<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\Category::factory(5)->create();
        collect([
            [
                'name' => 'Laravel',
                'slug' => 'Laravel'
            ],
            [
                'name' => 'Tailwind CSS',
                'slug' => 'tailwind-css'
            ],
            [
                'name' => 'Reatjs',
                'slug' => 'reactjs'
            ],
            [
                'name' => 'Inertiajs',
                'slug' => 'inertiajs'
            ],
            [
                'name' => 'Javascript',
                'slug' => 'javascript'
            ],
        ])->each(fn ($category) => \App\Models\Category::create($category));

        \App\Models\User::factory(10)->hasThreads(5)->create();
        \App\Models\Reply::factory(100)->create();
        
    }
}
