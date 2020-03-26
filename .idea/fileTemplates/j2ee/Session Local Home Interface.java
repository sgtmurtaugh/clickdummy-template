#if (${PACKAGE_NAME} && ${PACKAGE_NAME} != "")package ${PACKAGE_NAME};#end
#parse("Java File Header.java")
public interface ${Interface_Name} extends javax.ejb.EJBLocalHome {
  ${Local_Interface_Name} create() throws javax.ejb.CreateException;
}
