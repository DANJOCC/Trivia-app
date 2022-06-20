import { TestBed } from '@angular/core/testing';

import { QuestionGameService } from './question-game.service';

describe('QuestionGameService', () => {
  let service: QuestionGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionGameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
