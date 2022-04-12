package de.mydla.leon.meetings.api.person

import de.mydla.leon.meetings.common.validation.EntityNotFoundException
import de.mydla.leon.meetings.entity.person.Person
import de.mydla.leon.meetings.entity.person.PersonRepository
import org.springframework.stereotype.Service

@Service
class PersonService(
    private val personRepository: PersonRepository,
) {

    fun getAllPersons() =
        personRepository.findAll()

    fun getPerson(id: Long): Person =
        personRepository.findById(id)
            .orElseThrow { EntityNotFoundException(Person::class, id) }

    fun createPerson(name: String): Person {
        val newPerson = Person(name = name)

        return personRepository.save(newPerson)
    }
}
