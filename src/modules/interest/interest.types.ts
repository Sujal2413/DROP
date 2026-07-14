import { CreateLeadDto, ConsumerLeadRecord } from '../waitlist/waitlist.types';

export type CreateInterestDto = Omit<CreateLeadDto, 'name' | 'city' | 'drinkContext'>;
export type InterestRecord = ConsumerLeadRecord;
