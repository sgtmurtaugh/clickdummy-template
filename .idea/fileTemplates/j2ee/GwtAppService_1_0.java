package ${PACKAGE_NAME};

import com.google.gwt.user.client.rpc.ServiceDefTarget;
import com.google.gwt.user.client.rpc.RemoteService;
import com.google.gwt.core.client.GWT;

#parse("Java File Header.java")
public interface ${NAME} extends RemoteService {
    /**
     * Utility/Convinience class.
     * Use ${NAME}.App.getInstance() to access static instance of ${NAME}Async
     */
    public static class App {
      private static ${NAME}Async ourInstance = null;

      public static synchronized ${NAME}Async getInstance() {
        if (ourInstance == null) {
            ourInstance = (${NAME}Async) GWT.create(${NAME}.class);
            ((ServiceDefTarget) ourInstance).setServiceEntryPoint("${SERVLET_PATH}");
        }
        return ourInstance;
      }
    }
}
