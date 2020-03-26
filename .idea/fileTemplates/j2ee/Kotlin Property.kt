#parse("Kotlin File Header.kt")
@get:#if($IS_ID)
Id
#else
Basic
#end
@get:Column(name = "$COLUMN", nullable = $NULLABLE#if($!UPDATABLE), insertable = false, updatable = false#end)
var $PROPERTY_NAME: $PROPERTY_TYPE = null
