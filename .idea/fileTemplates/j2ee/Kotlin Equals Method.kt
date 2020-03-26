#parse("Kotlin File Header.kt")
override fun equals(other: Any?): Boolean {
    if (this === other) return true
    if (javaClass != other?.javaClass) return false
    other as $CLASS_NAME

    #foreach($PROPERTY in $PROPERTIES)
    if ($PROPERTY != other.$PROPERTY) return false
    #end

    return true
}
