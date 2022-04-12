package de.mydla.leon.meetings.common.validation

import kotlin.reflect.KClass

class EntityNotFoundException(message: String) : Exception(message) {

    constructor(clazz: KClass<*>, id: Long) : this("${clazz.simpleName} not found for id '$id'")
}
