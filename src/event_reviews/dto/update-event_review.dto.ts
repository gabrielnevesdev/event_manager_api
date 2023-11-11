import { PartialType } from '@nestjs/mapped-types';
import { CreateEventReviewDto } from './create-event_review.dto';

export class UpdateEventReviewDto extends PartialType(CreateEventReviewDto) {}
