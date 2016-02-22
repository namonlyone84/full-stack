package management.configuration;

import org.apache.catalina.Context;
import org.springframework.boot.context.embedded.ConfigurableEmbeddedServletContainer;
import org.springframework.boot.context.embedded.EmbeddedServletContainerCustomizer;
import org.springframework.boot.context.embedded.tomcat.TomcatContextCustomizer;
import org.springframework.boot.context.embedded.tomcat.TomcatEmbeddedServletContainerFactory;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ApplicationConfiguration implements EmbeddedServletContainerCustomizer {

    @Override
    public void customize(ConfigurableEmbeddedServletContainer configurableEmbeddedServletContainer) {

        ((TomcatEmbeddedServletContainerFactory) configurableEmbeddedServletContainer).addContextCustomizers(new TomcatContextCustomizer() {
            @Override
            public void customize(Context context) {
                context.setUseHttpOnly(false);
            }
        });
    }
}
