package de.mydla.leon.meetings.testdata

import de.mydla.leon.meetings.entity.meeting.Meeting
import java.time.LocalDateTime


fun testMeeting() = Meeting(
    1,
    testPerson(),
    LocalDateTime.MAX,
    "12.123123,12.123123"
)
