#parse("Kotlin File Header.kt")
@get:${RELATION_TYPE}(mappedBy = "ref${MAPPED_BY}Entity")
#if($COLLECTION_TYPE)
var ref${PROPERTY_TYPE}Entities: List<${PROPERTY_TYPE}Entity>? = null
#else
var ref${PROPERTY_TYPE}Entity: ${PROPERTY_TYPE}Entity? = null
#end