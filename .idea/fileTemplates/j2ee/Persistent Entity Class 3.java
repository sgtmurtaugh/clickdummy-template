#if (${PACKAGE_NAME} && ${PACKAGE_NAME} != "")package ${PACKAGE_NAME};#end
#parse("Java File Header.java")
@javax.persistence.Entity #if (${Class_Name} != ${Entity_Name}) (name=${Entity_Name}) #end
public class ${Class_Name} {
  public ${Class_Name}() {
  }
}
