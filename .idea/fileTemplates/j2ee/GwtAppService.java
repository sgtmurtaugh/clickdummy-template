package ${PACKAGE_NAME};

import com.google.gwt.user.client.rpc.ServiceDefTarget;
import com.google.gwt.user.client.rpc.RemoteService;
import com.google.gwt.core.client.GWT;

#parse("Java File Header.java")
public interface ${NAME} extends RemoteService {
    /**
     * Utility/Convenience class.
     * Use ${NAME}.App.getInstance() to access static instance of ${NAME}Async
     */
    public static class App {
      private static final ${NAME}Async ourInstance;
      static {
        ourInstance = (${NAME}Async) GWT.create(${NAME}.class);
        ((ServiceDefTarget) ourInstance).setServiceEntryPoint(GWT.getModuleBaseURL() + "${RELATIVE_SERVLET_PATH}");
      }

      public static ${NAME}Async getInstance() {
        return ourInstance;
      }
    }
}
