#if (${PACKAGE_NAME} && ${PACKAGE_NAME} != "")package ${PACKAGE_NAME};#end
import org.aopalliance.intercept.MethodInterceptor;
import org.aopalliance.intercept.MethodInvocation;

#parse("Java File Header.java")
public class ${NAME} implements MethodInterceptor {
  public Object invoke(MethodInvocation methodInvocation) throws Throwable {
    return methodInvocation.proceed();
  }
}
