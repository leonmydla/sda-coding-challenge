package de.mydla.leon.meetings.api.meeting

import de.mydla.leon.meetings.entity.meeting.Meeting
import de.mydla.leon.meetings.entity.meeting.MeetingRepository
import de.mydla.leon.meetings.testdata.testMeeting
import io.mockk.every
import io.mockk.impl.annotations.InjectMockKs
import io.mockk.impl.annotations.MockK
import io.mockk.junit5.MockKExtension
import io.mockk.slot
import io.mockk.verify
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith

@ExtendWith(MockKExtension::class)
class MeetingServiceTest {

    @MockK
    private lateinit var meetingRepository: MeetingRepository

    @InjectMockKs
    private lateinit var classUnderTest: MeetingService

    @Test
    fun `getAllMeetings should return correct value`() {
        val expected = listOf(testMeeting())

        every { meetingRepository.findAll() } answers { expected }

        val result = classUnderTest.getAllMeetings()

        verify(exactly = 1) { meetingRepository.findAll() }

        assertThat(result).usingRecursiveComparison().isEqualTo(expected)
    }

    @Test
    fun `createMeeting should create and save meeting`() {
        val meetingSlot = slot<Meeting>()
        val expected = testMeeting()
        val expectedBeforeSave = testMeeting()
        expectedBeforeSave.id = null

        every { meetingRepository.save(capture(meetingSlot)) } answers { expected }

        val result = classUnderTest.createMeeting(expected.person!!, expected.dateTime, expected.coordinates)

        verify(exactly = 1) { meetingRepository.save(any()) }

        assertThat(meetingSlot.captured).usingRecursiveComparison().isEqualTo(expectedBeforeSave)
        assertThat(result).isEqualTo(expected)
    }

}
