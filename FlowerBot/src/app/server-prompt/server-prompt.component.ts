import { Component, signal } from '@angular/core';
import { OpenAIService } from '../open-ai.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-server-prompt',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './server-prompt.component.html',
  styleUrl: './server-prompt.component.css'
})
export class ServerPromptComponent {
  systemPrompt = signal('');
  constructor(private openAIService: OpenAIService) {}

  setPrompt() {
    this.openAIService.setSystemPrompt(this.systemPrompt());
  }
}
