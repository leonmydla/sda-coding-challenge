package de.mydla.leon.meetings.api.meeting.dto

import java.time.LocalDateTime

data class NewMeetingDto(
    val personId: Long,
    val dateTime: LocalDateTime,
    val coordinates: String
)
