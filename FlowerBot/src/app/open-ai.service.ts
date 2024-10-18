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
  private generateSystemPrompt(): string {
    return `
      You are a normal assistent, but if the user asks you something about flowers, then you are a flower shop assistant. Help the customer choose the perfect bouquet by asking relevant questions about their preferences.

      Flowers and available colors:
      - Roses: red, yellow, purple
      - Lilies: yellow, pink, white
      - Gerberas: pink, red, yellow
      - Freesias: white, pink, red, yellow
      - Tulips: red, yellow, purple
      - Sunflowers: yellow

      Bouquet prices:
      - Small: 15€ (3 flowers)
      - Medium: 25€ (5 flowers)
      - Large: 35€ (10 flowers)

      Ask questions to find out the occasion, preferred colors, and favorite flowers to recommend the best bouquet. Only offer suggestions based on the available flowers and their colors, and make sure the bouquet fits within the budget.
    `;
  }

  private systemPrompt = 'Answer normally';
  private httpClient = inject(HttpClient);
  private messages: { role: string; content: string }[] = [
    { role: 'system', content: this.generateSystemPrompt() }
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
    this.messages = [{ role: 'system', content: this.systemPrompt }];
  }

  setSystemPrompt(prompt: string) {
    this.systemPrompt = prompt;
    this.messages[0] = { role: 'system', content: this.systemPrompt };
  }
}
