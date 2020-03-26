#if (${PACKAGE_NAME} && ${PACKAGE_NAME} != "")package ${PACKAGE_NAME};#end
#parse("Java File Header.java")
@javax.persistence.Embeddable
public class ${Class_Name} {
  public ${Class_Name}() {
  }
}
