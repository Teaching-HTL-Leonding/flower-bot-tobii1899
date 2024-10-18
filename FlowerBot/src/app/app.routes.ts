import { Routes } from '@angular/router';
import { AnswerQuestionComponent } from './answer-question/answer-question.component';
import { ServerPromptComponent } from './server-prompt/server-prompt.component';

export const routes: Routes = [
  { path:'answer-question', component: AnswerQuestionComponent },
  { path:'server-prompt', component: ServerPromptComponent },
  { path: '', redirectTo: '/answer-question', pathMatch: 'full' }
];
