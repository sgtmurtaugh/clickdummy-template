package ${PACKAGE_NAME};

import com.intellij.openapi.components.ServiceManager;
import com.intellij.openapi.project.Project;
import org.jetbrains.annotations.NotNull;

#parse("Java File Header.java")
public interface ${NAME} {
    static ${NAME} getInstance(@NotNull Project project) {
        return ServiceManager.getService(project, ${NAME}.class);
    }
}
