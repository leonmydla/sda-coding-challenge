export class NewMeetingDto {

  constructor(
    public personId: number,
    public dateTime: Date,
    public coordinates: string
  ) {}

}
