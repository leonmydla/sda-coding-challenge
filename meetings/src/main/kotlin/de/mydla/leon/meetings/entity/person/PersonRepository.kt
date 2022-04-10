package de.mydla.leon.meetings.entity.person

import org.springframework.data.jpa.repository.JpaRepository

interface PersonRepository : JpaRepository<Person, Long>
