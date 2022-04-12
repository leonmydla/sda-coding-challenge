package de.mydla.leon.meetings.api.meeting

import de.mydla.leon.meetings.entity.meeting.Meeting
import de.mydla.leon.meetings.entity.meeting.MeetingRepository
import de.mydla.leon.meetings.entity.person.Person
import org.springframework.stereotype.Service
import java.time.LocalDateTime

@Service
class MeetingService(
    private val meetingRepository: MeetingRepository
) {

    fun getAllMeetings(): List<Meeting> =
        meetingRepository.findAll()

    fun createMeeting(person: Person, dateTime: LocalDateTime, coordinates: String): Meeting {
        val newMeeting = Meeting(
            person = person,
            dateTime = dateTime,
            coordinates = coordinates
        )

        return meetingRepository.save(newMeeting)
    }

}
