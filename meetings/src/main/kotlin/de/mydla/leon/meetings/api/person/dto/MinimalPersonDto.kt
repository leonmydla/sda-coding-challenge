package de.mydla.leon.meetings.api.person.dto

import de.mydla.leon.meetings.entity.person.Person

data class MinimalPersonDto(
    val id: Long?,
    val name: String
)

fun Person.toMinimalDto(): MinimalPersonDto =
    MinimalPersonDto(id, name)
