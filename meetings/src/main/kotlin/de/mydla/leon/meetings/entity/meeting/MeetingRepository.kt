package de.mydla.leon.meetings.entity.meeting

import org.springframework.data.jpa.repository.JpaRepository

interface MeetingRepository : JpaRepository<Meeting, Long>
