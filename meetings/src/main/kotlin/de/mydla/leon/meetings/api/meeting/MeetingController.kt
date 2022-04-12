package de.mydla.leon.meetings.api.meeting

import de.mydla.leon.meetings.api.meeting.dto.MeetingDto
import de.mydla.leon.meetings.api.meeting.dto.NewMeetingDto
import de.mydla.leon.meetings.api.meeting.dto.toDto
import de.mydla.leon.meetings.api.person.PersonService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/meeting")
class MeetingController(
    private val personService: PersonService,
    private val meetingService: MeetingService,
) {

    @GetMapping
    fun getAllMeetings(): List<MeetingDto> =
        meetingService.getAllMeetings()
            .map { it.toDto() }

    @PostMapping
    fun createMeeting(
        @RequestBody
        newMeetingDto: NewMeetingDto,
    ): MeetingDto = with(newMeetingDto) {
        val person = personService.getPerson(personId)

        if (coordinates.isEmpty()) {
            throw IllegalArgumentException()
        }

        return meetingService.createMeeting(
            person,
            dateTime,
            coordinates
        ).toDto()
    }

}
