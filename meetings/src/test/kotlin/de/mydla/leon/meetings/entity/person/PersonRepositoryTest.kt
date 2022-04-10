package de.mydla.leon.meetings.entity.person

import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest
import org.springframework.test.context.ActiveProfiles

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@ActiveProfiles("test")
open class PersonRepositoryTest(
    @Autowired
    val personRepository: PersonRepository
) {

    @Test
    fun save_shouldSaveValidEntity() {
        val person = Person(name = "John Doe")

        personRepository.save(person)
    }
}
