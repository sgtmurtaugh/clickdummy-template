#if (${PACKAGE_NAME} && ${PACKAGE_NAME} != "")package ${PACKAGE_NAME};#end
#parse("Java File Header.java")
public interface ${Interface_Name} extends javax.ejb.EJBHome {
  ${Remote_Interface_Name} create() throws java.rmi.RemoteException, javax.ejb.CreateException;
}
