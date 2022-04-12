package de.mydla.leon.meetings.api.person

import de.mydla.leon.meetings.common.validation.EntityNotFoundException
import de.mydla.leon.meetings.entity.person.Person
import de.mydla.leon.meetings.entity.person.PersonRepository
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
import java.util.Optional

@ExtendWith(MockKExtension::class)
class PersonServiceTest {

    @MockK
    private lateinit var personRepository: PersonRepository

    @InjectMockKs
    private lateinit var classUnderTest: PersonService

    @Test
    fun `getAllPersons should return correct value`() {
        val expected = listOf(testPerson())

        every { personRepository.findAll() } answers { expected }

        val result = classUnderTest.getAllPersons()

        verify(exactly = 1) { personRepository.findAll() }

        assertThat(result).usingRecursiveComparison().isEqualTo(expected)
    }

    @Test
    fun `getPerson should return correct value`() {
        val expected = testPerson()

        every { personRepository.findById(expected.id!!) } answers { Optional.of(expected) }

        val result = classUnderTest.getPerson(expected.id!!)

        verify(exactly = 1) { personRepository.findById(expected.id!!) }

        assertThat(result).usingRecursiveComparison().isEqualTo(expected)
    }

    @Test
    fun `getPerson should throw exception if repository can't find entity`() {
        val id = 1L;

        every { personRepository.findById(id) } answers { Optional.empty() }

        val exception = assertThrows<EntityNotFoundException> { classUnderTest.getPerson(id) }

        verify(exactly = 1) { personRepository.findById(id) }

        assertThat(exception.message).isEqualTo("Person not found for id '$id'")
    }

    @Test
    fun `createPerson should create and save person`() {
        val personSlot = slot<Person>()
        val expected = testPerson()
        val expectedBeforeSave = testPerson()
        expectedBeforeSave.id = null

        every { personRepository.save(capture(personSlot)) } answers { expected }

        val result = classUnderTest.createPerson(expected.name)

        verify(exactly = 1) { personRepository.save(any()) }

        assertThat(personSlot.captured).usingRecursiveComparison().isEqualTo(expectedBeforeSave)
        assertThat(result).isEqualTo(expected)
    }

}
