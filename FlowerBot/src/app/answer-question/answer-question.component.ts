import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OpenAIService } from '../open-ai.service';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-answer-question',
  standalone: true,
  imports: [FormsModule, MarkdownModule],
  templateUrl: './answer-question.component.html',
  styleUrls: ['./answer-question.component.css'],
})
export class AnswerQuestionComponent {
  list = signal<string[][]>([]);
  question = signal('');
  answer = signal('');

  private readonly openAIService = inject(OpenAIService);

  async answerQuestion() {
    if (this.list().length < 20) {
      const response = await this.openAIService.answerQuestion(this.question());
      this.answer.set(response.choices[0].message.content);

      this.list.update((value) => [...value, [this.question(), this.answer()]]);

      this.getMarkdownContent();
    } else {
      const answerBtn = document.getElementById('answerBtn') as HTMLButtonElement;
      answerBtn.disabled = true;
    }
  }

  restart() {
    this.list.set([]);
    this.question.set('');
    this.answer.set('');

    this.openAIService.resetConversation();

    const dialog = document.getElementById('dialog') as HTMLDivElement;
    dialog.innerHTML = '';
  }

  getMarkdownContent() {
    const dialog = document.getElementById('dialog') as HTMLDivElement;
    dialog.innerHTML = '';

    for (const [question, answer] of this.list()) {
      const me = document.createElement('h2');
      me.innerText = 'Question';
      me.style.textAlign = 'right';
      dialog.appendChild(me);

      const questionElement = document.createElement('p');
      questionElement.style.textAlign = 'right';
      questionElement.innerText = question;
      dialog.appendChild(questionElement);

      const bot = document.createElement('h2');
      bot.innerText = 'Answer';
      dialog.appendChild(bot);

      const answerElement = document.createElement('p');
      answerElement.style.textAlign = 'right';
      answerElement.innerText = answer;
      dialog.appendChild(answerElement);

      const hr = document.createElement('hr');
      dialog.appendChild(hr);
    }
  }
}
