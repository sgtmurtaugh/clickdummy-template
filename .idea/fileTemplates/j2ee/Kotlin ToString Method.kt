#parse("Kotlin File Header.kt")
#set($dollar = "$")
override fun toString(): String =
    "Entity of type: ${dollar}{javaClass.name} ( " +
      #foreach($FIELD in $FIELDS)
    "$FIELD = ${dollar}$FIELD " +
      #end
    ")"
