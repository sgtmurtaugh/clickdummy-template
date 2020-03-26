#if ($PACKAGE != "")package $PACKAGE

#end
import javax.persistence.*

#parse("Kotlin File Header.kt")
@Entity
@Table(name = "$TABLE_NAME", schema = "$SCHEMA", catalog = "$CATALOG")
#if ($WITH_COMPLEX_PK)
@IdClass(${CLASS_NAME}PK::class)
#end
open class $CLASS_NAME {
    $PROPERTIES
    $RELATIONAL_PROPERTIES
    $TO_STRING_METHOD
    $HASHCODE_METHOD
    $EQUALS_METHOD
}

#if ($WITH_COMPLEX_PK)
class ${CLASS_NAME}PK : java.io.Serializable {
    $PK_PROPERTIES
    $PK_EQUALS_METHOD
    $PK_HASHCODE_METHOD
}
#end