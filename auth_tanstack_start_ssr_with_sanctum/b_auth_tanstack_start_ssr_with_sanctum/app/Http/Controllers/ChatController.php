<?php

namespace App\Http\Controllers;
use Prism\Prism\Enums\Provider;
use Prism\Prism\Facades\Prism;
use Prism\Prism\ValueObjects\Messages\UserMessage;
use Prism\Prism\ValueObjects\Messages\AssistantMessage;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ChatController extends Controller
{
    public function stream(Request $request) {
            $data = $request->validate([
                'messages' => ['required', 'array', 'min:1'],
                'messages.*.role' => ['required', 'in:user,assistant,system'],
                'messages.*.content' => ['required', 'string'],
            ]);

            // Transformer les messages user/assistant en objets
            $messages = collect($data['messages'])
                ->filter(fn($msg) => $msg['role'] !== 'system')
                ->map(function ($message) {
                    return match($message['role']) {
                        'user' => new UserMessage($message['content']),
                        'assistant' => new AssistantMessage($message['content']),
                    };
                })
                ->toArray();

            $response = Prism::text()
                ->using(Provider::Gemini, 'gemini-2.5-flash')
                ->withMessages($messages)
                ->asText();

            return response()->json([
                'message' => $response->text
            ]);
     
    }
}
