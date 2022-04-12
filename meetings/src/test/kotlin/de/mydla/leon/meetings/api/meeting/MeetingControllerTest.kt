package de.mydla.leon.meetings.api.meeting

import de.mydla.leon.meetings.api.meeting.dto.NewMeetingDto
import de.mydla.leon.meetings.api.meeting.dto.toDto
import de.mydla.leon.meetings.api.person.PersonService
import de.mydla.leon.meetings.common.validation.EntityNotFoundException
import de.mydla.leon.meetings.entity.person.Person
import de.mydla.leon.meetings.testdata.testMeeting
import io.mockk.every
import io.mockk.impl.annotations.InjectMockKs
import io.mockk.impl.annotations.MockK
import io.mockk.junit5.MockKExtension
import io.mockk.slot
import io.mockk.verify
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.junit.jupiter.api.extension.ExtendWith
import java.time.LocalDateTime

@ExtendWith(MockKExtension::class)
class MeetingControllerTest {

    @MockK
    private lateinit var meetingService: MeetingService

    @MockK
    private lateinit var personService: PersonService

    @InjectMockKs
    private lateinit var classUnderTest: MeetingController

    @Test
    fun `getAllMeetings should return correct value`() {
        val expected = listOf(testMeeting())

        every { meetingService.getAllMeetings() } answers { expected }

        val result = classUnderTest.getAllMeetings()

        verify(exactly = 1) { meetingService.getAllMeetings() }

        assertThat(result).usingRecursiveComparison().isEqualTo(expected.map { it.toDto() })
    }

    @Test
    fun `createMeeting should trigger creation and return dto`() {
        val personSlot = slot<Person>()
        val dateTimeSlot = slot<LocalDateTime>()
        val coordinatesSlot = slot<String>()
        val expected = testMeeting()
        val request = expected.let { NewMeetingDto(it.person!!.id!!, it.dateTime, it.coordinates) }

        every { personService.getPerson(request.personId) } answers { expected.person!! }
        every { meetingService.createMeeting(capture(personSlot), capture(dateTimeSlot), capture(coordinatesSlot)) } answers { expected }

        val result = classUnderTest.createMeeting(request)

        verify(exactly = 1) { personService.getPerson(request.personId) }
        verify(exactly = 1) { meetingService.createMeeting(any(), any(), any()) }

        assertThat(personSlot.captured).isEqualTo(expected.person)
        assertThat(dateTimeSlot.captured).isEqualTo(expected.dateTime)
        assertThat(coordinatesSlot.captured).isEqualTo(expected.coordinates)
        assertThat(result).isEqualTo(expected.toDto())
    }

    @Test
    fun `createMeeting should throw exception if person is not found`() {
        val request = testMeeting().let { NewMeetingDto(it.person!!.id!!, it.dateTime, it.coordinates) }
        val expected = EntityNotFoundException(Person::class, request.personId)

        every { personService.getPerson(request.personId) } throws (expected)

        val exception = assertThrows<EntityNotFoundException> { classUnderTest.createMeeting(request) }

        verify(exactly = 0) { meetingService.createMeeting(any(), any(), any()) }

        assertThat(exception).isEqualTo(expected)
    }

    @Test
    fun `createMeeting should throw exception if coordinates is empty`() {
        val meeting = testMeeting()
        val request = meeting.let { NewMeetingDto(it.person!!.id!!, it.dateTime, "") }

        every { personService.getPerson(request.personId) } answers { meeting.person!! }

        assertThrows<IllegalArgumentException> { classUnderTest.createMeeting(request) }

        verify(exactly = 0) { meetingService.createMeeting(any(), any(), any()) }
    }
}
