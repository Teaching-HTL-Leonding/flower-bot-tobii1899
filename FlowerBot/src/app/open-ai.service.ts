import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

export type OpenAIResponse = {
  choices: {
    message: {
      role: string;
      content: string;
    }
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
};

@Injectable({
  providedIn: 'root'
})
export class OpenAIService {
  private httpClient = inject(HttpClient);
  private messages: { role: string; content: string }[] = [
    { role: 'system', content: 'Answer normally' }
  ];

  async answerQuestion(question: string): Promise<OpenAIResponse> {
    this.messages.push({ role: 'user', content: question });

    const response = await firstValueFrom(
      this.httpClient.post<OpenAIResponse>(
        'http://localhost:3000/openai/deployments/gpt-4o-mini/chat/completions',
        {
          messages: this.messages
        }
      )
    );

    this.messages.push({ role: 'assistant', content: response.choices[0].message.content });
    return response;
  }

  resetConversation() {
    this.messages = [{ role: 'system', content: 'Answer normally' }];
  }
}
