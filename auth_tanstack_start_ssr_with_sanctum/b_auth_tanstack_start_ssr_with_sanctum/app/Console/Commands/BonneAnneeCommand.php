<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Prism\Prism\Enums\Provider;
use Prism\Prism\Facades\Prism;

use function Laravel\Prompts\text;
use function Laravel\Prompts\warning;

class BonneAnneeCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = '2026';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    /**
     * Execute the console command.
     */
    public function handle()
    {
        $prompt = text('What is your name?');

        // Generate text based on the prompt

        $result = Prism::text()
             ->using(Provider::Gemini, 'gemini-2.5-flash')
             ->withPrompt($prompt)
             ->asText();

             warning($result->text);
    }
}
