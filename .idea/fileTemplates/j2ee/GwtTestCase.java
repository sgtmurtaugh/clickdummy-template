package ${PACKAGE_NAME};

import com.google.gwt.junit.client.GWTTestCase;

#parse("Java File Header.java")
public class ${NAME} extends GWTTestCase {
    public String getModuleName() {
        return "${GWT_MODULE_NAME}";
    }

}
