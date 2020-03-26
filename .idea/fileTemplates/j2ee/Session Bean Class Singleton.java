#if (${PACKAGE_NAME} && ${PACKAGE_NAME} != "")package ${PACKAGE_NAME};#end
#parse("Java File Header.java")
@javax.ejb.Singleton #if (${Class_Name} != ${Ejb_Name}) (name="${Ejb_Name}") #end
public class ${Class_Name} {
  public ${Class_Name}() {
  }
}
