package de.mydla.leon.meetings.entity.meeting

import de.mydla.leon.meetings.entity.person.Person
import de.mydla.leon.meetings.entity.person.PersonRepository
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest
import org.springframework.test.context.ActiveProfiles
import java.time.LocalDateTime

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@ActiveProfiles("test")
open class MeetingRepositoryTest(
    @Autowired
    val meetingRepository: MeetingRepository,
    @Autowired
    val personRepository: PersonRepository
) {

    @Test
    fun save_shouldSaveValidEntity() {
        val person = Person(name = "John Doe")
        val meeting = Meeting(
            dateTime = LocalDateTime.now(),
            coordinates = "mock coordinates"
        )
        meeting.person = personRepository.save(person)

        meetingRepository.save(meeting)
    }
}
