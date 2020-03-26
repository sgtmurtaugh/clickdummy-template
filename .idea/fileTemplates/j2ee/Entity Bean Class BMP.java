#if (${PACKAGE_NAME} && ${PACKAGE_NAME} != "")package ${PACKAGE_NAME};#end
#parse("Java File Header.java")
public class ${Class_Name} implements javax.ejb.EntityBean {
    public ${Class_Name}() {
    }
    public ${PK_Class_Name} ejbFindByPrimaryKey(${PK_Class_Name} key) throws javax.ejb.FinderException {
      return null;
    }

    public void setEntityContext(javax.ejb.EntityContext entityContext) throws javax.ejb.EJBException {
    }

    public void unsetEntityContext() throws javax.ejb.EJBException {
    }

    public void ejbRemove() throws javax.ejb.RemoveException, javax.ejb.EJBException {
    }

    public void ejbActivate() throws javax.ejb.EJBException {
    }

    public void ejbPassivate() throws javax.ejb.EJBException {
    }

    public void ejbLoad() throws javax.ejb.EJBException {
    }

    public void ejbStore() throws javax.ejb.EJBException {
    }

}
