package ${PACKAGE_NAME};

import com.intellij.openapi.module.Module;
import com.intellij.openapi.module.ModuleServiceManager;
import org.jetbrains.annotations.NotNull;

#parse("Java File Header.java")
public class ${NAME} {
    public ${NAME}(Module module) {
    }

    public static ${NAME} getInstance(@NotNull Module module) {
        return ModuleServiceManager.getService(module, ${NAME}.class);
    }
}
