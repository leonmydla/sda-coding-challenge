package de.mydla.leon.meetings.api.person

import de.mydla.leon.meetings.api.person.dto.NewPersonDto
import de.mydla.leon.meetings.api.person.dto.toMinimalDto
import de.mydla.leon.meetings.testdata.testPerson
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

@ExtendWith(MockKExtension::class)
class PersonControllerTest {

    @MockK
    private lateinit var personService: PersonService

    @InjectMockKs
    private lateinit var classUnderTest: PersonController

    @Test
    fun `getAllPersons should return correct value`() {
        val expected = listOf(testPerson())

        every { personService.getAllPersons() } answers { expected }

        val result = classUnderTest.getAllPersons()

        verify(exactly = 1) { personService.getAllPersons() }

        assertThat(result).usingRecursiveComparison().isEqualTo(expected.map { it.toMinimalDto() })
    }

    @Test
    fun `createPerson should trigger creation and return dto`() {
        val requestSlot = slot<String>()
        val expected = testPerson()
        val request = NewPersonDto(expected.name)

        every { personService.createPerson(capture(requestSlot)) } answers { expected }

        val result = classUnderTest.createPerson(request)

        verify(exactly = 1) { personService.createPerson(expected.name) }

        assertThat(requestSlot.captured).isEqualTo(expected.name)
        assertThat(result).isEqualTo(expected.toMinimalDto())
    }

    @Test
    fun `createPerson should throw exception if name is empty`() {
        val request = NewPersonDto("")

        assertThrows<java.lang.IllegalArgumentException> { classUnderTest.createPerson(request) }

        verify(exactly = 0) { personService.createPerson(any()) }
    }

}
