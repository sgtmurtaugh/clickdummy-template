#parse("Kotlin File Header.kt")
@get:$RELATION_TYPE(fetch = FetchType.LAZY)
@get:#if($MULTIPLE_COLUMNS)
JoinColumns(
#end$JOINS
#if($MULTIPLE_COLUMNS)
)
#end
var ref${REFERENCED_ENTITY_NAME}Entity: ${REFERENCED_ENTITY_NAME}Entity? = null
