package de.mydla.leon.meetings

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
open class MeetingsApplication

fun main(args: Array<String>) {
    runApplication<MeetingsApplication>(*args)
}
