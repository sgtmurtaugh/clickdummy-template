#if (${PACKAGE_NAME} && ${PACKAGE_NAME} != "")package ${PACKAGE_NAME};#end
import com.google.inject.AbstractModule;

#parse("Java File Header.java")
public class ${NAME} extends AbstractModule {
protected void configure() {
  //add configuration logic here
  }
}
