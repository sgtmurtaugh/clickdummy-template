#if (${PACKAGE_NAME} && ${PACKAGE_NAME} != "")package ${PACKAGE_NAME};#end
#parse("Java File Header.java")
public class ${Class_Name} implements javax.ejb.MessageDrivenBean, ${Message_Listener_Interface_Name} {
    public ${Class_Name}() {
    }

    public void onMessage(javax.jms.Message message) {
    }

    public void ejbRemove() throws javax.ejb.EJBException {
    }

    public void setMessageDrivenContext(javax.ejb.MessageDrivenContext messageDrivenContext) throws javax.ejb.EJBException {
    }

    public void ejbCreate() {
    }
}
