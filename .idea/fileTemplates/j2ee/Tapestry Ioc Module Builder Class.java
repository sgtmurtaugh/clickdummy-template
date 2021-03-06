package ${PACKAGE_NAME};

import org.apache.tapestry5.ioc.MappedConfiguration;

#parse("Java File Header.java")
public class ${NAME}
{
    public static void contributeApplicationDefaults(MappedConfiguration<String, String> configuration)
    {
        // Contributions to tapestry.ioc.ApplicationDefaults will override any contributes to
        // tapestry.io.FactoryDefaults (with the same key). Here we're restricting the supported locales
        // to just "en" (English). Tapestry will be most efficient with a finite number of supported locales.
        // As you add localised message catalogs and other assets, you can extend this list of locales (it's
        // a comma seperated series of locale name; the first locale name is the default when there's no
        // reasonable match).

        configuration.add("tapestry.supported-locales", "en");
    }
}