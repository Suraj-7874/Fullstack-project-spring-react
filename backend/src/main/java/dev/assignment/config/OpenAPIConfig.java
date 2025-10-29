package dev.assignment.config;

import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenAPIConfig {
    @Bean
    public OpenAPI assignmentOpenAPI() {
        return new OpenAPI()
            .info(new Info().title("Assignment API")
                .description("Auth (JWT) and Task CRUD API - Spring Boot")
                .version("v1"))
            .externalDocs(new ExternalDocumentation().description("Swagger UI")
                .url("/swagger-ui.html"));
    }
}


