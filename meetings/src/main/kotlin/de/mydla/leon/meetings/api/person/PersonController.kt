package de.mydla.leon.meetings.api.person

import de.mydla.leon.meetings.api.person.dto.MinimalPersonDto
import de.mydla.leon.meetings.api.person.dto.NewPersonDto
import de.mydla.leon.meetings.api.person.dto.toMinimalDto
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/person")
class PersonController(
    private val personService: PersonService
) {

    @GetMapping
    fun getAllPersons(): List<MinimalPersonDto> =
        personService.getAllPersons()
            .map { it.toMinimalDto() }

    @PostMapping
    fun createPerson(
        @RequestBody
        newPerson: NewPersonDto
    ): MinimalPersonDto = with(newPerson) {
        if(name.isEmpty()) {
            throw IllegalArgumentException()
        }

        return personService.createPerson(name)
            .toMinimalDto()
    }

}
