package de.mydla.leon.meetings.api.meeting.dto

import de.mydla.leon.meetings.api.person.dto.MinimalPersonDto
import de.mydla.leon.meetings.api.person.dto.toMinimalDto
import de.mydla.leon.meetings.entity.meeting.Meeting
import java.time.LocalDateTime

data class MeetingDto(
    val id: Long,
    val person: MinimalPersonDto,
    val dateTime: LocalDateTime,
    val coordinates: String
)

fun Meeting.toDto(): MeetingDto =
    MeetingDto(id!!, person!!.toMinimalDto(), dateTime, coordinates)
