package de.mydla.leon.meetings.entity.person

import de.mydla.leon.meetings.entity.meeting.Meeting
import javax.persistence.Entity
import javax.persistence.FetchType
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
import javax.persistence.OneToMany

@Entity
class Person(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null,

    var name: String,

    @OneToMany(mappedBy = "person", fetch = FetchType.LAZY)
    var meetings: List<Meeting>? = null

)
