import { MinimalPersonDto } from '../person/minimal-person.dto';

export class MeetingDto {

  constructor(
    readonly id: number,
    readonly person: MinimalPersonDto,
    readonly dateTime: Date,
    readonly coordinates: string
  ) {}

}
