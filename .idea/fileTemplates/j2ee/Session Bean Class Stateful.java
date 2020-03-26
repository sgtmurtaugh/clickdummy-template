#if (${PACKAGE_NAME} && ${PACKAGE_NAME} != "")package ${PACKAGE_NAME};#end
#parse("Java File Header.java")
public class ${Class_Name} implements javax.ejb.SessionBean {
    public ${Class_Name}() {
    }
    public void setSessionContext(javax.ejb.SessionContext sessionContext) throws javax.ejb.EJBException {
    }

    public void ejbCreate() throws javax.ejb.CreateException {
    }

    public void ejbRemove() throws javax.ejb.EJBException {
    }

    public void ejbActivate() throws javax.ejb.EJBException {
    }

    public void ejbPassivate() throws javax.ejb.EJBException {
    }
}
